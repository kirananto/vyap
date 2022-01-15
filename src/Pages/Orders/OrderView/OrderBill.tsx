import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrderItems } from "src/API/order.axios";
import { selectCredentials } from "../../Login/credentialsSlice";
import { format } from "date-fns";
import vyapLogo from "../../../assets/new_logo.svg";
import vyapQR from "../../../assets/img/vyap-install-qr.png";

const OrderBill = ({ order }: { order: any }) => {
  const { token } = useSelector(selectCredentials);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    fetchOrderItems(token!, order?.id, 100, 0).then((result: any) => {
      setOrderItems(result?.data?.data);
    });
  }, [token, order?.id]);
  return (

    <div className="bg-white pb-5">
         <div
          className=" grid grid-cols-1"
          id="divContents"
        >
                    {/* header section */}

              <div className=" border-b-[3px] border-blue-400 pt-2">
                <div className="col-start-2 col-span-3 space-y-1 flex flex-col align-middle">
                  <h2 className="px-3 text-2xl font-bold text-gray-800">
                    {" "}
                    Order Summary
                  </h2>
                  <p className="px-3 pt-1 pb-2 text-sm text-gray-400"> #{order?.id?.split("-")?.[0]}{" "} | {" "}
                  {order?.createdAt
                    ? format(new Date(order?.createdAt), `dd-MMM-yyyy hh:mm aa`)
                    : "Missing information"} {" "} {" "}IST
                  </p>
                  <span className="pt-2 border-b-[3px] border-violet-400"></span>
                </div>
              </div>
              
                  {/* customer details */}
              <div className="flex flex-row flex-wrap justify-end pt-2 pb-5 px-3">
                <div className="item w-1/2 ">
                    <p  className="text-gray-500"> Supplier  </p>
                    <p  className="font-bold "> {order?.supplier?.name}  </p>
                    <p  className="font-bold "> {order?.supplier?.officeNumber} </p>

                </div>
                <div className="item w-1/2 ">
                    <p  className="text-gray-500"> Customer  </p>
                    <p className="font-bold "> {order?.buyer?.name}  </p>    
                    <p  className="font-bold "> {order?.buyer?.officeNumber}  </p>
                </div>
              </div>

                  {/* table section */}

              <div>
                <div className="px-2">
                  <table className="min-w-full">
                    <thead className="text-gray-600 border-t-[3px] border-violet-300
                    ">
                      <tr className="p-5  border-b-[3px] border-blue-300
    ">
                        <td className="pt-1 pb-3 pl-2">Item</td>
                        <td className="pt-1 pb-3">Rate</td>
                        <td className="px-2 pt-1 pb-3 text-center">Qty</td>
                        <td className="pr-2 pt-1 pb-3" >Total</td>
                      </tr>
                    </thead>
                    <tbody className="text-gray-500 text-sm" >
                    {orderItems?.map((item: any, index: number) => (

                        <tr key={index} className="text-left border-b border-zinc-100">
                            <td key={index +"-name"} className="pl-1 pt-1 pb-3 whitespace-nowrap">
                            {item?.product?.centralCatalogue?.name}{" "}
                            </td>
                            <td key={index+"-price"} className="pt-1 pb-3 whitespace-nowrap">
                            {item?.purchasePrice}
                            </td>
                            <td key={index +"-qty"} className="pt-1 pb-3 whitespace-nowrap text-center">
                            {item?.quantity}
                            </td>
                            <td key={index +"-total"} className="pt-1 pb-3 whitespace-nowrap">
                            {item?.quantity * parseFloat(`${item?.purchasePrice}`)}
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

                  {/* Total section */}
              <div className="flex flex-row flex-wrap justify-end py-5 px-3">
                <div className="item w-1/3 ">
                </div>
                <div className="item w-2/3 flex-row" >
                    <div className="flex justify-end pr-1">
                        <div className="item text-right">
                            <p  className="text-gray-500"> Item Total  </p>
                            <p className="text-gray-500 pb-3"> Discount </p>    
                            <p  className="text-gray-500"> Total Amount  </p>
                        </div>
                        <div className="item  pl-3 text-right">
                            <p  className="font-bold">{parseFloat(order?.totalAmount).toFixed(2)}{" "} </p>
                            <p  className="font-bold pb-2"> {parseFloat(order?.flatDiscount).toFixed(2)}{" "} </p>    
                            <p  className="font-bold border-t-[3px] border-blue-200">  {(
                        parseFloat(order?.totalAmount) -
                        parseFloat(order?.flatDiscount)
                        ).toFixed(2)}  </p>
                        </div>
                    </div>

                </div>
              </div>

              <div className="flex flex-row flex-wrap justify-end py-1 mt-6 px-5 border-t border-zinc-200">
                <div className="item w-1/6 place-self-center">
                  <div className=" -space-y-4 ">
                    <img className="w-6 h-6" alt="vyap-logo" src={vyapLogo} />
                    <p className="text-sm font-bold text-gray-700 "> vyap </p>
                  </div>
                </div>
                <div className="item w-4/6  place-self-center flex justify-end">
                    <p  className="text-gray-800 text-sm font-bold pb-3"> VYAP | https://vyap.app</p>
                </div>
                <div className="item w-1/6 self-center flex justify-end">
                  <img className="w-9 h-9" src={vyapQR} />
                </div>
              </div>

        </div>

    </div>
  );
};

export default OrderBill;
