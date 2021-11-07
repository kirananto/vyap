import React, {  useState } from "react";
import { Link } from "react-router-dom";
import OTPForm from "../Login/OTPForm";
import PhoneForm from "../Login/PhoneForm";

export default function SignupStage1() {
  const [currentPage, setCurrentPage] = useState(0)
  // const confResRef = useRef<any>();
  const [error, setError] = useState(null);

  // const navigate = useNavigate()
  const confirmOTP = (code: string) => {
    setError(null)
    console.log('code', code)
    // confResRef.current?.confirm(code).then((result: any) => {
    //   // User signed in successfully.
    //   console.log('result', result.user.uid)
    //   alert('logged in')
    //   getUserDocument(result.user.uid).then(res => {
    //     console.log('user', res)
    //     if(res) {
    //       navigate('/home')
    //     } else {
    //       navigate('/signup')
    //       // TODO No user, redirect to signup process
    //     } 
    //   }).catch(error => {
    //     console.log('error fetching user', error)
    //   })
    //   // ...
    // }).catch((error: any) => {
    //   console.log('error verifying otp', error.message)
    //   setError(error.message)
    //   // User couldn't sign in (bad verification code?)
    //   // ...
    // })
  }

  const onPressLogin = (phoneNumber: string) => {
    setError(null)
    console.log('p', phoneNumber)
    // auth.signInWithPhoneNumber(
    //   phoneNumber,
    // ).then((confirmationResult: any) => {
    //   confResRef.current = confirmationResult;
      setCurrentPage(1)
    //   console.log('resultSignin', confirmationResult)
    // }).catch((error) => {
    //   console.log('setting error')
    //   setError(error.message)
    // })
  }

  function renderForm () {
    switch(currentPage) {
      case 1: return  <OTPForm onPressConfirm={confirmOTP} goBack={() => setCurrentPage(0)} error={error} />
      default: return  <PhoneForm  onPressLogin={onPressLogin} error={error} />
    }
  }

  return (
    <section className="flex flex-col items-center h-screen md:flex-row ">
      <div className="flex items-center justify-center w-full h-screen px-6  md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
        <div className="w-80 h-100">
          <a className="flex items-center w-64 font-medium text-indigo-900 title-font md:mb-0">
            <img className="w-12 h-12" src="../new_logo.svg"/>
            <h2 className="text-lg font-bold text-gray-700 uppercase duration-500 ease-in-out transform ttransition hover:text-lightBlue-500 dark:text-indigo-400">
              {" "}
              Vyap
            </h2>
          </a>
          <h1 className="mt-8 text-xl font-semibold text-gray-700 tracking-ringtighter sm:text-3xl title-font">
            Signup with Vyap to succeed.  
          </h1>
         {renderForm()}
          <hr className="w-full my-6 border-indigo-100" />
          <p className="mt-8 text-center">
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
