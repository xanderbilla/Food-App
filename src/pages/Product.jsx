import styles from "../styles/Product.module.css";
import { IngredientOptions } from '../components/IngredientOptions'
import { useState } from "react";

const Product = () => {
  const [size, setSize] = useState(0);

  const handleCart = () => {
    const quantityInput = document.querySelector(`.${styles.quantity}`);
    const quantity = quantityInput.value;
    const price = pizza.price[size];

    console.log("Price:", price);
    console.log("Size:", getSizeLabel(size));
    console.log("Quantity:", quantity);
  }

  const getSizeLabel = (size) => {
    if (size === 1) {
      return 'Medium';
    } else if (size === 2) {
      return 'Large';
    } else {
      return 'Small';
    }
  };

  const pizza = {
    id: 1,
    img: "/img/pizza.png",
    name: "CAMPAGNOLA",
    price: [19.9, 23.9, 27.9],
    desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis arcu purus, rhoncus fringilla vestibulum vel, dignissim vel ante. Nulla facilisi. Nullam a urna sit amet tellus pellentesque egestas in in ante.",
  };

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <img src={pizza.img} alt="" className={styles.mainImg} />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{pizza.name}</h1>
        <span className={styles.price}>₹ {pizza.price[size]}</span>
        <p className={styles.desc}>{pizza.desc}</p>
        <h3 className={styles.choose}>Choose the size</h3>
        <div className={styles.sizes}>
          <div className={styles.size} onClick={() => setSize(0)}>
            <img src="/img/size.png" alt="" className={styles.img} />
            <span className={styles.number}>Small</span>
          </div>
          <div className={styles.size} onClick={() => setSize(1)}>
            <img src="/img/size.png" alt="" className={styles.img} />
            <span className={styles.number}>Medium</span>
          </div>
          <div className={styles.size} onClick={() => setSize(2)}>
            <img src="/img/size.png" alt="" className={styles.img} />
            <span className={styles.number}>Large</span>
          </div>
        </div>
        <IngredientOptions />
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button} onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;
