import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCm7WXpkH8ml1VhA0k1Am1dyT2F5oUbhp8",
    authDomain: "hackathon-28.firebaseapp.com",
    projectId: "hackathon-28",
    storageBucket: "hackathon-28.firebasestorage.app",
    messagingSenderId: "717257205523",
    appId: "1:717257205523:web:40bc104957f8003c739ce6",
    measurementId: "G-27XM1DT9TB"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const db = getFirestore(app);
export { db };