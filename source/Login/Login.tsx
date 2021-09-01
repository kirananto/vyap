import React, { useRef, useState } from "react";
import {  getUserDocument } from "../Firebase/firebase";
import PhoneForm from "./PhoneForm";
import OTPForm from "./OTPForm";
import { Link, useHistory } from "react-router-dom";
import { generateOtp } from "../API/login.axios";

export default function Login() {
  const [currentPage, setCurrentPage] = useState(0)
  const confResRef = useRef<any>();
  const [error, setError] = useState(null);

  const history = useHistory()
  const confirmOTP = (code: string) => {
    setError(null)
    confResRef.current?.confirm(code).then((result: any) => {
      // User signed in successfully.
      console.log('result', result.user.uid)
      alert('logged in')
      getUserDocument(result.user.uid).then(res => {
        console.log('user', res)
        if(res) {
          history.replace('/home')
        } else {
          history.replace('/signup')
          // TODO No user, redirect to signup process
        } 
      }).catch(error => {
        console.log('error fetching user', error)
      })
      // ...
    }).catch((error: any) => {
      console.log('error verifying otp', error.message)
      setError(error.message)
      // User couldn't sign in (bad verification code?)
      // ...
    })
  }

  const onPressLogin = (phoneNumber: string) => {
    setError(null)
    generateOtp(phoneNumber).then(result => {
      console.log('result', result)
      setCurrentPage(1)
      // confResRef.current = confirmationResult;
      // setCurrentPage(1)
      // console.log('resultSignin', confirmationResult)
    }).catch(error => {
      console.log('error', error)
      setError(error.message)
    })
  }

  function renderForm () {
    switch(currentPage) {
      case 1: return  <OTPForm onPressConfirm={confirmOTP} error={error} />
      default: return  <PhoneForm onPressLogin={onPressLogin} error={error} />
    }
  }

  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex items-center justify-center w-full h-screen px-6  md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
            <img className="w-12 h-12" src="./new_logo.svg"/>
            <h2 className="text-lg font-bold text-gray-700 uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400">
              {" "}
              Vyap App{" "}
            </h2>
          </a>
          <h1 className="mt-8 text-xl font-semibold text-gray-700 tracking-ringtighter sm:text-3xl title-font">
            Log in to your account
          </h1>
         {renderForm()}
          <hr className="w-full my-6 border-indigo-100" />
          <p className="mt-8 text-center">
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
