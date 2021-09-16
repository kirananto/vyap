import React,{ useState } from "react";
import vyapLogo from "../../assets/new_logo.svg";

export default function LoginStepTwo() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const logoStyle = { marginLeft: "-20px" };
  return (
    <div className="w-11/12 mx-auto">
      <div className="flex flex-col items-start w-full h-screen ">
        <div className="flex items-center justify-start mt-24 mb-5">
          <img style={logoStyle} className="w-24" src={vyapLogo} alt="" />
          <h1 className="text-4xl font-bold text-gray-600 ">VYAP</h1>
        </div>
        {/* --------- */}
        <h1 className="text-lg font-bold text-gray-600">
          We've send you an verification code <br /> To your phone number
        </h1>
        <form
          className="w-full mt-6"
          onSubmit={(event: any) => {
            event.preventDefault();
            // onPressLogin(phoneNumber);
          }}
        >
          <div className="mt-4">
            <label className="block text-sm font-semibold text-gray-500">
              Verification Code
            </label>
            <input
              type="tel"
              required={true}
              name="tel"
              value={phoneNumber}
              onChange={(event) => setPhoneNumber(event?.target.value)}
              id="tel"
              placeholder="Enter 4 digit number"
              className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
            />
          </div>

          <button
            type="submit"
            id="login-button"
            className="block w-full px-4 py-3 mt-8 font-semibold text-white transition duration-500 ease-in-out transform rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
          >
            Verify Code
          </button>
        </form>
      </div>
    </div>
  );
}
