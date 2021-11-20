import React, { useRef, useState } from "react";
import PhoneForm from "./PhoneForm";
import OTPForm from "./OTPForm";
import { Link, useNavigate } from "react-router-dom";
import { generateOtp, verifyOtp } from "../../API/login.axios";
import { useDispatch } from "react-redux";
import { setCredentials } from "./credentialsSlice";
import vyapLogo from '../../assets/new_logo.svg'
import Account from "../Account";

export default function Login() {
  const [currentPage, setCurrentPage] = useState(0)
  const phoneNumberRef = useRef<string>('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const confirmOTP = (code: string) => {
    setError(null)
    verifyOtp(phoneNumberRef.current, code).then((res: any) => {
      if (res.data) {
        console.log('res.data', res.data)
        if (res.data.token) {
          dispatch(setCredentials(res.data))
          navigate('/home')
        } else {
          navigate('/signup')
          // TODO No user, redirect to signup process
        }
      }
    })
      .catch((error: any) => {
        console.log('error verifying otp', error.message)
        setError(`Please enter valid OTP, If you don't have an Account please proceed to signup`)
        // User couldn't sign in (bad verification code?)
        // ...
      })
  }

  const onPressLogin = (phoneNumber: string) => {
    setError(null)
    generateOtp(phoneNumber).then(result => {
      console.log('result', result)
      setCurrentPage(1)
      phoneNumberRef.current = phoneNumber
    }).catch(error => {
      if(error?.response?.data?.message) {
        setError('Please enter a valid phone number')
      } else {
        setError('Please try again later')
      }
    })
  }

  function renderForm() {
    switch (currentPage) {
      case 1: return <OTPForm onPressConfirm={confirmOTP} goBack={() => setCurrentPage(0)} error={error} />
      default: return <PhoneForm text="Log in" onPressLogin={onPressLogin} error={error} />
    }
  }

  return (
    <section className="flex flex-col items-center h-screen md:flex-row dark:bg-gray-800">
      <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
            <img className="w-12 h-12" src={vyapLogo} />
            <h2 className="text-2xl font-bold text-gray-700 uppercase duration-500 ease-in-out transform transition hover:text-lightBlue-500 dark:text-indigo-200 ">
              {" "}
              Vyap {" "}
            </h2>
          </a>
          <h1 className="mt-8 text-lg font-semibold text-gray-700 tracking-ringtighter title-font dark:text-gray-200">
            {currentPage === 1 ? `We've send you an verification code
To your phone number` : 'Log in to vyap'}
          </h1>
          {renderForm()}
          <hr className="w-full my-6 border-indigo-100 dark:border-gray-600" />
          <p className="mt-8 text-center dark:text-gray-400">
            Need an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-blue-500 hover:text-blue-700"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
