import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchOrderItems } from "src/API/order.axios";
import { selectCredentials } from "./../../Login/credentialsSlice";
import { format } from "date-fns";

const OrderBill = ({ order }: { order: any }) => {
  console.log("order---", order?.id);
  const { token } = useSelector(selectCredentials);
  const [orderItems, setOrderItems] = useState<any[]>([]);

  useEffect(() => {
    fetchOrderItems(token!, order?.id, 100, 0).then((result: any) => {
      setOrderItems(result?.data?.data);
    });
  }, [token, order?.id]);

  console.log("Orderkkk:" + orderItems);
  return (
    <div className="bg-white p-3 ">
      <h2 className="text-lg p-3 pb-5 text-center">VYAP - Order Summary</h2>

      <div className="table w-full ">
        <div className="table-header-group text-sm">
          <div className="table-row bg-gray-300  px-4 pb-4">
            <div className="table-cell text-left pt-1 pb-3 pl-2 ">
              ORDER: #{order?.id?.split("-")?.[0]}{" "}
            </div>
            <div className="table-cell text-left "></div>
            <div className="table-cell text-left ">
              DATE:{" "}
              {order?.createdAt
                ? format(new Date(order?.createdAt), `yyyy-MM-dd hh:mm aa`)
                : "Missing information"}
            </div>
          </div>
        </div>

        <div className="table-header-group ">
          <div className="table-row bg-blue-800 text-white px-4 ">
            <div className="table-cell text-left pb-6">
              <div className="pl-2">
                <span className="font-bold">SUPPLIER </span>
                <br />
                <span className="text-xs"> {order?.supplier?.name} </span>{" "}
              </div>
            </div>
            <div className="table-cell text-left "></div>
            <div className="table-cell text-left  ">
              {" "}
              <div className="pl-2">
                <span className=" font-bold">CUSTOMER </span> <br />
                <span className="text-xs"> {order?.buyer?.name} </span>{" "}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="table w-full ">
        <div className="table-header-group ">
          <div className="table-row bg-blue-500 text-white">
            <div className="table-cell text-left pb-3 pl-2">Item</div>
            <div className="table-cell text-left ">Rate</div>
            <div className="table-cell text-left px-2">Qty</div>
            <div className="table-cell text-left ">Total</div>
          </div>
        </div>
        {orderItems?.map((item: any, index: number) => (
          <div className="table-row-group text-sm">
            <div className="table-row">
              <div className="table-cell p-1">
                {item?.product?.centralCatalogue?.name}{" "}
              </div>
              <div className="table-cell ">{item?.purchasePrice}</div>
              <div className="table-cell text-center">{item?.quantity}</div>
              <div className="table-cell ">
                {item?.quantity * parseFloat(`${item?.purchasePrice}`)}
              </div>
            </div>
          </div>
        ))}{" "}
        <br />
        <div className="table-header-group ">
          <div className="table-row bg-blue-100 px-4">
            <div className="table-cell text-left mt-4"></div>
            <div className="table-cell text-left pb-2 pt-2 ">
              ITEM TOTAL <br />
            </div>
            <div className="table-cell text-left "> </div>
            <div className="table-cell text-left ">
              {parseFloat(order?.totalAmount)}{" "}
            </div>
          </div>
        </div>
        <div className="table-header-group ">
          <div className="table-row bg-blue-100 px-4">
            <div className="table-cell text-left mt-4"></div>
            <div className="table-cell text-left pb-2 pt-1 ">
              DISCOUNT
              <br />
            </div>
            <div className="table-cell text-left "></div>
            <div className="table-cell text-left ">
              {parseFloat(order?.flatDiscount).toFixed(2)}{" "}
            </div>
          </div>
        </div>
        <div className="table-header-group font-bold">
          <div className="table-row bg-blue-100  px-4">
            <div className="table-cell text-left "></div>
            <div className="table-cell text-left pt-3 pb-4"> TOTAL</div>
            <div className="table-cell text-left "></div>
            <div className="table-cell text-left ">
              <span className="pr-2">
                {(
                  parseFloat(order?.totalAmount) -
                  parseFloat(order?.flatDiscount)
                ).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderBill;
