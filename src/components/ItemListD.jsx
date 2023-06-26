import React, { useEffect, useState } from "react";
import styles from "../styles/itemList.module.css";
import { getImage } from "../utils/getImage";
import UpdateProductForm from "./UpdateProductForm";
import SearchIcon from '@mui/icons-material/Search';

const ItemListD = ({ data, onDelete, fetch}) => {

  const [imageUrls, setImageUrls] = useState([]);
  const [isEditClicked, setIsEditClicked] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [searchQuery, setSearchQuery] = useState("");
  const [itemData, setItemData] = useState([]);

  useEffect(() => {
    const filteredData = data.filter((item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setItemData(filteredData);
    setCurrentPage(1); 
  }, [data, searchQuery]);

  const handleEdit = (prodId) => {
    setSelectedProductId(prodId);
    setIsEditClicked(true);
  };

  useEffect(() => {
    const fetchImageUrls = async () => {
      const currentPageItems = itemData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
      );


      const urls = await Promise.all(
        currentPageItems.map(async (product) => {
          const imageUrl = await getImage(product.img);
          return imageUrl;
        })
      );
      setImageUrls(urls);
    };


    fetchImageUrls();
  }, [itemData, currentPage]);

  const handleDelete = (id) => {
    onDelete(id);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = itemData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className={styles.container}>
      <div className={styles.search}>
        <input
          className={styles.input}
          type="text"
          placeholder="Search by Product Name"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <SearchIcon fontSize="medium" />
      </div>
      {isEditClicked && (
        <UpdateProductForm
          item={selectedProductId}
          onClose={() => setIsEditClicked(false)}
          click={isEditClicked}
          setClick={setIsEditClicked}
          fetch={fetch}
        />
      )}
      <div className={styles.tableContainer}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.th}>Product ID</th>
                <th className={styles.th}>Product Name</th>
                <th className={styles.th}>Image</th>
                <th className={styles.th}>Price</th>
                <th className={styles.th}>Size</th>
                <th className={styles.th}>Description</th>
                <th className={styles.th}>Category</th>
                <th className={styles.th}>Extras</th>
                <th className={styles.th}>Is New</th>
                <th className={styles.th}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product, index) => (
                <tr
                  key={product.prodId}
                  className={index % 2 === 0 ? styles.evenRow : ""}
                >
                  <td className={styles.td}>{product.prodId}</td>
                  <td className={styles.td}>{product.title}</td>
                  <td className={styles.td}>
                    <img
                      src={imageUrls[index]}
                      alt={product.productName}
                      className={styles.img}
                    />
                  </td>
                  <td className={styles.td}>
                    {product.price.map((amt) => (
                      <span className={styles.badge} key={amt}>
                        {amt}
                      </span>
                    ))}
                  </td>
                  <td className={styles.td}>
                    {product.size.length > 0 ? (
                      product.size.map((amt) => (
                        <span className={styles.badge} key={amt}>
                          {amt}
                        </span>
                      ))
                    ) : (
                      <span className={styles.badge}>None</span>
                    )}
                  </td>
                  <td className={styles.td}>
                    {product.desc.slice(0, 18) + "..."}
                  </td>
                  <td className={styles.td}>{product.category}</td>
                  <td className={styles.td}>
                    {product.extras.length > 0 ? (
                      product.extras.map((amt) => (
                        <span className={styles.badge} key={amt}>
                          {amt}
                        </span>
                      ))
                    ) : (
                      <span className={styles.badge}>None</span>
                    )}
                  </td>
                  <td className={styles.td}>{product.isNew ? "Yes" : "No"}</td>
                  <td className={styles.td}>
                    <button
                    className={styles.button}
                    onClick={() => handleEdit(product.prodId)}
                  >
                    Edit
                  </button>
                    <button
                      className={styles.button}
                      onClick={() => handleDelete(product.prodId)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
      <div className={styles.pagination}>
        {Array.from({ length: Math.ceil(itemData.length / itemsPerPage) }).map(
          (page, index) => (
            <button
              key={index}
              className={`${styles.paginationBtn} ${
                
                currentPage === index + 1 ? styles.active : ""
              
              }`}
              onClick={() => paginate(index + 1)}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default ItemListD;
