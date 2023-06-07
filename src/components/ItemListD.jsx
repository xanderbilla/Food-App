import React from "react";
import styles from "../styles/itemList.module.css";

const ItemListD = () => {
  const products = [
    {
      productId: 1,
      productName: "Samosa",
      extras: "Garlic Chutney, Extra Spicy",
      price: 150.99,
      description: "Delicious samosas with a spicy kick",
      category: "Appetizers",
      img: "https://images.pexels.com/photos/1624473/pexels-photo-1624473.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      isNew: false,
    },
    // Add more product objects as needed
  ];

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Product ID</th>
          <th className={styles.th}>Product Name</th>
          <th className={styles.th}>Extras</th>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Category</th>
          <th className={styles.th}>Image</th>
          <th className={styles.th}>Is New</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product, index) => (
          <tr key={product.productId} className={index % 2 === 0 ? styles.evenRow : ""}>
            <td className={styles.td}>{product.productId}</td>
            <td className={styles.td}>{product.productName}</td>
            <td className={styles.td}>{product.extras}</td>
            <td className={styles.td}>₹{product.price}</td>
            <td className={styles.td}>{product.description}</td>
            <td className={styles.td}>{product.category}</td>
            <td className={styles.td}>
              <img src={product.img} alt={product.productName} className={styles.img} />
            </td>
              <td className={styles.td}>{product.isNew ? "Yes" : "No"}</td>
            <td className={styles.td}>
              <button className={styles.button}>Edit</button>
              <button className={styles.button}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ItemListD;
