import { paymentMethod, paymentStatus } from '../../API/enum'
import React from 'react'
// import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'

interface IProps {
  isVisible: boolean
  toggleVisibility: () => void
}
export default function AddCustomerModal({
  isVisible,
  toggleVisibility
}: IProps) {
  const { token, user } = useSelector(selectCredentials)
  const [phoneNumber, setPhoneNumber] = React.useState('')
  const [businessNumber, setBusinessNumber] = React.useState('')
  const [openingBalance, setOpeningBalance] = React.useState(0)
  const [address, setAddress] = React.useState("")
  const [businessName, setBusinessName] = React.useState("")
  const [pinCode, setPinCode] = React.useState("")



  const handleSubmit = () => {
    // TODO DO validations before making API call
    // createPayment(token!, {
    //   amount,
    //   note,
    //   method,
    //   status: paymentStatus.SUCCESS,
    //   senderOrgId: user?.organizationId!,
    //   recieverOrgId: recieverOrgId!,
    // }).then(result => {
    //   // DO feedback for success
    //   toggleVisibility(false)
    // }).catch(error => {
    //   // Do feedback for error
    // })
  }

  return (<div>
    <div className={`fixed pin top-0 z-1 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
    <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig animate__faster`}>
      <h2 className="text-left p-2 text-2xl mt-2 text-gray-700">Add Customer</h2>
      <form
        className="mt-4 text-left"
        onSubmit={(event: any) => {
          event.preventDefault();
          // onPressLogin(phoneNumber.replace('+91', ''));
        }}
      >
        <div>
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Phone number
          </label>
          <input
            type="tel"
            name="tel"
            value={phoneNumber}
            onChange={(event) => setPhoneNumber(event?.target.value)}
            id="tel"
            placeholder="Your phone number"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>

        <div className="mt-2 text-xs text-gray-400">
          We'll never share your phone number with anyone else.
        </div>


        <div className="mt-4">
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Opening balance
          </label>
          <input
            type="tel"
            name="tel"
            value={openingBalance}
            onChange={(event: any) => setOpeningBalance(event?.target.value)}
            id="tel"
            placeholder="Opening balance of the customer"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Business name or shop name
          </label>
          <input
            type="tel"
            name="tel"
            value={businessName}
            onChange={(event) => setBusinessName(event?.target.value)}
            id="tel"
            placeholder="Name of the shop or Business"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>
        <div className="mt-4">
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Address
          </label>
          <textarea
            name="tel"
            value={address}
            onChange={(event) => setAddress(event?.target.value)}
            id="tel"
            placeholder="Enter the address of the customer."
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Office number
          </label>
          <input
            type="tel"
            name="tel"
            value={businessNumber}
            onChange={(event) => setBusinessNumber(event?.target.value)}
            id="tel"
            placeholder="Your phone number"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>

        <div className="mt-4">
          <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
            Pin code
          </label>
          <input
            type="tel"
            name="tel"
            value={pinCode}
            onChange={(event) => setPinCode(event?.target.value)}
            id="tel"
            placeholder="Pin code of the customer"
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>
        {/* <!-- btn popup --> */}
        <div className="flex my-8 p-2 gap-2">
          <button onClick={() => handleSubmit()} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
            Add customer
          </button>
          <button onClick={() => toggleVisibility()} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700">
            Cancel
          </button>
        </div>
      </form>
    </div>
  </div>)
}