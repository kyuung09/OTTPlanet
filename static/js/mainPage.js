const netBtn = document.querySelector("#Netflix");
const WvBtn = document.querySelector("#Wavve");
const TvBtn = document.querySelector("#Netflix");

const ottBtnHandler = (ottName) => {
  // 필터 기능....
  // 디폴트 화면 = 넷플이 눌려있는 상태
  // 매개변수로 가져온 ottName이 넷플이라면,
  // 받아온 데이터 중 ott의 이름이 넷플인 것만
  // 리스트를 뽑아줘
};

$(document).ready(function () {
  show_comment();
});

function show_comment() {
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
        $("#tBox").append(temp_html);
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
