import  React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import Footer from '../Components/Footer'
import AddPaymentModal from './AddPaymentModal';
import './payment.css'

export const Payment = () => {

  const [paymentModalVisible, setPaymentModalVisible] = useState(false)
  // const messages = [{
  //   left: true,
  //   date: '5th Mar 21',

  // }]
  return (
    <div className="mobile-main">
      {/* <!-- Header --> */}
      <div className="flex items-center pt-2 pb-2 bg-gradient-to-br from-blue-500 to-indigo-700">
        <div className="flex w-1/5 items-center justify-center gap-4">
          <NavLink to="/">
              <img className="h-4" src="./assets/icons/payment/back-chevron.svg" alt=""/>
          </NavLink>

          <img
            className="w-8"
            src="./assets/icons/profile/profile-icon.svg"
            alt=""
          />
        </div>
        <div className="w-3/5 text-indigo-100 font-bold justify-center">
          <h4>Shop Name</h4>
          <h5 className="text-xs font-semibold text-indigo-200">+91 22 22 22 22 22</h5>
        </div>
        <div className="w-1/5 flex justify-center items-center gap-6">
          <a href="tel: +916394915220"
            ><img src="./assets/icons/profile/whatsapp.svg" alt=""
          /></a>
          <a href="tel: +916394915220"><img src="./assets/icons/payment/phone.svg" alt="" /></a>
        </div>
      </div>
      {/* <!-- Header End --> */}

      {/* <!-- body --> */}
        <div className="mt-4 bg-indigo-100 ml-6 mr-6 p-2 rounded text-center font-bold text-indigo-800">
          <h1>OUTSTANDING:1111</h1>
        </div>
      {/* <!-- load more --> */}
       <div className="flex items-center justify-center my-4">
        <button className="flex justify-center items-center p-2 hover:bg-gray-50 px-5 gap-2 text-xs font-semibold rounded shadow border border-gray-100">
          <img className="w-4" src="./assets/icons/payment/add-more.svg" alt="" />LOAD MORE
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
              <div className="complete-container-left text-xs">Completed</div>
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
        <button onClick={() => setPaymentModalVisible(true)} className="payment-btn btn-b bg-indigo-600">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          PAYMENT
        </button>
        <button className="order-btn btn-b bg-indigo-600">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          ORDER
        </button>
      </div>
      <Footer />
      {/* <!-- Popup --> */}
      <AddPaymentModal isVisible={paymentModalVisible} toggleVisibility={setPaymentModalVisible} />
    </div>
  );
}
