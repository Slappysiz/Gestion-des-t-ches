import styles from './Footer.module.css';
import MenuFooter from './MenuFooter'; 

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <MenuFooter /> 
        </footer>
    );
}
