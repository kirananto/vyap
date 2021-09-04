import React from 'react'

interface IProps {
  isVisible: boolean
  toggleVisibility: any
}
export default function AddPaymentModal({
  isVisible,
  toggleVisibility
}: IProps) {
    return ( <div className={`popup ${isVisible ? 'show' : ''} animate__animated animate__fadeInUpBig`}>
    <h2>PAYMENTS#</h2>
  
    {/* <!-- Dropdown-1 --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">TYPE</span>
      <select className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " name="payment" id="payment">
        <option value="volvo">PAYMENT</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>

    {/* <!-- Dropdown-2 --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">PAYMENT MODE</span>
      <select className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " name="payment" id="payment">
        <option value="volvo">CASH</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>

    {/* <!-- Dropdown-3 --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">AMOUNT</span>
      <input className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " type="text"/>
    </div>
    {/* <!-- Textarea --> */}
    <div className="p-2">
      <span className="float-left mb-2 text-sm text-gray-500">REMARKS</span>
      <textarea className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " id=""></textarea>
    </div>
    {/* <!-- btn popup --> */}
    <div className="flex gap-2">
      <button onClick={() => toggleVisibility(false)} className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
     Save Payment
    </button>
    <button onClick={() => toggleVisibility(false)} className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700">
     Cancel
    </button></div>
  </div>)
}