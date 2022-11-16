const nickNames = {
  adjective: [
    "귀여운",
    "깜찍한",
    "눈물 흘리는",
    "사나운",
    "친절한",
    "친밀한",
    "행복한",
    "사랑스러운",
    "매서운",
    "화려한",
    "조용한",
    "수줍은",
    "겸손한",
    "느긋한",
    "신중한",
    "솔직한",
    "공손한",
    "대담한",
  ],
  noun: [
    "마동석",
    "이종석",
    "이동욱",
    "이영애",
    "다니엘 헤니",
    "강동원",
    "김옥빈",
    "김소연",
    "김혜수",
    "공효진",
    "신하균",
    "조승우",
    "여진구",
    "이범수",
    "송강호",
    "윤여정",
    "한예리",
    "한소희",
    "송강",
    "박서준",
    "서강준",
    "배수지",
    "전지현",
  ],
};

const inputIsValid = (first, last, id, pw, pwCheck) => {
  if (pw !== pwCheck) {
    alert("비밀번호가 일치하지 않습니다!");
    return false;
  } else if (first && last && id && pw && pwCheck && pw === pwCheck) {
    return true;
  } else {
    alert("빈 칸을 모두 입력해주세요!");
    return false;
  }
};

const makeRandomNum = (length) => {
  const num = Math.floor(Math.random() * length);
  return num !== 0 ? num - 1 : num;
};

const makeRandomNick = () => {
  const adjective = nickNames["adjective"];
  const noun = nickNames["noun"];

  const adjIdx = makeRandomNum(adjective.length);
  const nounIdx = makeRandomNum(noun.length);
  const range = String(makeRandomNum(101)).padStart(3, "0");

  const randomNick = `${adjective[adjIdx]} ${noun[nounIdx]}_${range}`;
  return randomNick;
};

const signUp = () => {
  const firstName = document.querySelector("#firstName").value;
  const lastName = document.querySelector("#lastName").value;
  const joinId = document.querySelector("#joinId").value;
  const joinPassword = document.querySelector("#joinPassword").value;
  const checkPassword = document.querySelector("#passwordCheck").value;
  const fullName = firstName + lastName;
  const nickname = makeRandomNick();

  const isValid = inputIsValid(
    firstName,
    lastName,
    joinId,
    joinPassword,
    checkPassword
  );

  if (isValid) {
    $.ajax({
      type: "POST",
      url: "/api/join",
      data: {
        name_give: fullName,
        id_give: joinId,
        pw_give: joinPassword,
        nickName_give: nickname,
      },
      success: function (response) {
        alert(response["result"]);
        location.href = "/login";
      },
    });
  } else {
    return;
  }
};

const joinSubmitForm = document.querySelector("#signSubmit");
const submitHandler = (e) => {
  e.preventDefault();
  signUp();
};
joinSubmitForm.addEventListener("submit", submitHandler);
