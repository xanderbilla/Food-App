import React, { useState } from "react";
import styles from "../styles/orderList.module.css";

const OrderList = () => {
    const data = [
        {
            orderId: 1,
            products: [
                {
                    id: 1,
                    name: "Samosa",
                    image: "product1.jpg",
                    quantity: 2,
                    extraIngredients: "Garlic Chutney, Extra Spicy",
                    price: 10.99,
                },
                {
                    id: 2,
                    name: "Dosa",
                    image: "product2.jpg",
                    quantity: 1,
                    extraIngredients: "Extra Chutney",
                    price: 8.99,
                },
            ],
            price: 29.97,
            quantity: 3,
            address: "123 Main St, City, State",
            paymentMode: "Credit Card",
            dateTime: "2023-06-07 10:00 AM",
            status: "Pending",
        },
        {
            orderId: 2,
            products: [
                {
                    id: 3,
                    name: "Pizza",
                    image: "product3.jpg",
                    quantity: 1,
                    extraIngredients: "Pepperoni, Mushrooms, Extra Cheese",
                    price: 12.99,
                },
                {
                    id: 4,
                    name: "Burger",
                    image: "product4.jpg",
                    quantity: 2,
                    extraIngredients: "Bacon, Pickles, Onions",
                    price: 9.99,
                },
            ],
            price: 32.97,
            quantity: 3,
            address: "456 Elm St, City, State",
            paymentMode: "Cash",
            dateTime: "2023-06-08 12:30 PM",
            status: "Preparing",
        },
        {
            orderId: 3,
            products: [
                {
                    id: 5,
                    name: "Pasta",
                    image: "product5.jpg",
                    quantity: 1,
                    extraIngredients: "Garlic Bread",
                    price: 11.99,
                },
                {
                    id: 6,
                    name: "Salad",
                    image: "product6.jpg",
                    quantity: 1,
                    extraIngredients: "Dressing: Ranch",
                    price: 7.99,
                },
            ],
            price: 19.98,
            quantity: 2,
            address: "789 Oak St, City, State",
            paymentMode: "Debit Card",
            dateTime: "2023-06-09 03:15 PM",
            status: "On the way",
        },
        {
            orderId: 4,
            products: [
                {
                    id: 7,
                    name: "Sushi",
                    image: "product7.jpg",
                    quantity: 3,
                    extraIngredients: "Wasabi, Soy Sauce, Ginger",
                    price: 14.99,
                },
            ],
            price: 44.97,
            quantity: 3,
            address: "321 Pine St, City, State",
            paymentMode: "PayPal",
            dateTime: "2023-06-10 06:45 PM",
            status: "Delivered",
        }


        // Add more data as needed
    ];

    const [statuses, setStatuses] = useState(data.map((order) => order.status));

    const handleNextStageClick = (orderId) => {
        const updatedStatuses = statuses.map((status, index) =>
            index === orderId - 1
                ? status === "Pending"
                    ? "Preparing"
                    : status === "Preparing"
                        ? "On the way"
                        : "Delivered"
                : status
        );
        setStatuses(updatedStatuses);
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
                    { orderId, productIds: [productId] }
                ];
            } else {
                const productIndex = prevSelectedProductIds[orderIndex].productIds.findIndex(
                    (id) => id === productId
                );

                if (productIndex === -1) {
                    return [
                        ...prevSelectedProductIds.slice(0, orderIndex),
                        {
                            orderId,
                            productIds: [...prevSelectedProductIds[orderIndex].productIds, productId]
                        },
                        ...prevSelectedProductIds.slice(orderIndex + 1)
                    ];
                } else {
                    return [
                        ...prevSelectedProductIds.slice(0, orderIndex),
                        {
                            orderId,
                            productIds: [
                                ...prevSelectedProductIds[orderIndex].productIds.slice(0, productIndex),
                                ...prevSelectedProductIds[orderIndex].productIds.slice(productIndex + 1)
                            ]
                        },
                        ...prevSelectedProductIds.slice(orderIndex + 1)
                    ];
                }
            }
        });
    };

    const isProductSelected = (orderId, productId) => {
        const order = selectedProductIds.find((item) => item.orderId === orderId);
        return order && order.productIds && order.productIds.includes(productId);
    };

    const sortedData = [...data].sort((a, b) => {
        return new Date(b.dateTime) - new Date(a.dateTime);
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
                        <th className={styles.th}>Date & Time</th>
                        <th className={styles.th}>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedData.map((order, index) => (
                        <tr key={order.orderId}>
                            <td className={styles.td}>{order.orderId}</td>
                            <td className={styles.td}>
                                {order.products.map((product) => (
                                    <p
                                        key={product.id}
                                        className={`${styles.productName} ${isProductSelected(order.orderId, product.id)
                                            ? styles.selectedProduct
                                            : ""
                                            }`}
                                        onClick={() => handleProductClick(order.orderId, product.id)}
                                    >
                                        {product.name}
                                    </p>
                                ))}
                                {selectedProductIds.some((item) => item.orderId === order.orderId) && (
                                    <div className={styles.productDetails}>
                                        {order.products.map((product) => {
                                            if (isProductSelected(order.orderId, product.id)) {
                                                return (
                                                    <div key={product.id}>
                                                        <p>
                                                            <strong>Quantity:</strong> {product.quantity}
                                                        </p>
                                                        <p>
                                                            <strong>Price:</strong>  {product.price.toFixed(2)}
                                                        </p>
                                                        <p>
                                                            <strong>Extras:</strong> {product.extraIngredients}
                                                        </p>
                                                    </div>
                                                );
                                            }
                                            return null;
                                        })}
                                    </div>
                                )}
                            </td>
                            <td className={styles.td}>₹{order.price.toFixed(2)}</td>
                            <td className={styles.td}>{order.quantity}</td>
                            <td className={styles.td}>{order.address}</td>
                            <td className={styles.td}>{order.paymentMode}</td>
                            <td className={styles.td}>{order.dateTime}</td>
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