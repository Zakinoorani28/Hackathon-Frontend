// eslint-disable-next-line no-unused-vars
import React from "react";
import { ArrowRight } from "lucide-react";

const LoanCategories = () => {
    const categories = [
        {
            title: "Home Construction",
            description: "Build or renovate your dream home with our flexible construction financing.",
            maxAmount: "PKR 2,000,000",
            duration: "Up to 24 months",
            icon: <span className="text-emerald-600">🏠</span>,
        },
        {
            title: "Education",
            description: "Invest in your future with our education financing solutions.",
            maxAmount: "PKR 1,500,000",
            duration: "Up to 36 months",
            icon: <span className="text-emerald-600">🎓</span>,
        },
        {
            title: "Business Startup",
            description: "Launch your business dreams with our startup funding support.",
            maxAmount: "PKR 2,000,000",
            duration: "Up to 24 months",
            icon: <span className="text-emerald-600">🏢</span>,
        },
        {
            title: "Wedding",
            description: "Make your special day memorable with our wedding financing.",
            maxAmount: "PKR 1,500,000",
            duration: "Up to 18 months",
            icon: <span className="text-emerald-600">💍</span>,
        },
    ];

    return (
        <section className="py-16">
            <h2 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-emerald-600 bg-clip-text text-transparent mb-12">
                Loan Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 px-4 lg:px-0 max-w-5xl mx-auto">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl"
                    >
                        <div className="flex items-center gap-4 mb-4">
                            <div className="p-3 bg-emerald-100 rounded-lg">{category.icon}</div>
                            <h3 className="text-xl font-semibold text-gray-800">
                                {category.title}
                            </h3>
                        </div>
                        <p className="text-gray-600 mb-4">{category.description}</p>
                        <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Maximum Amount:</span>
                                <span className="font-semibold text-gray-800">
                                    {category.maxAmount}
                                </span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-gray-600">Duration:</span>
                                <span className="font-semibold text-gray-800">
                                    {category.duration}
                                </span>
                            </div>
                        </div>
                        <button className="mt-6 w-full flex items-center justify-center gap-2 bg-emerald-600 text-white py-2 px-4 rounded-lg hover:bg-emerald-700 transition-colors">
                            Apply for Loan
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default LoanCategories;
