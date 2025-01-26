// eslint-disable-next-line no-unused-vars
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-gradient-to-r from-green-400 to-green-600 text-white py-8 px-4">
            <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Saylani Microfinance Info */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Saylani Microfinance</h3>
                    <p className="text-sm">
                        Saylani Microfinance provides financial support to underserved individuals, offering
                        interest-free loans under the Qarza-e-Hasna program. We strive to empower people and uplift
                        their quality of life through financial aid for education, healthcare, business startups,
                        home construction, and more.
                    </p>
                </div>

                {/* Qarza-e-Hasna Program */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Qarza-e-Hasna</h3>
                    <p className="text-sm">
                        The Qarza-e-Hasna program provides interest-free loans to individuals in need. The program
                        aims to promote financial independence, reduce poverty, and support individuals in fulfilling
                        their basic needs, such as education, healthcare, business, and home construction.
                        We believe in empowering individuals to break the cycle of poverty and live with dignity.
                    </p>
                </div>

                {/* Links and Contact */}
                <div>
                    <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
                    <ul className="space-y-2">
                        <li><a href="#about" className="text-sm hover:underline">About Us</a></li>
                        <li><a href="#loan-categories" className="text-sm hover:underline">Loan Categories</a></li>
                        <li><a href="#apply" className="text-sm hover:underline">Apply Now</a></li>
                        <li><a href="#contact" className="text-sm hover:underline">Contact</a></li>
                    </ul>
                    <h3 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h3>
                    <p className="text-sm">Email: info@saylani.org</p>
                    <p className="text-sm">Phone: +92-123-456789</p>
                </div>
            </div>

            {/* Copyright Section */}
            <div className="mt-8 border-t border-white pt-4 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} Saylani Welfare International. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer