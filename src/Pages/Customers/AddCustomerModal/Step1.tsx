import React, { useRef } from 'react'
import { useSelector } from 'react-redux'
import { checkIfUserExists } from 'src/API/invite.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { currentPageEnum } from '.'
import { IsNumber, Length, validate } from 'class-validator'
import { useState } from 'react'
import Button from 'src/Components/Style/Button'

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

    @IsNumber()
        openingBalance!: number

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
    const { token, user } = useSelector(selectCredentials)
    const phoneRef = useRef<HTMLInputElement>(null)
    const [phoneError, setPhoneError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState(false)
    const [openingBalanceError, setOpeningBalanceError] = useState<string | undefined>(undefined)

    const handleValidation = (action: string, value?: string | number) => {
        setPhoneError(undefined)
        setOpeningBalanceError(undefined)

        const post = new Post()
        post.openingBalance = action === 'openingBalance' ? parseFloat(`${value}`) : parseFloat(openingBalance.toString())
        post.phoneNumber = phoneRef.current && phoneRef.current.value

        validate(post).then((errors) => {
            if (errors.length > 0 || post.phoneNumber === user?.organization?.officeNumber) {
                const phoneError = errors.find(error => error.property === 'phoneNumber')
                if(phoneError) {
                    setPhoneError('Enter valid mobile number !')
                } else {
                    setPhoneError(undefined)
                }

                if(post.phoneNumber === user?.organization?.officeNumber) {
                    setPhoneError(
                        `You cannot invite yourselves to this platform.`
                    )
                }

                const openingBalanceError = errors.find(error => error.property === 'openingBalance')
                if(openingBalanceError) {
                    setOpeningBalanceError('Enter valid opening balance !')
                } else {
                    setOpeningBalanceError(undefined)
                }
            } else {
                console.log('validation succeed')
                if (action === 'submit') {
                    setLoading(true)
                    checkIfUserExists({ token, phone: phoneNumber })
                        .then((result) => {
                            if (result.data?.code === 'E234') {
                                setPhoneError(
                                    `The phone number you're trying to add is already associated.`
                                )
                                setLoading(false)
                            } else {
                                setLoading(false)
                                setIsExisting(result.data?.username)
                                setCurrentPage(currentPageEnum.PREVIEW)
                            }
                        })
                        .catch(() => {
                            setLoading(false)
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
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-600 dark:text-slate-400">
                    Phone number
                </label>
                <input
                    type="number"
                    name="tel"
                    min={0}
                    value={phoneNumber}
                    onChange={(event) => {
                        setPhoneNumber(event?.target.value)
                        handleValidation('phoneNumber')
                    }}
                    id="tel"
                    ref={phoneRef}
                    autoComplete="off"
                    placeholder="Customer phone number"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />
            </div>

            <span
                className={
                    'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-2 ' +
                    (!phoneError ? 'hidden' : '')
                }
            >
                {phoneError}
            </span>

            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                We{`'`}ll never share the phone number with anyone else.
            </div>

            <div className="mt-4">
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-600 dark:text-slate-400">
                    Opening balance
                </label>
                <input
                    type="number"
                    name="openingBalance"
                    value={openingBalance}
                    min={0}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setOpeningBalance(event?.target.value as unknown as number)
                        handleValidation('openingBalance', event?.target.value)
                    }}
                    id="openingBalance"
                    placeholder="Opening balance of the customer"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />

                <span
                    className={
                        'flex items-center font-medium tracking-wide text-rose-500 text-xs mt-2 ' +
                        (!openingBalanceError ? 'hidden' : '')
                    }
                >
                    {openingBalanceError}
                </span>
            </div>
            {/* <!-- btn popup --> */}
            <div className="flex my-8 p-2 gap-2">
                <button
                    onClick={() => toggleVisibility()}
                    className="active:scale-95 p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200"
                >
                    Cancel
                </button>
                <Button
                    isDisabled={loading}
                    onClick={() => handleValidation('submit')}
                    className="active:scale-95 "
                >
                    {loading ? (
                        <svg className="animate-spin m-auto h-8 w-8 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>)
                        : 'Next'}
                </Button>
            </div>
        </form>
    )
}