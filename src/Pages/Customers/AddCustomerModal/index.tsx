import React from 'react'
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
    const [currentPage, setCurrentPage] = React.useState<currentPageEnum>(currentPageEnum.STEP_1)
    const [isExisting, setIsExisting] = React.useState<string | undefined>(undefined)
    const [phoneNumber, setPhoneNumber] = React.useState('')
    const [openingBalance, setOpeningBalance] = React.useState(0)
    const [address, setAddress] = React.useState('')
    const [businessName, setBusinessName] = React.useState('')
    const [pinCode, setPinCode] = React.useState('')

    const resetFields = () => {
        setIsExisting(undefined)
        setPhoneNumber('')
        setOpeningBalance(0)
        setAddress('')
        setBusinessName('')
        setPinCode('')
    }


    function renderCurrentPage() {
        switch (currentPage) {
            case currentPageEnum.STEP_1:
                return <AddCustomerStep1
                    toggleVisibility={toggleVisibility}
                    phoneNumber={phoneNumber}
                    setCurrentPage={setCurrentPage}
                    setIsExisting={setIsExisting}
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
                    setCurrentPage={setCurrentPage}
                    resetFields = {resetFields}
                />
            default: return <div> Loading </div>
        }
    }

    return (<div>
        <div onClick={toggleVisibility} className={`fixed pin top-0 z-10 ${isVisible ? 'show' : 'hidden'} overflow-auto bg-slate-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`} />
        <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig animate__faster bg-white dark:bg-slate-700`}>
            {currentPage !== currentPageEnum.SUCCESS ? <h2 className="text-left p-2 text-2xl mt-2 text-slate-700 dark:text-slate-300">Add Customer</h2> : null}
            {renderCurrentPage()}
        </div>
    </div>)
}