import React from 'react'
import { useSelector } from 'react-redux'
import { inviteExisting, inviteNew } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'

interface IProps {
  phoneNumber: string
  openingBalance: number
  address: string
  businessName: string
  pinCode: string
  isExisting: string | undefined
  setCurrentPage: React.Dispatch<React.SetStateAction<currentPageEnum>>
}
export default function PreviewScreen({
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
        if (isExisting) {
            inviteExisting(token, phoneNumber, parseFloat(`${openingBalance}`)).then(result => {
                console.log('Success', result.data)
                setCurrentPage(currentPageEnum.SUCCESS)
            }).catch(error => {
                console.log('error', error)
            })
        }
        else {
            inviteNew(token, {
                openingBalance: parseFloat(`${openingBalance}`),
                phone: phoneNumber,
                businessName,
                businessNumber: phoneNumber,
                address,
                pinCode
            }).then(result => {
                setCurrentPage(currentPageEnum.SUCCESS)
                console.log('result', result)
            }).catch(error => {
                console.log('error', error)
            })
        }
    }

    return (
        <form
            className="mt-4 text-left"
            onSubmit={(event: React.FormEvent) => {
                event.preventDefault()
                // onPressLogin(phoneNumber.replace('+91', ''));
            }}
        >
            <div className="mt-4 dark:text-gray-400">
        Please confirm the below information
                <div className="my-6 bg-gray-200 p-4 rounded-lg dark:bg-gray-600 dark:text-gray-200">
          You are inviting {returnName(phoneNumber, isExisting, businessName)}, and they owes you <span className="text-2xl ml-2"> ₹{parseFloat(`${openingBalance}`).toFixed(2)} </span>

                </div>
            </div>
            {/* <!-- btn popup --> */}
            <div className="flex my-8 p-2 gap-2">

                <button onClick={() => setCurrentPage(isExisting ? currentPageEnum.STEP_1 : currentPageEnum.NEW_CUSTOMER_STEP)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700  dark:border-indigo-200 dark:text-indigo-200">
          Back
                </button>
                <button onClick={handleSubmit} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
          Add customer
                </button>
            </div>
        </form>)
}


function returnName (phoneNumber: string, isExisting: string | undefined, businessName?: string) {

    if(!isExisting) {
        return `${businessName} (+91 ${phoneNumber})`
    }
    return `${isExisting}(+91 ${phoneNumber})`
    
}