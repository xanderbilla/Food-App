import { useState } from 'react';
import styles from '../styles/category.module.css';
import PizzaCard from '../components/PizzaCard';
import { useLocation } from 'react-router-dom';

const Category = ({ data }) => {
  const path = useLocation().pathname.split('/')[2];
  const [sortOption, setSortOption] = useState('');
  const filteredData = data.filter(item => item.category === path);

  const handleSortChange = e => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);

    if (selectedOption === 'Price Low To High') {
      filteredData.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    } else if (selectedOption === 'Price High To Low') {
      filteredData.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.title}>{path}</span>
        <select
          name="Sort By"
          id=""
          className={styles.select}
          value={sortOption}
          onChange={handleSortChange}
        >
          <option className={styles.option} value="" disabled hidden>
            Sort By
          </option>
          <option className={styles.option} value="Price Low To High">
            Price Low To High
          </option>
          <option className={styles.option} value="Price High To Low">
            Price High To Low
          </option>
        </select>
      </div>
      <div className={styles.bottom}>
        <div className={styles.cardContainer}>
          {filteredData.map(item => (
            <PizzaCard key={item.title} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Category;
