"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
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

    return (
        <header className="text-[#f7fafc] font-['Poppins'] py-4 px-6 flex justify-between items-center">
            {/* Logo */}
            <div className="flex items-center gap-2">
                <a href="/">
                    <Image src="/img/BOP.webp" alt="Logo" width={150} height={150} />
                </a>
            </div>

            {/* Navigation - Desktop/Tablet */}
            <nav className="hidden md:flex gap-x-8 text-md uppercase font-semibold">
                {menuItems.map((item) => (
                    <a
                        key={item.id}
                        href={item.link}
                        className="hover:text-[#ffeedc]"
                    >
                        {item.label}
                    </a>
                ))}
            </nav>

            {/* Menu Icon - Mobile */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
                </button>
            </div>

            {/* Mobile Menu - Conditional Display */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#1a202c] text-[#f7fafc] flex flex-col items-center gap-y-6 py-6">
                    {menuItems.map((item) => (
                        <a
                            key={item.id}
                            href={item.link}
                            className="text-lg hover:text-[#ffeedc]"
                            onClick={() => setMenuOpen(false)}
                        >
                            {item.label}
                        </a>
                    ))}
                </div>
            )}
        </header>
    );
}
