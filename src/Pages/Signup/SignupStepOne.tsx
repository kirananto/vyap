import React, { useRef, useState } from "react";
import PhoneForm from "../Login/PhoneForm";
import OTPForm from "../Login/OTPForm";
import { Link, useNavigate } from "react-router-dom";
import { generateOtp, verifyPhone } from "../../API/login.axios";
import { useDispatch } from "react-redux";
import vyapLogo from '../../assets/new_logo.svg'
import { setPhone } from "./signupSlice";


export default function SignupStep1() {
  const [currentPage, setCurrentPage] = useState(0)
  const phoneNumberRef = useRef<string>('');
  const [error, setError] = useState<string | null>(null);

  const dispatch = useDispatch()
  const navigate = useNavigate()
  const confirmOTP = (code: string) => {
    setError(null)
    verifyPhone(phoneNumberRef.current, code).then(res => {
      if (res.data) {
        console.log('res.data', res.data)
        dispatch(setPhone(phoneNumberRef.current))
        navigate('/signup-step-2')
      }
    })
      .catch((error: any) => {
        console.log('error verifying otp', error.message)
        setError('Could not verify otp')
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
      // confResRef.current = confirmationResult;
      // setCurrentPage(1)
      // console.log('resultSignin', confirmationResult)
    }).catch(error => {
      console.log('error', error)
      setError(error.message)
    })
  }

  function renderForm() {
    switch (currentPage) {
      case 1: return <OTPForm onPressConfirm={confirmOTP} goBack={() => setCurrentPage(0)} error={error} />
      default: return <PhoneForm text={"Sign up"} onPressLogin={onPressLogin} error={error} />
    }
  }

  return (
    <section className="flex flex-col items-center h-screen md:flex-row  dark:bg-gray-800">
      <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
            <img className="w-12 h-12" src={vyapLogo} />
            <h2 className="text-2xl font-bold text-gray-700 uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400 dark:text-indigo-100">
              {" "}
              Vyap {" "}
            </h2>
          </a>
          <h1 className="mt-8 text-lg font-semibold text-gray-700 tracking-ringtighter title-font dark:text-gray-200">
            {currentPage === 1 ? `We've send you an verification code
To your phone number` : 'Signup with vyap to succeed'}
          </h1>
          {renderForm()}
          <hr className="w-full my-6 border-indigo-100 dark:border-gray-600" />
          <p className="mt-8 text-center dark:text-gray-400">
            Already have an account?{" "}
            <Link
              to="/login"
              className="font-semibold text-blue-500 hover:text-blue-700"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
