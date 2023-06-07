import MenuList from '../components/MenuList';
import styles from '../styles/menu.module.css';

const Menu = ({ data }) => {
  const categories = [...new Set(data.map(item => item.category))];

  return (
    <div className={styles.container}>
      <span className={styles.head}>Today's Menu List</span>
      {categories.slice(0, 3).map(category => (
        <MenuList
          key={category}
          category={category}
          items={data.filter(item => item.category === category)}
        />
      ))}
    </div>
  );
};

export default Menu;
