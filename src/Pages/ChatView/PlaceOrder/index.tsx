import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { SimpleHeader } from "src/Components/Header";
import Button from "src/Components/Style/Button";
import ChatImg from "../../Product/assets/no_data.svg";
// import DropList from 'src/Components/Style/DropList'

import {
    pushItemsToCart,
    updateItemsOnCart,
    removeItemsFromCart,
    selectPlaceOrderInfo,
    setFlatDiscount,
    setNote,
} from "./placeOrderSlice";
import { placeOrderAPI } from "src/API/order.axios";
import { selectCredentials } from "src/Pages/Login/credentialsSlice";
import { getImageURL, IMAGEKIT_FOLDERS } from "src/utils/imageKit";
import { hapticFeedback } from "src/utils/vibrate";
import { createPayment } from "src/API/payment.axios";
import { paymentMethod, paymentStatus } from "src/API/enum";
import AddPaymentModal from "../AddPaymentModal";
import { BUTTON_ACTION } from "./types";

export default function PlaceOrder() {
    const { token, user } = useSelector(selectCredentials);
    const [isSuccess, setIsSuccess] = React.useState(false);
    const [paymentModalVisible, setPaymentModalVisible] = useState(false);

    const [isOpen, setIsOpen] = React.useState(true);
  //     const [isDropOpen, setIsDropOpen] = React.useState<
  //     | {
  //       isAdd: boolean;
  //       isOpen: any;
  //     }
  //     | undefined
  //   >(undefined)

  const [isSubmit, setIsSubmit] = useState<boolean>(false);
  const [isValidCart, setIsValidCart] = useState<boolean>(false);
  const [isValidDiscount, setIsValidDiscount] = useState<boolean>(false);

  const [search, setSearch] = useState("");

  const placeOrder = useSelector(selectPlaceOrderInfo);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isSupplier = localStorage.getItem("isSupplier") === "true";

  useEffect(() => {
    if (placeOrder.cartItems?.length !== 0) {
      setIsValidCart(true);
    } else {
      setIsValidCart(false);
    }
  }, [placeOrder.cartItems]);

  useEffect(() => {
    const discountPrice = placeOrder.discount;
    const finalPrice = getTotalPrice();

    if (discountPrice > finalPrice) {
      setIsValidDiscount(false);
    } else {
      setIsValidDiscount(true);
    }
  }, [placeOrder.cartItems, placeOrder.discount]);

  function handleAddItem(item: any, caseQuantity: number) {
    dispatch(
      pushItemsToCart([
        {
          ...item,
          quantity: caseQuantity,
        },
      ])
    );
  }

  function updateItem(item: any, caseQuantity: number) {
    dispatch(
      updateItemsOnCart([
        {
          ...item,
          quantity: caseQuantity,
        },
      ])
    );
  }

  function handleRemoveItemItem(item: any, caseQuantity: number) {
    dispatch(removeItemsFromCart({ id: item.id, quantity: caseQuantity }));
  }

  // function closeDropList() {
  //     setIsDropOpen({
  //         isAdd: false,
  //         isOpen: undefined,
  //     })
  // }

  function getTotalPrice() {
    const price = placeOrder.cartItems?.reduce(
      (a: any, b: any) => a + b.quantity * parseFloat(b?.rate),
      0
    );
    return price;
  }

  function handleDiscountValue() {
    if (!placeOrder.discount) {
      dispatch(setFlatDiscount(parseFloat("0")));
    } else {
      dispatch(setFlatDiscount(Math.abs(placeOrder.discount)));
    }
  }

  function updateDiscount(event: any) {
    const inputValue = event?.target.value;
    const finalPrice = getTotalPrice();
    if (inputValue) {
      if (inputValue > finalPrice) {
        setIsValidDiscount(false);
        dispatch(setFlatDiscount(finalPrice as any));
        setTimeout(() => {
          setIsValidDiscount(true);
        }, 5000);
      } else {
        setIsValidDiscount(true);
        dispatch(setFlatDiscount(parseFloat(inputValue as any)));
      }
    } else {
      dispatch(setFlatDiscount(inputValue as any));
    }
  }

  function handleSubmit() {
    console.log("submitting...");
    setIsSubmit(true);
    setPaymentModalVisible(true);
    makePayment(22, "test");
  }

  function makePayment(amount: number, note: string) {
    console.log("creating payment");
    createPayment(token!, {
      amount: getTotalPrice() - (placeOrder.discount ? placeOrder.discount : 0),
      note,
      method: paymentMethod.CASH,
      status: paymentStatus.SUCCESS,
      receiverId: isSupplier ? user?.organizationId! : placeOrder.orgId,
      senderOrgId: isSupplier ? placeOrder.orgId : user?.organizationId!,
    })
      .then(() => {
        console.log("Payment Success");
        setIsSuccess(true);
        //proceedPlaceOrder();
      })
      .catch(() => {
        // Do feedback for error
        console.log("Error in Payment");
      });
  }

  function proceedPlaceOrder() {
    if (placeOrder.cartItems?.length !== 0 && isValidDiscount) {
      placeOrderAPI(token!, {
        description: placeOrder.note,
        flatDiscount: placeOrder.discount,
        supplierId: isSupplier ? user?.organizationId! : placeOrder.orgId,
        buyerId: isSupplier ? placeOrder.orgId : user?.organizationId!,
        orderItems: placeOrder.cartItems?.map((mapItem) => {
          return {
            quantity: mapItem.quantity,
            purchasePrice: parseFloat(mapItem.rate),
            productId: mapItem.id,
            aliasName: mapItem.aliasName ?? "",
            mrpPrice: parseFloat(mapItem.mrpPrice),
          };
        }),
      }).then(() => {
        navigate(`/chat/${localStorage?.getItem("inboxId")}`);
      });
    } else {
      //setIsValidCart(false);
    }
  }

  function renderCartItems() {
    if (placeOrder.cartItems?.length === 0) {
      return (
        <div>
          <img className="mt-12 h-48 p-6 m-auto" alt="no items" src={ChatImg} />
          <div className="text-center px-6 w-2/3 m-auto mb-8 dark:text-gray-300">
            {" "}
            You do not have any items in your cart, please add by tapping add
            more below.{" "}
          </div>
        </div>
      );
    }
    return (
      <>
        <div className={"my-4"}>
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder={"Search"}
            className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
          />
        </div>
        {placeOrder.cartItems
          ?.filter((filterItem) =>
            `${filterItem.centralCatalogue?.name?.toLowerCase()}${filterItem.aliasName?.toLowerCase()}`.includes(
              search
            )
          )
          ?.map((item) => (
            <div key={item.id} className="my-5 border-b border-gray-300">
              <div className="grid grid-rows-2">
                <div className="grid grid-cols-3 ">
                  <div className="shadow-xl self-center w-16 h-16 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
                    {item?.thumbnailImage && (
                      <img
                        src={getImageURL(
                          item?.thumbnailImage,
                          IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                        )}
                        alt="Avatar"
                        className="object-cover w-full h-full "
                      />
                    )}
                  </div>

                  <div className="col-span-2">
                    <div className=" text-base font-bold text-gray-600 dark:text-gray-200">
                      {`${item.centralCatalogue?.name} `}
                    </div>
                    <div className=" font-bold text-sm text-gray-600 dark:text-gray-300">
                      {item.aliasName ? `( ${item.aliasName})` : ""}
                    </div>
                    <div className=" font-bold text-xs text-gray-500 dark:text-gray-400">
                      MRP: ₹{item?.mrpPrice} Cost: ₹{item?.rate}
                    </div>

                    <div className=" font-bold text-xs text-gray-400 dark:text-gray-500">
                      {item?.centralCatalogue?.description}
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 self-center">
                  {/* plus minus buttons */}
                  <div className="grid grid-cols-3 self-center">
                    <div className=" text-blue-600 dark:text-blue-400">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          hapticFeedback();
                          handleRemoveItemItem(item, 1);
                        }}
                        className="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* <DropList
                            isOpen={isDropOpen?.isOpen === index && !isDropOpen.isAdd}
                            list={[
                              {
                                appearance: "danger",
                                label: "Remove 1 Item",
                                onClick: () => {
                                  handleRemoveItemItem(item, 1), closeDropList();
                                },
                              },
                              //Hidden 1 case
                              // {
                              //   appearance: "danger",
                              //   label: "Remove 1 Case (10 Pc)",
                              //   onClick: () => {
                              //     handleRemoveItemItem(item, 10),
                              //     closeDropList();
                              //   }
                              // }
                            ]}
                            trigger={
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
                                  d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            }
                            onClick={() => {
                              if (isDropOpen?.isOpen === index && !isDropOpen.isAdd) {
                                setIsDropOpen({
                                  isAdd: false,
                                  isOpen: undefined,
                                });
                              } else {
                                setIsDropOpen({
                                  isAdd: false,
                                  isOpen: index,
                                });
                              }
                            }}
                          /> */}
                    </div>

                    <div className=" items-center dark:text-gray-200">
                      <form autoComplete="off">
                        <input
                          className="w-10 border-dashed border px-1 border-indigo-300 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                          type="number"
                          name="qty"
                          id="qty"
                          onChange={(e) => {
                            updateItem(item, parseInt(e.target.value));
                          }}
                          onBlur={(e) => {
                            item.quantity
                              ? parseInt(e.target.value)
                              : updateItem(item, 1);
                          }}
                          value={item.quantity ?? 0}
                        />
                      </form>
                    </div>

                    <div className=" text-blue-600 dark:text-blue-400 items-center ml-3">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        onClick={() => {
                          hapticFeedback();
                          handleAddItem(item, 1);
                        }}
                        className="h-6 w-6 cursor-pointer"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {/* <DropList
                            isOpen={isDropOpen?.isOpen === index && isDropOpen.isAdd}
                            list={[
                              {
                                appearance: "primary",
                                label: "Add 1 Item",
                                onClick: () => {
                                  handleAddItem(item, 1), closeDropList();
                                },
                              },

                              //Hidden 1 case

                              // {
                              //   appearance: "primary",
                              //   label: "Add 1 Case (10 Pc)",
                              //   onClick: () => { handleAddItem(item, 10),
                              //     closeDropList();
                              //   }
                              // },
                            ]}
                            trigger={
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
                                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            }
                            onClick={() => {
                              if (isDropOpen?.isOpen === index && isDropOpen.isAdd) {
                                setIsDropOpen({
                                  isAdd: true,
                                  isOpen: undefined,
                                });
                              } else {
                                setIsDropOpen({
                                  isAdd: true,
                                  isOpen: index,
                                });
                              }
                            }}
                          /> */}
                    </div>
                  </div>

                  <div className="place-self-center pb-1">
                    <button
                      className="bg-transparent hover:bg-blue-500 text-blue-700 text-xs font-semibold hover:text-white py-1 px-2 mt-1 border border-blue-500 hover:border-transparent rounded"
                      onClick={() => {
                        hapticFeedback();
                        handleRemoveItemItem(item, item?.quantity || 0);
                      }}
                    >
                      Delete
                    </button>{" "}
                  </div>

                  <div className="text-right text-lg font-bold text-gray-600  dark:text-gray-200">
                    ₹{item?.quantity * parseFloat(item?.rate)}
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 min-h-screen">
      <div className="w-full bg-white shadow ">
        <SimpleHeader
          backFn={() => navigate(`/chat/${localStorage?.getItem("inboxId")}`)}
          heading={"Place Order"}
        />
      </div>
      <div className={"p-2 pt-20"}>
        {/* <!-- Textarea --> */}
        <div className="p-2">
          <span className="float-left mb-2 text-sm text-gray-500">Note</span>
          <textarea
            value={placeOrder.note}
            onChange={(event) => dispatch(setNote(event.target.value as any))}
            className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
            id=""
          ></textarea>
        </div>
        {isSupplier ? (
          <div className="border rounded-lg m-2 px-4 border-gray-200 pb-8 pt-4  dark:border-gray-700">
            <span className="float-left mb-2 text-sm text-gray-500">
              Flat discount amount
            </span>
            <input
              value={placeOrder.discount}
              onBlur={handleDiscountValue}
              onChange={(event) => updateDiscount(event)}
              className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
              inputMode="numeric"
              type="number"
              min={0}
            />

            <span
              className={
                "flex items-center font-medium tracking-wide text-green-500 text-xs mt-2 ml-4 " +
                (isValidDiscount ? "hidden" : "")
              }
            >
              * Maximum Discount Applicable: ₹{getTotalPrice()}
            </span>
          </div>
        ) : null}
        <div className="border rounded-lg m-2 px-4 border-gray-200 dark:border-gray-700 pb-4 pt-4">
          <div className="flex justify-between">
            <div className="text-xl font-bold dark:text-gray-300">Items</div>
            <div className=" dark:text-gray-300">
              {!isOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    hapticFeedback();
                    setIsOpen(true);
                  }}
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
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  onClick={() => {
                    hapticFeedback();
                    setIsOpen(false);
                  }}
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
              )}
            </div>
          </div>
          {isOpen && (
            <div>
              {renderCartItems()}
              <div
                className="bg-gradient-to-br from-blue-50 to-blue-100 
                  text-indigo-700 transition duration-500 ease-in-out transform rounded-full 
                    border border-indigo-600 dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-700
                    flex mx-10  py-2 mt-4 cursor-pointer justify-center items-center"
                onClick={() => {
                  hapticFeedback();
                  navigate("/place-order/add-item");
                }}
              >
                <div className="flex bg-gradient-to-br from-blue-500 to-indigo-700 rounded-full dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-300 dark:text-gray-100 "
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="flex  text-lg ml-2 dark:text-white">
                  Add more items
                </div>
              </div>

              <span
                className={
                  "flex items-center font-medium tracking-wide text-red-500 text-xs mt-2 ml-4 " +
                  (isSubmit ? (isValidCart ? "hidden" : "") : "hidden")
                }
              >
                * Add items to cart to continue order
              </span>

              <div className="mt-10 text-right">
                <div className="text-gray-400 dark:text-gray-300 text-xl font-extrabold">
                  Order Summary
                </div>
              </div>

              <div className="grid grid-cols-5 gap-3 mt-2">
                <div className="col-span-3 mt-1 ml-10">
                  <div className="text-gray-400 dark:text-gray-300 text-base">
                    Cart Total :
                  </div>

                  <div className="text-gray-400 dark:text-gray-300 text-base">
                    Discount :
                  </div>

                  <div className="text-gray-600 font-extrabold mt-1 dark:text-gray-300 text-lg">
                    Grand Total :
                  </div>
                </div>

                <div className="col-span-2  mt-1 text-right">
                  <div className="text-base  dark:text-gray-400">
                    ₹{getTotalPrice()}
                  </div>
                  <div className="text-base dark:text-gray-400">
                    ₹{placeOrder.discount}
                  </div>
                  <div className="text-lg font-extrabold mt-1 dark:text-gray-400">
                    ₹
                    {getTotalPrice() -
                      (placeOrder.discount ? placeOrder.discount : 0)}
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <Button
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Place order
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {paymentModalVisible && (
        <AddPaymentModal
          isVisible={paymentModalVisible}
          toggleVisibility={setPaymentModalVisible}
          receiverId={isSupplier ? user?.organizationId! : placeOrder.orgId}
          orderAmount={500}
          btnAction={BUTTON_ACTION.PLACE_ORDER}
        />
      )}
    </div>
  );
}
