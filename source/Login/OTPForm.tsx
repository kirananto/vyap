import React, { useState } from "react";

interface IProps {
  onPressConfirm: (code: string) => void;
  error: any;
}

export default function OTPForm({ onPressConfirm, error }: IProps) {
  const [code, setCode] = useState("");

  return (
    <form
      className="mt-6"
      onSubmit={(event: any) => {
        event.preventDefault();
        onPressConfirm(code);
      }}
    >
      <div id="recaptcha-container" />
      <div>
        <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
          Verification code
        </label>
        <input
          type="text"
          inputMode="numeric"
          autoComplete="one-time-code"
          pattern="\d{6}"
          required={true}
          value={code}
          onChange={(event) => setCode(event?.target.value)}
          id="tel"
          placeholder="Your OTP"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
        />
      </div>
      {error ? <div className="text-xs text-red-500 opacity-80 font-semibold mt-4">{error}</div> : null}

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
