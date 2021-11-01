import React from "react";
import { OrderStatusEnum } from "src/Pages/Orders/enum";

function OrderInfoIcon(props: { heading: string; info: string, status: OrderStatusEnum }) {

  function renderIcon() {
    switch (props.status) {
      case OrderStatusEnum.COMPLETE: return (<svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-green-300 "
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
          clipRule="evenodd"
        />
      </svg>)
      case OrderStatusEnum.PROCESSING: return (<div></div>)
      case OrderStatusEnum.PENDING: return (<div></div>)
      default: return (<div></div>)
    }
  }
  return (
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-200">{props.heading}</p>
      <div className="flex items-center gap-1">
        {renderIcon()}
        <p className="text-sm font-bold text-gray-700 dark:text-gray-100">{props.info}</p>
      </div>
    </div>
  );
}

export { OrderInfoIcon };
