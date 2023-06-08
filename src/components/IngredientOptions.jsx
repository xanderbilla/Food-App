import React from 'react';
import styles from '../styles/Product.module.css';

export const IngredientOptions = ({ extras, selectedExtras, handleCheckboxChange }) => {
  if (!extras || extras.length === 0) {
    return null;
  }

  return (
    <>
      <h3 className={styles.choose}>Choose additional ingredients</h3>
      <div className={styles.ingredients}>
        {extras.map((extra) => (
          <div className={styles.option} key={extra}>
            <input
              type="checkbox"
              id={extra}
              name={extra}
              className={styles.checkbox}
              checked={selectedExtras.includes(extra)}
              onChange={handleCheckboxChange}
            />
            <label htmlFor={extra}>{extra}</label>
          </div>
        ))}
      </div>
    </>
  );
};
