import { useState, useEffect } from 'react';
import styles from '../styles/cartSummary.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { API } from 'aws-amplify';
import { generatePaymentId } from '../utils/funcFoo';
import { useNavigate } from 'react-router-dom';
import { resetCart } from '../redux/cartRedux';

const CartSummary = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(null);
  const discount = 40; // Updated the discount value
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
    if (!name || !address || !phone) {
      setErrorMessage('Please fill in all the required fields.');
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
          status: 'Pending',
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
          key: 'rzp_test_JKF1DFL4zhVRpb', // Updated the Razorpay test key
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
                status: 'Pending',
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
    return () => clearTimeout(timeout);
  }, [errorMessage]);
console.log(cart)
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Cart Summary</h1>
      <div className={styles.wrapper}>
      <div className={styles.orderDetails}>
        <div className={styles.quantity}>
          <span className={styles.subheading}>Quantity:</span>
          {cart.quantity}
        </div>
        <div className={styles.total}>
          <span className={styles.subheading}>Total:</span>
          {cart.total}
        </div>
        <div className={styles.discount}>
          <span className={styles.subheading}>Discount:</span>
          {discount}
        </div>
        <div className={styles.subTotal}>
          <span className={styles.subheading}>Sub Total:</span>
          {cart.total - discount}
        </div>
      </div>
      <div className={styles.payment}>
        <span className={styles.subTitle}>Shipping Details</span>
        <form action="" className={styles.form}>
          <div className={styles.inputCol}>
            <input
              type="text"
              name="name"
              placeholder="Name"
              className={styles.input}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputCol}>
            <textarea
              type="text"
              name="address"
              placeholder="Address"
              className={styles.inputArea}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>
          <div className={styles.inputCol}>
            <input
              type="number"
              name="phone"
              placeholder="Your Phone"
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>
        </form>
        <div className={styles.paymentMode}>
          <div className={styles.paymentOption}>
            <input
              className={styles.radio}
              type="radio"
              id="card"
              name="paymentMethod"
              value="card"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
            />
            <label className={styles.radioLabel} htmlFor="card">Card / NetBanking / UPI</label>
          </div>
          <div className={styles.paymentOption}>
            <input
              className={styles.radio}
              type="radio"
              id="cash"
              name="paymentMethod"
              value="cash"
              checked={paymentMethod === 'cash'}
              onChange={() => setPaymentMethod('cash')}
            />
            <label className={styles.radioLabel} htmlFor="cash">Cash</label>
          </div>
        </div>
      </div>
      </div>
      <button className={styles.button} onClick={handleCheckout}>Order Now</button>
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}
    </div>
  );
};

export default CartSummary;
