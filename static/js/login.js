const loginSubmitForm = document.querySelector("#loginSubmit");

// login
const login = () => {
  const loginId = document.querySelector("#LoginId").value;
  const loginPassword = document.querySelector("#loginPassword").value;
  console.log(loginId, loginPassword);
  $.ajax({
    type: "POST",
    url: "/api/login",
    data: { id_give: loginId, pw_give: loginPassword },
    success: function (response) {
      if (response["result"] == "success") {
        $.cookie("mytoken", response["token"]);
        alert("로그인!");
        location.href = "/main";
      } else {
        // 로그인이 안되면 에러메시지를 띄웁니다.
        alert(response["msg"]);
      }
    },
  });
};

const loginSubmitHandler = (e) => {
  e.preventDefault();
  login();
};

loginSubmitForm.addEventListener("submit", loginSubmitHandler);
