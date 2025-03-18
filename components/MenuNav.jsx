'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function MenuNav() {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        fetch('/json/headerMenu.json')
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error("Error loading menu:", error));
    }, []);

    return (
        <nav className="hidden md:flex gap-x-8 text-md uppercase font-semibold">
            {menuItems.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.link}
                        className="hover:text-[#ffeedc] focus:outline-none"
                    >
                        {item.label}
                    </Link>
                </li>
            ))}
        </nav>
    );
}
