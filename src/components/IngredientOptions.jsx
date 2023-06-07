import React, { useState } from 'react';
import styles from '../styles/Product.module.css'

export const IngredientOptions = () => {
  const [double, setDouble] = useState(false);
  const [cheese, setCheese] = useState(false);
  const [spicy, setSpicy] = useState(false);
  const [garlic, setGarlic] = useState(false);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;

    switch (name) {
      case 'double':
        setDouble(checked);
        break;
      case 'cheese':
        setCheese(checked);
        break;
      case 'spicy':
        setSpicy(checked);
        break;
      case 'garlic':
        setGarlic(checked);
        break;
      default:
        break;
    }

    console.log(name, checked);
  };

  return (
    <>
      <h3 className={styles.choose}>Choose additional ingredients</h3>
      <div className={styles.ingredients}>
        <div className={styles.option}>
          <input
            type="checkbox"
            id="double"
            name="double"
            className={styles.checkbox}
            checked={double}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="double">Double Ingredients</label>
        </div>
        <div className={styles.option}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="cheese"
            name="cheese"
            checked={cheese}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="cheese">Extra Cheese</label>
        </div>
        <div className={styles.option}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="spicy"
            name="spicy"
            checked={spicy}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="spicy">Spicy Sauce</label>
        </div>
        <div className={styles.option}>
          <input
            className={styles.checkbox}
            type="checkbox"
            id="garlic"
            name="garlic"
            checked={garlic}
            onChange={handleCheckboxChange}
          />
          <label htmlFor="garlic">Garlic Sauce</label>
        </div>
      </div>
    </>
  );
}
