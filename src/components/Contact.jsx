// eslint-disable-next-line no-unused-vars
import React from "react";
import { MapPin, Phone, Mail } from 'lucide-react';

const Contact = () => {
    return (
        <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-8">Contact Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
                <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-emerald-600" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Phone</h3>
                        <p className="text-gray-600">+92 111-729-526</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-emerald-600" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Email</h3>
                        <p className="text-gray-600">info@saylaniwelfare.com</p>
                    </div>
                </div>
                <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                    <div>
                        <h3 className="font-semibold text-gray-800">Address</h3>
                        <p className="text-gray-600">A-25, Bahadurabad Chowrangi, Karachi</p>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;