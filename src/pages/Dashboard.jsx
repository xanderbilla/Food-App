import React, { useState } from "react";
import styles from "../styles/dashboard.module.css";
import OrderList from '../components/OrderList'
import ItemListD from "../components/ItemListD";
import NewProd from "../components/NewProd";
const Dashboard = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isClick, setIsClick] = useState(true)
  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleForm = () => {
    setIsClick(!isClick)
  }

  return (
    <div className={styles.dashboard}>
      <div className={styles.heading}>
        <span className={styles.title}>Admin Dashboard</span>
        <button className={`${styles.button} ${isClick ? styles.hide : ''}`} onClick={handleForm}>Add Item</button>
      </div>
      {
        isClick ? <NewProd isClick={isClick} setIsClick={setIsClick} /> : ''
      }
      <div className={styles.tab_header}>
        <button
          className={activeTab === 1 ? styles.active : ""}
          onClick={() => handleTabClick(1)}
        >
          Products
        </button>
        <button
          className={activeTab === 2 ? styles.active : ""}
          onClick={() => handleTabClick(2)}
        >
          Orders
        </button>
      </div>
      <div className={styles["tab-content"]}>
        {activeTab === 1 && <ItemListD />}
        {activeTab === 2 && <OrderList />}
      </div>
    </div>
  );
};

export default Dashboard;
