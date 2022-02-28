import React, { useState } from 'react'
import Button from 'src/Components/Style/Button'

interface IProps {
  onPressLogin: (phoneNumber: string) => void;
  error: string | null
  text: string
  loading: boolean
}

export default function PhoneForm({ onPressLogin, error, text, loading }: IProps) {
    const [phoneNumber, setPhoneNumber] = useState('')

    return (
        <form
            className="mt-4"
            onSubmit={(event) => {
                event.preventDefault()
                onPressLogin(phoneNumber.replace('+91', ''))
            }}
        >
            <div>
                <label className="block text-sm font-semibold leading-relaxed tracking-relaxed text-slate-600 dark:text-slate-400">
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
                    placeholder="Your phone number"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />
            </div>
            <div className={`${error ? 'opacity-100 block' : 'opacity-0 hidden'} text-sm mt-2 text-rose-600 dark:text-rose-400 transition duration-500 ease-in-out`}>
        * {error}
            </div>

            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400">
        We{`'`}ll never share your phone number <br /> with anyone else.
            </div>

            <Button isDisabled={loading} className="mt-6">{text}</Button>
        </form>
    )
}