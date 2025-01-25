import { useState } from "react";
import '../App.css';
import { googleSignIn, emailSignup, emailLogin } from "../auth";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [fullName, setFullName] = useState("");
    const [isSignup, setIsSignup] = useState(false);
    const navigate = useNavigate();

    const handleGoogleSignIn = async () => {
        try {
            const user = await googleSignIn();
            if (user) {
                console.log("Google Sign-In User:", user);
                toast.success("Google Sign-In Successful");
                navigate("/home"); // Navigate to home
            } else {
                throw new Error("Google Sign-In Failed");
            }
        } catch (error) {
            console.error("Google Sign-In Error:", error);
            toast.error(error.message);
        }
    };

    const handleSignup = async () => {
        try {
            const user = await emailSignup(email, password, fullName);
            const token = await user.getIdToken();
            console.log("Signed Up User:", user);

            // Save user to the backend
            const response = await fetch("http://localhost:5000/api/auth/saveUser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    email: user.email,
                    uid: user.uid,
                    fullName: fullName,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to save user to the backend");
            }

            toast.success("Signup Successful!");
            navigate("/home"); // Navigate to home
        } catch (error) {
            console.error("Signup Error:", error);
            toast.error(error.message);
        }
    };

    const handleLogin = async () => {
        try {
            const user = await emailLogin(email, password);
            console.log("Logged In User:", user);
            toast.success("Login Successful!");
            navigate("/home"); // Navigate to home
        } catch (error) {
            console.error("Login Error:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-form">
                <h1>{isSignup ? "Create Account" : "Login"}</h1>
                {isSignup && (
                    <input
                        type="text"
                        placeholder="Full Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                )}
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <div className="auth-buttons">
                    {isSignup ? (
                        <button onClick={handleSignup}>Sign Up</button>
                    ) : (
                        <button onClick={handleLogin}>Login</button>
                    )}
                    <button onClick={handleGoogleSignIn}>Sign In with Google</button>
                </div>
                <p>
                    {isSignup ? (
                        <span>
                            Already have an account? <a onClick={() => setIsSignup(false)}>Login</a>
                        </span>
                    ) : (
                        <span>
                            Do not have an account? <a onClick={() => setIsSignup(true)}>Sign Up</a>
                        </span>
                    )}
                </p>
            </div>
        </div>
    );
};

export default Auth;
