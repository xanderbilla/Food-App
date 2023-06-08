export const generatePaymentId = () => {
    const length = 8;
    const characters = '0123456789abcdef';
    let paymentId = 'cod_';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      paymentId += characters.charAt(randomIndex);
    }
  
    return paymentId;
  }
  