import { paymentMethod, paymentStatus } from "../../API/enum";
import React, { useState } from "react";
import { createPayment } from "src/API/payment.axios";
import { useSelector } from "react-redux";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import Success from "../Home/AddCustomerModal/Success";
import { Length, IsDivisibleBy, Min, validate } from "class-validator";

export class PostAmount {
  @Min(1)
  amount!: number;
}

interface IProps {
  isVisible: boolean;
  toggleVisibility: any;
  receiverId?: string;
}
export default function AddPaymentModal({
  isVisible,
  toggleVisibility,
  receiverId,
}: IProps) {
  const { token, user } = useSelector(selectCredentials);
  const [method, setMethod] = React.useState<paymentMethod>(paymentMethod.CASH);
  const [amount, setAmount] = React.useState<number | undefined>(undefined);
  const [isSuccess, setIsSuccess] = React.useState(false);
  const [note, setNote] = React.useState("");

  const [isValidAmount, setIsValidAmount] = useState<boolean>(true);

  const onValidate = (action: string, value: number, handle: () => void) => {
    let post = new PostAmount();
    post.amount = Number(value);

    validate(post).then((errors) => {
      if (errors.length > 0) {
        console.log("validation failed. errors: ", errors);
        setIsValidAmount(false);
      } else {
        setIsValidAmount(true);
        console.log("validation succeed");
        if (action == "submit") {
          handle();
        }
      }
    });
  };

  const handleSubmit = () => {
    // DO validations before making API call
    createPayment(token!, {
      amount: amount!,
      note,
      method,
      status: paymentStatus.SUCCESS,
      receiverId: user?.organizationId!,
      senderOrgId: receiverId!,
    })
      .then((result) => {
        setIsSuccess(true);
      })
      .catch((error) => {
        // Do feedback for error
      });
  };

  return (
    <div>
      <div
        onClick={() => toggleVisibility(false)}
        className={`fixed pin top-0 z-10 ${
          isVisible ? "show" : "hidden"
        } overflow-auto bg-gray-900 h-screen w-screen opacity-50 flex transition animate__animated animate__faster`}
      />
      <div
        className={`popup ${
          isVisible ? "show" : ""
        } animate__animated animate__fadeInUpBig animate__faster bg-white dark:bg-gray-700`}
      >
        {isSuccess ? (
          <Success
            text="successfully created payment record"
            toggleVisibility={() => toggleVisibility(false)}
          />
        ) : (
          <>
            <h2 className="text-left p-2 text-2xl mt-2 text-gray-700 dark:text-gray-200">
              Add Payment you recieved.
            </h2>
            <div className="p-2">
              <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
                Payment mode
              </span>
              <select
                value={method}
                onChange={(event) =>
                  setMethod(parseInt(event?.target.value, 10) as unknown as paymentMethod)
                }
                className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                name="payment"
                id="payment"
              >
                <option value={paymentMethod.CASH}>CASH</option>
                <option value={paymentMethod.CHEQUE}>CHEQUE</option>
              </select>
            </div>

            {/* <!-- Dropdown-3 --> */}
            <div className="p-2">
              <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
                AMOUNT
              </span>
              <input
                value={amount}
                onChange={(event) => {
                  setAmount(parseFloat(event?.target.value as any) > 0 ? parseFloat(event?.target.value as any) : 0);
                  onValidate("change",parseFloat(event?.target.value as any) > 0 ? parseFloat(event?.target.value as any) : 0, () => {});
                }}
                className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                inputMode="numeric"
                type="number"
              />

              <span
                className={
                  "flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 ml-1 " +
                  (isValidAmount ? "hidden" : "")
                }
              >
                Please enter a amount !
              </span>
            </div>
            {/* <!-- Textarea --> */}
            <div className="p-2">
              <span className="float-left mb-2 text-sm text-gray-500 dark:text-gray-300">
                REMARKS
              </span>
              <textarea
                value={note}
                onChange={(event) => setNote(event.target.value as any)}
                className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                id=""
              ></textarea>
            </div>
            {/* <!-- btn popup --> */}
            <div className="flex mt-4 p-2 gap-2">
              <button
                onClick={() => toggleVisibility(false)}
                className="save-btn p-3 w-full text-indigo-700 rounded-full border border-indigo-700 dark:border-indigo-200 dark:text-indigo-200"
              >
                Cancel
              </button>
              <button
                onClick={() => onValidate("submit", amount! , handleSubmit)}
                className="save-btn p-3 w-full text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
              >
                Save Payment
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}