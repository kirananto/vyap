import {  paymentMethod } from '../../API/enum'
import React from 'react'
// import { createPayment } from 'API/payment.axios'
// import { useSelector } from 'react-redux'
// import { selectCredentials } from 'Pages/Login/credentialsSlice'

interface IProps {
  isVisible: boolean
  toggleVisibility: any
}
export default function AddPaymentModal({
  isVisible,
  toggleVisibility
}: IProps) {
  // const { token } = useSelector(selectCredentials)
  const [method, setMethod] = React.useState<paymentMethod>(paymentMethod.CASH)
  const [amount, setAmount] = React.useState(0)
  const [note, setNote] = React.useState("")

  // const handleSubmit = () => {
  //   createPayment(token!, {
  //     amount,
  //     note,
  //     method,
  //     status: paymentStatus.SUCCESS,
  //     senderUserId,
  //     receiverUserId
  //   })
  // }
  
    return ( <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig`}>
    <h2>PAYMENTS#</h2>
  
    {/* <!-- Dropdown-1 --> */}
    {/* <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">TYPE</span>
      <select className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " name="payment" id="payment">
        <option value="volvo">CASH</option>
        <option value="saab">CHEQUE</option>
      </select>
    </div> */}

    {/* <!-- Dropdown-2 --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">PAYMENT MODE</span>
      <select value={method} onChange={(event) => setMethod(event?.target.value as unknown as paymentMethod)} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " name="payment" id="payment">
        <option value={paymentMethod.CASH}>CASH</option>
        <option value={paymentMethod.CHEQUE}>CHEQUE</option>
      </select>
    </div>

    {/* <!-- Dropdown-3 --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">AMOUNT</span>
      <input value={amount} onChange={(event) => setAmount(event?.target.value as any)} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " type="text" 
          inputMode="numeric"/>
    </div>
    {/* <!-- Textarea --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">REMARKS</span>
      <textarea value={note} onChange={(event) => setNote(event.target.value as any)} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " id=""></textarea>
    </div>
    {/* <!-- btn popup --> */}
    <div className="flex gap-2">
      <button onClick={() => toggleVisibility(false)} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
     Save Payment
    </button>
    <button onClick={() => toggleVisibility(false)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700">
     Cancel
    </button></div>
  </div>)
}