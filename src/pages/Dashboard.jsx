import React, { useState, useEffect } from "react";
import styles from "../styles/dashboard.module.css";
import OrderList from '../components/OrderList'
import ItemListD from "../components/ItemListD";
import NewProd from "../components/NewProd";
import { API } from 'aws-amplify'

const Dashboard = () => {
  const [prodData, setProdData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [activeTab, setActiveTab] = useState(1);
  const [isClick, setIsClick] = useState(false);

  const handleTabClick = (tabNumber) => {
    setActiveTab(tabNumber);
  };

  const handleForm = () => {
    setIsClick(!isClick);
  };

  const apiName = 'foodAppApi';

  const fetchProdData = async () => {
    try {
      const response = await API.get(apiName, '/admin/products');
      setProdData(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchProdData();
  }, []);

  const handleDelete = (id) => {
    API.del(apiName, `/admin/products/${id}`)
      .then((response) => {
        fetchProdData();
      })
      .catch((error) => {
        console.log("Error deleting product:", error.response);
      });
  };

  const fetchOrder = async () => {
    try {
      const response = await API.get(apiName, '/admin/orders');
      setOrderData(response);
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    fetchOrder();
  }, []);

  const handleNewProdSubmit = () => {
    fetchProdData();
  };

  return (
    <div className={styles.dashboard}>
      <div className={styles.heading}>
        <span className={styles.title}>Admin Dashboard</span>
        <button className={`${styles.button} ${isClick ? styles.hide : ''}`} onClick={handleForm}>Add Item</button>
      </div>
      {
        isClick ? <NewProd isClick={isClick} setIsClick={setIsClick} onSubmit={handleNewProdSubmit} /> : ''
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
        {activeTab === 1 && <ItemListD data={prodData} onDelete={handleDelete} fetch={fetchProdData} />}
        {activeTab === 2 && <OrderList data={orderData} />}
      </div>
    </div>
  );
};

export default Dashboard;