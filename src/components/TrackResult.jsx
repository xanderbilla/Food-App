import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/trackResult.module.css";
import FormattedDate from "./FormattedDate";

const TrackResult = ({ data, onCancel }) => {
  const sortedData = [...data].sort(
    (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
  );

  const handleCancel = (orderId) => {
    onCancel(orderId);
  };

  const renderCancelBtn = (status, orderId) => {
    if (status === "Pending" || status === "Preparing") {
      return <button className={styles.cancelBtn} onClick={() => handleCancel(orderId)}>Cancel</button>;
    }
    return null;
  };

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Order ID</th>
          <th className={styles.th}>Order Date</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Address</th>
          <th className={styles.th}>Amount</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}>Action</th>
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row, index) => (
          <tr key={index} className={index % 2 === 0 ? styles.evenRow : ""}>
            <td>
              <Link to={`/order/${row.orderId}`} className={styles.link}>
                {row.orderId}
              </Link>
            </td>
            <td className={styles.td}>
              <FormattedDate timestamp={row.timestamp} />
            </td>
            <td className={styles.td}>{row.custName}</td>
            <td className={styles.td}>{row.address}</td>
            <td className={styles.td}>₹{row.product && row.product.total}</td>
            <td className={styles.td}>{row.status}</td>
            <td className={styles.td}>{renderCancelBtn(row.status, row.orderId)}</td>
          </tr>
        ))}
      </tbody>
    </table>
    </div>
  );
};

export default TrackResult;