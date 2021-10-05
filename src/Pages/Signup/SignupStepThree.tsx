import React, { useState } from "react";
import ToggleButton from "../../Components/ToggleButton";
import { SimpleFooter } from "../../Components/Footer";
import vyapLogo from '../../assets/new_logo.svg'
import { useDispatch, useSelector } from "react-redux";
import { selectSignupInfo, setAddress, setBusinessName, setEmail, setListPrivately, setName, setPinCode } from "./signupSlice";
import { isEmail } from "class-validator";
import { useHistory } from "react-router";


export default function SignupStepThree() {
  const logoStyle = { marginLeft: "-20px" };
  const dispatch = useDispatch()
  const history = useHistory()
  const signup = useSelector(selectSignupInfo)
  const [error, setError] = useState('')

  function handleProceed(e: any) {
    e.preventDefault()
    const result = handleValidations()
    if (result) {
      // Proceed to next step
      history.push('/signup-step-3')
    }
  }
  function handleValidations() {
    if (signup.name?.length < 3) {
      setError('Enter a valid name.')
      return false
    }
    if (signup.businessName?.length < 3) {
      setError('Enter a valid business name.')
      return false
    }
    if (signup.address?.length < 3) {
      setError('Enter a valid address .')
      return false
    }
    if (signup.businessName?.length < 3) {
      setError('Enter a valid business name.')
      return false
    }
    if (!isEmail(signup.email)) {
      setError('Enter a valid email.')
      return false
    }
    if (signup.pinCode?.length !== 6) {
      setError('Enter a valid pinCode.')
      return false
    }
    return true
  }
  return (
    <div className="flex flex-col items-start w-full h-screen ">
      <div className="flex items-center justify-start px-8 mt-24 mb-5">
        <img
          style={logoStyle}
          className="w-24"
          src={vyapLogo}
          alt=""
        />
        <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
      </div>
      {/* Form */}
      <h1 className="px-8 mb-5 text-xl font-bold text-gray-500">
        Little bit more information to <br /> get started
      </h1>

      <form className="w-full ">
        <div className="flex flex-col gap-4 px-8">
          {/* ---===NAME===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Your Name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
              type="text"
              value={signup.name}
              onChange={(event: any) => dispatch(setName(event.target.value))}
              placeholder="Enter your name"
            />
          </div>
          {/* ---===Shop Name===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Business or shope name
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
              type="text"
              placeholder="Name of the shope or business"
              value={signup.businessName}
              onChange={(event: any) => dispatch(setBusinessName(event.target.value))}
            />
          </div>

          {/* ---===Email===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Email
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
              type="text"
              placeholder="Your email"
              value={signup.email}
              onChange={(event: any) => dispatch(setEmail(event.target.value))}
            />
          </div>

          {/* ---===Pin Code===--- */}
          <div>
            <label className="block text-sm font-semibold text-gray-500">
              Pin Code
            </label>
            <input
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
              type="text"
              placeholder="Enter the pincode of your location"
              value={signup.pinCode}
              onChange={(event: any) => dispatch(setPinCode(event.target.value))}
            />
          </div>
          <div className="mt-2">
            <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
              Address
            </label>
            <textarea
              value={signup.address}
              onChange={(event) => dispatch(setAddress(event?.target.value))}
              placeholder="Enter your address."
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
            />
          </div>

          {/* ---===Location===--- */}
          <div className="my-4 ">
            <p className="block text-sm font-semibold text-gray-500">
              Location
            </p>
            <div className="flex items-center gap-2">
              <p className="block text-sm font-semibold text-gray-400">
                Ihsudbfuig North P.O
              </p>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
              </svg>
            </div>
          </div>
          {/* ---===Location===--- */}
          <div>
            <p className="block mb-2 text-sm font-semibold text-gray-500">
              List Items Privately
            </p>
            <ToggleButton
              value={signup.listPrivately}
              onChange={(event: any) => dispatch(setListPrivately(!signup.listPrivately))}
            />
          </div>
          <div>
            {error ? <div className="text-xs text-red-500 opacity-80 font-semibold mt-4">{error}</div> : null}
          </div>
        </div>
        <SimpleFooter onClick={handleProceed} btnName="Proceed" />
      </form>
    </div>
  );
}
