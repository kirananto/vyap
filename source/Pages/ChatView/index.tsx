import React, { useState } from "react";
// import { NavLink } from 'react-router-dom';
import AddPaymentModal from "./AddPaymentModal";
import "./payment.css";
import { Header, PaymentBottomHeader } from "../../Components/Header";
import PaymentCardRight from "../../Components/PaymentCardRight";
import PaymentCardLeft from "../../Components/PaymentCardLeft";
import PaymentFooter from "../../Components/PaymentFooter"
import { useEffect } from "react";
import { fetchInboxById } from "../../API/inbox.axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { selectCredentials } from "../../Pages/Login/credentialsSlice";

export const Payment = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [inbox, setInbox] = useState<any>();
  const { token } = useSelector(selectCredentials)
  const { id } = useParams<{ id: string }>()
  useEffect(() => {
    if(token) {
      fetchInboxById(token, id).then(res => {
        setInbox(res.data)
      })
    }
  }, [])
  console.log(inbox)
  return (
    <div className="overflow-y-auto mobile-main">
      {/* header */}
      <div className="fixed w-full pb-3 bg-white shadow ">
        <Header heading="Chats" subHeading={inbox?.recipient?.name} phoneNumber={inbox?.recipient?.officeNumber} />
        <PaymentBottomHeader amount={inbox?.outstandingAmount} />
      </div>
      {/* body */}
      <div className="flex flex-col gap-5 pb-20 pl-2 pr-2 pt-44 h-screen overflow-y-scroll">
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
