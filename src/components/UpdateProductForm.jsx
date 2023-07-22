import React, { useEffect, useState } from 'react';
import styles from '../styles/newProd.module.css';
import { API, Storage } from 'aws-amplify';

const NewProd = ({ item, click, setClick, fetch }) => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState('');
  const [prices, setPrices] = useState([]);
  const [priceInput, setPriceInput] = useState('');
  const [category, setCategory] = useState('');
  const [extras, setExtras] = useState([]);
  const [size, setSize] = useState([]);
  const [sizeInput, setSizeInput] = useState('');
  const [extrasInput, setExtrasInput] = useState('');
  const [desc, setDesc] = useState('');
  const [img, setImage] = useState(null);
  const [isNew, setIsNew] = useState('no');
  const [isSize, setIsSize] = useState('no');
  const [updateStatus, setUpdateStatus] = useState('');

  const apiName = 'FoodAppAPI';
  const path = `/admin/products/${item}`;

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
  }, [path]);

  const handleExtrasInput = (e) => {
    if (e.key === 'Tab' && e.target.value.trim() !== '') {
      setExtras((prevExtras) => [...prevExtras, e.target.value.trim()]);
      setExtrasInput('');
    }
  };

  const handleSizeInput = (e) => {
    if (e.key === 'Tab' && e.target.value.trim() !== '') {
      setSize((prevSize) => [...prevSize, e.target.value.trim()]);
      setSizeInput('');
    }
  };

  const handlePriceInput = (e) => {
    if (e.key === 'Tab' && e.target.value.trim() !== '') {
      setPrices((prevPrices) => [...prevPrices, parseFloat(e.target.value)]);
      setPriceInput('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (img) {
        const file = img;
        await Storage.put(file.name, file, {
          contentType: 'image/png',
        });
        console.log('File uploaded successfully.');
      }
    } catch (error) {
      console.log('Error uploading file:', error);
    }


    const apiName = 'FoodAppAPI';
    const myInit = {
      body: {
        title: title || data.title,
        price: prices.length > 0 ? prices : data.price,
        category: category || data.category,
        extras: extras.length > 0 ? extras : data.extras,
        size: size.length > 0 ? size : data.size,
        desc: desc || data.desc,
        img: img ? img.name : data.img,
        isNew: isNew || data.isNew,
      },
    };

    API.put(apiName, path, myInit)
      .then((response) => {
        console.log(myInit.body);
        fetch()
        setClick(!click)
      })
      .catch((error) => {
        console.log(error.response);
        setUpdateStatus('Something went wrong');
      });

    setTitle('');
    setPrices([]);
    setCategory('');
    setExtras([]);
    setSize([]);
    setDesc('');
    setImage(null);
    setIsNew('no');
  };

  return (
    <div className={styles.container}>
      {updateStatus && <p className={styles.error}>{updateStatus}</p>}
      <form action="" className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.column}>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              type="text"
              name="Title"
              placeholder={data.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className={styles.inputArea}>
            <textarea
              className={styles.input}
              name="description"
              placeholder={data.desc}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            ></textarea>
          </div>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              type="text"
              name="price"
              placeholder="Price - Press Tab To Enter More"
              value={priceInput}
              onChange={(e) => setPriceInput(e.target.value)}
              onKeyDown={handlePriceInput}
            />
            <ul className={styles.extras}>
              {prices.map((price, index) => (
                <li key={index} className={styles.extra}>{price}</li>
              ))}
            </ul>
          </div>
          <div className={styles.inputArea}>
            <select
              className={styles.input}
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="" disabled>
                Select Category
              </option>
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
            <input
              className={styles.input}
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
            />
          </div>
          <div className={styles.inputRadio}>
            <label htmlFor="isNew">Is New</label>
            <div className={styles.radioBtn}>
              <input
                className={styles.radio}
                type="radio"
                id="isNewYes"
                name="isNew"
                value="yes"
                checked={isNew === 'yes'}
                onChange={(e) => setIsNew(e.target.value)}
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
                onChange={(e) => setIsNew(e.target.value)}
              />
              <label htmlFor="isNewNo">No</label>
            </div>
          </div>
          <div className={styles.inputArea}>
            <input
              className={styles.input}
              type="text"
              name="extras"
              placeholder="Extras - Press Tab To Enter More"
              value={extrasInput}
              onChange={(e) => setExtrasInput(e.target.value)}
              onKeyDown={handleExtrasInput}
            />
            <ul className={styles.extras}>
              {extras.map((extra, index) => (
                <li key={index} className={styles.extra}>{extra}</li>
              ))}
            </ul>
          </div>
          <div className={isSize === 'no' ? `${styles.inputArea}` : `${styles.inputArea} ${styles.hide}`}>
            <label htmlFor="size">Want to add size?</label>
            <div className={styles.radioBtn}>
              <input
                className={styles.radio}
                type="radio"
                id="size"
                name="size"
                value="yes"
                checked={isSize === 'yes'}
                onChange={(e) => setIsSize(e.target.value)}
              />
              <label htmlFor="size">Yes</label>
            </div>
            <div className={styles.radioBtn}>
              <input
                className={styles.radio}
                type="radio"
                id="sizeNo"
                name="size"
                value="no"
                checked={isSize === 'no'}
                onChange={(e) => setIsSize(e.target.value)}
              />
              <label htmlFor="sizeNo">No</label>
            </div>
          </div>
          {
            isSize === 'yes' &&
            <div className={styles.inputArea}>
              <input
                className={styles.input}
                type="text"
                name="size"
                placeholder="Size - Press Tab To Enter More"
                value={sizeInput}
                onChange={(e) => setSizeInput(e.target.value)}
                onKeyDown={handleSizeInput}
              />
              <ul className={styles.extras}>
                {size.map((size, index) => (
                  <li key={index} className={styles.extra}>{size}</li>
                ))}
              </ul>
            </div>
          }
          <div className={styles.action}>
            <button type="submit" className={styles.button}>
              Update Product
            </button>
            <button className={styles.button} onClick={() => setClick(!click)}>
              Cancel
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default NewProd;
