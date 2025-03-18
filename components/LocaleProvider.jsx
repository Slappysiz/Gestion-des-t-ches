'use client';
import { createContext, useContext, useState, useEffect } from 'react';
import { IntlProvider } from 'react-intl';
import englishData from '@/i18n/en.json'; // Import English translations (for fallback)
import frenchData from '@/i18n/fr.json'; // Import French translations (for fallback)
import footerMenuEn from '@/i18n/footerMenuEn.json'; // Import English footer menu translations
import footerMenuFr from '@/i18n/footerMenuFr.json'; // Import French footer menu translations

// Create the context for locale
const LocaleContext = createContext();

export function LocaleProvider({ children }) {
    const [locale, setLocale] = useState('fr');
    const [footerMenu, setFooterMenu] = useState(footerMenuFr); // Default to French footer translations
    const [headerMenu, setHeaderMenu] = useState(frenchData); // Default to French header translations

    // Handle language switch and load the appropriate translations
    useEffect(() => {
        // Set footer translations dynamically based on locale
        if (locale === 'fr') {
            setHeaderMenu(frenchData);
            setFooterMenu(footerMenuFr);
        } else {
            setHeaderMenu(englishData);
            setFooterMenu(footerMenuEn);
        }
    }, [locale]);

    // Handle language change
    const handleSetLocale = (newLocale) => {
        setLocale(newLocale);
        localStorage.setItem('locale', newLocale); // Save the language to localStorage
    };

    return (
        <LocaleContext.Provider value={[locale, handleSetLocale]}>
            <IntlProvider locale={locale} messages={headerMenu}>
                {children}
            </IntlProvider>
        </LocaleContext.Provider>
    );
}

// Custom hook to access and update the locale
export function useLocale() {
    const context = useContext(LocaleContext);
    if (!context) {
        throw new Error('useLocale must be used within a LocaleProvider');
    }
    return context;
}
