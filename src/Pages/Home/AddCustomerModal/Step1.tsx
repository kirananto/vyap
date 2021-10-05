import React from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserExists } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'

interface IProps {
  phoneNumber: string
  openingBalance: number
  setOpeningBalance: any
  setPhoneNumber: any
  toggleVisibility: () => void
  setCurrentPage: any
  setIsExisting: any
  isExisting: any
}
export default function AddCustomerStep1({
  toggleVisibility,
  phoneNumber,
  openingBalance,
  setOpeningBalance,
  setPhoneNumber,
  setCurrentPage,
  setIsExisting,
  isExisting
}: IProps) {
  const { token } = useSelector(selectCredentials)

  const handleSubmit = () => {
    checkIfUserExists(token!, phoneNumber).then(result => {
      setIsExisting(true)
      setCurrentPage(currentPageEnum.PREVIEW)

    }).catch(error => {
      setIsExisting(false)
      setCurrentPage(currentPageEnum.NEW_CUSTOMER_STEP)
      // TODO user doesn't exist
    })
  }

  return (
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
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
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
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
        />
      </div>
      {/* <!-- btn popup --> */}
      <div className="flex my-8 p-2 gap-2">
        <button onClick={() => toggleVisibility()} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200">
          Cancel
        </button>
        <button onClick={() => handleSubmit()} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
          Next
        </button>
      </div>
    </form>)
}