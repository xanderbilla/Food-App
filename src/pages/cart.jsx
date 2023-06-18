import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import OdCart from "../components/OdCart";
import styles from "../styles/Cart.module.css";
import { removeProduct } from "../redux/cartRedux";
import DeleteIcon from "@mui/icons-material/Delete";
import CartSummary from "../components/CartSummary";
import { getImage } from "../utils/getImage";

const Cart = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [productImages, setProductImages] = useState([]);

  useEffect(() => {
    const fetchProductImages = async () => {
      const imagePromises = cart.products.map((product) =>
        getImage(product.img)
      );
      const images = await Promise.all(imagePromises);
      setProductImages(images);
    };

    fetchProductImages();
  }, [cart.products]);

  const deleteItem = (productId) => {
    dispatch(removeProduct({ productId }));
  };
  
  const getSizeLabel = (size) => {
    if (size === 0) {
      return "Small";
    } else if (size === 1) {
      return "Medium";
    } else if (size === 2) {
      return "Full";
    }
    return "";
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.title}>My Cart</span>
        <button className={styles.button}>Continue Shopping</button>
      </div>
      {
        cart.quantity !== 0 ?
          <>
            <div className={styles.top}>
              <table className={styles.table}>
                <tbody>
                  <tr className={styles.trTitle}>
                    <th className={styles.th}>Product</th>
                    <th className={styles.th}>Name</th>
                    <th className={styles.th}>Extras</th>
                    <th className={styles.th}>Price</th>
                    <th className={styles.th}>Quantity</th>
                    <th className={styles.th}>Total</th>
                  </tr>
                </tbody>
                <tbody>
                  {cart.products.map((product, index) => (
                    <tr className={styles.tr} key={product.prodId}>
                      <td className={styles.td}>
                        <div className={styles.imgContainer}>
                          <img
                            className={styles.img}
                            src={productImages[index]}
                            alt={product.title}
                          />
                        </div>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.name}>{product.title}</span>
                        <span className={styles.badge}>
                          {getSizeLabel(product.size)}
                        </span>
                      </td>
                      <td className={styles.td}>
                        {product.extras.length > 0 ? (
                          product.extras.map((amt) => (
                            <span className={styles.badge} key={amt}>
                              {amt}
                            </span>
                          ))
                        ) : (
                          <span className={styles.badge}>None</span>
                        )}
                      </td>
                      <td className={styles.td}>
                        <span className={styles.price}>₹ {product.price}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.quantity}>{product.quantity}</span>
                      </td>
                      <td className={styles.td}>
                        <span className={styles.total}>
                          ₹ {product.price * product.quantity}
                          <button
                            className={styles.actBtn}
                            onClick={() => deleteItem(product.id)}
                          >
                            <DeleteIcon />
                          </button>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={styles.d_change}>
              <OdCart cart={cart} />
            </div>
            <div className={styles.bottom}>
              <CartSummary />
            </div>
          </>
          :
          <div className={styles.message}>Your Cart is Empty</div>
      }
    </div>
  );
};

export default Cart;
