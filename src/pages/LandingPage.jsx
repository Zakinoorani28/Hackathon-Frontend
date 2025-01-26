// src/pages/LandingPage.jsx

// eslint-disable-next-line no-unused-vars
import React from 'react';
import Header from '../components/Header';
import HeroSection from '../components/Hero';
import LoanCategory from '../components/LoanCategory';
import FinanceSection from '../components/FinanceSection';
import CalculatorSection from '../components/CalculatorSection';
import LoanCalculator from '../components/LoanCalculator';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

function LandingPage() {
    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header Section */}
            <Header />

            {/* Hero Section */}
            <HeroSection />

            {/* Main Content */}
            <main className="container mx-auto px-4 py-16">
                {/* Loan Categories */}
                <section className="mb-16">
                    <LoanCategory />
                </section>

                {/* Finance Section */}
                <FinanceSection />

                {/* Calculator Section */}
                <CalculatorSection />
                <LoanCalculator />

                {/* Contact Section */}
                <Contact />
            </main>

            {/* Footer */}
            <Footer />
        </div>
    );
}

export default LandingPage;
