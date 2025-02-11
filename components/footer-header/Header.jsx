"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";

export default function Header({ setPage }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    // Fetch menu from headerMenu.json
    useEffect(() => {
        fetch('/json/headerMenu.json')
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error("Error loading menu:", error));
    }, []);

    // Disable scrolling when menu is open
    useEffect(() => {
        if (menuOpen) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }, [menuOpen]);

    return (
        <header className="text-[#f7fafc] font-['Poppins'] py-4 px-6 flex justify-between items-center relative z-50">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <button onClick={() => setPage('/')} className="focus:outline-none">
                    <Image src="/img/BOP.webp" alt="Logo" width={150} height={150} />
                </button>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex gap-x-8 text-md uppercase font-semibold">
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setPage(item.link)}
                        className="hover:text-[#ffeedc] focus:outline-none"
                    >
                        {item.label}
                    </button>
                ))}
            </nav>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(true)}>
                    <IoMenu size={30} />
                </button>
            </div>

            {/* Background Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${
                    menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                }`}
                onClick={() => setMenuOpen(false)}
            ></div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 w-3/4 h-full bg-[#1a202c] text-[#f7fafc] flex flex-col items-center justify-center gap-y-6 z-50 shadow-lg transition-transform duration-500 ${
                    menuOpen ? "translate-x-0" : "-translate-x-full"
                }`}
            >
                {/* Close Button */}
                <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
                    <IoClose size={30} className="text-white" />
                </button>

                {/* Navigation Links */}
                {menuItems.map((item) => (
                    <button
                        key={item.id}
                        onClick={() => { setPage(item.link); setMenuOpen(false); }}
                        className="text-lg hover:text-[#ffeedc] focus:outline-none"
                    >
                        {item.label}
                    </button>
                ))}
            </div>
        </header>
    );
}
