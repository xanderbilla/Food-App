import styles from "../styles/sidebar.module.css";
import { Link } from 'react-router-dom';

export default function Sidebar({ user, isOpen, setIsOpen }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.menu} ${isOpen ? styles.active : ''}`}>
        <ul className={styles.list}>
          <li className={styles.listItem} onClick={() => setIsOpen(false)}>
            <Link className={styles.link_menu} to='/'>HOME</Link>
          </li>
          <li className={styles.listItem} onClick={() => setIsOpen(false)}>
            <Link className={styles.link_menu} to='/menu'>MENU</Link>
          </li>
          <li className={styles.listItem} onClick={() => setIsOpen(false)}>
            <Link className={styles.link_menu} to='/admin/dashboard'>ADMIN</Link>
          </li>
          <li className={styles.listItem} onClick={() => setIsOpen(false)}>
            <Link className={styles.link_menu} to='/contact'>CONTACT</Link>
          </li>
          <li className={styles.listItem} onClick={() => setIsOpen(false)}>
            <Link className={styles.link_menu} to='/order'><button className={styles.button}>TRACK ORDER</button></Link>
          </li>
        </ul>
      </div>
    </div>
  );
}