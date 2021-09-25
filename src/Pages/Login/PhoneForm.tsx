import React, { useState } from "react";
import Button from "src/Components/Style/Button";

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
        <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500 text-grey-700">
          Phone number
        </label>
        <input
          type="tel"
          name="tel"
          value={phoneNumber}
          onChange={(event) => setPhoneNumber(event?.target.value)}
          id="tel"
          placeholder="Your phone number"
          className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
        />
      </div>

      <div className="mt-2 text-xs text-gray-400">
        We'll never share your phone number <br/> with anyone else.
      </div>

      <Button className="mt-6">Log in</Button>
    </form>
  );
}
