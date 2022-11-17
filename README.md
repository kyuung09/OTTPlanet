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
- URL : 

## 3. 와이어프레임(초안)
<img width="923" alt="image" src="https://user-images.githubusercontent.com/117708164/202368972-1fee1a1f-0983-42f4-957d-f1735e65cc14.png">

## 4. 기술 스택 
- Frontend : HTML5, CSS3, Bootstrap5.0, JavaScript, Jquery, Ajax
- Backend : Python, Flask , JWT
- DB : MongoDB
- Infrastructure : AWS EC2

## 5. 핵심 기능
(1) 로그인/회원가입
- jwt를 이용한 로그인/로그아웃 
- 회원가입시 입력 정보 유효성 검사
- 회원가입시 랜덤 닉네임 생성 및 저장

(2) OTT Viewer
- OTT 별 (넷플릭스, 웨이브, 왓챠) 금일 인기콘텐츠 데이터 크롤링
- 인기 콘텐츠 카드 출력

(3) 추천 컨텐츠 작성 게시판
- 로그인 시 익명(랜덤 닉네임)으로 게시판 작성 
- OTT별 컨텐츠 추천 글 조회 가능 

## 6. Trouble shooting
<details>
<summary> 로그인 토큰 인증 불가 현상 </summary>
<!--  -->
- 서버에서 토큰이 잘 생성되었음에도 불구하고 클라이언트가 response를 제대로 전달받지 못해서 로그인 안되는 현상이 있었고,
  원인 분석 중 js파일을 기능별로 코드를 구분해 독립된 파일로 만들었더니 해결됨
</details>
<details>
<summary> 추천 컨텐츠 List 불러오기 오류 </summary>
<!--  -->
- DB에 저장된 데이터 불러오기 API 호출시 ajax 내의 URL이 잘못 입력되어, DB에 저장된 화면에 출력되지 않아서 호출 URL을 수정 후 해결
( 예 : /post -> /api/post )
</details>
