import React, { useState } from 'react';
import './App.css';
import bg from './images/background.png';
import logo1 from './images/ellipse1.png';
import logo2 from './images/ellipse2.png';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [name, setName] = useState(''); // Set default name
  const [cardNumber, setCardNumber] = useState('');
  const [expiryMonth, setExpiryMonth] = useState('');
  const [expiryYear, setExpiryYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [nameError, setNameError] = useState('');

  const handleConfirm = (e) => {
    e.preventDefault(); 
    const enteredName = e.target.cardholder_name.value;
    const capitalizedName = enteredName.toUpperCase();
    
    if (/[^a-zA-Z\s]/.test(enteredName)) {
      // Display an error message if the name contains non-alphabet characters
      setNameError('Name should only contain alphabetic characters and spaces');
      return; // Stop further processing
    }

    // Clear any previous error message
    setNameError('');

    setName(capitalizedName);
    setCardNumber(e.target.card_number.value);
    setExpiryMonth(e.target.expiry_month.value);
    setExpiryYear(e.target.expiry_year.value);
    setCvc(e.target.cvc.value);

    // Show success toast
    toast.success('Payment confirmed successfully!', {
      position: 'top-right',
      autoClose: 3000, // Auto close the toast after 3 seconds
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
                  required
                />
                {nameError && <p className="error-message">{nameError}</p>}
              </div>
              <div>
                <label htmlFor="card_number">CARD NUMBER</label>
                <input
                  type="text"
                  name="card_number"
                  id="card_number"
                  placeholder="e.g. 1234 5678 9123 0000"
                  maxLength={19}
                  required
                />
              </div>
              <article className="bottom">
                <div className="exp">
                  <label htmlFor="expiry_month">EXP. DATE (MM/YY)</label>
                  <input
                    className="month"
                    type="text"
                    name="expiry_month"
                    id="expiry_month"
                    placeholder="MM"
                    maxLength={2}
                    required
                  />
                  <input
                    type="text"
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
              <button type="submit">Confirm</button>
            </form>
          </div>
        </div>
      </section>
      {/* Add this component for displaying toasts */}
      <ToastContainer />
    </div>
  );
};

export default App;
