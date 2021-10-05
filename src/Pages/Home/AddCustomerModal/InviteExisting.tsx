import React from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserExists } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'

interface IProps {
  address: any
  setAddress: any
  businessName: any
  setBusinessName: any
  pinCode: any
  setPinCode: any
  setCurrentPage: any
  toggleVisibility: () => void
}
export default function InviteExisting({
  toggleVisibility,
  address,
  setAddress,
  businessName,
  setBusinessName,
  pinCode,
  setPinCode,
  setCurrentPage
}: IProps) {
  const { token } = useSelector(selectCredentials)

  const handleSubmit = () => {
    // checkIfUserExists(token!, phoneNumber).then(result => {
    //   console.log('data',)
    // }).catch(error => {
    //   // TODO user doesn't exist
    // })
    // TODO DO validations before making API call
    // createPayment(token!, {
    //   amount,
    //   note,
    //   method,
    //   status: paymentStatus.SUCCESS,
    //   senderOrgId: user?.organizationId!,
    //   receiverId: receiverId!,
    // }).then(result => {
    //   // DO feedback for success
    //   toggleVisibility(false)
    // }).catch(error => {
    //   // Do feedback for error
    // })
  }

  return (
    <form
      className="mt-4 text-left"
      onSubmit={(event: any) => {
        event.preventDefault();
      }}
    >
      <div className="mt-4">
        <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
          Business name or shop name
        </label>
        <input
          type="text"
          name="tel"
          value={businessName}
          onChange={(event) => setBusinessName(event?.target.value)}
          id="tel"
          placeholder="Name of the shop or Business"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
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
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
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
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
        />
      </div>
      {/* <!-- btn popup --> */}
      <div className="flex my-8 p-2 gap-2">

        <button onClick={() => setCurrentPage(currentPageEnum.STEP_1)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700  dark:border-indigo-200 dark:text-indigo-200">
          Back
        </button>
        <button onClick={() => setCurrentPage(currentPageEnum.PREVIEW)} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
          Next
        </button>
      </div>
    </form>)
}