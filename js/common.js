window.addEventListener("load", function () {
  if (parameterValue == "naver") {
    window.location.href =
      "https://m.map.naver.com/map.naver?lat=37.5222098&lng=127.038892&dlevel=20&mapMode=&pinTitle=더채플앳청담&boundary=&traffic=";
  } else {
    setTimeout(() => {
      document.querySelector(".wrap").classList.add("on");
    }, 500);

    // document.querySelector(".main").style.height = screen.height + "px";
    // document.querySelector('.user_name').innerHTML = paramValue;

    const toggleButtons = document.querySelectorAll(".toggleButton");
    const toggleBoxes = document.querySelectorAll(".toggleBox");
    const toggleItems = document.querySelectorAll(".toggle-item");

    toggleButtons.forEach((button, index) => {
      button.addEventListener("click", () => {
        const toggleBox = toggleBoxes[index];
        const toggleItem = toggleItems[index];
        if (toggleBox.style.maxHeight) {
          toggleBox.style.maxHeight = null;
          toggleItem.classList.remove("open");
        } else {
          toggleBox.style.maxHeight = toggleBox.scrollHeight + "px";
          toggleItem.classList.add("open");
        }
      });
    });

    document.querySelector(".content").style.marginTop =
      document.querySelector(".bg").getBoundingClientRect().top + 200 + "px";
  }

  // 타겟 날짜 설정 (2024년 8월 10일 14시 30분)
  let targetDate = new Date(2024, 07, 10, 14, 30, 00); // 월은 0부터 시작합니다 (8월은 7)
  let display = document.querySelector("#countdownTimer .count");
  startCountdown(targetDate, display);
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return "";
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// 특정 파라미터 값 확인
var parameterValue = getParameterByName("map");

/* naver map */
var elluce = new naver.maps.LatLng(37.5222098, 127.038892);
var map = new naver.maps.Map("map", {
  center: new naver.maps.LatLng(37.5222098, 127.038892),
  zoom: 16,
  minZoom: 8, //지도의 최소 줌 레벨
  zoomControl: true, //줌 컨트롤의 표시 여부
  zoomControlOptions: {
    //줌 컨트롤의 옵션
    position: naver.maps.Position.TOP_RIGHT,
  },
});
var marker = new naver.maps.Marker({
  icon: {
    // url: "./icon/heart-icon.png",
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

  if (document.querySelectorAll(".toast").length > 0) {
    return;
  } else {
    showToast("복사되었습니다.");
  }
}

// 두 자리 숫자로 포맷하는 함수
function pad(number) {
  return number < 10 ? "0" + number : number;
}

// 카운트 다운 함수
function startCountdown(targetDate, display) {
  let interval = setInterval(function () {
    let now = new Date().getTime();
    let distance = targetDate - now;

    if (distance <= 0) {
      clearInterval(interval);
      display.textContent = "이벤트 종료!";
    } else {
      let days = Math.floor(distance / (1000 * 60 * 60 * 24));
      let hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((distance % (1000 * 60)) / 1000);

     
      document.querySelector('#countdownTimer .count').innerHTML =
        pad(days) +
        "<span class='day'>일</span> " +
        pad(hours) +
        " : " +
        pad(minutes) +
        " : " +
        pad(seconds);
    }
  }, 1000);
}

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

// 현재 URL에서 파라미터 문자열을 가져옵니다.
const queryString = window.location.search;

// 파라미터 문자열을 객체로 변환합니다.
const urlParams = new URLSearchParams(queryString);

// 특정 파라미터 값을 가져옵니다.
const paramValue = urlParams.get("name");

// 스크롤시 스르륵
window.addEventListener("scroll", function () {
  const elements = document.querySelectorAll(".scroll-element");
  elements.forEach((element) => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => {
        element.classList.add("visible");
      }, 100);
    }
  });
});

// 발급받은 JavaScript 키로 Kakao API 초기화
Kakao.init("9284b00e9c8c2839ef1752f4ac1ad96e"); // JavaScript 키

document
  .getElementById("add-schedule-btn")
  .addEventListener("click", function () {
    Kakao.Link.sendCustom({
      templateId: 108113, // 템플릿 ID 입력
    });
  });

// 스크롤 이벤트 리스너 추가
window.addEventListener("scroll", function () {
  // 현재 스크롤 위치 가져오기
  var scrollPosition = window.scrollY || document.documentElement.scrollTop;

  document.querySelector(".dim").style.bottom = "-" + scrollPosition + "px";
});

// 버튼 클릭시 모션
heartCount = function () {
  return {
    setConfetti() {
      const canvas1 = document.getElementById("canvas1");
      const configs = [
        {
          angle: 60,
          spread: 55,
          particleCount: randomInRange(50, 100),
          origin: { x: 0, y: 0.8 },
        },
        {
          angle: 120,
          spread: 55,
          particleCount: randomInRange(50, 100),
          origin: { x: 1, y: 0.8 },
        },
      ];

      canvas1.confetti =
        canvas1.confetti || confetti.create(canvas1, { resize: true });

      function randomInRange(min, max) {
        return (Math.random() * (max - min) + min) * 2;
      }

      canvas1.confetti(configs[0]);
      canvas1.confetti(configs[1]);
    },

    shootConfetti() {
      heartCount().setConfetti();
    },
  };
};

// fixed
var scrollLinks = document.querySelectorAll(".scroll-to");

scrollLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    event.preventDefault();
    var targetId = this.getAttribute("href").substring(1);
    var targetElement = document.getElementById(targetId);

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: "smooth" });
    }
  });
});
