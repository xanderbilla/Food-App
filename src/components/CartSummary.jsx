import { useState, useEffect } from 'react';
import styles from '../styles/cartSummary.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import { generatePaymentId } from '../utils/funcFoo';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../redux/cartRedux';

const CartSummary = () => {
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const discount = 54;
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const fetchCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          fetchAddressFromCoordinates(latitude, longitude);
        },
        (error) => {
          console.log('Error getting current location:', error);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const fetchAddressFromCoordinates = async (latitude, longitude) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyC-cgsLxHceyQB4cvMfEXW6rrrnEAAsJvs`
      );
      const data = await response.json();
      const formattedAddress = data.results[0]?.formatted_address;
      // setAddress(formattedAddress || '');
      console.log(data);
    } catch (error) {
      console.log('Error fetching address:', error);
    }
  };

  useEffect(() => {
    let timeout;
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }

    return () => clearTimeout(timeout);
  }, [errorMessage]);

  useEffect(() => {
    fetchCurrentLocation();
  }, []);


  const handleCheckout = async () => {
    if (!paymentMethod) {
      setErrorMessage('Please select a payment method.');
      return;
    }
    setErrorMessage('');

    if (paymentMethod === 'cash') {
      const apiName = 'foodAppApi';
      const path = '/client/orders';
      const myInit = {
        body: {
          custName: name,
          phone: phone,
          paymentMode: paymentMethod,
          product: cart,
          address: address,
          paymentId: generatePaymentId(),
          status: 'Pending'
        },
      };

      try {
        const response = await API.post(apiName, path, myInit);
        navigate('/order');
        dispatch(resetCart());
      } catch (error) {
        console.log(error.response);
      }
    } else if (paymentMethod === 'card') {
      const apiName = 'foodAppApi';
      const path = '/client/orders';
      const amount = cart.total;
      try {
        const response = await fetch('http://localhost:5555/razorpay', {
          method: 'POST',
          body: JSON.stringify({ amount }), // Pass amount in the request body
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        console.log(data);

        const options = {
          // key: 'rzp_live_UTxAbdghList7p', //Warning: Only use in live environment
          key: 'rzp_test_JKF1DFL4zhVRpb',
          currency: data.currency,
          amount: data.amount,
          description: 'Wallet Transaction',
          img: 'https://i.imgur.com/G6sWWqH.png',
          order_id: data.id,
          customer: {
            name: 'Vikas',
            email: 'test@razorpay.com',
            contact: '123456789',
          },
          handler: function (response) {
            const myInit = {
              body: {
                orderId: response.razorpay_order_id,
                custName: name,
                phone: phone,
                paymentMode: paymentMethod,
                product: cart,
                address: address,
                paymentId: response.razorpay_payment_id,
                status: 'Pending'
              },
            };

            API.post(apiName, path, myInit)
              .then((response) => {
                console.log(myInit.body);
                dispatch(resetCart());
                navigate(`/order/${myInit.body.orderId}`);
              })
              .catch((error) => {
                console.log(error.response);
              });
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    let timeout;
    if (errorMessage) {
      timeout = setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }

    // Clear the timeout when the component unmounts or when the errorMessage changes
    return () => clearTimeout(timeout);
  }, [errorMessage]);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>CART CHECKOUT</h2>
      <div className={styles.wrapper}>
        <div className={styles.userInfo}>
          <input
            className={styles.input}
            type="text"
            name="name"
            placeholder="Name"
            onChange={(e) => setName(e.target.value)}
          />
          <input
            className={styles.input}
            type="text"
            name="address"
            placeholder="Address"
            onChange={(e) => setAddress(e.target.value)}
          />
          <div className={styles.phone}>
            <input
              className={styles.input}
              type="text"
              name="phone"
              placeholder="Phone Number"
              onChange={(e) => setPhone(e.target.value)}
            />
            <button className={styles.vrfyBtn}>Verify</button>
          </div>
        </div>
        <div className={styles.summary}>
          <div className={styles.text}>
            <div className={styles.key}>Total</div>
            <div className={styles.value}>₹{cart.total}</div>
          </div>
          <div className={styles.text}>
            <div className={styles.key}>Discount</div>
            <div className={styles.value}>₹{discount}</div>
          </div>
          <div className={styles.border} />
          <div className={styles.text}>
            <div className={styles.key}>Sub Total</div>
            <div className={styles.value}>₹{cart.total - discount}</div>
          </div>
          <div className={styles.paymentOptions}>
            <label
              className={`${styles.label} ${paymentMethod === 'cash' ? styles.selected : ''
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="cash"
                checked={paymentMethod === 'cash'}
                onChange={() => setPaymentMethod('cash')}
                style={{ display: 'none' }}
              />
              Cash on Delivery
            </label>
            <label
              className={`${styles.label} ${paymentMethod === 'card' ? styles.selected : ''
                }`}
            >
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === 'card'}
                onChange={() => setPaymentMethod('card')}
                style={{ display: 'none' }}
              />
              Card Payment / UPI
            </label>
          </div>
          {errorMessage && (
            <div className={styles.errorMessage}>{errorMessage}</div>
          )}
          <button className={styles.button} onClick={handleCheckout}>
            CHECKOUT NOW!
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
