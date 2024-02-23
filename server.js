const express = require('express');
const { initializeApp, database } = require('firebase-admin');
const database = require('firebase/database')
const app_express = express()

// Import the functions you need from the SDKs you need
const firebaseConfig = {
    apiKey: "AIzaSyCkDL6o5zIadycIqJoROr48mqUB3EkZab0",
    authDomain: "mikutoys-d47de.firebaseapp.com",
    databaseURL: "https://mikutoys-d47de-default-rtdb.firebaseio.com",
    projectId: "mikutoys-d47de",
    storageBucket: "mikutoys-d47de.appspot.com",
    messagingSenderId: "453934610008",
    appId: "1:453934610008:web:a2f61888e5672d01773c2d"
  };
  
  // Initialize Firebase
const app = initializeApp('')
// Initialize Firebase
var db = database()



const dbRef = 
app_express.use(express.static('public'))

app_express.listen(4000,() => {
    console.log("Listening on 4000");
})
