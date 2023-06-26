import MenuList from '../components/MenuList';
import CachedIcon from '@mui/icons-material/Cached';
import styles from '../styles/menu.module.css';

const Menu = ({ data, fetch }) => {
  const categories = [...new Set(data.map(item => item.category))];

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <span className={styles.head}>Today's Menu List</span>
        <button onClick={fetch} className={styles.cache}><CachedIcon/></button>
      </div>
      {categories.map(category => (
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
