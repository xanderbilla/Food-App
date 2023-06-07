import React from "react";
import { Link } from "react-router-dom";
import styles from "../styles/trackResult.module.css";
import FormattedDate from "./FormattedDate";

const TrackResult = () => {
  const data = [
    {
      orderId: 1,
      name: "John Doe",
      address: "#5 45th Main, 2nd Cross, Indu Colony, JP Nagar, Bangalore - 560076",
      amount: 100,
      status: "Completed",
      timestamp: "2023-06-01T10:30:00Z",
    },
    {
      orderId: 2,
      name: "Jane Smith",
      address: "#56 4th Main, 1st Cross, Maya Nagar, Marathalli, Bangalore - 560076",
      amount: 150,
      status: "Pending",
      timestamp: "2023-06-02T14:45:00Z",
    },
    // Add more data rows as needed
  ];

  // Sort the data by timestamp in descending order
  const sortedData = [...data].sort(
    (a, b) => Date.parse(b.timestamp) - Date.parse(a.timestamp)
  );

  const renderCancelBtn = (status) => {
    if (status === "Pending" || status === "Preparing") {
      return <button className={styles.cancelBtn}>Cancel</button>;
    }
    return null;
  };

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th className={styles.th}>Order ID</th>
          <th className={styles.th}>Order Date</th>
          <th className={styles.th}>Name</th>
          <th className={styles.th}>Phone Number</th>
          <th className={styles.th}>Amount</th>
          <th className={styles.th}>Status</th>
          <th className={styles.th}></th>
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
            <td className={styles.td}>{row.name}</td>
            <td className={styles.td}>{row.address}</td>
            <td className={styles.td}>₹{row.amount}</td>
            <td className={styles.td}>{row.status}</td>
            <td className={styles.td}>{renderCancelBtn(row.status)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TrackResult;