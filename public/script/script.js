import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import {
  getFirestore,
  setDoc,
  doc,
  getDocs,
  collection,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAZkEX_e4JVah_PZICHeRX1xNR5F3rawdU",
  authDomain: "pharmaelevate-24b3a.firebaseapp.com",
  projectId: "pharmaelevate-24b3a",
  storageBucket: "pharmaelevate-24b3a.appspot.com",
  messagingSenderId: "952711241899",
  appId: "1:952711241899:web:b03619b018469f390f97ee",
  measurementId: "G-WR1YBLEKRJ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

function showMessage(message, divId) {
  const messageDiv = document.getElementById(divId);
  if (messageDiv) {
    messageDiv.style.display = "block";
    messageDiv.innerHTML = message;
    messageDiv.style.opacity = 1;
    setTimeout(function () {
      messageDiv.style.opacity = 0;
    }, 5000);
  } else {
    console.error(`Element with id "${divId}" not found.`);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const signUp = document.getElementById("submit");
  if (signUp) {
    signUp.addEventListener("click", (event) => {
      event.preventDefault();

      const firstName = document.getElementById("firstname").value;
      const lastName = document.getElementById("lastname").value;
      const emailId = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const cpass = document.getElementById("confirmpassword").value;

      if (password !== cpass) {
        showMessage("Passwords do not match", "signUp");
        return;
      }

      createUserWithEmailAndPassword(auth, emailId, password)
        .then((userCredential) => {
          const user = userCredential.user;
          const userData = {
            firstName: firstName,
            lastName: lastName,
            email: emailId,
            password: password,
          };

          showMessage("Account created successfully", "signUp");
          const docRef = doc(db, "users", user.uid);
          setDoc(docRef, userData)
            .then(() => {
              window.location.href = "pharm-dashboard.html";
            })
            .catch((error) => {
              console.error("Error writing document", error);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/email-already-in-use") {
            showMessage("Email address already exists !!", "signUp");
          } else {
            showMessage("Unable to create user", "signUp");
          }
        });
    });
  } else {
    console.error("Sign up button not found.");
  }

  const login = document.getElementById("login_submit");
  if (login) {
    login.addEventListener("click", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          showMessage("Login is successful", "login_msg");
          const user = userCredential.user;
          localStorage.setItem("loggedInUserId", user.uid);
          window.location.href = "pharm-dashboard.html";
        })
        .catch((error) => {
          const errorCode = error.code;
          if (errorCode === "auth/invalid-credential") {
            showMessage("Incorrect Email or Password", "login_msg");
          } else {
            showMessage("Account does not exist", "login_msg");
          }
        });
    });
  } else {
    console.error("Login button not found.");
  }

  // Fetch drugs collection using modular SDK
  const fetchDrugs = async () => {
    try {
      const drugsCollection = collection(db, "drugs");
      const querySnapshot = await getDocs(drugsCollection);
      const drugs = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const update = { id: doc.id, ...data };
        drugs.push(update);
      });
      console.log(drugs);
    } catch (error) {
      console.error("Error fetching drugs:", error);
    }
  };

  fetchDrugs();
});

// Add signOut function
function signOut() {
  firebaseSignOut(auth)
    .then(() => {
      console.log("User signed out successfully.");
      window.location.href = "index.html";
    })
    .catch((error) => {
      console.error("Error signing out:", error);
    });
}

// import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   signInWithEmailAndPassword,
// } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
// import {
//   getFirestore,
//   setDoc,
//   doc,
//   getDocs,
//   collection,
// } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyAZkEX_e4JVah_PZICHeRX1xNR5F3rawdU",
//   authDomain: "pharmaelevate-24b3a.firebaseapp.com",
//   projectId: "pharmaelevate-24b3a",
//   storageBucket: "pharmaelevate-24b3a.appspot.com",
//   messagingSenderId: "952711241899",
//   appId: "1:952711241899:web:b03619b018469f390f97ee",
//   measurementId: "G-WR1YBLEKRJ",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getFirestore(app);
// const auth = getAuth(app);

// function showMessage(message, divId) {
//   const messageDiv = document.getElementById(divId);
//   if (messageDiv) {
//     messageDiv.style.display = "block";
//     messageDiv.innerHTML = message;
//     messageDiv.style.opacity = 1;
//     setTimeout(function () {
//       messageDiv.style.opacity = 0;
//     }, 5000);
//   } else {
//     console.error(`Element with id "${divId}" not found.`);
//   }
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const signUp = document.getElementById("submit");
//   if (signUp) {
//     signUp.addEventListener("click", (event) => {
//       event.preventDefault();

//       const firstName = document.getElementById("firstname").value;
//       const lastName = document.getElementById("lastname").value;
//       const emailId = document.getElementById("email").value;
//       const password = document.getElementById("password").value;
//       const cpass = document.getElementById("confirmpassword").value;

//       if (password !== cpass) {
//         showMessage("Passwords do not match", "signUp");
//         return;
//       }

//       createUserWithEmailAndPassword(auth, emailId, password)
//         .then((userCredential) => {
//           const user = userCredential.user;
//           const userData = {
//             firstName: firstName,
//             lastName: lastName,
//             email: emailId,
//             password: password,
//           };

//           showMessage("Account created successfully", "signUp");
//           const docRef = doc(db, "users", user.uid);
//           setDoc(docRef, userData)
//             .then(() => {
//               window.location.href = "pharm-dashboard.html";
//             })
//             .catch((error) => {
//               console.error("Error writing document", error);
//             });
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           if (errorCode === "auth/email-already-in-use") {
//             showMessage("Email address already exists !!", "signUp");
//           } else {
//             showMessage("Unable to create user", "signUp");
//           }
//         });
//     });
//   } else {
//     console.error("Sign up button not found.");
//   }

//   const login = document.getElementById("login_submit");
//   if (login) {
//     login.addEventListener("click", (event) => {
//       event.preventDefault();
//       const email = document.getElementById("email").value;
//       const password = document.getElementById("password").value;

//       signInWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//           showMessage("Login is successful", "login_msg");
//           const user = userCredential.user;
//           localStorage.setItem("loggedInUserId", user.uid);
//           window.location.href = "pharm-dashboard.html";
//         })
//         .catch((error) => {
//           const errorCode = error.code;
//           if (errorCode === "auth/invalid-credential") {
//             showMessage("Incorrect Email or Password", "login_msg");
//           } else {
//             showMessage("Account does not exist", "login_msg");
//           }
//         });
//     });
//   } else {
//     console.error("Login button not found.");
//   }

//   // Fetch drugs collection using modular SDK
//   const fetchDrugs = async () => {
//     try {
//       const drugsCollection = collection(db, "drugs");
//       const querySnapshot = await getDocs(drugsCollection);
//       const drugs = [];
//       querySnapshot.forEach((doc) => {
//         const data = doc.data();
//         const update = { id: doc.id, ...data };
//         drugs.push(update);
//       });
//       console.log(drugs);
//     } catch (error) {
//       console.error("Error fetching drugs:", error);
//     }
//   };

//   fetchDrugs();
// });
