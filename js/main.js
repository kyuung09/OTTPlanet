const joinSubmit = document.querySelector("#signSubmitBtn");

const randomNick = async () => {
  const loadNickName = await fetch("/api/");
  return;
};

const signUp = async () => {
  const firstName = document.querySelector("#firstName");
  const lastName = document.querySelector("#lastName");
  const inputId = document.querySelector("#inputId");
  const password = document.querySelector("#inputPassword");

  try {
    const response = await fetch("/api/member", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        name_give: firstName.value + lastName.value,
        id_give: address.value,
        size_give: inputId.value,
        nickName_give: pricePerSize,
      },
    });
    if (!response.ok) {
      throw new Error("오류오류오류");
    }
  } catch (error) {}

  // 1.  받아와서

  // $.ajax({
  //   type: "POST",
  //   url: "/mars",
  //   data: {
  //     name_give: name.value,
  //     address_give: address.value,
  //     size_give: size.value,
  //     pricePerSize_give: pricePerSize,
  //   },
  //   success: function (response) {
  //     alert(response["msg"]);
  //     window.location.reload();
  //   },
  // });
};

const submitHandler = (e) => {
  e.preventDefault();
  signUp();
};

joinSubmit.addEventListener("submin", submitHandler);
