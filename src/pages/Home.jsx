import '../App.css';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [user, setUser] = useState(null); // State for user data
    const [loading, setLoading] = useState(true); // Loading state
    const navigate = useNavigate();

    useEffect(() => {
        // Get user data from localStorage or Firebase Auth
        try {
            const currentUser = JSON.parse(localStorage.getItem("user"));
            if (!currentUser) {
                navigate("/"); // Redirect to login if no user is found
            } else {
                setUser(currentUser); // Set user data
            }
        } catch (error) {
            console.error("Failed to parse user data:", error);
            navigate("/"); // Redirect to login on error
        } finally {
            setLoading(false); // Stop loading
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("user"); // Remove user from localStorage
        navigate("/"); // Redirect to login
    };

    if (loading) {
        return <div className="loading">Loading...</div>; // Show loading state
    }

    return (
        <div className="home-container">
            <h1>Welcome {user ? user.fullName : "Guest"}</h1>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Home;
