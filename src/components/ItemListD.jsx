import React, { useEffect, useState } from "react";
import styles from "../styles/itemList.module.css";
import { getImage } from "../utils/getImage";

const ItemListD = ({ data, onDelete }) => {
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async () => {
      const urls = await Promise.all(
        data.map(async (product) => {
          const imageUrl = await getImage(product.img);
          return imageUrl;
        })
      );
      setImageUrls(urls);
    };

    fetchImageUrls();
  }, [data]);

  const handleDelete = (id) => {
    onDelete(id);
  };
  return (
    <div className={styles.tableContainer}>
       <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Product ID</th>
          <th className={styles.th}>Product Name</th>
          <th className={styles.th}>Image</th>
          <th className={styles.th}>Price</th>
          <th className={styles.th}>Size</th>
          <th className={styles.th}>Description</th>
          <th className={styles.th}>Category</th>
          <th className={styles.th}>Extras</th>
          <th className={styles.th}>Is New</th>
          <th className={styles.th}>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product, index) => (
          <tr key={product.prodId} className={index % 2 === 0 ? styles.evenRow : ""}>
            <td className={styles.td}>{product.prodId}</td>
            <td className={styles.td}>{product.title}</td>
            <td className={styles.td}>
              <img src={imageUrls[index]} alt={product.productName} className={styles.img} />
            </td>
            <td className={styles.td}>
              {
                product.price.map((amt) =>
                  <span className={styles.badge} key={amt}>{amt}</span>
                )
              }
            </td>
            <td className={styles.td}>
              {
                product.size.length > 0 ?
                product.size.map((amt) =>
                <span className={styles.badge} key={amt}>{amt}</span>
                  )
                  :
                <span className={styles.badge}>None</span>
              }
            </td>
            <td className={styles.td}>{product.desc.slice(0, 18) + '...'}</td>
            <td className={styles.td}>{product.category}</td>
            <td className={styles.td}>
              {
                product.extras.length > 0 ?
                product.extras.map((amt) =>
                <span className={styles.badge} key={amt}>{amt}</span>
                  )
                  :
                <span className={styles.badge}>None</span>
              }
            </td>
            <td className={styles.td}>{product.isNew ? "Yes" : "No"}</td>
            <td className={styles.td}>
              <button className={styles.button}>Edit</button>
              <button className={styles.button} onClick={() => handleDelete(product.prodId)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
   </div>
  );
};

export default ItemListD;
