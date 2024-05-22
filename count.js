// Import the necessary functions from the Firebase SDKs
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import { getFirestore, doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAlTPYqFVNOS-uqHaW4JzevfhO10Gi1Zu0",
  authDomain: "mobile-wedding-invitatio-57515.firebaseapp.com",
  projectId: "mobile-wedding-invitatio-57515",
  storageBucket: "mobile-wedding-invitatio-57515.appspot.com",
  messagingSenderId: "455033625085",
  appId: "1:455033625085:web:d71c512b3265f67eb02194",
  measurementId: "G-6WRFTCS8X1"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
