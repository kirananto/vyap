import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './payment.css'

export const Payment = () => {
  return (
    <div className="mobile-main">
      {/* <!-- Header --> */}
      <div className="header-container">
        <div className="header-col-1">
          <NavLink to="/">
              <img className="h-4" src="./assets/icons/payment/back-chevron.svg" alt=""/>
          </NavLink>

          <img
            className="profile-icon"
            src="./assets/icons/profile/profile-icon.svg"
            alt=""
          />
        </div>
        <div className="header-col-2">
          <h4>Shop Name</h4>
          <h5 className="phone-number">+91 22 22 22 22 22</h5>
        </div>
        <div className="header-col-3">
          <a href="tel: +916394915220"
            ><img src="./assets/icons/profile/whatsapp.svg" alt=""
          /></a>
          <a href="#"><img src="./assets/icons/payment/phone.svg" alt="" /></a>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- body --> */}
      <div className="heading-container">
        <div className="heading">
          <h1>OUTSTANDING:1111</h1>
        </div>
      </div>
      {/* <!-- load more --> */}
      <div className="loadmore-container">
        <button className="loadmore-btn">
          <img src="./assets/icons/payment/add-more.svg" alt="" />LOAD MORE
        </button>
      </div>

      {/* <!-- paymment section --> */}
      <div className="payment-container">
        {/* <!--! right container --> */}
        <div className="right-container">
          <div className="right">
            {/* <!-- right column-1 --> */}
            <div className="right-col-1">
              <div className="rupee-container">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">1660</h1>
              </div>
              <div className="pending-container"><h6>Pending</h6></div>
            </div>
            {/* <!-- Right Coloumn-2 --> */}
            <div className="right-col-2">
              <p className="col-2-row-1">5th Mar 21</p>
              <p className="col-2-row-2">Items: 6</p>
              <h6 className="col-2-row-3">Order #30</h6>
            </div>
          </div>
        </div>
        {/* <!--! right container End --> */}

        {/* <!--! Left Container --> */}
        <div className="left-container">
          <div className="left">
            <div className="left-col-1">
              <p className="col-2-row-1-left">5th Mar 21</p>
              <p className="col-2-row-2-left">Payment</p>
              <h6 className="col-2-row-3-left">Mode: <span>Cash</span></h6>
            </div>
            <div className="left-col-2">
              <div className="rupee-container-left">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">60</h1>
              </div>
              <div className="complete-container-left"><h6>Completed</h6></div>
            </div>
          </div>
        </div>
        {/* <!-- ! Left Container End --> */}

        {/* <!--! right container --> */}
        <div className="right-container">
          <div className="right">
            {/* <!-- right column-1 --> */}
            <div className="right-col-1">
              <div className="rupee-container">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">33</h1>
              </div>
              <div className="pending-container"><h6>Pending</h6></div>
            </div>
            {/* <!-- Right Coloumn-2 --> */}
            <div className="right-col-2">
              <p className="col-2-row-1">5th Mar 21</p>
              <p className="col-2-row-2">Items: 6</p>
              <h6 className="col-2-row-3">Order #30</h6>
            </div>
          </div>
        </div>
        {/* <!--! right container End -->
        <!--! Left Container --> */}
        <div className="left-container">
          <div className="left">
            <div className="left-col-1">
              <p className="col-2-row-1-left">5th Mar 21</p>
              <p className="col-2-row-2-left">Payment</p>
              <h6 className="col-2-row-3-left">Mode: <span>Cash</span></h6>
            </div>
            <div className="left-col-2">
              <div className="rupee-container-left">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">60</h1>
              </div>
              <div className="complete-container-left"><h6>Completed</h6></div>
            </div>
          </div>
        </div>
        {/* <!-- ! Left Container End -->
        <!--! right container --> */}
        <div className="right-container">
          <div className="right">
            {/* <!-- right column-1 --> */}
            <div className="right-col-1">
              <div className="rupee-container">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">33</h1>
              </div>
              <div className="pending-container"><h6>Pending</h6></div>
            </div>
            {/* <!-- Right Coloumn-2 --> */}
            <div className="right-col-2">
              <p className="col-2-row-1">5th Mar 21</p>
              <p className="col-2-row-2">Items: 6</p>
              <h6 className="col-2-row-3">Order #30</h6>
            </div>
          </div>
        </div>
        {/* <!--! right container End -->
        <!--! Left Container --> */}
        <div className="left-container">
          <div className="left">
            <div className="left-col-1">
              <p className="col-2-row-1-left">5th Mar 21</p>
              <p className="col-2-row-2-left">Payment</p>
              <h6 className="col-2-row-3-left">Mode: <span>Cash</span></h6>
            </div>
            <div className="left-col-2">
              <div className="rupee-container-left">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">60</h1>
              </div>
              <div className="complete-container-left"><h6>Completed</h6></div>
            </div>
          </div>
        </div>
        {/* <!-- ! Left Container End -->
        <!--! right container --> */}
        <div className="right-container">
          <div className="right">
            {/* <!-- right column-1 --> */}
            <div className="right-col-1">
              <div className="rupee-container">
                <img src="./assets/icons/payment/rupee.svg" alt="" />
                <h1 className="price-text">33</h1>
              </div>
              <div className="pending-container"><h6>Pending</h6></div>
            </div>
            {/* <!-- Right Coloumn-2 --> */}
            <div className="right-col-2">
              <p className="col-2-row-1">5th Mar 21</p>
              <p className="col-2-row-2">Items: 6</p>
              <h6 className="col-2-row-3">Order #30</h6>
            </div>
          </div>
        </div>
        {/* <!--! right container End --> */}
      </div>

      {/* <!-- Payment & Order Button --> */}

      <div className="btn-container">
        <button className="payment-btn btn-b">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          PAYMENT
        </button>
        <button className="order-btn btn-b">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          ORDER
        </button>
      </div>
      {/* <!-- Popup --> */}
      <div className="popup animate__animated animate__fadeInUpBig">
        <h2>PAYMENTS#</h2>

        {/* <!-- Dropdown-1 --> */}
        <div className="dropdown-container">
          <span className="drop-head">TYPE</span>
          <select className="drop" name="payment" id="payment">
            <option value="volvo">PAYMENT</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* <!-- Dropdown-2 --> */}
        <div className="dropdown-container">
          <span className="drop-head">PAYMENT MODE</span>
          <select className="drop drop-2" name="payment" id="payment">
            <option value="volvo">CASH</option>
            <option value="saab">Saab</option>
            <option value="opel">Opel</option>
            <option value="audi">Audi</option>
          </select>
        </div>

        {/* <!-- Dropdown-3 --> */}
        <div className="dropdown-container">
          <span className="drop-head">AMOUNT</span>
          <input className="drop drop-3" type="text"/>
        </div>
        {/* <!-- Textarea --> */}
        <div className="dropdown-container">
          <span className="drop-head">REMARKS</span>
          <textarea name="" id=""></textarea>
        </div>
        {/* <!-- btn popup --> */}
        <button className="save-btn">
         SAVE
        </button>
      </div>
    </div>
  );
}
