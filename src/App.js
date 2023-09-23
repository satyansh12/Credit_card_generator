import React, { useState } from 'react';
import './App.css';
import bg from './images/background.png';
import logo1 from './images/ellipse1.png';
import logo2 from './images/ellipse2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [name, setName] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameError, setNameError] = useState('');
  const [cardNumberError, setCardNumberError] = useState('');
  const [formError, setFormError] = useState('');

  const errorStyle = {
    color: '#F81212',
    fontFamily: 'Inter',
    fontSize: '12px',
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: 'normal',
    margin: '10px'
  };

  const handleConfirm = (e) => {
    e.preventDefault();
    const enteredName = e.target.cardholder_name.value;
    const capitalizedName = enteredName.toUpperCase();
    const enteredCardNumber = e.target.card_number.value;

    if (!enteredName.trim()) {
      setNameError('Cardholder name required');
      return;
    }

    if (!enteredCardNumber.trim()) {
      setCardNumberError('Cardnumber required');
      return;
    }

    if (/[^a-zA-Z\s]/.test(enteredName)) {
      setNameError('Name should only contain alphabetic characters and spaces');
      return;
    }

    // Validate card number length
    if (enteredCardNumber.length !== 16) {
      setCardNumberError('Card number should be 16 digits');
      return;
    }

    // Validate card number format (all digits)
    if (!/^\d+$/.test(enteredCardNumber)) {
      setCardNumberError('Card number should only contain numbers');
      return;
    }

    // Add spaces every 4 digits
    const formattedCardNumber = enteredCardNumber.replace(/(\d{4})/g, '$1 ');

    setName(capitalizedName);
    setCardNumber(formattedCardNumber);
    setExpiryMonth(e.target.expiry_month.value);
    setExpiryYear(e.target.expiry_year.value);
    setCvc(e.target.cvc.value);

    setNameError('');
    setCardNumberError('');
    setFormError('');

    toast.success('Payment confirmed successfully!', {
      position: 'top-right',
      autoClose: 3000,
    });
  };

  return (
    <div className="container">
      <section>
        <div className="bgimg">
          <img src={bg} alt="background" />
        </div>
        <div className="cc">
          <div className="cards">
            <article className="frontcc">
              <div className="logo">
                <div>
                  <img src={logo1} alt="logo1" />
                </div>
                <div>
                  <img src={logo2} alt="logo2" />
                </div>
              </div>
              <div className="entry">
                <h2>{cardNumber || '0000 0000 0000 0000'}</h2>
                <ul>
                  <li>{name || 'JANE APPLESEED'}</li>
                  <li>{expiryMonth || 'MM'}/{expiryYear || 'YY'}</li>
                </ul>
              </div>
            </article>
            <article className="backcc">
              <p className="cvv">{cvc || '000'}</p>
            </article>
          </div>

          <div className="form-name">
            <form onSubmit={handleConfirm}>
              <div>
                <label htmlFor="cardholder_name">CARDHOLDER NAME</label>
                <input
                  type="text"
                  name="cardholder_name"
                  id="cardholder_name"
                  placeholder="e.g. Jane Appleseed"
                />
                {nameError && <p style={errorStyle} className="error-message">{nameError}</p>}
              </div>
              <div>
                <label htmlFor="card_number">CARD NUMBER</label>
                <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  placeholder="e.g. 1234 5678 9123 0000"
                  maxLength={16}
                  
                />
                {cardNumberError && <p style={errorStyle} className="error-message">{cardNumberError}</p>}
              </div>
              <article className="bottom">
                <div className="exp">
                  <label htmlFor="expiry_month">EXP. DATE (MM/YY)</label>
                  <input
                    className="month"
                    type="number"
                    name="expiry_month"
                    id="expiry_month"
                    placeholder="MM"
                    maxLength={2}
                    required
                  />
                  <input
                    type="number"
                    name="expiry_year"
                    id="expiry_year"
                    placeholder="YY"
                    maxLength={2}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="cvc">CVC</label>
                  <input
                    className="forcvc"
                    type="text"
                    name="cvc"
                    id="cvc"
                    placeholder="e.g. 123"
                    maxLength={3}
                    required
                  />
                </div>
              </article>
              {formError && <p style={errorStyle} className="error-message">{formError}</p>}
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      </section>
      <ToastContainer />
    </div>
  );
};

export default App;
