// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { Calculator, ArrowRight } from 'lucide-react';
import RegistrationPopup from './RegistrationPopup';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

export default function LoanCalculator() {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedSubCategory, setSelectedSubCategory] = useState('');
    const [amount, setAmount] = useState('');
    const [initialDeposit, setInitialDeposit] = useState('');
    const [duration, setDuration] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);

    const loanCategories = [
        {
            name: 'Home Construction',
            subCategories: [
                { name: 'New Construction', maxAmount: 2000000 },
                { name: 'Renovation', maxAmount: 1000000 },
            ],
        },
        {
            name: 'Education',
            subCategories: [
                { name: 'University Fee', maxAmount: 1500000 },
                { name: 'Professional Courses', maxAmount: 800000 },
            ],
        },
        {
            name: 'Business Startup',
            subCategories: [
                { name: 'Small Business', maxAmount: 2000000 },
                { name: 'Micro Enterprise', maxAmount: 1000000 },
            ],
        },
        {
            name: 'Wedding',
            subCategories: [
                { name: 'Wedding Ceremony', maxAmount: 1500000 },
                { name: 'Wedding Shopping', maxAmount: 800000 },
            ],
        },
    ];

    const durationOptions = [
        { value: 6, label: '6 Months' },
        { value: 12, label: '1 Year' },
        { value: 24, label: '2 Years' },
        { value: 36, label: '3 Years' },
        { value: 48, label: '4 Years' },
        { value: 60, label: '5 Years' },
    ];

    const selectedCategoryData = loanCategories.find(cat => cat.name === selectedCategory);
    const selectedSubCategoryData = selectedCategoryData?.subCategories.find(
        sub => sub.name === selectedSubCategory
    );

    const amountNum = Number(amount) || 0;
    const initialDepositNum = Number(initialDeposit) || 0;
    const durationNum = Number(duration) || 0;

    const remainingAmount = amountNum - initialDepositNum;
    const monthlyPayment = remainingAmount > 0 && durationNum > 0
        ? (remainingAmount / durationNum).toFixed(2)
        : '0.00';

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubCategory('');
        setAmount('');
        setInitialDeposit('');
        setDuration('');
    };

    const handleSubCategoryChange = (e) => {
        setSelectedSubCategory(e.target.value);
        setAmount('');
        setInitialDeposit('');
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        if (selectedSubCategoryData && Number(value) > selectedSubCategoryData.maxAmount) {
            setAmount(selectedSubCategoryData.maxAmount.toString());
        } else {
            setAmount(value);
        }
    };

    const handleInitialDepositChange = (e) => {
        const value = e.target.value;
        if (Number(value) > amountNum) {
            setInitialDeposit(amount);
        } else {
            setInitialDeposit(value);
        }
    };

    const isFormValid = selectedCategory && selectedSubCategory && amount && initialDeposit && duration;

    const handleRegister = async (cnic, email) => {
        try {
            const applicationData = {
                category: selectedCategory,
                subCategory: selectedSubCategory,
                amount: amountNum,
                initialDeposit: initialDepositNum,
                duration: durationNum,
                monthlyPayment,
                cnic,
                email,
                status: 'pending',
                createdAt: new Date().toISOString(),
            };

            await addDoc(collection(db, 'loanApplications'), applicationData);
            alert('Loan application submitted successfully!');
            setShowRegistration(false);
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('An error occurred while submitting your application. Please try again.');
        }
    };

    return (
        <div className="bg-white p-8 rounded-lg shadow-lg" id='loan-calculator'>
            <div className="flex items-center gap-2 mb-8">
                <Calculator className="w-8 h-8 text-emerald-600" />
                <h3 className="text-2xl font-semibold text-gray-800">Loan Calculator</h3>
            </div>

            <div className="space-y-6">
                {/* Category Selection */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Select Loan Category
                    </label>
                    <select
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                    >
                        <option value="">Select Category</option>
                        {loanCategories.map(category => (
                            <option key={category.name} value={category.name}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Sub-Category Selection */}
                {selectedCategory && (
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Select Sub-Category
                        </label>
                        <select
                            value={selectedSubCategory}
                            onChange={handleSubCategoryChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                        >
                            <option value="">Select Sub-Category</option>
                            {selectedCategoryData?.subCategories.map(sub => (
                                <option key={sub.name} value={sub.name}>
                                    {sub.name}
                                </option>
                            ))}
                        </select>
                    </div>
                )}

                {/* Loan Amount */}
                {selectedSubCategory && (
                    <>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loan Amount (Max: Rs. {selectedSubCategoryData?.maxAmount.toLocaleString()})
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                                <input
                                    type="number"
                                    value={amount}
                                    onChange={handleAmountChange}
                                    min="0"
                                    max={selectedSubCategoryData?.maxAmount}
                                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter loan amount"
                                />
                            </div>
                        </div>

                        {/* Initial Deposit */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Initial Deposit
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">Rs.</span>
                                <input
                                    type="number"
                                    value={initialDeposit}
                                    onChange={handleInitialDepositChange}
                                    min="0"
                                    max={amount}
                                    className="w-full p-3 pl-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                                    placeholder="Enter initial deposit"
                                />
                            </div>
                        </div>

                        {/* Duration */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Loan Duration
                            </label>
                            <select
                                value={duration}
                                onChange={(e) => setDuration(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-white"
                            >
                                <option value="">Select Duration</option>
                                {durationOptions.map(option => (
                                    <option key={option.value} value={option.value}>
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Results */}
                        <div className="p-6 bg-gray-50 rounded-lg space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-600">Total Loan Amount:</span>
                                <span className="font-semibold">Rs. {amountNum.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Initial Deposit:</span>
                                <span className="font-semibold">Rs. {initialDepositNum.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Remaining Amount:</span>
                                <span className="font-semibold">Rs. {remainingAmount.toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t">
                                <span className="text-gray-600">Monthly Payment:</span>
                                <span className="text-2xl font-bold text-emerald-600">
                                    Rs. {monthlyPayment}
                                </span>
                            </div>
                        </div>

                        {/* Proceed Button */}
                        <button
                            onClick={() => setShowRegistration(true)}
                            disabled={!isFormValid}
                            className={`w-full flex items-center justify-center gap-2 p-4 rounded-lg font-semibold text-white transition-colors
                                ${isFormValid
                                    ? 'bg-emerald-600 hover:bg-emerald-700'
                                    : 'bg-gray-300 cursor-not-allowed'}`}
                        >
                            Proceed to Loan Application
                            <ArrowRight className="w-5 h-5" />
                        </button>
                    </>
                )}
            </div>

            <RegistrationPopup
                isOpen={showRegistration}
                onClose={() => setShowRegistration(false)}
                loanDetails={{
                    category: selectedCategory,
                    subCategory: selectedSubCategory,
                    amount: amountNum,
                    initialDeposit: initialDepositNum,
                    duration: durationNum,
                    monthlyPayment
                }}
                onRegister={handleRegister}
            />
        </div>
    );
}
