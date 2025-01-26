// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
// import LoanCalculator from "./LoanCalculator";

const Header = () => {
    // const [isLoanCalculatorOpen, setIsLoanCalculatorOpen] = useState(false);


    return (
        <header className="bg-white shadow-md p-4">
            <div className="container mx-auto flex items-center justify-between">
                {/* Left side: Logo and Text */}
                <div className="flex items-center space-x-4">
                    <img src="/src/assets/logo2.png" alt="Saylani Microfinance Logo" className="w-8 h-8" />
                    <span className="text-xl font-semibold text-gray-800">Saylani Microfinance</span>
                </div>

                {/* Right side: Buttons */}
                <div className="flex space-x-4">
                    <button
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors"
                    // onClick={() => setIsLoanCalculatorOpen(true)}
                    >
                        Apply For Loan
                    </button>
                </div>
            </div>

            {/* Loan Calculator Component
            {isLoanCalculatorOpen && (
                <LoanCalculator onClose={() => setIsLoanCalculatorOpen(false)} />
            )} */}
        </header>
    );
};

export default Header;
