import React, { useEffect, useState } from "react";
import styles from "../styles/orderList.module.css";
import { API } from "aws-amplify";

const OrderList = ({ data }) => {
  const apiName = 'foodAppApi';
  const [orderData, setOrderData] = useState(data);

  const handleNextStageClick = (orderId) => {
    const updatedData = orderData.map((order) => {
      if (order.orderId === orderId) {
        let newStatus;
        switch (order.status) {
          case "Pending":
            newStatus = "Preparing";
            break;
          case "Preparing":
            newStatus = "On the way";
            break;
          case "On the way":
            newStatus = "Delivered";
            break;
          default:
            newStatus = order.status;
        }
        // Update the status locally
        return { ...order, status: newStatus };
      }
      return order;
    });
  
    // Update the status to the API
    const myInit = {
      body: {
        status: updatedData.find((order) => order.orderId === orderId)?.status,
      },
    };
  
    API.put(apiName, `/admin/orders/${orderId}`, myInit)
      .then((response) => {
        // Handle success response if needed
      })
      .catch((error) => {
        console.log(error.response);
      });
  
    // Update the state with the new status
    setOrderData(updatedData);
  };

  const [selectedProductIds, setSelectedProductIds] = useState([]);

  const handleProductClick = (orderId, productId) => {
    setSelectedProductIds((prevSelectedProductIds) => {
      const orderIndex = prevSelectedProductIds.findIndex(
        (item) => item.orderId === orderId
      );

      if (orderIndex === -1) {
        return [
          ...prevSelectedProductIds,
          { orderId, productIds: [productId] },
        ];
      } else {
        const productIndex = prevSelectedProductIds[
          orderIndex
        ].productIds.findIndex((id) => id === productId);

        if (productIndex === -1) {
          return [
            ...prevSelectedProductIds.slice(0, orderIndex),
            {
              orderId,
              productIds: [
                ...prevSelectedProductIds[orderIndex].productIds,
                productId,
              ],
            },
            ...prevSelectedProductIds.slice(orderIndex + 1),
          ];
        } else {
          return [
            ...prevSelectedProductIds.slice(0, orderIndex),
            {
              orderId,
              productIds: [
                ...prevSelectedProductIds[orderIndex].productIds.slice(
                  0,
                  productIndex
                ),
                ...prevSelectedProductIds[orderIndex].productIds.slice(
                  productIndex + 1
                ),
              ],
            },
            ...prevSelectedProductIds.slice(orderIndex + 1),
          ];
        }
      }
    });
  };

  const isProductSelected = (orderId, productId) => {
    const order = selectedProductIds.find((item) => item.orderId === orderId);
    return (
      order &&
      order.productIds &&
      order.productIds.includes(productId)
    );
  };

  const sortedData = [...data].sort((a, b) => {
    return new Date(b.timestamp) - new Date(a.timestamp);
  });

  return (
    <div className={styles.container}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th className={styles.th}>Order ID</th>
            <th className={styles.th}>Products</th>
            <th className={styles.th}>Price</th>
            <th className={styles.th}>Quantity</th>
            <th className={styles.th}>Address</th>
            <th className={styles.th}>Payment Mode</th>
            <th className={styles.th}>Date &amp; Time</th>
            <th className={styles.th}>Status</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((order, index) => (
            <tr key={order.orderId}>
              <td className={styles.td}>{order.orderId}</td>
              <td className={styles.td}>
                {order.product.products.map((product) => (
                  <p
                    key={product.id}
                    className={`${styles.productName} ${
                      isProductSelected(order.orderId, product.id)
                        ? styles.selectedProduct
                        : ""
                    }`}
                    onClick={() =>
                      handleProductClick(order.orderId, product.id)
                    }
                  >
                    {product.title}
                  </p>
                ))}
                {selectedProductIds.some(
                  (item) => item.orderId === order.orderId
                ) && (
                  <div className={styles.productDetails}>
                    {order.product.products.map((product) => {
                      if (isProductSelected(order.orderId, product.id)) {
                        return (
                          <div key={product.id}>
                            <p>
                              <strong>Quantity:</strong> {product.quantity}
                            </p>
                            <p>
                              <strong>Price:</strong>{" "}
                              {product.price.toFixed(2)}
                            </p>
                            <p>
                              <strong>Extras:</strong>{" "}
                              {product.extras.join(", ")}
                            </p>
                          </div>
                        );
                      }
                      return null;
                    })}
                  </div>
                )}
              </td>
              <td className={styles.td}>₹{order.product.total.toFixed(2)}</td>
              <td className={styles.td}>{order.product.quantity}</td>
              <td className={styles.td}>{order.address}</td>
              <td className={styles.td}>{order.paymentMode}</td>
              <td className={styles.td}>{order.timestamp}</td>
              <td className={styles.td}>
                {order.status}
                {order.status !== "Delivered" && (
                  <button
                    className={styles.button}
                    onClick={() => handleNextStageClick(order.orderId)}
                  >
                    Next Stage
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderList;
