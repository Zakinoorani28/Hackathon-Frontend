// eslint-disable-next-line no-unused-vars
import React from 'react';
import { ChevronRight } from "lucide-react";

const HeroSection = () => {

    // Scroll to the loan calculator section
    const handleScrollToCalculator = () => {
        const calculatorSection = document.getElementById('loan-calculator');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <header className="relative bg-blue-50 text-white">
            <div className="container mx-auto px-4 py-16 text-center">
                <h1 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-emerald-400 drop-shadow-lg">
                    Saylani Microfinance
                </h1>

                <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
                    Empowering Communities Through Qarze Hasana
                </h2>
                <p className="text-lg md:text-xl text-black mb-8">
                    Easy microfinance solutions to help you achieve your dreams with interest-free loans.
                </p>

                <button
                    onClick={handleScrollToCalculator}
                    className="bg-gradient-to-r from-emerald-600 to-emerald-400 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:from-emerald-500 hover:to-emerald-300 transition-colors mx-auto">
                    Apply For Loan
                    <ChevronRight className="w-5 h-5" />

                </button>
            </div>
        </header>
    );
};

export default HeroSection;



