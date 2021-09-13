import React, { useState } from "react";
import "./payment.css";
import { Header, PaymentBottomHeader } from "../../Components/Header";
import ChatList from './ChatList'
import PaymentFooter from "../../Components/PaymentFooter"
import { useEffect } from "react";
import { fetchInboxById } from "../../API/inbox.axios";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import type { InboxType } from './inbox.type'
import { selectCredentials } from "../Login/credentialsSlice";

export const Payment = () => {
  const [inbox, setInbox] = useState<InboxType>();
  const { token } = useSelector(selectCredentials)
  const { id } = useParams<{ id: string }>()
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
     {inbox?.id ? <ChatList inboxId={inbox?.inboxHash}/> : null}
      {/* Footer */}
      <PaymentFooter />
    </div>
  );
};
