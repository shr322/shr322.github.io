window.addEventListener("load", function () {
  document.querySelector(".main").style.height = screen.height + "px";
  document.querySelector(".main").classList.add('visible')
  // document.querySelector('.user_name').innerHTML = paramValue;
});

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

// 현재 URL에서 파라미터 문자열을 가져옵니다.
const queryString = window.location.search;

// 파라미터 문자열을 객체로 변환합니다.
const urlParams = new URLSearchParams(queryString);

// 특정 파라미터 값을 가져옵니다.
const paramValue = urlParams.get('name');



// 스크롤시 스르륵
window.addEventListener('scroll', function() {
  const elements = document.querySelectorAll('.scroll-element');
  elements.forEach(element => {
    if (element.getBoundingClientRect().top < window.innerHeight) {
      setTimeout(() => {
        element.classList.add('visible');
      }, 100);
    }
  });
});
