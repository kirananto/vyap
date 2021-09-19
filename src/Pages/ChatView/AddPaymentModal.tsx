import { paymentMethod, paymentStatus } from '../../API/enum'
import React from 'react'
import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import Success from '../Home/AddCustomerModal/Success'

interface IProps {
  isVisible: boolean
  toggleVisibility: any
  receiverId?: string
}
export default function AddPaymentModal({
  isVisible,
  toggleVisibility,
  receiverId
}: IProps) {
  const { token, user } = useSelector(selectCredentials)
  const [method, setMethod] = React.useState<paymentMethod>(paymentMethod.CASH)
  const [amount, setAmount] = React.useState(0)
  const [isSuccess, setIsSuccess] = React.useState(false)
  const [note, setNote] = React.useState("")

  const handleSubmit = () => {
    // DO validations before making API call
    createPayment(token!, {
      amount,
      note,
      method,
      status: paymentStatus.SUCCESS,
      senderOrgId: user?.organizationId!,
      receiverId: receiverId!,
    }).then(result => {
      setIsSuccess(true)
    }).catch(error => {
      // Do feedback for error
    })
  }

  return (<div>
    <div onClick={() => toggleVisibility(false)} className={`fixed pin top-0 z-1 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
    <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig animate__faster`}>
      {isSuccess ? (<Success
        text="successfully created payment record"
        toggleVisibility={() => toggleVisibility(false)}
      />) : (<><h2 className="text-left p-2 text-2xl mt-2 text-gray-700">Add Payment</h2>
        <div className="p-2">
          <span className="float-left mb-2 text-sm text-gray-500">Payment mode</span>
          <select value={method} onChange={(event) => setMethod(event?.target.value as unknown as paymentMethod)} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " name="payment" id="payment">
            <option value={paymentMethod.CASH}>CASH</option>
            <option value={paymentMethod.CHEQUE}>CHEQUE</option>
          </select>
        </div>

        {/* <!-- Dropdown-3 --> */}
        <div className="p-2">
          <span className="float-left mb-2 text-sm text-gray-500">AMOUNT</span>
          <input value={amount} onChange={(event) => setAmount(parseFloat(event?.target.value as any))} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            inputMode="numeric" type="number" />
        </div>
        {/* <!-- Textarea --> */}
        <div className="p-2">
          <span className="float-left mb-2 text-sm text-gray-500">REMARKS</span>
          <textarea value={note} onChange={(event) => setNote(event.target.value as any)} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " id=""></textarea>
        </div>
        {/* <!-- btn popup --> */}
        <div className="flex mt-4 p-2 gap-2">

          <button onClick={() => toggleVisibility(false)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700">
            Cancel
          </button>
          <button onClick={() => handleSubmit()} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
            Save Payment
          </button>
        </div>
      </>)}
    </div>
  </div>)
}