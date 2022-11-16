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

function show_mainN() {
  $.ajax({
    type: "GET",
    url: "/api/netflixView",
    data: {},
    success: function (response) {
      let rows = response["Netflixvar"];
      for (let i = 0; i < rows.length; i++) {
        let img = rows[i];
        let temp_html = `<div class="swiper-slide">
        <div class="inside-cont">
          <img src="${img}" />
        </div>
      </div>`;
        $("#Netflix").append(temp_html);
      }
      const swiper = new Swiper(".slide1", {
        slidesPerView: 3,
        spaceBetween: 30,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
    },
  });
}

function open_box1() {
  $(".slide1").show();
  $(".slide2").hide();
  $(".slide3").hide();
}
function open_box2() {
  $.ajax({
    type: "GET",
    url: "/api/wavveView",
    data: {},
    success: function (response) {
      let rows = response["Wavvevar"];
      for (let i = 0; i < rows.length; i++) {
        let img = rows[i];
        let temp_html = `<div class="swiper-slide">
        <div class="inside-cont">
          <img src="${img}" />
        </div>
      </div>`;
        $("#Wavve").append(temp_html);
      }
      const swiper = new Swiper(".slide2", {
        slidesPerView: 3,
        spaceBetween: 30,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      $(".slide1").hide();
      $(".slide2").show();
      $(".slide3").hide();
    },
  });
}

function open_box3() {
  $.ajax({
    type: "GET",
    url: "/api/watchaView",
    data: {},
    success: function (response) {
      let rows = response["watchavar"];
      for (let i = 0; i < rows.length; i++) {
        let img = rows[i];
        let temp_html = `<div class="swiper-slide">
        <div class="inside-cont">
          <img src="${img}" />
        </div>
      </div>`;
        $("#Watcha").append(temp_html);
      }
      const swiper = new Swiper(".slide3", {
        slidesPerView: 3,
        spaceBetween: 30,

        pagination: {
          el: ".swiper-pagination",
          clickable: true,
        },
        navigation: {
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        },
      });
      $(".slide1").hide();
      $(".slide2").hide();
      $(".slide3").show();
    },
  });
}

$(document).ready(function () {
  show_comment("showAll");
  open_box1();
  show_mainN();
});
