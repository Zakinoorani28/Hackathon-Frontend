// eslint-disable-next-line no-unused-vars
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { getDocs, collection, query, where, updateDoc, doc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig'; // Ensure Firebase Auth is imported for user info

const Dashboard = () => {
    const [loanApplications, setLoanApplications] = useState([]);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    // Fetch the current user
    useEffect(() => {
        const currentUser = auth.currentUser;
        if (currentUser) {
            setUser(currentUser);
        } else {
            navigate('/'); // Redirect to login/landing page if user is not logged in
        }
    }, [navigate]);

    // Fetch loan applications for the current user
    useEffect(() => {
        if (user) {
            const fetchLoanApplications = async () => {
                try {
                    const loanQuery = query(
                        collection(db, 'loanApplications'),
                        where('email', '==', user.email) // Filter by logged-in user's email
                    );
                    const querySnapshot = await getDocs(loanQuery);
                    const applications = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
                    setLoanApplications(applications);
                } catch (error) {
                    console.error('Error fetching loan applications:', error);
                    alert('Error fetching your loan applications. Please try again.');
                }
            };

            fetchLoanApplications();
        }
    }, [user]);

    // Mark a loan application as complete
    const markAsComplete = async (id) => {
        try {
            const applicationRef = doc(db, 'loanApplications', id);
            await updateDoc(applicationRef, { status: 'Complete' });
            setLoanApplications((prevApplications) =>
                prevApplications.map((app) => (app.id === id ? { ...app, status: 'Complete' } : app))
            );
            alert('Application marked as complete!');
        } catch (error) {
            console.error('Error updating application status:', error);
            alert('Failed to update application status. Please try again.');
        }
    };

    return (
        <div className="min-h-screen flex flex-col">
            {/* Header */}
            <Header />

            <main className="flex-grow container mx-auto px-4 py-8">
                <h1 className="text-3xl font-semibold text-center mb-6">
                    Welcome to Your Dashboard, {user?.displayName || 'User'}!
                </h1>

                {loanApplications.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {loanApplications.map((application) => (
                            <div
                                key={application.id}
                                className="bg-white p-6 rounded-lg shadow-lg flex flex-col justify-between"
                            >
                                <div>
                                    <h2 className="text-xl font-semibold mb-2">Application ID: {application.id}</h2>
                                    <p><strong>Amount:</strong> {application.amount}</p>
                                    <p><strong>Duration:</strong> {application.duration} months</p>
                                    <p><strong>Category:</strong> {application.category}</p>
                                    <p><strong>Sub-Category:</strong> {application.subCategory}</p>
                                    <p><strong>Email:</strong> {application.email}</p>
                                    <p><strong>CNIC:</strong> {application.cnic}</p>
                                    <p><strong>Initial Deposit:</strong> {application.initialDeposit}</p>
                                    <p><strong>Monthly Payment:</strong> {application.monthlyPayment}</p>
                                    <p><strong>Status:</strong> {application.status || 'Pending'}</p>
                                </div>
                                {application.status !== 'Complete' && (
                                    <button
                                        onClick={() => markAsComplete(application.id)}
                                        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                                    >
                                        Complete Application
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-600">No loan applications found for your account.</p>
                )}
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Dashboard;
