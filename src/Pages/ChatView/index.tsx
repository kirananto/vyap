import React, { useState } from "react";
import "./payment.css";
import { Header, PaymentBottomHeader } from "../../Components/Header";
import ChatList from './ChatList'
import { useEffect } from "react";
import { fetchInboxById } from "../../API/inbox.axios";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import type { InboxType } from './inbox.type'
import { selectCredentials } from "../Login/credentialsSlice";
import AddPaymentModal from "./AddPaymentModal";
import { setOrgId } from "./PlaceOrder/placeOrderSlice";

export const Payment = () => {
  const [inbox, setInbox] = useState<InboxType>();
  const { token } = useSelector(selectCredentials)
  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { id } = useParams()
  useEffect(() => {
    console.log('------------------------changed-----------')
    if (token) {
      fetchInboxById(token, id!).then(res => {
        setInbox(res.data)
      })
    }
  }, [paymentModalVisible, id, token])

  return (
    <div className="overflow-y-auto dark:bg-gray-900">
      {/* header */}
      <div className="fixed w-full z-10 pb-3 bg-white shadow dark:bg-gray-800">
        <Header isSticky={false} onBackClick={() => navigate('/home')} heading="Chats" subHeading={inbox?.recipient?.name} phoneNumber={inbox?.recipient?.officeNumber} />
        <PaymentBottomHeader amount={inbox?.outstandingAmount} />
      </div>
      {/* body */}
      <ChatList inboxId={inbox?.inboxHash} toRefresh={paymentModalVisible}  />
      {/* Footer */}
      <div className="fixed bottom-0 flex items-center justify-center w-full h-20 gap-4 bg-white dark:bg-gray-800" style={{ boxShadow: '0px -6px 28px #0000002e' }}>
        <button onClick={() => setPaymentModalVisible(true)} className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 ">Add Payment</button>
        <button onClick={() => {
          dispatch(setOrgId(inbox?.recipient?.id!))
          navigate('/place-order')
        }} className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 ">Place Order</button>
      </div>
      {paymentModalVisible && <AddPaymentModal
        isVisible={paymentModalVisible}
        toggleVisibility={setPaymentModalVisible}
        receiverId={inbox?.recipient.id}
      />}
    </div>
  );
};
