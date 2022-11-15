import requests
from flask import Flask, render_template, request, jsonify, redirect, url_for

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
    token_receive = request.cookies.get('mytoken')
    try:
        payload = jwt.decode(token_receive, SECRET_KEY, algorithms=['HS256'])
        user_info = db.userinfo.find_one({"id": payload['id']})
        return render_template('index.html')
    except jwt.ExpiredSignatureError:
        return redirect(url_for("login", msg="로그인 시간이 만료되었습니다."))
    except jwt.exceptions.DecodeError:
        return redirect(url_for("login", msg="로그인 정보가 존재하지 않습니다."))



@app.route('/api/join', methods=['POST'])
def api_register():
    name_receive = request.form['name_give']
    id_receive = request.form['id_give']
    pw_receive = request.form['pw_give']
    nickName_receive = request.form['nickName_give']
    db.userinfo.insert_one({'name':name_receive, 'id': id_receive, 'pw': pw_receive, 'nickName' : nickName_receive})

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


if __name__ == '__main__':
    app.run('0.0.0.0', port=5555, debug=True)