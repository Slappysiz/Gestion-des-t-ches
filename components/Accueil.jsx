import styles from './Accueil.module.css';
import Citation from './Citation';

export default function Accueil() {
    return <>
        <Citation auteur='Panera Festival'>
        Ou la musique rencontre la magie – Ton Festival, Ta Vibe!
        </Citation>
        <div className={styles.welcome}>
            Vos artistes favoris arrivent bientot !
        </div>
    </>
}