import React, { useEffect, useState } from "react";
import { PaymentInfo } from "../../../Components/PaymentInfo";
import { format } from "date-fns";
import { OrderInfoIcon } from "src/Components/OrderInfo";

function OrderDetailed({ order }: { order: any }) {
  return (
    <div className="flex flex-col gap-3">
      <PaymentInfo heading="Order id" info={`#${order.id?.split("-")?.[0]}`} />
      <PaymentInfo
        heading="Order placed on"
        info={
          order?.createdAt
            ? format(new Date(order?.createdAt), `yyyy-MM-dd hh:mm aa`)
            : "Missing information"
        }
      />
      <PaymentInfo
        heading="Last updated on"
        info={
          order?.updatedAt
            ? format(new Date(order?.updatedAt), `yyyy-MM-dd hh:mm aa`)
            : "Missing information"
        }
      />
      <PaymentInfo heading="Buyer name" info={order?.buyer?.name} />
      <PaymentInfo
        heading="Supplier name"
        info={`${order?.supplier?.name} (+91${order?.supplier?.officeNumber})`}
        more={[`Order placed by ${order?.initiatedBy?.name}`]}
      />
      <PaymentInfo
        heading="Note"
        info={order?.description ?? "No information"}
      />
      <OrderInfoIcon
        heading="Status"
        status={order?.orderStatus?.[0]?.status}
        info={order?.orderStatus?.[0]?.note}
      />
    </div>
  );
}

export default function OrderDetail({
  order,
  shareON,
}: {
  order: any;
  shareON?: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(shareON ? true : false);

  useEffect(() => {
    if (shareON == true) {
      setIsExpanded(true);
    }
  }, [shareON]);

  return (
    <div className="w-11/12 p-8 bg-white rounded-md shadow border border-purple-900 border-opacity-50 dark:bg-gray-800">
      <div
        className={`flex ${
          isExpanded ? "mb-4" : ""
        } items-center justify-between`}
      >
        <div className="flex flex-col text-xl font-semibold text-gray-800 dark:text-gray-200">
          Order details
        </div>
        <div>
          {isExpanded ? (
            <div
              className="flex text-gray-600 dark:text-gray-200"
              onClick={() => setIsExpanded(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 15l7-7 7 7"
                />
              </svg>
            </div>
          ) : (
            <div
              className="flex text-gray-600 dark:text-gray-200"
              onClick={() => setIsExpanded(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 cursor-pointer"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </div>
          )}
        </div>
      </div>
      {isExpanded && <OrderDetailed order={order} />}
    </div>
  );
}
