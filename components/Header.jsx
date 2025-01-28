"use client";
import { useState } from "react";
import Image from "next/image";
import { IoMenu, IoClose } from "react-icons/io5";
import logo from "@/public/img/BOP.webp";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <header className=" text-[#f7fafc] font-['Poppins'] py-4 px-6 flex justify-between items-center">
            {/* Logo */}
         <div className="flex items-center gap-2">
              <a href="/">
                 <Image src="/img/BOP.webp" alt="Logo" width={150} height={150} />
              </a>
    </div>

            {/* Navigation - Bureau/Tablette */}
            <nav className="hidden md:flex gap-x-8 text-md uppercase">
                <a href="/" className="hover:text-[#ffeedc]">Home</a>
                <a href="/lineup" className="hover:text-[#ffeedc]">Lineup</a>
                <a href="#" className="hover:text-[#ffeedc]">About Us</a>
                <a href="/contact" className="hover:text-[#ffeedc]">Contact</a>
            </nav>

            {/* Icône Menu - Mobile */}
            <div className="md:hidden">
                <button onClick={() => setMenuOpen(!menuOpen)}>
                    {menuOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
                </button>
            </div>

            {/* Menu Mobile - Affichage conditionnel */}
            {menuOpen && (
                <div className="absolute top-16 left-0 w-full bg-[#1a202c] text-[#f7fafc] flex flex-col items-center gap-y-6 py-6">
                    <a href="/" className="text-lg hover:text-[#ffeedc]" onClick={() => setMenuOpen(false)}>Accueil</a>
                    <a href="/lineup" className="text-lg hover:text-[#ffeedc]" onClick={() => setMenuOpen(false)}>Lineup</a>
                    <a href="#" className="text-lg hover:text-[#ffeedc]" onClick={() => setMenuOpen(false)}>About Us</a>
                    <a href="/contact" className="text-lg hover:text-[#ffeedc]" onClick={() => setMenuOpen(false)}>Contact</a>
                </div>
            )}
        </header>
    );
}
