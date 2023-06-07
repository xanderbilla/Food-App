import TrackResult from '../components/TrackResult'
import styles from '../styles/track.module.css'

const Track = () => {
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.heading}>
                    <span className={styles.title}>Track Your Order</span>
                </div>
                <div className={styles.search}>
                    <input type="number" name="phone" minLength={10} maxLength={10} placeholder="Enter Your Phone Number" className={styles.input} />
                    <button className={styles.button}>Search</button>
                </div>
                <TrackResult/>
            </div>
        </div>
    )
}

export default Track