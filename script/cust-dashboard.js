function populateTable() {
    let din = document.getElementById("din").value;
    let db = firebase.firestore();
    let drug = db.collection("drugs").doc(din);

    drug.get().then(function(doc) {
        if (doc.exists) {
            let data = doc.data();
            document.getElementById('q_ott').innerText = data['q_ott'];
            document.getElementById('q_tor').innerText = data['q_tor']
        } else {
            alert("Error: DIN not in the system. Try again.")
        }
    });
    return false;
}

function formAlert() {
    alert("Order submitted. Thank you!")
}

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {

        } else {
            window.location.href = 'index.html';
        }
    });
    var form = document.getElementById("form");
    if (form.attachEvent) {
        form.attachEvent("submit", populateTable());
    } else {
        form.addEventListener("submit", populateTable)
    }
});