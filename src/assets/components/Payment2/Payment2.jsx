import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGift, faWallet } from '@fortawesome/free-solid-svg-icons';
import './Payment2.css';
import { Link } from 'react-router-dom';

const Payment2 = () => {
  return (
    <div className="pms-container">
      <h2 className="pms-title">Select a payment method</h2>
      <div className="pms-cards">
        {/* Free Card */}
        <div className="pms-card pms-free">
          <div className="pms-icon">
            <FontAwesomeIcon icon={faGift} />
          </div>
          <h3 className="pms-card-title">Free</h3>
          <p className="pms-card-text">
            Keep up with the latest and best ads for free.
          </p>
          <Link to="/Home">
          <button className="pms-button pms-button-free">Select</button>
          </Link>
        </div>

        {/* Paid Card */}
        <div className="pms-card pms-paid">
          <div className="pms-icon">
            <FontAwesomeIcon icon={faWallet} />
          </div>
          <h3 className="pms-card-title">Paid</h3>
          <p className="pms-card-text">
            Post ads for 30 days by subscribing to the paid plan.
          </p>
          <Link to="/Payment">
          <button className="pms-button pms-button-paid">Select</button>
          </Link>
        </div>
      </div>
    </div>
);
}

export default Payment2;