import styles from './Header.module.css';
import Image from 'next/image';
import logo from '@/public/img/Logo.webp';
import MenuNav from './MenuNav';

export default function Header() {
    return <header className={styles.header}>
            <div className={styles.title}>
                <a href="/" className={styles.logoLink}>
                    <Image
                        src={logo}
                        alt="Logo React"
                        width={180}
                    />
                </a>
            </div>
            <MenuNav />
    </header>
}