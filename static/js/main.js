const joinSubmit = document.querySelector("#signSubmitBtn");
const joinSubmitForm = document.querySelector("#signSubmit")
const inputPassword = document.querySelector("#inputPassword");
const checkPassword = document.querySelector("#passwordCheck");

const signUp = () => {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const inputId = document.querySelector("#inputId");
  const fullName = firstName.value + lastName.value

  $.ajax({
    type: "POST",
    url: "/api/join",
    data: {
      name_give: fullName,
      id_give: inputId.value,
      pw_give: password.value,
      nickName_give: "행복한 마동석",
    },
    success: function (response) {
      alert(response["result"]);
      window.location.reload();
    },
  });

};

const submitHandler = (e) => {
  e.preventDefault();
  if(inputPassword.value !== checkPassword.value){
    alert('비밀번호가 일치하지 않습니다!')
    return;
  }
  signUp();
};

joinSubmitForm.addEventListener("submit", submitHandler);
