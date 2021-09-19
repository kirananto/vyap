import React from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserExists } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'

interface IProps {
  phoneNumber: string
  openingBalance: number
  businessNumber: any
  address: any
  businessName: any
  pinCode: any
  isExisting: boolean
  setCurrentPage: any
  toggleVisibility: () => void
}
export default function PreviewScreen({
  toggleVisibility,
  businessNumber,
  address,
  businessName,
  pinCode,
  phoneNumber,
  openingBalance,
  isExisting,
  setCurrentPage
}: IProps) {
  const { token } = useSelector(selectCredentials)

  const handleSubmit = () => {
    toggleVisibility()
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
    //   recieverOrgId: recieverOrgId!,
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
        // onPressLogin(phoneNumber.replace('+91', ''));
      }}
    >
      <div className="mt-4">
        Please confirm that you're adding this customer
        <div>
          <label> Phone number: </label>
          <div> {phoneNumber} </div>
        </div>
      </div>
      {/* <!-- btn popup --> */}
      <div className="flex my-8 p-2 gap-2">

        <button onClick={() => setCurrentPage(isExisting ? currentPageEnum.STEP_1 : currentPageEnum.NEW_CUSTOMER_STEP)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700">
        Back
        </button>
        <button onClick={handleSubmit} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
        Add customer
        </button>
      </div>
    </form>)
}