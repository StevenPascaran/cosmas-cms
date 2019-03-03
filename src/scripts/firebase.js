//import * as _firebase from 'firebase';
var _firebase = require("./scripts/firebase");

  const config = {
// The other Firebase	  
//    apiKey: "AIzaSyDAUAivA4WEEy7D6HkpHBhZV-wlxxyM12o",
//    authDomain: "cosmas-2f2bd.firebaseapp.com",
//    databaseURL: "https://cosmas-2f2bd.firebaseio.com",
//    projectId: "cosmas-2f2bd",
//    storageBucket: "cosmas-2f2bd.appspot.com",
//    messagingSenderId: "143917050684"

// Pharma email Firebase
    apiKey: "AIzaSyCgOk3WYYt613qTjNCGZ3pNdJun8Yp3spQ",
    authDomain: "cosmas-8d860.firebaseapp.com",
    databaseURL: "https://cosmas-8d860.firebaseio.com",
    projectId: "cosmas-8d860",
    storageBucket: "cosmas-8d860.appspot.com",
    messagingSenderId: "42652013706"
  };

const firebase = _firebase.initializeApp(config);

//export default firebase;
module.exports = firebase;