const netBtn = document.querySelector("#Netflix");
const WvBtn = document.querySelector("#Wavve");
const TvBtn = document.querySelector("#Netflix");

const ottSortHandler = (ottName) => {
  show_comment(ottName);
};

function show_comment(ottName) {
  $("#tBox").empty();

  $.ajax({
    type: "GET",
    url: "/api/mainget",
    data: {},
    success: function (response) {
      let rows = response["comments"];
      for (let i = 0; i < rows.length; i++) {
        let nickname = rows[i]["nickname"];
        let ott = rows[i]["ott"];
        let contents = rows[i]["contents"];
        let comment = rows[i]["comment"];
        let temp_html = `<ul>
          <li class='liNick'>${nickname}</li>
          <li class='liOtt'>${ott}</li>
          <li class='liContents'>${contents}</li>
          <li class='liComment'>${comment}</li>
      </ul>`;
        if (ottName === "showAll") {
          $("#tBox").append(temp_html);
        } else if (ott === ottName) {
          $("#tBox").append(temp_html);
        }
      }
    },
  });
}

const getNickname = () => {};

function save_comment() {
  let ott = $("#ott").val();
  let contents = $("#contents").val();
  let comment = $("#comment").val();

  const ottIsValid = ott !== "-- OTT --";
  const contentsIsValid = contents.trim().length !== 0;
  const commentIsValid = comment.trim().length !== 0;

  if (ottIsValid && contentsIsValid && commentIsValid) {
    $.ajax({
      type: "POST",
      url: "/api/mainpost",
      data: {
        ott_give: ott,
        contents_give: contents,
        comment_give: comment,
      },
      success: function (response) {
        if (response["msg"] === "timeOut" || response["msg"] === "invalid") {
          alert("로그인 후 작성하실 수 있습니다!");
          location.href = "/login";
        } else {
          alert("작성 성공!");
          window.location.reload();
        }
      },
    });
  } else {
    alert("값을 모두 입력해주세요!");
  }
}

$(document).ready(function () {
  show_comment("showAll");
});
