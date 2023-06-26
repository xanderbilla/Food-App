import styles from "../styles/Product.module.css";
import { IngredientOptions } from '../components/IngredientOptions';
import { useEffect, useState } from "react";
import { API } from "aws-amplify";
import { useLocation } from "react-router-dom";
import { getImage } from "../utils/getImage";
import { addProduct } from "../redux/cartRedux";
import { useDispatch } from "react-redux";

const Product = () => {
  const [size, setSize] = useState(0);
  const [data, setData] = useState({});
  const loc = useLocation().pathname.split('/')[2];
  const [imageUrls, setImageUrls] = useState('');
  const [selectedExtras, setSelectedExtras] = useState([]);
  const dispatch = useDispatch();

  const apiName = 'foodAppApi';
  const path = `/client/products/${loc}`;

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

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getImage(data.img);
        setImageUrls(urls);
      } catch (error) {
        console.log('Error retrieving images:', error);
      }
    };

    if (data.img) {
      fetchImages();
    }

  }, [data.img]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    if (checked) {
      setSelectedExtras((prevExtras) => [...prevExtras, name]);
    } else {
      setSelectedExtras((prevExtras) => prevExtras.filter((extra) => extra !== name));
    }
  };

  const handleCart = () => {
    const quantityInput = document.querySelector(`.${styles.quantity}`);
    const quantity = parseInt(quantityInput.value);
    const price = data.price && data.price[size];
    const productData = {
      id: data.prodId,
      img: data.img,
      title: data.title,
      size: size,
      price: price,
      quantity: quantity,
      extras: selectedExtras
    };

    dispatch(addProduct(productData));
  };

  console.log(data.size);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <div className={styles.imgContainer}>
          <img src={imageUrls} alt={data.title} className={styles.mainImg} />
        </div>
      </div>
      <div className={styles.right}>
        <h1 className={styles.title}>{data.title}</h1>
        {data.price && <span className={styles.price}>₹ {data.price[size]}</span>}
        <p className={styles.desc}>{data.desc}</p>
        {data.size && data.size.length > 0 && <h3 className={styles.choose}>Choose the size</h3>}
        <div className={styles.sizes}>
          {data.size &&
            data.size.map((item, index) => (
              <div className={styles.size} key={index} onClick={() => setSize(index)}>
                {data.category==='Snacks' && <img src="/img/snack_size.png" alt="" className={styles.img} />}
                {data.category==='Beverage' && <img src="/img/dr_size.png" alt="" className={styles.img} />}
                {data.category==='Meal' && <img src="/img/meal_size.png" alt="" className={styles.img} />}
                {data.category==='Breakfast' && <img src="/img/bf_size.png" alt="" className={styles.img} />}
                {data.category==='Pizza' && <img src="/img/size.png" alt="" className={styles.img} />}
                <span className={styles.number}>{item}</span>
              </div>
            ))
          }
        </div>
        <IngredientOptions
          extras={data.extras}
          selectedExtras={selectedExtras}
          handleCheckboxChange={handleCheckboxChange}
        />
        <div className={styles.add}>
          <input type="number" defaultValue={1} className={styles.quantity} />
          <button className={styles.button} onClick={handleCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default Product;