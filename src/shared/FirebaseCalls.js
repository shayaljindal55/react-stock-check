import firebase from "firebase/app";
import "firebase/firestore";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: "AIzaSyC5Ui3z1E5TwmXJ2_U7kbVqJOWuiIOJR0c",
    authDomain: "stocks-check-a8a64.firebaseapp.com",
    projectId: "stocks-check-a8a64",
    storageBucket: "stocks-check-a8a64.appspot.com",
    messagingSenderId: "343161897193",
    appId: "1:343161897193:web:29b48f483849b3f8207078",
    measurementId: "G-8P91X7L3J5",
  });
} else {
  firebase.app(); // if already initialized, use that one
}
const firestore = firebase.firestore();
const collectionRef = firestore.collection("stocks-watchlist");


export { firestore, collectionRef };
