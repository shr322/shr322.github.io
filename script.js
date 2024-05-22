document.addEventListener('DOMContentLoaded', (event) => {
  const heartButton = document.getElementById('heartButton');
  const heartCount = document.getElementById('heartCount');
  
  // Initialize count from Firestore
  let count = 0;
  db.collection('counts').doc('heartCount').get().then((doc) => {
    if (doc.exists) {
      count = doc.data().value;
      heartCount.textContent = count;
    }
  });

  heartButton.addEventListener('click', () => {
    count++;
    heartCount.textContent = count;
    db.collection('counts').doc('heartCount').set({ value: count });
  });
});
