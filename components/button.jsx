"use client";

import Link from "next/link";

export default function Button({ text, href, variant = "primary", onClick }) {
    const baseStyles = "py-2 px-6 rounded-full font-semibold transition duration-300";
    const variants = {
        primary: "bg-white text-gray-800 hover:bg-gray-200",
        secondary: "border border-white text-white hover:bg-white hover:text-gray-800",
        light: "bg-gray-800 text-white hover:bg-gray-700 hover:text-yellow-300", 

    };

    return href ? (
        <Link href={href} passHref className={`${baseStyles} ${variants[variant]}`}>
            {text}
        </Link>
    ) : (
        <button onClick={onClick} className={`${baseStyles} ${variants[variant]}`}>
            {text}
        </button>
    );
}
