import React from 'react'
import styles from '../styles/toggleMenu.module.css'
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import ContactSupportOutlinedIcon from '@mui/icons-material/ContactSupportOutlined';
import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import { Link } from 'react-router-dom';
import ManageAccountsOutlinedIcon from '@mui/icons-material/ManageAccountsOutlined';
import { useSelector } from 'react-redux';

const ToggleMenu = ({ user }) => {
    const quantity = useSelector(state => state.cart.quantity)

    return (
        <div className={styles.container}>
            <Link to='/cart'><div className={`${styles.cart} ${user ? styles.hide : ''}`}>
                <img src="/img/cart.png" alt="" width="30" height="30" />
                <div className={styles.counter}>{quantity}</div>
            </div></Link>
            <Link to='/menu'><div className={`${styles.cart}`}>
                <RestaurantOutlinedIcon fontSize='large' style={{color:'white'}}/>
            </div></Link>
            <Link to='/contact'><div className={`${styles.cart}`}>
                <ContactSupportOutlinedIcon fontSize='large' style={{color:'white'}}/>
            </div></Link>
            <Link to='/order'><div className={`${styles.cart} ${user ? styles.hide : ''}`}>
                <DeliveryDiningOutlinedIcon fontSize='large' style={{color:'white'}}/>
            </div></Link>
            <Link to='/admin/dashboard'><div className={`${styles.cart}`}>
                <ManageAccountsOutlinedIcon fontSize='large' style={{color:'white'}}/>
            </div></Link>
        </div>
    )
}

export default ToggleMenu