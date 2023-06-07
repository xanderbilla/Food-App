import React, { useState } from 'react';
import styles from '../styles/newProd.module.css';

const NewProd = ({ isClick, setIsClick }) => {
  const [category, setCategory] = useState('');
  const [extras, setExtras] = useState([]);
  const [extrasInput, setExtrasInput] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [isNew, setIsNew] = useState('no');

  const handleExtrasInput = (e) => {
    if (e.key === 'Enter' && e.target.value.trim() !== '') {
      setExtras((prevExtras) => [...prevExtras, e.target.value.trim()]);
      setExtrasInput('');
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const handleIsNewChange = (e) => {
    setIsNew(e.target.value);
  };

  const handleCancel = () => {
    setIsClick(!isClick);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Title:', e.target.elements.Title.value);
    console.log('Description:', description);
    console.log('Price:', e.target.elements.price.value);
    console.log('Image:', image);
    console.log('Category:', category);
    console.log('IsNew:', isNew);
    console.log('Extras:', extras);
  };

  return (
    <div className={styles.container}>
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.column}>
          <div className={styles.inputArea}>
            <input className={styles.input} type="text" name="Title" placeholder="Title" />
          </div>
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              name="description"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.inputArea}>
            <input className={styles.input} type="text" name="price" placeholder="Price" />
          </div>
          <div className={styles.inputArea}>
            <select
              className={styles.input}
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>Select Category</option>
              <option value="Snacks">Snacks</option>
              <option value="Beverage">Beverage</option>
              <option value="Meal">Meal</option>
              <option value="Breakfast">Breakfast</option>
              <option value="Pizza">Pizza</option>
            </select>
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.inputArea}>
            <input className={styles.input} type="file" accept="image/*" onChange={handleImageUpload} />
          </div>
          <div className={styles.inputRadio}>
            <div className={styles.radioBtn}>
              <input
                className={styles.radio}
                type="radio"
                id="isNewYes"
                name="isNew"
                value="yes"
                checked={isNew === 'yes'}
                onChange={handleIsNewChange}
              />
              <label htmlFor="isNewYes">Yes</label>
            </div>
            <div className={styles.radioBtn}>
              <input
                className={styles.radio}
                type="radio"
                id="isNewNo"
                name="isNew"
                value="no"
                checked={isNew === 'no'}
                onChange={handleIsNewChange}
              />
              <label htmlFor="isNewNo">No</label>
            </div>
          </div>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              type="text"
              name="extras"
              placeholder="Extras"
              value={extrasInput}
              onChange={(e) => setExtrasInput(e.target.value)}
              onKeyDown={handleExtrasInput}
            />
            <ul className={styles.extras}>
              {extras.map((extra, index) => (
                <li key={index}>{extra}</li>
              ))}
            </ul>
          </div>
          <div className={styles.action}>
            <button type="submit" className={styles.button}>
              Submit
            </button>
            <button className={styles.button} onClick={handleCancel}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProd;
