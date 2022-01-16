import React, { useRef } from 'react'
import { currentPageEnum } from '.'
import { Length, IsString, validate } from 'class-validator'
import { useState } from 'react'

interface IProps {
  address: any;
  setAddress: any;
  businessName: any;
  setBusinessName: any;
  pinCode: any;
  setPinCode: any;
  setCurrentPage: any;
  toggleVisibility: () => void;
}

export class Post {
  @Length(3, 30)
  @IsString()
      biz_name!: string | null

  @Length(3, 100)
      address!: string | null

  @Length(6, 6)
      pincode!: string | null
}

export default function InviteExisting({
    address,
    setAddress,
    businessName,
    setBusinessName,
    pinCode,
    setPinCode,
    setCurrentPage,
}: IProps) {
    const [isValidBizName, setIsValidBizName] = useState<boolean>(true)
    const [isValidAdress, setIsValidAdress] = useState<boolean>(true)
    const [isValidPincode, setIsValidPincode] = useState<boolean>(true)

    const refBizName = useRef<HTMLInputElement>(null)
    const refAddress = useRef<HTMLTextAreaElement>(null)
    const refPincode = useRef<HTMLInputElement>(null)

    const handleSubmit = (action: string) => {

        const post = new Post()
        post.biz_name = refBizName.current && refBizName.current.value
        post.address = refAddress.current && refAddress.current.value
        post.pincode = refPincode.current && refPincode.current.value

        validate(post).then((errors) => {
            if (errors.length > 0) {
                console.log('validation failed. errors: ', errors)

                const errorList: string[] = []
                errors.forEach((item) => {
                    errorList.push(item.property)
                })

                if (errorList.includes('biz_name')) {
                    setIsValidBizName(false)
                }
                else {
                    setIsValidBizName(true)
                }

                if (errorList.includes('address')) {
                    setIsValidAdress(false)
                }
                else {
                    setIsValidAdress(true)
                }

                if (errorList.includes('pincode')) {
                    setIsValidPincode(false)
                }
                else {
                    setIsValidPincode(true)
                }
            }
            else {
                setIsValidAdress(true)
                setIsValidBizName(true)
                setIsValidPincode(true)
                console.log('validation succeed')

                if (action == 'submit') {
                    setCurrentPage(currentPageEnum.PREVIEW)
                }
            }
        })
    }

    return (
        <form
            className="mt-4 text-left"
            onSubmit={(event: any) => {
                event.preventDefault()
            }}
            autoComplete="off"
        >
            <div className="mt-4">
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Business name or shop name
                </label>
                <input
                    type="text"
                    name="tel"
                    value={businessName}
                    onChange={(event) => {
                        setBusinessName(event?.target.value)
                        handleSubmit('inputChange')
                    }}
                    id="tel"
                    ref={refBizName}
                    placeholder="Name of the shop or business"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />
                <span
                    className={
                        'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 ' +
            (isValidBizName ? 'hidden' : '')
                    }
                >
          * Enter valid business/shop name
                </span>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Address
                </label>
                <textarea
                    name="address"
                    value={address}
                    onChange={(event) => {
                        setAddress(event?.target.value)
                        handleSubmit('inputChange')
                    }}
                    id="address"
                    ref={refAddress}
                    placeholder="Enter the address of the customer."
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />

                <span
                    className={
                        'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 ' +
            (isValidAdress ? 'hidden' : '')
                    }
                >
          * Enter valid address
                </span>
            </div>
            <div className="mt-4">
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Pin code
                </label>
                <input
                    type="number"
                    name="tel"
                    value={pinCode}
                    onChange={(event) => {
                        setPinCode(event?.target.value)
                        handleSubmit('inputChange')
                    }}
                    id="tel"
                    ref={refPincode}
                    placeholder="Pin code of the customer"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                />
                <span
                    className={
                        'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 ' +
            (isValidPincode ? 'hidden' : '')
                    }
                >
          * Enter valid pin code
                </span>
            </div>
            {/* <!-- btn popup --> */}
            <div className="flex my-8 p-2 gap-2">
                <button
                    onClick={() => setCurrentPage(currentPageEnum.STEP_1)}
                    className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700  dark:border-indigo-200 dark:text-indigo-200"
                >
          Back
                </button>
                <button
                    onClick={() => handleSubmit('submit')}
                    className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                >
          Next
                </button>
            </div>
        </form>
    )
}