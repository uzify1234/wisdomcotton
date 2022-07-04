
import firebase from 'firebase';
var mode = "test";
var firebaseConfig = {};

 firebaseConfig = {
    apiKey: "AIzaSyACaKVGK-dV0N0h44jyY4yhsvu2xfejQeQ",
  authDomain: "wisdomcotton-2b752.firebaseapp.com",
  projectId: "wisdomcotton-2b752",
  storageBucket: "wisdomcotton-2b752.appspot.com",
  messagingSenderId: "208085998746",
  appId: "1:208085998746:web:1a8c0ee7b8de1c56f99323",
  measurementId: "G-NYXHW3ES5K"
  };


  const firebaseApp =  firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const storage = firebaseApp.storage();


  export { storage , firebaseApp };
  export default db;