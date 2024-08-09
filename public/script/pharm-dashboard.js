// Import the necessary functions from Firebase SDKs
import {
  getFirestore,
  collection,
  getDocs,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

// Firebase configuration
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

function renderTable() {
  const body = document.querySelector("tbody");
  if (!body) {
    console.error("No <tbody> found in the document.");
    return;
  }

  // Clear existing rows
  while (body.firstChild) {
    body.removeChild(body.firstChild);
  }

  // Fetch data from Firestore
  const drugsCollection = collection(db, "drugs");
  getDocs(drugsCollection)
    .then((querySnapshot) => {
      if (querySnapshot.empty) {
        console.log("No matching documents.");
        return;
      }

      querySnapshot.forEach((doc) => {
        const data = doc.data();
        const row = body.insertRow();
        const cells = [];
        for (let i = 0; i < 9; i++) {
          cells[i] = row.insertCell();
        }

        // Define the order of keys in the table
        const keys = [
          "id",
          "trade_name",
          "generic_name",
          "type",
          "variant",
          "amount",
          "q_med1",
          "q_med2",
          "price",
        ];
        cells[0].textContent = doc.id; // Set the "DIN" column to the document ID
        keys.slice(1).forEach((key, index) => {
          cells[index + 1].textContent = data[key] || "";
        });
      });

      console.log("Table rendering complete.");
    })
    .catch((error) => {
      console.error("Error fetching documents: ", error);
    });
}

document.addEventListener("DOMContentLoaded", () => {
  auth.onAuthStateChanged((user) => {
    if (user) {
      renderTable();
    } else {
      window.location.href = "index.html";
    }
  });
});
