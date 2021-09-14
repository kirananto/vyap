import React from "react";
import successgif from "../../assets/img/success.gif";

export default function SignupStepFive() {
  return (
    <div className="flex flex-col items-center h-screen bg-white">

      <img src={successgif} alt="" className="w-2/6 mt-48" />
      <h1 className="mt-4 mb-2 text-4xl font-bold text-gray-600">Success 🎉</h1>
      <p className="text-lg font-bold text-gray-400">You can now proceed using the app.</p>

      <button className="w-8/12 h-10 mt-24 font-medium text-white rounded-full text-md bg-gradient-to-br from-blue-500 to-indigo-900">Start by adding products</button>
    </div>
  );
}
