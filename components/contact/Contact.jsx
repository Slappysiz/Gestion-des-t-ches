"use client";

import { useState, useEffect } from "react";
import Button from "@/components/button";


export default function Contact() {
    const [formData, setFormData] = useState({});
    const [formConfig, setFormConfig] = useState(null);

    useEffect(() => {
        fetch('/json/contactForm.json')
            .then((response) => response.json())
            .then((data) => {
                setFormConfig(data);
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
        const resetData = {};
        formConfig.fields.forEach((field) => {
            resetData[field.id] = "";
        });
        setFormData(resetData);
    };

    if (!formConfig) return <div>Loading...</div>;

    return (
        <div className="relative min-h-screen text-white py-10 px-6 overflow-hidden">
            {/* Left Irregular Floating Shape with Image */}
            <div className="absolute left-[-100px] top-1/4 w-[400px] h-[600px] animate-float clip-irregular overflow-hidden">
                <img
                    src="/img/contact/contacta.webp"
                    alt="Left Decoration"
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            {/* Right Irregular Floating Shape with Image */}
            <div className="absolute right-[-120px] bottom-1/4 w-[450px] h-[500px] animate-float-reverse clip-irregular overflow-hidden">
                <img
                    src="/img/contact/contactc.webp"
                    alt="Right Decoration"
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            {/* Form Section */}
            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-center mb-6">{formConfig.title}</h1>
                <p className="text-center text-lg mb-12">{formConfig.description}</p>

                <form
                    onSubmit={handleSubmit}
                    className="max-w-3xl mx-auto bg-white text-gray-800 p-8 rounded-lg shadow-xl"
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
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
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
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={field.placeholder}
                                    required
                                />
                            )}
                        </div>
                    ))}
                            <div className="text-center">
                                <Button
                                     text={formConfig.submitButton.text}
                                     onClick={handleSubmit}
                                     variant="light"
                                />
                            </div>
                </form>
            </div>
        </div>
    );
}
