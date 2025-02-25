'use client';

import Header from '@/components/footer-header/Header';
import Footer from '@/components/footer-header/Footer';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className + ' bg-gray-100'}>
                <Header />
                <main className="max-w-7xl mx-auto px-4 py-8">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
