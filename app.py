
from flask import Flask, render_template, request, jsonify, redirect, url_for
import requests
from bs4 import BeautifulSoup

app = Flask(__name__)
from pymongo import MongoClient
import certifi

ca = certifi.where()

client = MongoClient('mongodb+srv://test:sparta@cluster0.qk1cs8d.mongodb.net/Cluster0?retryWrites=true&w=majority',tlsCAFile=ca)
db = client.sparta
headers = {'User-Agent' : 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)AppleWebKit/537.36 (KHTML, like Gecko) Chrome/73.0.3683.86 Safari/537.36'}

SECRET_KEY = 'SPARTA'

import jwt

import datetime

import hashlib





@app.route('/')
def home():
    # token_receive = request.cookies.get('mytoken')
    # try:
    #     payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
    #     user_info = db.userinfo.find_one({"id": payload['id']})
    #     return render_template('index.html')
    # except jwt.ExpiredSignatureError:
    #     return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    # except jwt.exceptions.DecodeError:
    #     return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))
    return render_template('index.html')

@app.route('/main')
def main():
    return render_template('main.html')


@app.route("/api/mainpost", methods=["POST"])
def api_valid_post():
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        userinfo = db.userinfo.find_one({'id': payload['id']}, {'_id': 0})
        nickname_receive = userinfo["nickName"]
        ott_receive = request.form['ott_give']
        contents_receive = request.form['contents_give']
        comment_receive = request.form['comment_give']
        db.comments.insert_one({'nickname': nickname_receive, 'ott': ott_receive, 'contents': contents_receive, 'comment': comment_receive})
        return jsonify({'msg': '한 줄 평 작성 완료'})

    except jwt.ExpiredSignatureError:
        # 위를 실행했는데 만료시간이 지났으면 에러가 납니다.
        return jsonify({'msg': 'timeOut'})
    except jwt.exceptions.DecodeError:
        return jsonify({'msg': 'invalid'})



@app.route("/api/mainnet", methods=["GET"])
def netflix_slide():
    data = requests.get(
        'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bkdJ&qvt=0&query=%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%20%EC%B6%94%EC%B2%9C',
        headers=headers)
    soup = BeautifulSoup(data.text, 'html.parser')
    netflixlist = soup.select('#mflick > div > div > ul:nth-child(1) > li')

    netflixrank = []
    for netflix in netflixlist:
        title = netflix.select_one('strong > a').text
        img = netflix.select_one('div.thumb_area > a > img')['src']
        netflixrank.append({jsonify({'title': title, 'img':img})})

    return netflixrank



@app.route("/api/mainget", methods=["GET"])
def comments_get():
        comments_list = list(db.comments.find({},{'_id': False}))
        print(comments_list)
        return jsonify({'comments': comments_list})


@app.route('/api/join', methods=['POST'])
def api_register():
    name_receive = request.form['name_give']
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    nickname_receive = request.form['nickName_give']

    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    db.userinfo.insert_one({'name' : name_receive, 'id': id_receive, 'pw': pw_hash, 'nickName' : nickname_receive})

    return jsonify({'result': '회원가입 성공!'})

@app.route('/join')
def register():
    return render_template('join.html')

@app.route('/login')
def login():
    msg = request.args.get("msg")
    return render_template('login.html', msg=msg)

# [로그인 API]
# id, pw를 받아서 맞춰보고, 토큰을 만들어 발급합니다.
@app.route('/api/login', methods=['POST'])
def api_login():
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']

    # 회원가입 때와 같은 방법으로 pw를 암호화합니다.
    pw_hash = hashlib.sha256(pw_receive.encode('utf-8')).hexdigest()

    # id, 암호화된pw을 가지고 해당 유저를 찾습니다.
    result = db.userinfo.find_one({'id': id_receive, 'pw': pw_hash})
    print(result)
    # 찾으면 JWT 토큰을 만들어 발급합니다.
    if result is not None:
        payload = {
            'id': id_receive,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)
        }
        mytoken = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
        # token을 줍니다.
        return jsonify({'result': 'success', 'token': mytoken})
        # 찾지 못하면
    else:
        return jsonify({'result': 'fail', 'msg': '아이디/비밀번호가 일치하지 않습니다.'})


@app.route('/api/netflixView', methods=['GET'])
def nexflexcrawling():
    urlNet = 'https://search.naver.com/search.naver?where=nexearch&sm=tab_etc&mra=bkdJ&qvt=0&query=%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4%20%EC%B6%94%EC%B2%9C'
    dataNet = requests.get(urlNet, headers=headers)
    soupNet = BeautifulSoup(dataNet.text, 'html.parser')

    N_count = 1
    title_list = []
    for rrr in range(8):
        title = \
            soupNet.select_one(
                f'#mflick > div > div > ul:nth-child(1) > li:nth-child({N_count}) > div.thumb_area > a > img')[
                'src']
        title_list.append(title)
        N_count += 1
    return jsonify({'Netflixvar': title_list})

@app.route('/api/watchaView')
def watchacrawling():
    urlwat = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%99%93%EC%B0%A8+%EC%B6%94%EC%B2%9C&oquery=%EB%84%B7%ED%94%8C%EB%A6%AD%EC%8A%A4+%EC%B6%94%EC%B2%9C&tqi=h3nPpdprvxsssS6jd4CssssstSK-281209'
    datawat = requests.get(urlwat, headers=headers)
    soupWat = BeautifulSoup(datawat.text, 'html.parser')

    w_count = 1
    title_list = []
    for rrr in range(8):
        title = \
            soupWat.select_one(
                f'#mflick > div > div > ul:nth-child(1) > li:nth-child({w_count}) > div.thumb_area > a > img')[
                'src']
        title_list.append(title)
        w_count += 1
    return jsonify({'watchavar': title_list})

@app.route('/api/wavveView')
def wavvecrawling():
    urlWav = 'https://search.naver.com/search.naver?sm=tab_hty.top&where=nexearch&query=%EC%9B%A8%EC%9D%B4%EB%B8%8C+%EC%B6%94%EC%B2%9C&oquery=%EC%99%93%EC%B0%A8+%EC%B6%94%EC%B2%9C&tqi=h3nm1wp0JXVsseo3U3ossssstiN-478837'
    dataWav = requests.get(urlWav, headers=headers)
    soupWav = BeautifulSoup(dataWav.text, 'html.parser')

    V_count = 1
    title_list = []
    for rrr in range(8):
        title = \
            soupWav.select_one(
                f'#mflick > div > div > ul:nth-child(1) > li:nth-child({V_count}) > div.thumb_area > a > img')[
                'src']
        title_list.append(title)
        V_count += 1
    return jsonify({'Wavvevar': title_list})

if __name__ == '__main__':
    app.run('0.0.0.0', port=5555, debug=True)