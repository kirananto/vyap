import React, { useState } from "react";
// import { NavLink } from 'react-router-dom';
import AddPaymentModal from "./AddPaymentModal";
import "./payment.css";
import { Header, PaymentBottomHeader } from "../../Components/Header";
import PaymentCardRight from "../../Components/PaymentCardRight";
import PaymentCardLeft from "../../Components/PaymentCardLeft";
import PaymentFooter from "../../Components/PaymentFooter"

export const Payment = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  // const messages = [{
  //   left: true,
  //   date: '5th Mar 21',

  // }]
  return (
    <div className="overflow-y-auto mobile-main">
      {/* header */}
      <div className="fixed w-full pb-3 bg-white shadow ">
        <Header heading="Payments" subHeading="XYZ Supplier" />
        <PaymentBottomHeader />
      </div>
      {/* body */}
      <div className="flex flex-col gap-5 pb-20 pl-2 pr-2 pt-44">
        <PaymentCardRight price="1600" />
        <p className="text-sm font-medium text-center text-gray-500">Today</p>
        <PaymentCardLeft price="5000" />
        <PaymentCardLeft price="7500" />
        <PaymentCardRight price="800" />
        <PaymentCardLeft price="900" />
        <PaymentCardRight price="1600" />
        <PaymentCardRight price="18,000" />
      </div>
      {/* Footer */}
      <PaymentFooter />
      {/* <!-- Payment & Order Button --> */}
      {/* 
      <div className="btn-container">
        <button onClick={() => setPaymentModalVisible(true)} className="bg-indigo-600 payment-btn btn-b">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          PAYMENT
        </button>
        <button className="bg-indigo-600 order-btn btn-b">
          <img src="./assets/icons/payment/PLUS.svg" alt="" />
          ORDER
        </button>
      </div> */}

      {/* <!-- Popup --> */}
      <AddPaymentModal
        isVisible={paymentModalVisible}
        toggleVisibility={setPaymentModalVisible}
      />
    </div>
  );
};
