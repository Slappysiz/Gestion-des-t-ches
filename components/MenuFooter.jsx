import styles from './MenuFooter.module.css';

export default function MenuNav() {
    return <nav className={styles.nav}>
        <ul>
            <li><a href="#">A propos</a></li>
            <li><a href="#">Carrieres</a></li>
            <li><a href="#">Contact</a></li>
            <li><a href="#">Terms of use</a></li>
        </ul>
    </nav>
}