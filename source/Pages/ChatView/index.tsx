import React, { useState } from "react";
// import { NavLink } from 'react-router-dom';
import AddPaymentModal from "./AddPaymentModal";
import "./payment.css";
import { Header, PaymentBottomHeader } from "../../Components/Header";
import ChatList from './ChatList'
import PaymentFooter from "../../Components/PaymentFooter"
import { useEffect } from "react";
import { fetchInboxById } from "../../API/inbox.axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { InboxType } from './inbox.type'
import { selectCredentials } from "../../Pages/Login/credentialsSlice";

export const Payment = () => {
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const [inbox, setInbox] = useState<InboxType>();
  const { token } = useSelector(selectCredentials)
  console.log('window.location.pathname', window.location)
  const params = useParams<{ id: string }>()
  const { id } = params
  console.log('params', params)
  useEffect(() => {
    if(token) {
      fetchInboxById(token, id).then(res => {
        setInbox(res.data)
      })
    }
  }, [])

  return (
    <div className="overflow-y-auto mobile-main">
      {/* header */}
      <div className="fixed w-full pb-3 bg-white shadow ">
        <Header heading="Chats" subHeading={inbox?.recipient?.name} phoneNumber={inbox?.recipient?.officeNumber} />
        <PaymentBottomHeader amount={inbox?.outstandingAmount} />
      </div>
      {/* body */}
     {inbox?.id ? <ChatList inboxId={inbox.id}/> : null}
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
