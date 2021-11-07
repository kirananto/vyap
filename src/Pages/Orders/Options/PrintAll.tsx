import React from "react";
import format from "date-fns/format";
import vyapLogo from "../../../assets/new_logo.svg";
import { FormattedMessage } from "react-intl";

interface IProps {
  apiData: any[];
}

let txnCount : number;

export const PrintAll = ({ apiData }: IProps) => {
  const onPrint = () => {
    if (document.getElementById("divContents")) {
      var printContents = document.getElementById("divContents")?.innerHTML;
      var originalContents = document.body.innerHTML;

      if (printContents) {
        document.body.innerHTML = printContents;
      }
      window.print();
      document.body.innerHTML = originalContents;
      window.location.reload();
    }
  };

  const orders: any[] = apiData.map((item) => {

    txnCount = apiData.length;
    return {
      ORDER_ID: "#" + item?.id?.split("-")[0],
      DATE: item.createdAt
        ? format(new Date(item.createdAt), "dd/mm/yyyy")
        : "",
      SUPPLIER: item?.supplier?.name,
      BUYER: item?.buyer?.name,
      AMOUNT: (
        parseFloat(item?.totalAmount) - parseFloat(item?.flatDiscount)
      ).toFixed(2),
    };
  });

  return (
    <>
      <button
        className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
        onClick={onPrint}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
          />
        </svg>
        <FormattedMessage
          id="action.printAll"
          defaultMessage="Print All"
        />
      </button>

      <div
        className="divide-y divide-gray-200  hidden grid grid-cols-1"
        id="divContents"
      >
        <div className="grid grid-cols-5 gap-4 m-2 border-b-2 border-grey-200 py-4 px-5">
          <div className="col-start-1 col-span-1  -space-y-3 align-middle">
            <img className="w-12 h-12" src={vyapLogo} />
            <p className="text-2xl font-bold text-gray-700 ">
              {" "}
              vyap{" "}
            </p>
          </div>

          <div className="col-start-2 col-span-3 space-y-3 flex flex-col align-middle">
            <h2 className="text-2xl font-bold text-gray-600"> Order Statement</h2>
            <p className="text-gray-300 font-bold">12/02/22 - 01/11/22</p>
          </div>

          <div className="col-end-7 col-span-1 justify-end flex flex-row align-middle border border-gray-200 p-3">
             <img className="w-12 h-12" src={vyapLogo} />
              <div className="flex flex-col">
                <p className="text-xl font-bold text-gray-600"> Reliance Digital Trends</p>
               <p className="text-gray-300">{txnCount} Transactions</p>
             </div>
          </div>          
        </div>
        <div>
      
        <div className="m-5 mx-10 p-5 border border-gray-200 rounded-md">
          <table className="min-w-full">
            <thead className="text-gray-200 font-bold">
              <tr className="p-5">
                <td>Order_ID</td>
                <td>Date</td>
                <td>Supplier</td>
                <td>Buyer</td>
                <td>Amount</td>
              </tr>
            </thead>
            <tbody className="text-gray-500">
              {orders.map((item, index) => (
                <tr key={index} className="text-left ">
                  {Object.values(item).map((val: any, i) => (
                    <td key={val} className="px-1 py-2 whitespace-nowrap">
                      { i==4 ? "₹"+val : val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>  
        </div>
      </div>
    </>
  );
};
