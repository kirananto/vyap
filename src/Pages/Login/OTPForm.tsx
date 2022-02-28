import React, { useEffect, useState } from 'react'
import Button from 'src/Components/Style/Button'

interface IProps {
    loading: boolean;
    onPressConfirm: (code: string) => void;
    goBack: () => void;
    error: string | null;
}

export default function OTPForm({ onPressConfirm, error, goBack, loading }: IProps) {
    const [code, setCode] = useState('')

    useEffect(() => {
        // used AbortController with setTimeout so that WebOTP API (Autoread sms) will get disabled after 2min
        const signal = new AbortController()
        if ('OTPCredential' in window && navigator.credentials) {
            //@ts-ignore
            navigator.credentials.get({ otp: { transport: ['sms'] } })
                .then(content => {
                    //@ts-ignore
                    const code = content?.code
                    setCode(code)
                    if (code) {
                        onPressConfirm(code)
                    }
                })
                .catch(e => {
                    // setErrorMessage(e.message);
                    console.log(e)
                })
        }
        return () => {
            signal.abort()
        }
    }, [onPressConfirm])

    return (
        <form
            className="mt-6"
            onSubmit={(event) => {
                event.preventDefault()
                if (!loading) {
                    onPressConfirm(code)
                }
            }}
        >
            <div>
                <label className="block text-sm font-semibold leading-relaxed tracking-relaxed text-grey-700 dark:text-slate-300">
                    Verification code
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    value={code}
                    onChange={(event) => setCode(event?.target.value)}
                    id="tel"
                    placeholder="Your OTP"
                    className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                />
            </div>
            <div className={`${error ? 'opacity-100' : 'opacity-0'} text-sm mt-2 ml-2 text-rose-600 transition duration-500 ease-in-out`}>
                * {error}
            </div>
            <Button isDisabled={loading} className="mt-6">Verify OTP</Button>
            <div className="text-sm mt-4 text-center text-slate-600 dark:text-slate-400">
                Didn{`'`}t recieve OTP ? <a className="font-semibold text-blue-500 dark:text-blue-300 hover:text-blue-700" href="#" onClick={goBack}> Resend the OTP</a>
            </div>
        </form>
    )
}