const password = document.getElementById("password");
const eyeIcon = document.getElementById("password-visibility");

eyeIcon.onclick = function () {
  if (password.type === "password") {
    password.type = "text";
    eyeIcon.classList.remove("fa-eye");
    eyeIcon.classList.add("fa-eye-slash");
  } else {
    password.type = "password";
    eyeIcon.classList.remove("fa-eye-slash");
    eyeIcon.classList.add("fa-eye");
  }
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.1/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.13.1/firebase-auth.js";
import {
  getFirestore,
  setDoc,
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

const signUp = document.getElementById("signUp");

document.addEventListener("DOMContentLoaded", () => {
  const signUp = document.getElementById("signUp");

  if (signUp) {
    signUp.addEventListener("click", (e) => {
      e.preventDefault();
      const email = document.getElementById("rEmail").value;
      const password = document.getElementById("rPassword").value;
      const name = document.getElementById("rName").value;
      const auth = getAuth();
      const db = getFirestore();

      createUserWithEmailAndPassword(auth, email, password, name)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            email: email,
            name: name,
          };
          showMessage("Account created successfully", "signUpMessage");
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "index.html";
            })
            .catch((error) => {
              console.log("error", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email already in use", "signUpMessage");
          } else {
            showMessage("unable to create account", "signUpMessage");
          }
        });
    });
  } else {
    console.error('Element with id "signUp" not found.');
  }
});

const signIn = document.getElementById("login");
signIn.addEventListener("click", (e) => {
  e.preventDefault();
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const auth = getAuth();

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      showMessage("Login successful", "signInMessage");
      const user = userCredential.user;
      localStorage.setItem("loggedInUserId", user.uid);
      window.location.href = "status.html";
    })
    .catch((error) => {
      const errorCode = error.code;
      if (errorCode === "auth/user-not-found") {
        showMessage("User not found", "signInMessage");
      } else if (errorCode === "auth/wrong-password") {
        showMessage("Wrong password", "signInMessage");
      } else {
        showMessage("Unable to login", "signInMessage");
      }
    });
});
