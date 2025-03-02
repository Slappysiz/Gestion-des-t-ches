"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import Button from "@/components/button";

export default function Contact() {
    const [formConfig, setFormConfig] = useState(null);
    const [showConfirmation, setShowConfirmation] = useState(false); // State to show confirmation
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    useEffect(() => {
        fetch('/json/contactForm.json')
            .then((response) => response.json())
            .then((data) => {
                setFormConfig(data);
            });
    }, []);

    const sendMail = (data) => {
        const templateParams = {
            nom: data.nom,
            email: data.email,
            objet: data.objet,
            message: data.message,
        };

        emailjs.send(
            'service_tghq1jf',
            'template_o93mzas',
            templateParams,
            'GW_kdKXhKB-PYngHY'
        )
        .then((response) => {
            console.log('Email envoyé avec succès!', response.status, response.text);
            setShowConfirmation(true); // Show the confirmation message
            reset();
            
            // Hide confirmation message after 5 seconds
            setTimeout(() => {
                setShowConfirmation(false);
            }, 5000);
        })
        .catch((err) => {
            console.error("Erreur lors de l'envoi de l'email:", err);
        });
    };

    if (!formConfig) return <div>Loading...</div>;

    return (
        <div className="relative min-h-screen text-white py-10 px-6 overflow-hidden">
            <div className="absolute left-[-100px] top-1/4 w-[400px] h-[600px] animate-float clip-irregular overflow-hidden">
                <img
                    src="/img/contact/contacta.webp"
                    alt="Left Decoration"
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            <div className="absolute right-[-120px] bottom-1/4 w-[450px] h-[500px] animate-float-reverse clip-irregular overflow-hidden">
                <img
                    src="/img/contact/contactc.webp"
                    alt="Right Decoration"
                    className="w-full h-full object-cover opacity-75"
                />
            </div>

            <div className="relative z-10">
                <h1 className="text-4xl font-bold text-center mb-6">{formConfig.title}</h1>
                <p className="text-center text-lg mb-12">{formConfig.description}</p>

                <form
                    onSubmit={handleSubmit(sendMail)}
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
                                    {...register(field.id, { required: "Ce champ est obligatoire" })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={field.placeholder}
                                    rows="5"
                                    required
                                ></textarea>
                            ) : (
                                <input
                                    type={field.type}
                                    id={field.id}
                                    {...register(field.id, { required: "Ce champ est obligatoire" })}
                                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                                    placeholder={field.placeholder}
                                    required
                                />
                            )}
                            {errors[field.id] && <span className="text-red-500">{errors[field.id].message}</span>}
                        </div>
                    ))}
                    <div className="text-center">
                        <Button
                            text={formConfig.submitButton.text}
                            type="submit"
                            variant="light"
                        />
                    </div>
                </form>

                {/* Custom confirmation message */}
                {showConfirmation && (
                    <div className="mt-6 text-center bg-green-100 text-green-800 p-4 rounded-lg shadow-lg">
                        <p>Thank you for your message! We'll get back to you soon.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
