// script.js

const database = firebase.database();
const dataInput = document.getElementById('dataInput');
const saveButton = document.getElementById('saveButton');
const dataList = document.getElementById('dataList');

// 데이터 저장 함수
saveButton.addEventListener('click', () => {
  const data = dataInput.value;
  if (data) {
    const newDataRef = database.ref('data').push();
    newDataRef.set({
      text: data
    });
    dataInput.value = '';  // 입력 필드 초기화
  }
});

// 데이터 불러오기 및 실시간 업데이트 함수
database.ref('data').on('value', (snapshot) => {
  dataList.innerHTML = '';  // 기존 데이터 초기화
  snapshot.forEach((childSnapshot) => {
    const dataItem = childSnapshot.val();
    const li = document.createElement('li');
    li.textContent = dataItem.text;
    dataList.appendChild(li);
  });
});
