// Import the functions you need from the SDKs you need
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

const popup =
document.getElementById("popupKomentar");

const tombolKomentar =
document.querySelectorAll(".lihat-komentar");

const tutup =
document.querySelector(".close");

tombolKomentar.forEach(btn=>{

btn.onclick=function(){

const namaPostingan=
btn.dataset.post;

postAktif = namaPostingan;

document.getElementById("judulPopup").innerHTML=
"💬 "+namaPostingan.toUpperCase();

popup.classList.add("active");

}

});

if (tutup) {
    tutup.onclick = function() {
        popup.classList.remove("active");
    }
}


window.onclick=function(e){

if(e.target==popup){

popup.classList.remove("active");

}

}

const stars = document.querySelectorAll(".star");
const popupRating = document.getElementById("popupRating");

let postAktif = "";


tombolKomentar.forEach(btn => {
    btn.addEventListener("click", () => {
        postAktif = btn.dataset.post;
    });
});

stars.forEach((star) => {

    star.addEventListener("click", async () => {

        const nilai = Number(star.dataset.value);

        stars.forEach(s => s.classList.remove("active"));

        for (let i = 0; i < nilai; i++) {
            stars[i].classList.add("active");
        }

        const ref = doc(db, "rating", postAktif);

        const snap = await getDoc(ref);

        let total = 0;
        let jumlah = 0;

        if (snap.exists()) {
            total = snap.data().total || 0;
            jumlah = snap.data().jumlah || 0;
        }

        total += nilai;
        jumlah++;

        await setDoc(ref, {
            total: total,
            jumlah: jumlah
        });

        popupRating.textContent = (total / jumlah).toFixed(1);

        alert("Terima kasih, rating berhasil dikirim ⭐");
    });

});

async function tampilkanRating(idBerita) {

    const ref = doc(db, "rating", idBerita);
    const snap = await getDoc(ref);

    if (snap.exists()) {

        const data = snap.data();

        const rata = data.total / data.jumlah;

        document.querySelector("#rating-" + idBerita).innerHTML =
            "⭐ " + rata.toFixed(1);

    }

}
tampilkanRating("bromo");
tampilkanRating("ngopi");
tampilkanRating("ngopag");

tampilkanLike("bromo");
tampilkanLike("ngopi");
tampilkanLike("ngopag");

const tombolLike = document.querySelectorAll(".like-btn");

tombolLike.forEach((btn) => {

    btn.addEventListener("click", async () => {

        const idPosting = btn.dataset.post;

        const ref = doc(db, "like", idPosting);

        const snap = await getDoc(ref);

        if (snap.exists()) {

            await updateDoc(ref, {
                jumlah: increment(1)
            });

        } else {

            await setDoc(ref, {
                jumlah: 1
            });

        }

        tampilkanLike(idPosting);

    });

});

async function tampilkanLike(idPosting){

    const ref = doc(db,"like",idPosting);

    const snap = await getDoc(ref);

    if(snap.exists()){

        document.querySelector("#like-"+idPosting+" span").textContent =
        snap.data().jumlah;

    }

}

const cari = document.getElementById("cari");
const card = document.querySelectorAll(".card");

cari.addEventListener("keyup", function(){

    const keyword = cari.value.toLowerCase();

    card.forEach(item => {

        const isi = item.innerText.toLowerCase();

        if(isi.includes(keyword)){
            item.style.display = "block";
        }else{
            item.style.display = "none";
        }

    });

});