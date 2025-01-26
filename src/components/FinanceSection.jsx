// eslint-disable-next-line no-unused-vars
import React from "react";

const FinanceSection = () => {
    return (
        <section className="bg-blue-50 py-12">
            <div className="max-w-6xl mx-auto text-center">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Why Choose Us?</h2>
                <p className="text-gray-600 mb-8">
                    Discover our tailored financial solutions based on Islamic principles.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Instant Payment */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <div className="text-4xl text-green-500 mb-4">💸</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Instant Payment</h3>
                        <p className="text-gray-500 text-sm">
                            Receive your funds instantly without any delays, enabling you to meet your financial needs promptly.
                        </p>
                    </div>
                    {/* Qarza-e-Hasna */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <div className="text-4xl text-blue-500 mb-4">🤝</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Qarza-e-Hasna</h3>
                        <p className="text-gray-500 text-sm">
                            Access interest-free loans (Qarza-e-Hasna) to support your financial goals without compromising your values.
                        </p>
                    </div>
                    {/* Ethical Investments */}
                    <div className="bg-white p-6 rounded-2xl shadow-lg flex flex-col items-center text-center">
                        <div className="text-4xl text-yellow-500 mb-4">🌿</div>
                        <h3 className="text-lg font-semibold text-gray-700 mb-2">Ethical Investments</h3>
                        <p className="text-gray-500 text-sm">
                            Partner with us for Sharia-compliant and socially responsible investment opportunities.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FinanceSection;
