import React from "react";
import { SimpleHeader } from "../Components/Header";
import ToggleButton from "../Components/ToggleButton";
import "./Settings.css";


export default function Settings() {
  return (
    <div>
      <SimpleHeader heading="Settings" />
      <div className="pt-6 pl-8 bg-white ">
        {/* ------ */}
        <div className="flex gap-3 mb-2">
          <h1 className="font-bold text-gray-700 text-md">Team members</h1>
          <div className="flex items-center justify-center px-4 text-xs font-bold text-center rounded-lg min-w-min side-div">
            Beta
          </div>
        </div>
        {/* -------- */}
        <a href="/" className="text-blue-500 underline ">10 Members</a>
        {/* ------- */}
        <div className="flex gap-3 mt-8 mb-3">
          <h1 className="font-semibold text-gray-500 text-md">Dark Mode</h1>
          <div className="flex items-center justify-center px-2 text-xs font-bold text-center rounded-lg min-w-min side-div custom-color">
            Coming Soon
          </div>
        </div>
        <ToggleButton />
        {/* --------- */}
        <h1 className="font-semibold text-gray-500 mt-9 text-md">Import Customer CSV</h1>
        <button className="w-2/4 h-8 mt-3 font-bold text-blue-500 border-2 border-blue-500 rounded-md text-md">Upload CSV</button>
      </div>
    </div>
  );
}
