import {
  getFirestore,
  doc,
  setDoc,
  getDoc,
} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js";

const auth = getAuth();

const db = getFirestore();

export async function processForm() {
  let din = document.getElementById("din").value.trim();
  console.log("DIN Value:", din);

  if (!din) {
    console.error("DIN is empty or invalid.");
    return;
  }

  try {
    await setDoc(doc(db, "drugs", din), {
      variant: document.getElementById("variant").value,
      generic_name: document.getElementById("generic_name").value,
      trade_name: document.getElementById("trade_name").value,
      price: "$" + document.getElementById("price").value,
      type: document.getElementById("type").value,
      amount: document.getElementById("amount").value,
      q_med1: document.getElementById("q_med1").value,
      q_med2: document.getElementById("q_med2").value,
    });
    window.location.href = "pharm-dashboard.html";
  } catch (error) {
    console.error("Error writing document: ", error);
  }
}

export async function populateForm() {
  let din = document.getElementById("din").value.trim();
  console.log("DIN Value:", din);

  if (!din) {
    console.error("DIN is empty or invalid.");
    return;
  }

  try {
    let docRef = doc(db, "drugs", din);
    let docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      let data = docSnap.data();
      document.getElementById("variant").value = data.variant;
      document.getElementById("generic_name").value = data.generic_name;
      document.getElementById("trade_name").value = data.trade_name;
      document.getElementById("price").value = data.price.replace("$", "");
      document.getElementById("type").value = data.type;
      document.getElementById("amount").value = data.amount;
      document.getElementById("q_med1").value = data.q_med1;
      document.getElementById("q_med2").value = data.q_med2;
    } else {
      alert("Error: DIN not in the system. Try again.");
    }
  } catch (error) {
    console.error("Error getting document: ", error);
  }
}

window.processForm = processForm;
window.populateForm = populateForm;
