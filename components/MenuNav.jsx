import styles from './MenuNav.module.css';

export default function MenuNav() {
    return <nav className={styles.nav}>
        <ul>
            <li><a href="#">Musique</a></li>
            <li><a href="#">Experiences</a></li>
            <li><a href="#">Plan</a></li>
            <li><a href="#">Boutique</a></li>
        </ul>
    </nav>
}