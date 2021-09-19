import React, { useState } from 'react'
import AddPaymentModal from "../Pages/ChatView/AddPaymentModal";

export default function PaymentFooter({ receiverId }: { receiverId?: string }) {

  const [paymentModalVisible, setPaymentModalVisible] = useState(false);
  return (<>
    <div className="fixed bottom-0 flex items-center justify-center w-full h-16 gap-4 bg-white" style={{ boxShadow: '0px -6px 28px #0000002e' }}>
      <button onClick={() => setPaymentModalVisible(true)} className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 ">Add Payment</button>
      <button className="w-2/5 text-white rounded-full h-12 bg-gradient-to-br from-blue-500 to-indigo-700 ">Place Order</button>
    </div>
    {paymentModalVisible && <AddPaymentModal
      isVisible={paymentModalVisible}
      toggleVisibility={setPaymentModalVisible}
      receiverId={receiverId}
    />}
  </>
  )
}
