import { Link } from 'react-router-dom';
import styles from '../styles/PizzaCard.module.css';

const PizzaCard = ({ item }) => {
  console.log(item);
  return (
    <Link to={`/product/${item.id}`} className={styles.link}>
      <div className={styles.container}>
        <img src="/img/pizza.png" alt="" className={styles.img} />
        <div>
        <h1 className={styles.title}>{item.title}</h1>
        <span className={styles.price}>{item.price}</span>
        <p className={styles.desc}>{item.desc}</p>
        </div>
      </div>
    </Link>
  );
};

export default PizzaCard;