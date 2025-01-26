// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { X } from 'lucide-react';
import { db, auth } from '../firebaseConfig'; // Ensure auth is imported
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

export default function RegistrationPopup({ isOpen, onClose, loanDetails, onRegister }) {
    const [cnic, setCnic] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const navigate = useNavigate(); // useNavigate hook

    if (!isOpen) return null;

    const validateCNIC = (value) => {
        return /^\d{13}$/.test(value);
    };

    const validateEmail = (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (!validateCNIC(cnic)) {
            setError('Please enter a valid 13-digit CNIC number');
            return;
        }

        if (!validateEmail(email)) {
            setError('Please enter a valid email address');
            return;
        }

        try {
            setIsSubmitting(true);
            const applicationData = {
                ...loanDetails,
                cnic,
                email: email.trim(),
                status: 'pending',
                createdAt: new Date().toISOString(),
            };

            // Check if the user already exists (sign in with email/password)
            try {
                const userCredential = await signInWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;

                // Fetch user details from Firestore
                const userRef = doc(db, 'loanApplications', user.uid);
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    onRegister(userData);
                }

                navigate('/dashboard'); // Redirect to dashboard after login
            } catch {
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                const user = userCredential.user;
                console.log(user);
                

                await addDoc(collection(db, 'loanApplications'), applicationData);

                setSuccess(true);
                onRegister(cnic, email);
                navigate('/dashboard'); // Redirect to dashboard after signup
            }
        } catch (err) {
            setError('An error occurred. Please try again later.');
            console.error('Error submitting application:', err);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-semibold text-gray-800">Complete Registration</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-500 hover:text-gray-700 transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            CNIC Number
                        </label>
                        <input
                            type="text"
                            value={cnic}
                            onChange={(e) => setCnic(e.target.value.replace(/\D/g, '').slice(0, 13))}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter 13-digit CNIC number"
                            maxLength={13}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Email Address
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Enter your email address"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                            placeholder="Create a password"
                            required
                        />
                    </div>

                    {error && <p className="text-red-600 text-sm">{error}</p>}
                    {success && <p className="text-green-600 text-sm">Registration successful! Redirecting to dashboard...</p>}

                    <div className="bg-gray-50 p-4 rounded-lg">
                        <h3 className="font-semibold text-gray-800 mb-2">Loan Details</h3>
                        <div className="space-y-2 text-sm">
                            <p>
                                <span className="text-gray-600">Category:</span> {loanDetails.category} - {loanDetails.subCategory}
                            </p>
                            <p>
                                <span className="text-gray-600">Amount:</span> Rs. {loanDetails.amount.toLocaleString()}
                            </p>
                            <p>
                                <span className="text-gray-600">Initial Deposit:</span> Rs. {loanDetails.initialDeposit.toLocaleString()}
                            </p>
                            <p>
                                <span className="text-gray-600">Duration:</span> {loanDetails.duration} months
                            </p>
                            <p>
                                <span className="text-gray-600">Monthly Payment:</span> Rs. {loanDetails.monthlyPayment}
                            </p>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className={`w-full flex items-center justify-center gap-2 p-4 rounded-lg font-semibold text-white transition-colors ${isSubmitting ? 'bg-gray-400 cursor-not-allowed' : 'bg-emerald-600 hover:bg-emerald-700'
                            }`}
                    >
                        {isSubmitting ? 'Processing...' : 'Register'}
                    </button>
                </form>
            </div>
        </div>
    );
}

// Prop validation
RegistrationPopup.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    loanDetails: PropTypes.shape({
        category: PropTypes.string.isRequired,
        subCategory: PropTypes.string.isRequired,
        amount: PropTypes.number.isRequired,
        initialDeposit: PropTypes.number.isRequired,
        duration: PropTypes.number.isRequired,
        monthlyPayment: PropTypes.string.isRequired,
    }).isRequired,
    onRegister: PropTypes.func.isRequired,
};
