import React, { useState } from 'react'
import Button from 'src/Components/Style/Button'

interface IProps {
  onPressLogin: (phoneNumber: string) => void;
  error: any
  text: string
}

export default function PhoneForm({ onPressLogin, error, text }: IProps) {
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <form
            className="mt-6"
            onSubmit={(event: any) => {
                event.preventDefault()
                onPressLogin(phoneNumber.replace('+91', ''))
            }}
        >
            <div>
                <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Phone number
                </label>
                <input
                    type="tel"
                    name="tel"
                    value={phoneNumber}
                    onChange={(event) => {
                        if(event.target.value.length>10) return false
                        setPhoneNumber(event?.target.value)
                    }
                    }
                    id="tel"
                    autoComplete="off"
                    placeholder="Your phone number (10 digit)"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                />
            </div>
            <div className={`${error ? 'opacity-100' : 'opacity-0'} text-sm mt-2 ml-2 text-red-600 transition duration-500 ease-in-out`}>
        * {error}
            </div>

            <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
        We'll never share your phone number <br /> with anyone else.
            </div>

            <Button className="mt-6">{text}</Button>
        </form>
    )
}