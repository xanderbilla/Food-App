import { useState, useEffect } from 'react';
import styles from '../styles/category.module.css';
import PizzaCard from '../components/PizzaCard';
import { useLocation } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';

const Category = ({ data }) => {
  const path = useLocation().pathname.split('/')[2];
  const [sortOption, setSortOption] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  
  const filteredData = data.filter(
    item =>
      item.category === path &&
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    // Create a copy of the filteredData array and sort it based on the selected option
    const sortedArray = [...filteredData];

    if (sortOption === 'Price Low To High') {
      sortedArray.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'Price High To Low') {
      sortedArray.sort((a, b) => b.price - a.price);
    }

    setSortedData(sortedArray);
  }, [sortOption, filteredData]);

  const itemsPerPage = 8;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSortChange = e => {
    const selectedOption = e.target.value;
    setSortOption(selectedOption);
    setCurrentPage(1);
  };

  const handlePageChange = pageNumber => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.top}>
        <span className={styles.title}>{path}</span>
        <div className={styles.action}>
          <div className={styles.search}>
            <input
              className={styles.input}
              type="text"
              placeholder="Search by Title"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <SearchIcon fontSize="medium" />
          </div>
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
      </div>
      <div className={styles.bottom}>
        <div className={styles.cardContainer}>
          {currentItems.map(item => (
            <PizzaCard key={item.title} item={item} />
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            pageNumber => (
              <button
                key={pageNumber}
                className={`${styles.paginationBtn} ${
                  currentPage === pageNumber ? styles.active : ''
                }`}
                onClick={() => handlePageChange(pageNumber)}
              >
                {pageNumber}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Category;
