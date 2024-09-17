import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged,
  signOut,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  getDoc,
  doc,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyDRlMcueBbYNxodiCw3UiGh9NQhsVTZWco",
  authDomain: "auth-form-396fd.firebaseapp.com",
  projectId: "auth-form-396fd",
  storageBucket: "auth-form-396fd.appspot.com",
  messagingSenderId: "632287134712",
  appId: "1:632287134712:web:0e3df534fb6544951a8c0d",
};

const app = initializeApp(firebaseConfig);

function showMessage(message, divId) {
  var messageDiv = document.getElementById(divId);
  messageDiv.style.display = "block";
  messageDiv.innerHTML = message;
  messageDiv.style.opacity = 1;
  setTimeout(function () {
    messageDiv.style.opacity = 0;
  }, 5000);
}

const auth = getAuth();
const db = getFirestore();

onAuthStateChanged(auth, (user) => {
  const loggedInUserId = localStorage.getItem("loggedInUserId");
  if (loggedInUserId) {
    const docRef = doc(db, "users", loggedInUserId);
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const userData = docSnap.data();
          document.querySelector("h5").innerHTML = userData.name;
        } else {
          showMessage("User not found", "signUpMessage");
        }
      })
      .catch((error) => {
        console.log("error", error);
      });
  } else {
    console.log("User not found");
  }
});

const logoutButton = document.getElementById("logOut");
logoutButton.addEventListener("click", (e) => {
  localStorage.removeItem("loggedInUserId");
  signOut(auth)
    .then(() => {
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.log("error", error);
    });
});
