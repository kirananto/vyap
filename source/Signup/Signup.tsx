import React, { useRef, useState } from "react";
import SelectCustomerType from "./SelectCustomerType";
// import firebase from "firebase/app";
// import { auth } from "../Firebase/firebase";
// import PhoneForm from "./PhoneForm";
// import OTPForm from "./OTPForm";
// import { useHistory } from "react-router-dom";

export default function Signup() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  // const [currentPage, setCurrentPage] = useState(0)
  const captchaRef = useRef(null);
  // const confResRef = useRef<any>();
  // const [error, setError] = useState(null);

  // const history = useHistory()
  // const confirmOTP = (code: string) => {
  //   setError(null)
  //   confResRef.current?.confirm(code).then((result: any) => {
  //     // User signed in successfully.
  //     console.log('result', result)
  //     alert('logged in')
  //     history.replace('/home')
  //     // ...
  //   }).catch((error: any) => {
  //     console.log('error verifying otp', error.message)
  //     setError(error.message)
  //     // User couldn't sign in (bad verification code?)
  //     // ...
  //   })
  // }

  // const onPressLogin = (phoneNumber: string) => {
  //   setError(null)
  //   auth.signInWithPhoneNumber(
  //     phoneNumber,
  //     new firebase.auth.RecaptchaVerifier(captchaRef.current, {
  //       size: 'invisible',
  //       callback: (response: any) => {
  //         console.log('resultCallback', response)
  //         // onCaptcha();
  //       },
  //     }),
  //   ).then((confirmationResult: any) => {
  //     confResRef.current = confirmationResult;
  //     setCurrentPage(1)
  //     console.log('resultSignin', confirmationResult)
  //   }).catch((error) => {
  //     console.log('setting error')
  //     setError(error.message)
  //   })
  // }

  // function renderForm () {
  //   switch(currentPage) {
  //     case 1: return  <OTPForm onPressConfirm={confirmOTP} error={error} />
  //     default: return  <PhoneForm captchaRef={captchaRef} onPressLogin={onPressLogin} error={error} />
  //   }
  // }

  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex items-center justify-center w-full h-screen px-6  md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
            <img className="w-12 h-12" src="./new_logo.svg" />
            <h2 className="text-lg font-bold text-gray-700 uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400">
              {" "}
              Vyap App{" "}
            </h2>
          </a>
          <h1 className="mt-8 text-xl font-semibold text-gray-700 tracking-ringtighter sm:text-3xl title-font">
            Signup
          </h1>
          <form
            className="mt-6"
            onSubmit={(event: any) => {
              event.preventDefault();
              // onPressLogin(phoneNumber);
            }}
          >
            <div ref={captchaRef} id="recaptcha-container" />
            <div>
              <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                Name
              </label>
              <input
                type="name"
                name="name"
                value={name}
                required={true}
                onChange={(event) => setName(event?.target.value)}
                id="name"
                placeholder="Your name"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                required={true}
                value={email}
                onChange={(event) => setEmail(event?.target.value)}
                id="email"
                placeholder="Your email"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>
            <div className="text-xs text-gray-500 mt-2">
              We'll never share your email with anyone else.
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                Phone number
              </label>
              <input
                type="tel"
                required={true}
                name="tel"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event?.target.value)}
                id="tel"
                placeholder="Your phone number"
                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
              />
            </div>

            <div className="text-xs text-gray-500 mt-2">
              We'll never share your phone number with anyone else.
            </div>
            <div className="mt-4">
              <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                What defines you ?
              </label>
              <div className="md:w-custom mx-auto mt-4 md:flex md:justify-between md:flex-wrap">
                <SelectCustomerType isSelected={true} name="Shop" />
                <SelectCustomerType isSelected={false} name="Supplier" />
              </div>
            </div>
            <button
              type="submit"
              id="login-button"
              className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
            >
              Signup
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
