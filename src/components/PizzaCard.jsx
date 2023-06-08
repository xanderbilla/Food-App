import { Link } from 'react-router-dom';
import styles from '../styles/PizzaCard.module.css';
import { useEffect, useState } from 'react';
import { getImage } from '../utils/getImage'

const PizzaCard = ({ item }) => {
  const [imageUrls, setImageUrls] = useState('');
  
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const urls = await getImage(item.img);
        setImageUrls(urls);
      } catch (error) {
        console.log('Error retrieving images:', error);
      }
    };

    fetchImages();
  }, [item.img]);
  
  const getMinimumPrice = () => {
    if (item.price && item.price.length > 0) {
      return Math.min(...item.price);
    }
    return 0;
  };

  return (
    <Link to={`/product/${item.prodId}`} className={styles.link}>
      <div className={styles.container}>
        <div className={styles.left}>
        <img src={imageUrls} alt={item.title} className={styles.img} />
        </div>
        <div className={styles.right}>
          <h1 className={styles.title}>{item.title}</h1>
          <span className={styles.price}>₹ {getMinimumPrice()}</span>
          <p className={styles.desc}>{item.desc.slice(0,60)}</p>
        </div>
      </div>
    </Link>
  );
};

export default PizzaCard;
