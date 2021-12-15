import format from "date-fns/format";
import React, { useState } from "react";
import { paymentMethod } from "src/API/enum";
import Spinner from "src/Components/Style/Spinner";
import ModalViewer from "src/Components/Style/ModalViewer";
import { FormattedMessage } from "react-intl";
import ReactToPrint from "react-to-print";

interface IProps {
  payments: any[];
  loading: boolean;
}

export default function PaymentContainer({ payments, loading }: IProps) {
  const [paymentSummaryOpen, setPaymentSummaryOpen] = useState<boolean>(false);
  const [itemClicked, setItemClicked] = useState();
  const componentRef = React.useRef<HTMLDivElement>(null);

  const reactToPrintContent = React.useCallback(() => {
    return componentRef.current;
  }, [componentRef.current]);

  const reactToPrintTrigger = React.useCallback(() => {
    return (
      <button className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
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
        <FormattedMessage id="action.print" defaultMessage="Print" />
      </button>
    );
  }, []);

  const openPaymentSummary = (item: any) => {
    setPaymentSummaryOpen(true);
    setItemClicked(item);
  };

  function paymentSummary() {
    let item: any = itemClicked;
    return (
      <>
        <div
          ref={componentRef}
          className="p-3 m-3 border border-gray-300 dark:border-gray-500 rounded"
        >
          <h1 className="dark:text-white"> Payment Summary:</h1>
          {item ? (
            <div className={`flex w-full justify-between mt-2 pb-2`}>
              <div className="flex gap-2">
                <div className="flex flex-col">
                  <div className="text-gray-500 dark:text-gray-300">
                    #{item?.id?.split("-")[0]} •{" "}
                    {item.createdAt
                      ? format(new Date(item.createdAt), "do MMM yyyy")
                      : ""}
                  </div>
                  <div className="text-gray-600 dark:text-gray-200 my-1">
                    {item.receiver?.name}
                  </div>
                  <div className="flex w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">
                    {paymentMethod[item.method]}
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <div className="text-gray-600 dark:text-gray-200 text-lg font-extrabold">
                  ₹ {item.amount}
                </div>
              </div>
            </div>
          ) : (
            " Something went wrong..!"
          )}
        </div>

        <div className="flex flex-row mt-2 mb-10 ml-12 mr-4 flex justify-end">
          <ReactToPrint
            content={reactToPrintContent}
            documentTitle={`Vyap All Orders`}
            // onAfterPrint={handleAfterPrint}
            // onBeforeGetContent={handleOnBeforeGetContent}
            // onBeforePrint={handleBeforePrint}
            removeAfterPrint
            trigger={reactToPrintTrigger}
          />
          <button
            onClick={() => setPaymentSummaryOpen(false)}
            className="flex justify-center gap-1 items-center w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
            <FormattedMessage id="action.close" defaultMessage="Close" />
          </button>
        </div>
      </>
    );
  }

  if (loading) {
    return (
      <div className="p-12 mt-12 text-center dark:text-gray-100 grid">
        <Spinner />
        <div className="mt-4">Loading...</div>
      </div>
    );
  }
  return (
    <>
      {payments.map((item, index) => (
        <div
          className={`${
            index === payments.length - 1 ? "" : "border-b border-gray-300"
          }`}
          key={`${index}`}
          onClick={() => openPaymentSummary(item)}
        >
          <div className="flex flex-row mt-2 mb-3">
            <div className="">
              <div className="item w-4  flex-grow-0 mr-2">
                <input
                  className="cursor-pointer rounded border-gray-300 text-blue-800"
                  type="checkbox"
                />
              </div>
            </div>

            <div className="w-full">
              <div className="grid grid-rows-3 content-start">
                <div className="grid grid-flow-col auto-cols-max gap-1 row-span-3">
                  <div className="text-gray-500 dark:text-gray-300">
                    #{item?.id?.split("-")[0]} • 
                  </div>
                  <div className="text-gray-500 dark:text-gray-300">
                    {item.createdAt
                      ? format(new Date(item.createdAt), "do MMM yyyy")
                      : ""}
                  </div>
                </div>

                <div className="grid grid-flow-col">
                  <div className="col-start-1 text-gray-600 dark:text-gray-200 ">
                    {item.receiver?.name}
                  </div>
                  <div className="col-end-12 self-center text-gray-600 dark:text-gray-200 text-lg font-extrabold">
                    ₹ {item.amount}
                  </div>
                </div>
                <div className=" w-max bg-green-200 font-bold text-sm text-green-800 px-2 rounded items-center">
                  {paymentMethod[item.method]}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      <ModalViewer
        body={itemClicked ? paymentSummary() : null}
        isOpen={paymentSummaryOpen!}
        onClose={() => setPaymentSummaryOpen(false)}
      />
    </>
  );
}
