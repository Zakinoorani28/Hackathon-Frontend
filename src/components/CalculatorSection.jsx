// eslint-disable-next-line no-unused-vars
import React from "react";
{/* Loan Calculator Section */ }

const CalculatorSection = () => {


    // Scroll to the loan calculator section
    const handleScrollToCalculator = () => {
        const calculatorSection = document.getElementById('loan-calculator');
        if (calculatorSection) {
            calculatorSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="bg-white py-12">
            <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center">
                {/* Text Section */}
                <div className="md:w-1/2 text-center md:text-left mb-8 md:mb-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Calculate Your Loan</h2>
                    <p className="text-gray-600 mb-6">
                        Use our loan calculator to estimate your monthly payments and plan your financial future.
                    </p>
                    <button
                        onClick={handleScrollToCalculator}
                        className="px-6 py-3 bg-gradient-to-r from-green-400 to-green-600 text-white font-semibold rounded-lg shadow-lg hover:opacity-90">
                        Calculate Loan
                    </button>
                </div>
                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <img
                        src="/src/assets/calculator.png"
                        alt="Loan Calculator"
                        className="rounded-2xl shadow-lg"
                    />
                </div>
            </div>
        </section>
    );
};

export default CalculatorSection;