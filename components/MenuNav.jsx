'use client';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useLocale } from './LocaleProvider'; // Import the hook for language change
import { FormattedMessage } from 'react-intl'; // For translations

export default function MenuNav() {
    const [menuItems, setMenuItems] = useState([]);
    const [locale, setLocale] = useLocale(); // Access the current locale

    useEffect(() => {
        fetch('/json/headerMenu.json')
            .then((response) => response.json())
            .then((data) => setMenuItems(data))
            .catch((error) => console.error("Error loading menu:", error));
    }, []);

    // Toggle the language (FR/EN)
    const handleLocaleChange = () => {
        setLocale(locale === 'fr' ? 'en' : 'fr');
    };

    return (
        <nav className="hidden md:flex gap-x-8 text-md uppercase font-semibold">
            {menuItems.map((item) => (
                <li key={item.id}>
                    <Link
                        href={item.link}
                        className="hover:text-[#ffeedc] focus:outline-none"
                    >
                        {/* Use FormattedMessage for translating menu items */}
                        <FormattedMessage id={`app.header.menu.lien${item.id}`} defaultMessage={item.label} />
                    </Link>
                </li>
            ))}
            {/* Language Switcher (Flag Icons) */}
            <button onClick={handleLocaleChange} className="flex items-center gap-x-2">
                {locale === 'fr' ? (
                    <img src="/img/fr-icon.svg" alt="French" width={30} height={20} />
                ) : (
                    <img src="/img/usa-icon.svg" alt="English" width={30} height={20} />
                )}
            </button>
        </nav>
    );
}
