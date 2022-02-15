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

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const confirmOTP = useCallback((code: string) => {
        setError(null)
        verifyPhone(phoneNumberRef.current, code).then(res => {
            if (res.data) {
                if(res.data?.token) {
                    dispatch(setCredentials(res.data))
                    navigate('/home')
                } else {
                    dispatch(setPhone(phoneNumberRef.current))
                    navigate('/signup-step-2')
                }
            }
        })
            .catch((error) => {
                if (error?.response?.data) {
                    setError('Please enter a valid OTP')
                } else {
                    setError('No internet connection, please connect to a network and try again.')
                }
            })
    }, [dispatch, navigate])

    const onPressLogin = (phoneNumber: string) => {
        setError(null)
        generateOtp(phoneNumber).then(() => {
            setCurrentPage(1)
            phoneNumberRef.current = phoneNumber
        }).catch(error => {
            setError(error.message)
        })
    }

    function renderForm() {
        switch (currentPage) {
            case 1: return <OTPForm onPressConfirm={confirmOTP} goBack={() => {
                setError('')
                setCurrentPage(0)
            }} error={error} />
            default: return <PhoneForm text={'Sign up'} onPressLogin={onPressLogin} error={error} />
        }
    }

    return (
        <section className="flex flex-col items-center h-screen md:flex-row  dark:bg-gray-800">
            <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
                <div className="w-80 h-100">
                    <div className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
                        <img height={48} width={48} className="w-12 h-12" alt="vyap-logo" src={vyapLogo} />
                        <h2 className="text-2xl font-bold text-gray-700 uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400 dark:text-indigo-100">
                            {' '}
              Vyap {' '}
                        </h2>
                    </div>
                    <h1 className="mt-8 text-lg font-semibold text-gray-700 tracking-ringtighter title-font dark:text-gray-200">
                        {currentPage === 1 ? `We've send you an verification code
To your phone number` : 'Signup with vyap to succeed'}
                    </h1>
                    {renderForm()}
                    <hr className="w-full my-6 border-indigo-100 dark:border-gray-600" />
                    <p className="mt-8 text-center dark:text-gray-400">
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
        </section>
    )
}