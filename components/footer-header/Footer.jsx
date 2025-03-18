"use client";

import { useEffect, useState } from "react";
import { useLocale } from '../LocaleProvider'; // Import the useLocale hook for language switching
import Link from "next/link"; // Import Link from next/link

export default function Footer() {
    const [locale] = useLocale(); // Access the current locale
    const [footerMenu, setFooterMenu] = useState([]);

    const translations = {
        en: require('@/i18n/footerMenuEn.json'),
        fr: require('@/i18n/footerMenuFr.json')
    };

    useEffect(() => {
        // Set the footer menu dynamically based on the selected language
        setFooterMenu(translations[locale]);
    }, [locale]);

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
                                        <Link
                                            href={link.href}
                                            passHref
                                            className="hover:underline text-gray-400"
                                        >
                                            {link.label}
                                        </Link>
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
