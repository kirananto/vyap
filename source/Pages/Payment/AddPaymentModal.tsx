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
    <div className="dropdown-container">
      <span className="drop-head">TYPE</span>
      <select className="drop" name="payment" id="payment">
        <option value="volvo">PAYMENT</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>

    {/* <!-- Dropdown-2 --> */}
    <div className="dropdown-container">
      <span className="drop-head">PAYMENT MODE</span>
      <select className="drop drop-2" name="payment" id="payment">
        <option value="volvo">CASH</option>
        <option value="saab">Saab</option>
        <option value="opel">Opel</option>
        <option value="audi">Audi</option>
      </select>
    </div>

    {/* <!-- Dropdown-3 --> */}
    <div className="dropdown-container">
      <span className="drop-head">AMOUNT</span>
      <input className="drop drop-3" type="text"/>
    </div>
    {/* <!-- Textarea --> */}
    <div className="dropdown-container">
      <span className="drop-head">REMARKS</span>
      <textarea name="" id=""></textarea>
    </div>
    {/* <!-- btn popup --> */}
    <button onClick={() => toggleVisibility(false)} className="save-btn bg-gradient-to-br from-blue-500 to-indigo-700">
     SAVE
    </button>
  </div>)
}