import React, { useCallback, useRef, useState } from 'react'
import PhoneForm from '../Login/PhoneForm'
import OTPForm from '../Login/OTPForm'
import { Link, useNavigate } from 'react-router-dom'
import { generateOtp, verifyPhone } from '../../API/login.axios'
import { useDispatch } from 'react-redux'
import vyapLogo from 'src/assets/new_logo.svg'
import { setPhone } from './signupSlice'
import { setCredentials } from '../Login/credentialsSlice'


export default function SignupStep1() {
    const [currentPage, setCurrentPage] = useState(0)
    const phoneNumberRef = useRef<string>('')
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const confirmOTP = useCallback((code: string) => {
        setError(null)
        setLoading(true)
        verifyPhone(phoneNumberRef.current, code).then(res => {
            if (res.data) {
                if (res.data?.token) {
                    dispatch(setCredentials(res.data))
                    navigate('/home')
                } else {
                    dispatch(setPhone(phoneNumberRef.current))
                    navigate('/signup-step-2')
                }
            }
        }).catch((error) => {
            if (error?.response?.data) {
                setError('Please enter a valid OTP')
            } else {
                setError('No internet connection, please connect to a network and try again.')
            }
        }).finally(() => {
            setLoading(false)
        })
    }, [dispatch, navigate])

    const onPressLogin = (phoneNumber: string) => {
        setError(null)
        setLoading(true)
        generateOtp(phoneNumber).then(() => {
            setCurrentPage(1)
            phoneNumberRef.current = phoneNumber
        }).catch(error => {
            setError(error.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    function renderForm() {
        switch (currentPage) {
            case 1: return <OTPForm onPressConfirm={confirmOTP} loading={loading} goBack={() => {
                setError('')
                setCurrentPage(0)
            }} error={error} />
            default: return <PhoneForm text={'Sign up'} loading={loading} onPressLogin={onPressLogin} error={error} />
        }
    }

    return (
        <section className="flex flex-col items-center pb-24 h-screen md:flex-row  login_bg">
            <div className="flex items-end  md:items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
                <div className="w-96 h-100">
                    <div className="rounded p-6 mt-4 shadow bg-white dark:bg-slate-700 shadow-lg dark:bg-opacity-70 bg-clip-padding backdrop-filter backdrop-blur-xl">

                        <div className="grid items-center -mt-20  justify-center justify-center font-medium text-indigo-900 title-font md:mb-0">
                            <img height={48} width={48} className="w-24 h-24 rounded-full bg-slate-200 dark:bg-slate-300 " alt="vyap Logo" src={vyapLogo} />
                        </div>
                        <h1 className="mt-8 text-xl font-semibold text-slate-700 tracking-ringtighter title-font dark:text-slate-200">
                            {currentPage === 1 ? `We've send you an verification code
To your phone number` : 'Signup with vyap to succeed'}
                        </h1>
                        {renderForm()}
                        <p className="mt-8 text-sm text-center dark:text-slate-400">
                        Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-semibold text-blue-500 dark:text-blue-300 hover:text-blue-700"
                            >
                            Log in
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}