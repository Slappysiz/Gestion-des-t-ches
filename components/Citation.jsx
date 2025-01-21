import styles from './Citation.module.css'
export default function Citation(props) {
    return <>
        <div className={styles.citation}>
            {props.children}
        </div>
        <div className={styles.auteur}>
            - {props.auteur}
        </div>
    </>
}