import React, { useState } from 'react'
import styles from '../styles/toggleMenu.module.css'
import Sidebar from './Sidebar';

const ToggleMenu = ({ user }) => {
    const [isOpen, setIsOpen] = useState(false)


    const handleClick = () => {
        setIsOpen(!isOpen);
        if (!isOpen) {
            document.body.classList.add(styles.noScroll);
        } else {
            document.body.classList.remove(styles.noScroll);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.toggleButton}>
                <div className={styles.hamburger} onClick={handleClick}>
                    <span className={`${styles.lines} ${isOpen ? styles.open : ''}`}></span>
                    <span className={`${styles.lines} ${isOpen ? styles.hide : ''}`}></span>
                    <span className={`${styles.lines} ${isOpen ? styles.close : ''}`}></span>
                </div>
            </div>
            <div className={`${styles.cart} ${user ? styles.hide : ''}`}>
                <img src="/img/cart.png" alt="" width="30" height="30" />
                <div className={styles.counter}>2</div>
            </div>
            {
                isOpen && <Sidebar user={user} isOpen={isOpen} setIsOpen={setIsOpen}/>
            }
        </div>
    )
}

export default ToggleMenu