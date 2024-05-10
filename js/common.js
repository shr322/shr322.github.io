window.addEventListener("load", function () {
  document.querySelector(".main").style.height = window.innerHeight + "px";

  setTimeout(() => {
    document.body.classList.add("on");
  }, 2000);

  document.querySelector('.user_name').innerHTML = paramValue;
});

const wrap = document.querySelector("#wrap");
const btns = wrap.querySelectorAll("#nav li ");
const boxs = wrap.querySelectorAll(".cont");
const activeClass = "on";

let posArr = null;
let enableClick = true;

// 버튼 on index 값
function activeIndex() {
  for (let i = 0; i < btns.length; i++) {
    if (btns[i].classList.contains(activeClass)) {
      return i;
    }
  }
}

// 동작 함수
function bindingEvent() {
  setPos();

  // 버튼 클릭 시
  btns.forEach(function (el, i) {
    el.addEventListener("click", function () {
      const isOn = el.classList.contains(activeClass);

      if (enableClick && !isOn) {
        enableClick = false;
        moveScroll(i);
      } else {
        moveScroll(i);
      }
    });
  });

  // 브라우져 스크롤 시
  window.addEventListener("scroll", function (e) {
    e.preventDefault();

    // 구름
    // document.querySelector(".cloud1").style.left = `${
    //   (50 + window.scrollY) / 5
    // }px`;
    // document.querySelector(".cloud2").style.right = `${window.scrollY / 2}px`;
    // document.querySelector(".cloud3").style.left = `${
    //   (1000 + window.scrollY) / 10
    // }px`;

    let scroll = window.scrollY;
    activation(scroll);
  });
}

// posArr 배열에 각 section에 offsetTop 값 구하기.
function setPos() {
  posArr = [];
  boxs.forEach(function (el, i) {
    posArr.push(el.offsetTop);
  });
}

// 윈도우 스크롤 시 저장해서 마우스 휠 할때 실행
function moveScroll(i) {
  window.scroll({
    behavior: "smooth",
    top: posArr[i],
  });
  enableClick = true;
}

// 브라우져 스크롤 시 posArr에 담긴 값이랑 브라우져 높이 값이랑 비교해서 버튼에 클래스 수정
function activation(scroll) {
  for (let i = 0; i < btns.length; i++) {
    if (scroll >= posArr[i] - 200) {
      for (let j = 0; j < btns.length; j++) {
        btns[j].classList.remove(activeClass);
      }
      btns[i].classList.add(activeClass);
    }
  }
}

bindingEvent();

/* 이미지 */
const swiper = new Swiper(".swiper", {
  loop: false,
  pagination: {
    el: ".swiper-pagination",
    type: "fraction",
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// function setScreenSize() {
//   let vh = window.innerHeight * 0.01;

//   document.documentElement.style.setProperty("--vh", `${vh}px`);
// }

// setScreenSize();

/* 상단 타이핑 */
// const content = "심형래❤김수지";
// const text = document.querySelector(".text");
// let i = 0;

// function typing() {
//   if (i < content.length) {
//     let txt = content.charAt(i);
//     text.innerHTML += txt;
//     i++;
//   }
// }

// setInterval(typing, 200);

/* naver map */
var elluce = new naver.maps.LatLng(37.5222098, 127.038892);
var map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5222098, 127.038892),
  zoom: 17,
  minZoom: 8, //지도의 최소 줌 레벨
  zoomControl: false, //줌 컨트롤의 표시 여부
  zoomControlOptions: {
    //줌 컨트롤의 옵션
    position: naver.maps.Position.TOP_RIGHT,
  },
});
var marker = new naver.maps.Marker({
  icon: {
    url: "./icon/heart-icon.png",
    scaledSize: new naver.maps.Size(30, 37),
    origin: new naver.maps.Point(0, 0),
  },
  position: elluce,
  map: map,
});

var contentString = [
  '<div class="iw_inner" style="padding: 5px 0;width: 100%;height: 100%;display: flex;box-sizing: border-box;flex-wrap: wrap;align-items: center;justify-content: center;">',
  '   <p style="foint-size: 2rem;margin: 0;font-weight: bold;">더채플앳청담</p>',
  '   <p style="font-size: 0.8rem; margin: 0;">서울 강남구 선릉로 757</p>',
  "</div>",
].join("");

var infowindow = new naver.maps.InfoWindow({
  content: contentString,
  maxWidth: 200,
  height: 50,
  backgroundColor: "white",
  borderColor: "black",
  borderWidth: 2,
  disableAnchor: true,
  textAlign: "center",
  margin: "auto",

  pixelOffset: new naver.maps.Point(0, -5),
});

naver.maps.Event.addListener(marker, "click", function (e) {
  if (infowindow.getMap()) {
    infowindow.close();
  } else {
    infowindow.open(map, marker);
  }
});

infowindow.open(map, marker);

/* 복사하기 */
function copyToClipboard(elementId) {
  var text = elementId;
  var tempTextArea = document.createElement("textarea");
  tempTextArea.value = text;
  document.body.appendChild(tempTextArea);
  tempTextArea.select();
  document.execCommand("copy");
  document.body.removeChild(tempTextArea);
  // alert("계좌번호가 복사되었습니다.");
  showToast("계좌번호가 복사되었습니다.");
}

/* 디데이 */
function marrayDay() {
  var countDownDate = new Date("2024/08/10").getTime();
  var now = new Date().getTime();
  var timeLeft = countDownDate - now;
  var days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) + 1;

  // 화면에 표시
  document.getElementById("countdownTimer").innerHTML = days + "일 ";

  // 당일
  if (days === 0) {
    document.getElementById("countdownTimer").innerHTML = "D-DAY";
  }

  // 당일
  if (days < 0) {
    document.getElementById("countdownTimer").innerHTML =
      "축하해 주셔서 감사합니다.";
  }
}

marrayDay();

/* 토스트팝업 */
function showToast(message) {
  // 토스트 팝업 요소 생성
  var toast = document.createElement("div");
  toast.classList.add("toast");

  // 토스트 팝업에 메시지 설정
  toast.textContent = message;

  // 토스트 팝업을 body 요소에 추가
  document.body.appendChild(toast);

  // 5초 후에 토스트 팝업 제거
  setTimeout(function () {
    document.body.removeChild(toast);
  }, 3000);
}

// 스크롤 이벤트를 차단하는 함수
function preventScroll(event) {
  event.preventDefault();
}

// 스크롤 이벤트 리스너 추가하여 스크롤 차단
function disableScroll() {
  document.body.addEventListener('touchmove', preventScroll, { passive: false });
  document.body.addEventListener('mousewheel', preventScroll, { passive: false });
}

// 스크롤 이벤트 리스너 제거하여 스크롤 활성화
function enableScroll() {
  document.body.removeEventListener('touchmove', preventScroll);
  document.body.removeEventListener('mousewheel', preventScroll);
}


$(".galley li").on("click", function () {
  let index = $(this).index();
  console.log(index);
  $(".popup").show();
  swiper.slideTo(index);
  $("body").addClass("pop");

  disableScroll()

});

$(".close").on("click", function () {
  $(".popup").hide();
  $("body").removeClass("pop");

  enableScroll()
});


// 현재 URL에서 파라미터 문자열을 가져옵니다.
const queryString = window.location.search;

// 파라미터 문자열을 객체로 변환합니다.
const urlParams = new URLSearchParams(queryString);

// 특정 파라미터 값을 가져옵니다.
const paramValue = urlParams.get('name');
