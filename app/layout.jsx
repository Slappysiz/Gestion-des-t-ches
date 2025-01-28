import Header from "@/components/footer-header/Header.jsx";
import Footer from "@/components/footer-header/Footer.jsx";
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Panera',
    description: 'Projet de programmation web PANERA',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <Header />
                <main>{children}</main>
                <Footer />
            </body>
        </html>
    );
}
