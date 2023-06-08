import styles from "../styles/admin.module.css";
import React, { useState } from 'react'
import { Auth } from "aws-amplify";

const Admin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await Auth.signIn(username, password);
      window.location.replace('/admin/dashboard');
      console.log(user);
    } catch (error) {
      console.log('error signing in', error);
      setErrorMessage('Invalid Credentials')
    }
  };

  return (
    <div className={styles.admin}>
      <span className={styles.header}>Admin Login</span>
      <form className={styles.form}>
        <div className={styles.inputArea}>
          <input className={styles.input} required type="text" name="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
        </div>
        <div className={styles.inputArea}>
          <input className={styles.input} required type="password" name="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        {errorMessage && (
          <div className={styles.error}>
            <span className={styles.warning}>{errorMessage}</span>
          </div>
        )}
        <button className={styles.button} onClick={handleLogin}>Login</button>
      </form>
    </div>
  )
}

export default Admin