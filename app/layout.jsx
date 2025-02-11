'use client';

import { useState } from 'react';
import Header from '@/components/footer-header/Header.jsx';
import Footer from '@/components/footer-header/Footer.jsx';
import LineupDisplay from '@/components/lineup/LineupDisplay';
import Contact from '@/components/contact/Contact';
import NextEvent from '@/components/EventSection';
import Lineup from '@/components/LineupSectionHomepage';
import ThemeSection from '@/components/ThemeSection';
import PastFestivals from '@/components/PastEventsSection';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout() {
    const [page, setPage] = useState('/');

    return (
        <html lang="en">
            <body className={inter.className}>
                <Header setPage={setPage} />
                <main>
                {page === '/' ? (
    <>
        {/* Next Event Section */}
        <div className="mb-16">
            <NextEvent />
        </div>

        {/* Lineup Section */}
        <div className="mb-16">
            <Lineup setPage={setPage} />  {/* ✅ Pass setPage */}
        </div>

        {/* About Us Section */}
        <div className="mb-16">
            <ThemeSection />
        </div>

        {/* Past Festivals Section */}
        <PastFestivals />
    </>
) : page === '/lineup' ? (
    <LineupDisplay />
) : page === '/contact' ? (
    <Contact />
) : (
    <div>404 - Page Not Found</div>
)}

                </main>
                <Footer />
            </body>
        </html>
    );
}
