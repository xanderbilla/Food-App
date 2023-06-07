import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import ToggleMenu from "./ToggleMenu";

const Navbar = () => {
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>
                    <img src="/img/logo.png" alt="" width="200" height="50" />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.listItem}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/'>HOME</Link></li>
                    <li className={styles.listItem}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/menu'>MENU</Link></li>
                    <li className={styles.listItem}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/contact'>CONTACT</Link></li>
                    <li className={styles.listItem}>
                        <Link to='/order'>
                            <button className={styles.button}>
                                TRACK ORDER
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={styles.center}>
                <div className={styles.callButton}>
                    <img src="/img/telephone.png" alt="" className={styles.callImg} />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!</div>
                    <div className={styles.text}>012 345 678</div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={styles.cart}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/cart'>
                        <img src="/img/cart.png" alt="" width="30" height="30" />
                        <div className={styles.counter}>2</div>
                    </Link>
                </div>
            </div>
            <div className={styles.menu}>
                <ToggleMenu />
            </div>
        </div>
    )
}

export default Navbar