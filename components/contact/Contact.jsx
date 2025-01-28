"use client";

import { useState, useEffect } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({});
    const [formConfig, setFormConfig] = useState(null);

    useEffect(() => {
        // Fetch form configuration from the JSON file
        fetch('/json/contactForm.json')
            .then((response) => response.json())
            .then((data) => {
                setFormConfig(data);
                // Initialize form data state
                const initialData = {};
                data.fields.forEach((field) => {
                    initialData[field.id] = "";
                });
                setFormData(initialData);
            });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        alert("Thank you for your message!");
        // Reset form data
        const resetData = {};
        formConfig.fields.forEach((field) => {
            resetData[field.id] = "";
        });
        setFormData(resetData);
    };

    if (!formConfig) return <div>Loading...</div>;

    return (
        <div className="min-h-screen bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-10 px-6">
            <h1 className="text-4xl font-bold text-center mb-6">{formConfig.title}</h1>
            <p className="text-center text-lg mb-12">{formConfig.description}</p>

            <form
                onSubmit={handleSubmit}
                className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded-lg shadow-lg"
            >
                {formConfig.fields.map((field) => (
                    <div key={field.id} className="mb-6">
                        <label
                            htmlFor={field.id}
                            className="block text-lg font-semibold mb-2"
                        >
                            {field.label}
                        </label>
                        {field.type === "textarea" ? (
                            <textarea
                                id={field.id}
                                name={field.id}
                                value={formData[field.id]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder={field.placeholder}
                                rows="5"
                                required
                            ></textarea>
                        ) : (
                            <input
                                type={field.type}
                                id={field.id}
                                name={field.id}
                                value={formData[field.id]}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-pink-500"
                                placeholder={field.placeholder}
                                required
                            />
                        )}
                    </div>
                ))}
                <div className="text-center">
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-500 text-white py-2 px-6 rounded-full font-semibold hover:bg-gradient-to-l transition duration-300"
                    >
                        {formConfig.submitButton.text}
                    </button>
                </div>
            </form>
        </div>
    );
}
