// eslint-disable-next-line no-unused-vars
import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen bg-gray-50 p-8">
            <h1 className="text-3xl font-semibold text-center mb-6">Welcome to Your Dashboard!</h1>
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold">Your Loan Information</h2>
                {/* Add more user-specific details here */}
                <p className="mt-4">This is where your loan details would be displayed.</p>
            </div>
        </div>
    );
};

export default Dashboard;
