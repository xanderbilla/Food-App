import { Link } from "react-router-dom";
import styles from "../styles/Navbar.module.css";
import ToggleMenu from "./ToggleMenu";
import { Auth } from "aws-amplify";
import { useSelector } from 'react-redux';
import { LazyLoadImage } from "react-lazy-load-image-component";

const Navbar = ({ user }) => {
    const quantity = useSelector(state => state.cart.quantity)
    const handleLogout = async () => {
        try {
            await Auth.signOut();
            window.location.replace('/');
        } catch (error) {
            console.log('Error signing out:', error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <Link style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }} to='/'>
                    <LazyLoadImage src="/img/logo.png" alt="" className={styles.img} />
                </Link>
                <ul className={styles.list}>
                    <li className={styles.listItem}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/menu'>MENU</Link></li>
                    <li className={styles.listItem}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/admin/dashboard'>DASHBOARD</Link></li>
                    <li className={`${styles.listItem} ${user ? styles.hide : ''}`}><Link style={{ textDecoration: 'none', color: 'inherit' }} to='/contact'>CONTACT</Link></li>
                    <li className={`${styles.listItem} ${user ? styles.hide : ''}`}>
                        <Link to='/order'>
                            <button className={styles.button}>
                                TRACK ORDER
                            </button>
                        </Link>
                    </li>
                </ul>
            </div>
            <div className={`${styles.center} ${user ? styles.hide : ''}`}>
                <div className={styles.callButton}>
                    <LazyLoadImage src="/img/telephone.png" alt="" className={styles.callImg} />
                </div>
                <div className={styles.texts}>
                    <div className={styles.text}>ORDER NOW!</div>
                    <div className={styles.text}>012 345 678</div>
                </div>
            </div>
            <div className={styles.right}>
                <div className={`${styles.cart} ${user ? styles.hide : ''}`}>
                    <Link style={{ textDecoration: 'none', color: 'inherit' }} to='/cart'>
                        <LazyLoadImage src="/img/cart.png" alt="" width="30" height="30" />
                        <div className={styles.counter}>{quantity}</div>
                    </Link>
                </div>
                {user ?
                    <div className={styles.logout}>
                        <button className={styles.lgtBtn} onClick={handleLogout}>
                            <LazyLoadImage src="/img/logout.png" alt="" width="30" height="30" />
                        </button>
                    </div>
                    :
                    ''
                }
            </div>
            <div className={styles.menu}>
                <ToggleMenu user={user} />
            </div>
        </div>
    )
}

export default Navbar