import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "nextcartlogin.firebaseapp.com",
  projectId: "nextcartlogin",
  storageBucket: "nextcartlogin.firebasestorage.app",
  messagingSenderId: "1070392596455",
  appId: "1:1070392596455:web:4a0f7b00a267b2777fcf42",
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export { auth, provider };
