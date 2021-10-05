import React from "react";
import "./HSNmodal.css";

function HSNmodal(props: any) {
  return props.trigger ? (
    <div className="border-t border-gray-100 shadow-2xl popup-container">
      <div className="popup-inner">
        <button className="popup-btn" onClick={() => props.setModal(false)}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-8 h-8 text-blue-600"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        {props.children}
      </div>
    </div>
  ) : null;
}

export default HSNmodal;
