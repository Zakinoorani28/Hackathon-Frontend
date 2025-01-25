import { GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "./firebaseConfig"; // Firestore initialized from firebaseConfig
import { doc, setDoc } from "firebase/firestore";

// Google Sign-In
export const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    // Save user data in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        email: user.email,
        fullName: user.displayName || "Google User",  // Use display name from Google or default
        createdAt: new Date(),
    });

    return user;
};

export const emailSignup = async (email, password, fullName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    const user = result.user;

    // Save user data in Firestore
    const userRef = doc(db, "users", user.uid);
    await setDoc(userRef, {
        email: user.email,
        fullName: fullName, // Full name passed from frontend
        createdAt: new Date(),
    });

    return user;
};

// Email/Password Login
export const emailLogin = async (email, password) => {
    const result = await signInWithEmailAndPassword(auth, email, password);
    return result.user;
};
