import styles from "../styles/PizzaList.module.css";
import PizzaCard from "./PizzaCard"

const PizzaList = ({items}) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>SAVOR THE BEST OF OUR MENU</h1>
      <p className={styles.desc}>From savory starters to mouthwatering main courses and irresistible desserts, our featured items showcase the best flavors from around the world. 
      </p>
      <div className={styles.wrapper}>
        {items.map((item,i) => 
          <PizzaCard item={item} key={i}/>
        )}
      </div>
    </div>
  );
};

export default PizzaList;
