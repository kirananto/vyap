import { paymentMethod, paymentStatus } from '../../../API/enum'
import React from 'react'
// import { createPayment } from 'src/API/payment.axios'
import { useSelector } from 'react-redux'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import AddCustomerStep1 from './Step1'
import InviteExisting from './InviteExisting'
import PreviewScreen from './Preview'
import Success from './Success'

export enum currentPageEnum {
  'STEP_1' = 'STEP_1',
  'NEW_CUSTOMER_STEP' = 'NEW_CUSTOMER_STEP',
  'PREVIEW' = 'PREVIEW',
  'SUCCESS' = 'SUCCESS'
}

interface IProps {
  isVisible: boolean
  toggleVisibility: () => void
}
export default function AddCustomerModal({
  isVisible,
  toggleVisibility
}: IProps) {
  const { token, user } = useSelector(selectCredentials)
  const [currentPage, setCurrentPage] = React.useState<currentPageEnum>(currentPageEnum.STEP_1)
  const [isExisting, setIsExisting] = React.useState(false)
  const [phoneNumber, setPhoneNumber] = React.useState('')
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
    //   receiverId: receiverId!,
    // }).then(result => {
    //   // DO feedback for success
    //   toggleVisibility(false)
    // }).catch(error => {
    //   // Do feedback for error
    // })
  }

  function setState(phone: string, _openingBalance: number) {
    setPhoneNumber(phone)
    setOpeningBalance(_openingBalance)
  }

  function renderCurrentPage() {
    switch (currentPage) {
      case currentPageEnum.STEP_1:
        return <AddCustomerStep1
          toggleVisibility={toggleVisibility}
          phoneNumber={phoneNumber}
          setCurrentPage={setCurrentPage}
          setIsExisting={setIsExisting}
          isExisting={isExisting}
          openingBalance={openingBalance}
          setOpeningBalance={setOpeningBalance}
          setPhoneNumber={setPhoneNumber}
        />
      case currentPageEnum.NEW_CUSTOMER_STEP:
        return <InviteExisting
          toggleVisibility={toggleVisibility}
          address={address}
          setAddress={setAddress}
          setCurrentPage={setCurrentPage}
          businessName={businessName}
          setBusinessName={setBusinessName}
          pinCode={pinCode}
          setPinCode={setPinCode}
        />
      case currentPageEnum.PREVIEW:
        return <PreviewScreen
          address={address}
          setCurrentPage={setCurrentPage}
          toggleVisibility={toggleVisibility}
          isExisting={isExisting}
          openingBalance={openingBalance}
          phoneNumber={phoneNumber}
          pinCode={pinCode}
          businessName={businessName}
        />
      case currentPageEnum.SUCCESS:
        return <Success
          text="Successfully invited the customer"
          toggleVisibility={toggleVisibility}
        />
      default: return <div> Loading </div>
    }
  }

  return (<div>
    <div onClick={toggleVisibility} className={`fixed pin top-0 z-10 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
    <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig animate__faster`}>
      <h2 className="text-left p-2 text-2xl mt-2 text-gray-700">Add Customer</h2>
      {renderCurrentPage()}
    </div>
  </div>)
}