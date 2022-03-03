import React, { useEffect, useRef, useState } from 'react'
import ToggleButton from '../../Components/ToggleButton'
import { SimpleFooter } from '../../Components/Footer'
import vyapLogo from 'src/assets/new_logo.svg'
import { useDispatch, useSelector } from 'react-redux'
import { selectSignupInfo, setAddress, setBusinessName, setEmail, setListPrivately, setName, setPinCode } from './signupSlice'
import { isEmail } from 'class-validator'
import { useNavigate } from 'react-router'


export default function SignupStepTwo() {
    const logoStyle = { marginLeft: '-20px' }
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const signup = useSelector(selectSignupInfo)
    const [nameError, setNameError] = useState('')
    const [businessNameError, setBusinessNameError] = useState('')
    const [addressError, setAddressError] = useState('')
    const [emailError, setEmailError] = useState('')
    const [pinCodeError, setPinCodeError] = useState('')

    const nextPressed = useRef(false)


    function handleProceed(e: React.MouseEvent<HTMLInputElement>) {
        e.preventDefault()
        nextPressed.current = true

        const result = handleValidations()
        if (result) {
            navigate('/signup-step-3')
        }
    }
    function clearAllError() {
        setNameError('')
        setBusinessNameError('')
        setAddressError('')
        setEmailError('')
        setPinCodeError('')

    }

    // Validations 
    useEffect(() => {
        if (nextPressed.current && signup.name?.length < 3) {
            setNameError('Enter a valid name.')
        } else {
            setNameError('')
        }
    }, [signup.name])
    
    useEffect(() => {
        if (nextPressed.current && signup.businessName?.length < 3) {
            setBusinessNameError('Enter a valid business name.')
        } else {
            setBusinessNameError('')
        }
    }, [signup.businessName])
    
    useEffect(() => {
        if (nextPressed.current && signup.address?.length < 3) {
            setAddressError('Enter a valid address.')
        } else {
            setAddressError('')
        }
    }, [signup.address])
    
    useEffect(() => {
        if (nextPressed.current && signup.pinCode?.length < 3) {
            setPinCodeError('Enter a valid pin code.')
        } else {
            setPinCodeError('')
        }
    }, [signup.pinCode])
    
    useEffect(() => {
        if(signup.email?.length){
            if (nextPressed.current && !isEmail(signup.email)) {
                setEmailError('Enter a valid email.')
            } else {
                setEmailError('')
            }
        }else {
            setEmailError('')
        }

    }, [signup.email])
    
    function handleValidations() {
        clearAllError()
        let isValid = true
        if (signup.name?.length < 3) {
            setNameError('Enter a valid name.')
            isValid = false
        }
        if (signup.businessName?.length < 3) {
            setBusinessNameError('Enter a valid business name.')
            isValid = false
        }
        if (signup.address?.length < 3) {
            setAddressError('Enter a valid address .')
            isValid = false
        }
        if (signup.email ? !isEmail(signup.email) : false) {
            setEmailError('Enter a valid email.')
            isValid = false
        }
        if (signup.pinCode?.length !== 6) {
            setPinCodeError('Enter a valid pin code.')
            isValid = false
        }
        return isValid
    }
    return (
        <div className="flex flex-col items-start w-full pb-48 dark:bg-slate-900 ">
            <div className="flex items-center justify-start px-8 mt-24 mb-5">
                <img
                    style={logoStyle}
                    className="w-24"
                    src={vyapLogo}
                    alt="vyap-logo"
                />
                <h1 className="text-4xl font-bold text-slate-600 dark:text-slate-300">VYAP</h1>
            </div>
            {/* Form */}
            <h1 className="px-8 mb-5 text-xl font-bold text-slate-500 dark:text-slate-300">
        Little bit more information to <br /> get started
            </h1>

            <form className="w-full ">
                <div className="flex flex-col gap-4 px-8">
                    {/* ---===NAME===--- */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500">
              Your Name
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                            type="text"
                            value={signup.name}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setName(event.target.value))}
                            placeholder="Enter your name"
                        />
                        {nameError ? <div className="text-xs text-rose-500 opacity-80 font-semibold mt-4">{nameError}</div> : null}
                    </div>
                    {/* ---===Shop Name===--- */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500">
              Business or shop name
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                            type="text"
                            placeholder="Name of the shop or business"
                            value={signup.businessName}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setBusinessName(event.target.value))}
                        />
                        {businessNameError ? <div className="text-xs text-rose-500 opacity-80 font-semibold mt-4">{businessNameError}</div> : null}

                    </div>

                    {/* ---===Email===--- */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500">
              Email
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                            type="text"
                            placeholder="Your email"
                            value={signup.email}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setEmail(event.target.value))}
                        />
                        {emailError ? <div className="text-xs text-rose-500 opacity-80 font-semibold mt-4">{emailError}</div> : null}

                    </div>

                    {/* ---===Pin Code===--- */}
                    <div>
                        <label className="block text-sm font-semibold text-slate-500">
              Pin Code
                        </label>
                        <input
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                            type="text"
                            placeholder="Enter the pincode of your location"
                            value={signup.pinCode}
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => dispatch(setPinCode(event.target.value))}
                        />
                        {pinCodeError ? <div className="text-xs text-rose-500 opacity-80 font-semibold mt-4">{pinCodeError}</div> : null}

                    </div>
                    <div className="mt-2">
                        <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-600 dark:text-slate-400">
              Address
                        </label>
                        <textarea
                            value={signup.address}
                            onChange={(event) => dispatch(setAddress(event?.target.value))}
                            placeholder="Enter your address."
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                        />
                        {addressError ? <div className="text-xs text-rose-500 opacity-80 font-semibold mt-4">{addressError}</div> : null}

                    </div>

                    {/* ---===Location===--- */}
                    <div className="my-4 ">
                        <p className="block text-sm font-semibold text-slate-500">
              Location
                        </p>
                        <div className="flex items-center gap-2">
                            <p className="block text-sm font-semibold text-slate-400">
                Ihsudbfuig North P.O
                            </p>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-4 h-4 text-slate-400"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                        </div>
                    </div>
                    {/* ---===Location===--- */}
                    <div>
                        <p className="block mb-2 text-sm font-semibold text-slate-500">
              List Items Privately
                        </p>
                        <ToggleButton
                            value={signup.listPrivately}
                            onChange={() => dispatch(setListPrivately(!signup.listPrivately))}
                        />
                    </div>
                    <div>
                    </div>
                </div>
                <SimpleFooter onClick={handleProceed} btnName="Proceed" />
            </form>
        </div>
    )
}