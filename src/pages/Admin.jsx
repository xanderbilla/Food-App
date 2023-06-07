import styles from "../styles/admin.module.css";
import React from 'react'

const Admin = () => {
  return (
      <div className={styles.admin}>
          <span className={styles.header}>Admin Login</span>
          <form className={styles.form}>
              <div className={styles.inputArea}>
                <input className={styles.input} required type="text" name="username" placeholder="Username" />
              </div>
              <div className={styles.inputArea}>
                <input className={styles.input} required type="password" name="password" placeholder="Password" />
              </div>
              <button type='submit' className={styles.button}>Login</button>
          </form>
    </div>
  )
}

export default Admin