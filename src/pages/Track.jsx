import { useEffect, useState } from 'react';
import TrackResult from '../components/TrackResult'
import styles from '../styles/track.module.css'
import { API } from 'aws-amplify';
import SearchIcon from '@mui/icons-material/Search';

const Track = () => {
  const [phone, setPhone] = useState('')
  const [data, setData] = useState([])

  const apiName = 'foodAppAPI';
  const path = '/client/orders';

  const fetchData = async () => {
    try {
      const items = await API.get(apiName, path, {
        queryStringParameters: {
          order: phone
        }
      });
      setData(items);
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleSearch = () => {
    if (phone) {
      fetchData();
    }
  };

  const handleCancel = async (orderId) => {
    const apiName = 'foodAppAPI';
    const path = `/client/orders/${orderId}`;

    try {
      await API.del(apiName, path);
      fetchData();
    } catch (error) {
      console.log(error.response);
    }
  };

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (inputValue.length <= 10) {
      setPhone(inputValue);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.heading}>
          <span className={styles.title}>Track Your Order</span>
        </div>
        <div className={styles.search}>
          <input
            type="number"
            name="phone"
            minLength={10}
            maxLength={10}
            placeholder="Enter Your Phone Number"
            className={styles.input}
            value={phone}
            onChange={handleInputChange}
          />
          <button className={styles.button} onClick={handleSearch}>
            <SearchIcon />
          </button>
        </div>
        {data.length !== 0 && <TrackResult data={data} onCancel={handleCancel} />}
      </div>
    </div>
  );
}

export default Track;
