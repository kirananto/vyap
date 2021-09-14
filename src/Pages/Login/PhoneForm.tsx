import React, { useState } from "react";

interface IProps {
  onPressLogin: (phoneNumber: string) => void;
  error: any
}

export default function PhoneForm({ onPressLogin }: IProps) {
  const [phoneNumber, setPhoneNumber] = useState("7012918926");

  return (
    <form
      className="mt-6"
      onSubmit={(event: any) => {
        event.preventDefault();
        onPressLogin(phoneNumber.replace('+91', ''));
      }}
    >
      <div>
        <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
          Phone number
        </label>
        <input
          type="tel"
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

      <button
        type="submit"
        id="login-button"
        className="block w-full px-4 py-3 mt-6 font-semibold text-white transition duration-500 ease-in-out transform bg-gradient-to-br from-blue-500 to-indigo-700 rounded-lg hover:bg-indigo-800 focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2 "
      >
        Log In
      </button>
    </form>
  );
}
