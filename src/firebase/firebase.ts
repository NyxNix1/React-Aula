import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBzFMjxlVFBSrub9u_hBBgvKUoLgwETjck",
  authDomain: "book-api-81100.firebaseapp.com",
  projectId: "book-api-81100",
  storageBucket: "book-api-81100.firebasestorage.app",
  messagingSenderId: "330351993039",
  appId: "1:330351993039:web:cc7b2f2a5a2b91138997ba"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export {app, auth};
export default firebaseConfig;
