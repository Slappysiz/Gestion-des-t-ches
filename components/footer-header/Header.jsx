"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { IoMenu, IoClose } from "react-icons/io5";
import { useTheme } from '../ThemeProvider'; // Import the useTheme hook
import { useLocale } from '../LocaleProvider'; // Import the useLocale hook for language switching
import { FormattedMessage } from 'react-intl'; // For translations

export default function Header() {
    const [theme, setTheme] = useTheme(); // Access the theme and setTheme function
    const [menuOpen, setMenuOpen] = useState(false);
    const [menuItems, setMenuItems] = useState([]);
    const [locale, setLocale] = useLocale(); // Access the current locale

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

    // Function to toggle theme (dark/light)
    const handleThemeToggle = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    // Toggle the language (FR/EN)
    const handleLocaleChange = () => {
        setLocale(locale === 'fr' ? 'en' : 'fr');
    };

    return (
        <header className={`py-4 px-6 flex justify-between items-center relative z-50 bg-transparent text-inherit`}>
            {/* Logo */}
            <div className="flex items-center gap-2">
                <Link href="/" className="focus:outline-none">
                    <Image src="/img/BOP.webp" alt="Logo" width={150} height={150} />
                </Link>
            </div>

            {/* Navigation - Desktop */}
            <div className="flex items-center justify-between w-full">
                {/* Menu */}
                <nav className={`hidden md:flex gap-x-8 text-md uppercase font-semibold ml-auto ${theme === 'dark' ? 'text-white' : ''}`}>
                    {menuItems.map((item) => (
                        <Link
                            key={item.id}
                            href={item.link}
                            className="hover:text-[#ffeedc] focus:outline-none"
                        >
                            {/* Use FormattedMessage for translating menu items */}
                            <FormattedMessage id={`app.header.menu.lien${item.id}`} defaultMessage={item.label} />
                        </Link>
                    ))}
                </nav>

                {/* Dark Mode Toggle (Icon) */}
                <div className="hidden md:flex items-center gap-x-4 ml-4 cursor-pointer" onClick={handleThemeToggle}>
                    <Image
                        src={theme === "light" ? "/img/sun-icon.svg" : "/img/moon-icon.svg"}
                        alt="Toggle Dark Mode"
                        width={30}
                        height={30}
                    />
                </div>

                {/* Language Switcher (Flag Icons) */}
                <button onClick={handleLocaleChange} className="ml-4 hidden md:flex items-center gap-x-2">
                    {locale === 'fr' ? (
                        <Image src="/img/usa-icon.svg" alt="English" width={30} height={20} />
                    ) : (
                        <Image src="/img/fr-icon.svg" alt="French" width={30} height={20} />
                    )}
                </button>
            </div>

            {/* Mobile Menu Icon */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(true)}>
                    <IoMenu size={30} />
                </button>
            </div>

            {/* Background Overlay */}
            <div
                className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-500 ${menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            {/* Mobile Sidebar Menu */}
            <div
                className={`fixed top-0 left-0 w-3/4 h-full ${theme === 'light' ? 'bg-gradient-to-r from-[#FFD700] via-[#FFCBA4] to-[#FFB6C1]' : 'bg-gradient-to-r from-[#2d3748] via-[#4a5568] to-[#2b2b2b]'} text-[#f7fafc] flex flex-col items-center justify-center gap-y-6 z-50 shadow-lg transition-transform duration-500 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`}
            >
                {/* Close Button */}
                <button onClick={() => setMenuOpen(false)} className="absolute top-4 right-4">
                    <IoClose size={30} className="text-white" />
                </button>

                {/* Navigation Links */}
                {menuItems.map((item) => (
                    <Link
                        key={item.id}
                        href={item.link}
                        className="text-lg hover:text-[#ffeedc] focus:outline-none"
                        onClick={() => setMenuOpen(false)} // Close menu after clicking
                    >
                        {/* Use FormattedMessage for translating menu items */}
                        <FormattedMessage id={`app.header.menu.lien${item.id}`} defaultMessage={item.label} />
                    </Link>
                ))}

                {/* Dark Mode Toggle for Mobile Menu */}
                <div className="mt-4 flex items-center justify-center gap-x-4 cursor-pointer" onClick={handleThemeToggle}>
                    <Image
                        src={theme === "light" ? "/img/sun-icon.svg" : "/img/moon-icon.svg"}
                        alt="Toggle Dark Mode"
                        width={30}
                        height={30}
                    />
                </div>

                {/* Language Switcher (Flag Icons) in Mobile Menu */}
                <button onClick={handleLocaleChange} className="mt-4 flex items-center gap-x-2">
                    {locale === 'fr' ? (
                        <Image src="/img/usa-icon.svg" alt="English" width={30} height={20} />
                    ) : (
                        <Image src="/img/fr-icon.svg" alt="French" width={30} height={20} />
                    )}
                </button>
            </div>
        </header>
    );
}
