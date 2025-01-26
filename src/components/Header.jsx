// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebaseConfig'; // Ensure Firebase authentication is correctly imported
import { signInWithEmailAndPassword } from 'firebase/auth';

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!auth.currentUser); // Check if the user is logged in
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    // Handle user login
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password); // Pass `auth` as the first argument
            if (userCredential.user) {
                setIsLoggedIn(true);
                setShowLoginPopup(false);
                navigate('/dashboard');
            }
        } catch (error) {
            alert('Invalid email or password. Please try again.');
            console.error('Login error:', error);
        }
    };

    // Handle user logout
    const handleLogout = async () => {
        try {
            await auth.signOut();
            setIsLoggedIn(false);
            navigate('/');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Scroll to the loan calculator section
    const handleScrollToCalculator = () => {
        const calculatorSection = document.getElementById('loan-calculator');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Logo and Title */}
                <div className="flex items-center space-x-4">
                    <img
                        src="/logo2.png" // Updated path
                        alt="Saylani Microfinance Logo"
                        className="w-8 h-8"
                    />
                    <span className="text-xl font-semibold text-gray-800">Saylani Microfinance</span>
                </div>

                {/* Buttons */}
                <div className="flex items-center space-x-4">
                    <button
                        onClick={handleScrollToCalculator}
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    >
                        Apply For Loan
                    </button>
                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                            Logout
                        </button>
                    ) : (
                        <button
                            onClick={() => setShowLoginPopup(true)}
                            className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                        >
                            Login
                        </button>
                    )}
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between">
                <button
                    onClick={handleScrollToCalculator}
                    className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors w-full"
                >
                    Apply For Loan
                </button>
                {isLoggedIn ? (
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors w-full ml-2"
                    >
                        Logout
                    </button>
                ) : (
                    <button
                        onClick={() => setShowLoginPopup(true)}
                        className="px-4 py-2 g-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors w-full ml-2"
                    >
                        Login
                    </button>
                )}
            </div>

            {/* Login Popup */}
            {showLoginPopup && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                        <h2 className="text-xl font-semibold mb-4">Login</h2>
                        <form onSubmit={handleLogin}>
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full border rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="password" className="block text-gray-700">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="w-full border rounded-lg px-3 py-2 mt-1"
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setShowLoginPopup(false)}
                                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
