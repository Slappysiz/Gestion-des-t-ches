"use client";

import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Thank you for your message!");
        setFormData({ name: "", email: "", message: "" });
    };

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-10 px-6">
            <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
            <p className="text-center text-lg mb-12">
                Have questions or feedback? Fill out the form below, and we’ll get back to you as soon as possible.
            </p>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded-lg shadow-lg"
            >
                {/* Name Input */}
                <div className="mb-6">
                    <label htmlFor="name" className="block text-lg font-semibold mb-2">
                        Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your name"
                        required
                    />
                </div>

                {/* Email Input */}
                <div className="mb-6">
                    <label htmlFor="email" className="block text-lg font-semibold mb-2">
                        Email
                    </label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Enter your email"
                        required
                    />
                </div>

                {/* Message Input */}
                <div className="mb-6">
                    <label htmlFor="message" className="block text-lg font-semibold mb-2">
                        Message
                    </label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                        placeholder="Write your message"
                        rows="5"
                        required
                    ></textarea>
                </div>

                {/* Submit Button */}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-gradient-to-l transition duration-300"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}