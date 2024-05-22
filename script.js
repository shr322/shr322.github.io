import { db } from './index.html';
import { doc, getDoc, setDoc } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js';

document.addEventListener('DOMContentLoaded', (event) => {
  const heartButton = document.getElementById('heartButton');
  const heartCount = document.getElementById('heartCount');
  
  // Initialize count from Firestore
  let count = 0;
  const heartDocRef = doc(db, 'counts', 'heartCount');

  getDoc(heartDocRef).then((docSnap) => {
    if (docSnap.exists()) {
      count = docSnap.data().value;
      heartCount.textContent = count;
    }
  });

  heartButton.addEventListener('click', () => {
    count++;
    heartCount.textContent = count;
    setDoc(heartDocRef, { value: count });
  });
});
