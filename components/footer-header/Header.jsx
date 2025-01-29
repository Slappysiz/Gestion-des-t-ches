"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link"; // Import Link from next/link
import { IoMenu, IoClose } from "react-icons/io5";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch the header menu from the JSON file
        fetch('/json/headerMenu.json')
            .then((response) => response.json())
            .then((data) => setMenuItems(data));
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
                <Link href="/" passHref>
                    <Image src="/img/BOP.webp" alt="Logo" width={150} height={150} />
                </Link>
            </div>

            {/* Navigation - Desktop */}
            <nav className="hidden md:flex gap-x-8 text-md uppercase font-semibold">
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        passHref
                        className="hover:text-[#ffeedc]"
                    >
                        {item.label}
                    </Link>
                ))}
            </nav>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(true)}>
                    <IoMenu size={30} />
                </button>
            </div>

            {/* Mobile Sidebar Menu */}
            {menuOpen && (
                <>
                    {/* Background Overlay */}
                    <div
                        className="fixed inset-0 bg-black bg-opacity-50 z-40"
                        onClick={() => setMenuOpen(false)}
                    ></div>

                    {/* Sidebar Panel */}
                    <div className="fixed top-0 left-0 w-3/4 h-full bg-[#1a202c] text-[#f7fafc] flex flex-col items-center justify-center gap-y-6 z-50 shadow-lg transition-transform duration-300">
                        
                        {/* Close Button */}
                        <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
                            <IoClose size={30} className="text-white" />
                        </button>

                        {/* Navigation Links */}
                        {menuItems.map((item) => (
                            <Link
                                key={item.id}
                                href={item.link}
                                passHref
                                className="text-lg hover:text-[#ffeedc]"
                                onClick={() => setMenuOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>
                </>
            )}
        </header>
    );
}
