import { initializeApp } from "https://www.gstatic.com/firebasejs/12.17.0/firebase-app.js";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  increment,
  collection,
  getDocs,
  addDoc,
serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.17.0/firebase-firestore.js"; 
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBJ76BonEBDjBzaf1mU3k6NMYhg0KZORT4",
    authDomain: "tongkrongan-cah-nom.firebaseapp.com",
    projectId: "tongkrongan-cah-nom",
    storageBucket: "tongkrongan-cah-nom.firebasestorage.app",
    messagingSenderId: "877856191443",
    appId: "1:877856191443:web:d3709956d4b414cb4c3526"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

console.log("Firebase berhasil terhubung");
const formLogin = document.getElementById("formLogin");

formLogin.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login berhasil!");
        tampilkanKomentar();
    } catch (error) {
        alert("Login gagal: " + error.message);
    }
});

onAuthStateChanged(auth, (user) => {
    if (user) {
        tampilkanKomentar();
    }
});

async function tampilkanKomentar() {

    const daftarKomentar = document.getElementById("daftarKomentar");
    daftarKomentar.innerHTML = "";

    const snapshot = await getDocs(collection(db, "Komentar"));

    snapshot.forEach((docSnap) => {

        const data = docSnap.data();

        daftarKomentar.innerHTML += `
        <div class="komentar-admin">
            <h3>${data.post}</h3>
            <b>${data.nama}</b><br>
            <p>${data.komentar}</p>

            <button onclick="hapusKomentar('${docSnap.id}')">
                Hapus
            </button>

            <hr>
        </div>
        `;

    });

}

window.hapusKomentar = async function(id) {

    if (!confirm("Hapus komentar ini?")) return;

    await deleteDoc(doc(db, "Komentar", id));

    alert("Komentar berhasil dihapus");

    tampilkanKomentar();

}
