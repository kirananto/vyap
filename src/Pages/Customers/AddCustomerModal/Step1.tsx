import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserExists } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'
import { Length, validate } from 'class-validator'
import { useState } from 'react'

interface IProps {
  phoneNumber: string;
  openingBalance: number;
  setOpeningBalance: React.Dispatch<React.SetStateAction<number>>;
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>;
  toggleVisibility: () => void;
  setCurrentPage: React.Dispatch<React.SetStateAction<currentPageEnum>>;
  setIsExisting: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export class Post {
  @Length(10, 12)
      phoneNumber!: string | null
}

export default function AddCustomerStep1({
    toggleVisibility,
    phoneNumber,
    openingBalance,
    setOpeningBalance,
    setPhoneNumber,
    setCurrentPage,
    setIsExisting,
}: IProps) {
    const { token } = useSelector(selectCredentials)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined)

    const handleValidation = (action: string) => {
        setPhoneError(undefined)
        const post = new Post()
        post.phoneNumber = phoneRef.current && phoneRef.current.value

        validate(post).then((errors) => {
            if (errors.length > 0) {
                console.log('validation failed. errors: ', errors)
                setPhoneError('Enter valid mobile number !')
            } else {
                console.log('validation succeed')

                if (action === 'submit') {
                    checkIfUserExists({ token, phone: phoneNumber })
                        .then((result) => {
                            if (result.data?.code === 'E234') {
                                setPhoneError(
                                    `The phone number you're trying to add is already associated.`
                                )
                            } else {
                                setIsExisting(result.data?.username)
                                setCurrentPage(currentPageEnum.PREVIEW)
                            }
                        })
                        .catch(() => {
                            setIsExisting(undefined)
                            setCurrentPage(currentPageEnum.NEW_CUSTOMER_STEP)
                            // TODO user doesn't exist
                        })
                }
            }
        })
    }

    return (
        <form
            className="mt-4 text-left"
            onSubmit={(event: React.FormEvent) => {
                event.preventDefault()
                // onPressLogin(phoneNumber.replace('+91', ''));
            }}
        >
            <div>
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Phone number
                </label>
                <input
                    type="number"
                    name="tel"
                    min={0}
                    value={phoneNumber}
                    onChange={(event) => {
                        setPhoneNumber(event?.target.value)
                        handleValidation('inputChange')
                    }}
                    id="tel"
                    ref={phoneRef}
                    autoComplete="off"
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />
            </div>

            <span
                className={
                    'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-1 ml-1 ' +
          (!phoneError ? 'hidden' : '')
                }
            >
        * {phoneError}
            </span>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        We{`'`}ll never share your phone number with anyone else.
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Opening balance
                </label>
                <input
                    type="number"
                    name="openingBalance"
                    value={openingBalance}
                    min={0}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                        setOpeningBalance(Number(Number(event?.target.value) < 0 ? 0 : event?.target.value))
                    }
                    id="openingBalance"
                    placeholder="Opening balance of the customer"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />
            </div>
            {/* <!-- btn popup --> */}
            <div className="flex my-8 p-2 gap-2">
                <button
                    onClick={() => toggleVisibility()}
                    className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200"
                >
          Cancel
                </button>
                <button
                    onClick={() => handleValidation('submit')}
                    className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                >
          Next
                </button>
            </div>
        </form>
    )
}