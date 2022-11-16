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
        // let nickName = rows[i]['nickName']
        let ott = rows[i]["ott"];
        let contents = rows[i]["contents"];
        let comment = rows[i]["comment"];

        let temp_html = `<ul>
                              <li>${ott}</li>
                              <li>${contents}</li>
                              <li>${comment}</li>
                          </ul>`;

        $("#tBox").append(temp_html);
      }
    },
  });
}

//버튼 눌렀을 때 ott명 보여주기
//   function ottBtnHandler(e){
//     const ott = e.target.innerText; //Netflix, Wavve, Disney+ 출력됨

//     $.ajax({
//         type: 'POST',
//         url: '/main',
//         data: { ott_give: ott},
//            success: function (response) {
//             console.log(response)
//               alert(response['msg'])
//               window.location.reload()
//           }
//       });

//   }

function save_comment() {
  let ott = $("#ott").val();
  let contents = $("#contents").val();
  let comment = $("#comment").val();

  $.ajax({
    type: "POST",
    url: "/api/mainpost",
    data: {
      ott_give: ott,
      contents_give: contents,
      comment_give: comment,
    },
    success: function (response) {
      console.log(response);
      alert(response["msg"]);
      window.location.reload();
    },
  });
}
