import styles from '../styles/odCart.module.css'

const OdCart = () => {
  return (
    <div className={styles.left_od}>
        <div className={styles.od_wrapper}>
        <div className={styles.prodImg}>
          <img src="/img/pizza.png" alt="" className={styles.img} />
        </div>
        <div className={styles.prodDetails}>
          <div className={styles.detail}>
            <span className={styles.title}>French Fries</span>
            <span className={styles.size}><strong>Size:</strong> Small</span>
            <span className={styles.ingredient}><strong>Extras:</strong> Garlic</span>
            <span className={styles.quantity}><strong>Quantity:</strong> 1</span>
            <span className={styles.price}>₹ 56</span>
          </div>
          <div className={styles.action}>
              <button className={styles.button}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16"> <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/> </svg>
            </button>
          </div>
        </div>
        </div>
      </div>
  )
}

export default OdCart