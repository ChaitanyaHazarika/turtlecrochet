import { initializeApp } from 'https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js'
import { getDatabase, ref, child, get, set } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCkDL6o5zIadycIqJoROr48mqUB3EkZab0",
    authDomain: "mikutoys-d47de.firebaseapp.com",
    databaseURL: "https://mikutoys-d47de-default-rtdb.firebaseio.com",
    projectId: "mikutoys-d47de",
    storageBucket: "mikutoys-d47de.appspot.com",
    messagingSenderId: "453934610008",
    appId: "1:453934610008:web:092e9ad475e2c675773c2d"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dbRef = ref(getDatabase());
const alertButton = document.querySelector('[data-button]')
const contactButton = document.querySelectorAll('[data-contact-button]')
const alertTitle = document.querySelector('[data-heading]')
const alertContent = document.querySelector('[data-content]')
const alert = document.querySelector('.alert')
const bodyHTML = document.querySelector('[data-body-html]')
console.log(alertButton);
console.log(contactButton);
var contacts 
var trans = -50%
await get(child(dbRef, '/Contacts')).then((snapshot) => contacts =snapshot.val())


contactButton.forEach(button =>{
    button.addEventListener('click', (e) =>{
        closeOpenAlert(e.target.getAttribute('value'));
    })
})
function closeOpenAlert(value){
    alertTitle.textContent = `${value}:`
    alertContent.textContent = `${contacts[value]}`
    alert.style.opacity = 1
    bodyHTML.opacity = 0.3

}
alertButton.addEventListener('click', () =>{
    alert.style.opacity = 0
})