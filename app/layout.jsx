import { Inter } from 'next/font/google';
import './globals.css';
const inter = Inter({ subsets: ['latin'] });
export const metadata = {
    title: 'Panera',
    description: 'Projet Web pour le cours de Programmation Web Avancee',
};
export default function RootLayout({ children }) {
    return (
        <html lang='en'>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
