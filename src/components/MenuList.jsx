import { Link } from 'react-router-dom';
import styles from '../styles/menu.module.css'
import PizzaCard from './PizzaCard'

const MenuList = ({ category, items }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <span className={styles.title}>{category}</span>
        <Link to={`/menu/${category}`}><button className={styles.button}>View All</button></Link>
      </div>
      <div className={styles.listItem}>
        {items.slice(0, 3).map((item, index) => (
          <PizzaCard
            key={index}
            item={item}
          />
        ))}
      </div>
    </div>
  )
}

export default MenuList;