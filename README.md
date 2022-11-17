# 프로젝트 소개
## 프로젝트명 : OTT Planet 🪐
### OTT Planet에 방문하셔서 재밌는 콘텐츠 물어가세요❗️

<img width="915" alt="image" src="https://user-images.githubusercontent.com/117708164/202367291-4c15eed9-3834-4e04-a0ba-d0105438598a.png">
http://ottplanet.shop/main

#### 기능 소개 :
- OTT 별 오늘의 화제작 정보를 조회할 수 있습니다.
- 회원가입시 랜덤 닉네임으로 내가 감상한 컨텐츠에 대해 추천 리뷰를 남길 수 있습니다.
- 다른 사용자가 작성한 리뷰 보고 컨텐츠를 추천받을 수 있습니다. 

## 1. 제작 기간 & 팀원 소개
- 제작 기간 : 2022.11.14 ~ 2022.11.16
- 팀원 : 김규리, 신승호, 채하은, 최수빈

## 2. 시연 영상
- [시연 영상](https://www.youtube.com/watch?v=W72owmCVL0U)

## 3. 와이어프레임(초안)
<img width="923" alt="image" src="https://user-images.githubusercontent.com/117708164/202368972-1fee1a1f-0983-42f4-957d-f1735e65cc14.png">

## 4. 기술 스택 
- Frontend : HTML5, CSS3, JavaScript, Jquery, Ajax, Swiper(slide)
- Backend : Python, Flask , JWT, BS4, Datetime, hashlib
- DB : MongoDB
- Infrastructure : AWS EC2

## 5. 핵심 기능
(1) 로그인/회원가입
- jwt를 이용한 로그인/로그아웃 
- 회원가입시 랜덤 닉네임 생성 및 저장

(2) OTT Viewer
- OTT 별 (넷플릭스, 웨이브, 왓챠) 금일 인기콘텐츠 데이터 크롤링
- 인기 콘텐츠 카드 출력

(3) 추천 컨텐츠 작성 게시판
- 로그인 시 익명(랜덤 닉네임)으로 게시판 작성 
- OTT별 컨텐츠 추천 글 작성 및 조회(필터링) 기능 제공  

## 6. Trouble shooting
<details>
<summary> 로그인 토큰 인증 불가 현상 </summary>
<!--  -->
- 서버에서 토큰이 잘 생성되었음에도 불구하고 클라이언트가 response를 제대로 전달받지 못해서 로그인 안되는 현상 발생<br>
  원인 분석 중 js파일을 기능별로 코드를 구분해 독립된 파일로 만들었더니 해결됨
</details>
<details>
<summary> 추천 컨텐츠 List 불러오기 오류 </summary>
<!--  -->
- DB에 저장된 데이터 불러오기 API 호출시 ajax 내의 URL이 잘못 입력되어, DB에 저장된 화면에 출력되지 않아서 호출 URL을 수정 후 해결<br>
( 예 : /post -> /api/post )
</details>
<details>
<summary> 슬라이드 데이터 처리 오류 </summary>
<!--  -->
- 화면 새로고침시 넷플릭스 슬라이드(초기화면)는 정상적으로 출력되고 웨이브/왓챠 탭 버튼을 누르면 슬라이드가 하나 씩만 보이는 현상 발생<br>
- 생각해보니 웨이브와 왓챠 슬라이드는 새로고침과 동시에 생성 되었는데, api 데이터를 받아오는 것은 탭 버튼을 눌렀을 때로 설정되어 있었음<br>
- 슬라이드가 만들어진 뒤에 데이터를 받아와서 에러가 나는 것 같다는 결론을 내고 웨이브/왓챠 버튼을 누를 때, api 데이터를 받아오고,<br>
  그 후에 슬라이드를 생성하는 방식으로 바꾸었더니 정상적으로 출력 됨
</details>
<details>
<summary> 레이아웃 충돌 오류 </summary>
<!--  -->
- 레이아웃 설계시 한 줄 평 작성, 한 줄 평 보여주기 기능이 충돌이 생겼다. <br>
- 기능을 작은 단위로 기능을 따로 작게 나눠야하고, 콘텐츠 클릭 시 어떤 걸 화면에 보여주고 싶은지 명확하게 정의해야하는것을 알게되었다. <br>
-  콘텐츠 영역이 슬라이더 밑에 넣으려고 position:absolute 로 띄웠는데 다른 팀원들 노트북 화면에서 확인시 레이아웃이 엉망이었다. <br>
- 슬라이더 부분을 임시로 div를 만들어놓고 그 밑에 영역을 각각 따로 만들어주고 display flex를 주었더니 해결되었다.
</details>    
<details>
<summary> 동적 크롤링 사용 방법 </summary>
<!--  -->
- 웹 크롤링을 하기위해 selenium, webdriver패키지를 활용한 '동적 크롤링' 을 활용하기로 했다.<br>
- 'pycham' 설정의 인터프리터를 이용한 패키지 설치에서는 'webdriver'가 설치가 안되어 구글링을 해보았다.<br>
- 구글링 히스토리 : <br>
적절한 경로에서 설치가 필요함 > 명령프롬프트 및 파이썬 쉘에서 명령어로 직접설치 > 파이썬 버전이 낮음 > 드라이버 버전이 낮음 > 드라이버 설치에러 > 환경변수 오류로 인한 패키지 설치 오류 > 구글 웹드라이버 설치 > driver = webdriver.Chrome(경로)로 해결!
  </details>
