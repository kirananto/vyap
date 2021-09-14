import React, { useState } from "react"; //useRef,
import vyapLogo from '../../assets/new_logo.svg'


export default function SignupStepOne() {
  const [phoneNumber, setPhoneNumber] = useState("");
  // const [email, setEmail] = useState("");
  // const [name, setName] = useState("");
  // const [currentPage, setCurrentPage] = useState(0)
  // const captchaRef = useRef(null);
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
const logoStyle ={marginLeft:"-20px"};
  return (
    <div className="flex flex-col items-start w-full h-screen px-8 ">
      <div className="flex items-center justify-start mb-5 mt-52">
        <img style={logoStyle} className="w-24 m--5" src={vyapLogo} alt="" />
        <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
      </div>

      <h1 className="text-lg font-bold text-gray-600">Signup with Vyap to succeed.</h1>
      <form
        className="w-full mt-6"
        onSubmit={(event: any) => {
          event.preventDefault();
          // onPressLogin(phoneNumber);
        }}
      >
        <div className="mt-4">
          <label className="block text-sm font-semibold text-gray-500">
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
            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
          />
        </div>
        <p className="mt-2 text-xs text-gray-300">We'll never share your phone number <br /> with anyone else.</p>
        <button
          type="submit"
          id="login-button"
          className="block w-full px-4 py-3 mt-8 font-semibold text-white transition duration-500 ease-in-out transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
        >
          Signup
        </button>
      </form>
    </div>
  );
}
