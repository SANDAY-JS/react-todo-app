import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const app = firebase.initializeApp({
  apiKey: "AIzaSyA8wz9a0367coXa8zJDaQsJO31xr5Js-ZE",
  authDomain: "payment-management-fe0e5.firebaseapp.com",
  projectId: "payment-management-fe0e5",
  storageBucket: "payment-management-fe0e5.appspot.com",
  messagingSenderId: "218471820021",
  appId: "1:218471820021:web:d86aa062839f3b2b3573bc",
});

export default app;
export const auth = app.auth();
export const db = firebase.firestore();
