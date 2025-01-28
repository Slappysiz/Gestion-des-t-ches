"use client";

import { useEffect, useState } from "react";

export default function Footer() {
    const [footerMenu, setFooterMenu] = useState([]);

    useEffect(() => {
        // Fetch footer menu from JSON file
        fetch('/json/footerMenu.json')
            .then((response) => response.json())
            .then((data) => setFooterMenu(data));
    }, []);

    return (
        <footer className="bg-gray-900 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {footerMenu.map((section, index) => (
                        <div key={index}>
                            <h3 className="text-sm font-semibold mb-3">{section.title}</h3>
                            <ul>
                                {section.links.map((link, linkIndex) => (
                                    <li key={linkIndex} className="mb-1">
                                        <a
                                            href={link.href}
                                            className="hover:underline text-gray-400"
                                        >
                                            {link.label}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </footer>
    );
}
