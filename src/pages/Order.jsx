import { useLocation } from "react-router-dom";
import styles from "../styles/Order.module.css";
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { LazyLoadImage } from "react-lazy-load-image-component";

const Order = () => {
  const [data, setData] = useState([]);
  const location = useLocation().pathname.split("/")[2];
  console.log(location);

  const apiName = "foodAppApi";
  const path = `/client/orders/${location}`;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await API.get(apiName, path);
        setData(response);
      } catch (error) {
        console.log(error.response);
      }
    };

    fetchData();
  }, []);

  let status = 0;

  if (data.status === "Pending") {
    status = 0;
  } else if (data.status === "Preparing") {
    status = 1;
  } else if (data.status === "On the way") {
    status = 2;
  } else if (data.status === "Delivered") {
    status = 3;
  }

  const statusClass = (index) => {
    if (index < status) return styles.done;
    if (index === status) return styles.inProgress;
    if (index > status) return styles.undone;
  };
  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.row}>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTitle}>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Address</th>
                <th>Total</th>
              </tr>
            </tbody>
            <tbody>
              <tr className={styles.tr}>
                <td>
                  <span className={styles.id}>{data.orderId}</span>
                </td>
                <td>
                  <span className={styles.name}>{data.custName}</span>
                </td>
                <td>
                  <span className={styles.address}>{data.address}</span>
                </td>
                <td>
                  <span className={styles.total}>₹{data.product && data.product.total}</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.row}>
          <div className={statusClass(0)}>
            <LazyLoadImage src="/img/paid.png" width={30} height={30} alt="" />
            <span>Pending</span>
            <div className={styles.checkedIcon}>
              <img
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(1)}>
            <LazyLoadImage src="/img/bake.png" width={30} height={30} alt="" />
            <span>Preparing</span>
            <div className={styles.checkedIcon}>
              <img
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(2)}>
            <LazyLoadImage src="/img/bike.png" width={30} height={30} alt="" />
            <span>On the way</span>
            <div className={styles.checkedIcon}>
              <img
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
          <div className={statusClass(3)}>
            <LazyLoadImage src="/img/delivered.png" width={30} height={30} alt="" />
            <span>Delivered</span>
            <div className={styles.checkedIcon}>
              <img
                className={styles.checkedIcon}
                src="/img/checked.png"
                width={20}
                height={20}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <div className={styles.right}>
        <div className={styles.wrapper}>
          <h2 className={styles.title}>CART TOTAL</h2>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Subtotal:</b>₹ {data.product && data.product.total}
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Discount:</b>₹ 0.00
          </div>
          <div className={styles.totalText}>
            <b className={styles.totalTextTitle}>Total:</b>₹ {data.product && data.product.total}
          </div>
          <button disabled className={styles.button}>
            {data.paymentMethod === 'COD' ?
              'CASH ON DELIVERY'
              :
              'PAID'
            }
          </button>
        </div>
      </div>
    </div>
  );
};

export default Order;
