import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { SimpleHeader } from 'src/Components/Header'
import Button from 'src/Components/Style/Button'
import ChatImg from '../../Product/assets/no_data.svg'
// import DropList from 'src/Components/Style/DropList'

import {
    pushItemsToCart,
    updateItemsOnCart,
    removeItemsFromCart,
    selectPlaceOrderInfo,
    setFlatDiscount,
    setNote,
} from './placeOrderSlice'
import { placeOrderAPI } from 'src/API/order.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { hapticFeedback } from 'src/utils/vibrate'
import AddPaymentModal from '../AddPaymentModal'
import { BUTTON_ACTION } from './types'

export default function PlaceOrder() {
    const { token, user } = useSelector(selectCredentials)
    const [paymentModalVisible, setPaymentModalVisible] = useState(false)

    const [isOpen, setIsOpen] = React.useState(true)
    //     const [isDropOpen, setIsDropOpen] = React.useState<
    //     | {
    //       isAdd: boolean;
    //       isOpen: any;
    //     }
    //     | undefined
    //   >(undefined)

    const [isSubmit, setIsSubmit] = useState<boolean>(false)
    const [isValidCart, setIsValidCart] = useState<boolean>(false)
    const [isValidDiscount, setIsValidDiscount] = useState<boolean>(false)

    const [search, setSearch] = useState('')

    const placeOrder = useSelector(selectPlaceOrderInfo)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const isSupplier = localStorage.getItem('isSupplier') === 'true'

    useEffect(() => {
        if (placeOrder.cartItems?.length !== 0) {
            setIsValidCart(true)
        } else {
            setIsValidCart(false)
        }
    }, [placeOrder.cartItems])

    const getTotalPrice = useCallback(() => {
        const price = placeOrder.cartItems?.reduce(
            (a: any, b: any) => a + b.quantity * parseFloat(b?.rate),
            0
        )
        return price
    }, [placeOrder.cartItems])

    useEffect(() => {
        const discountPrice = placeOrder.discount
        const finalPrice = getTotalPrice()

        if (discountPrice > finalPrice) {
            setIsValidDiscount(false)
        } else {
            setIsValidDiscount(true)
        }
    }, [getTotalPrice, placeOrder.cartItems, placeOrder.discount])

    function handleAddItem(item: any, caseQuantity: number) {
        dispatch(
            pushItemsToCart([
                {
                    ...item,
                    quantity: caseQuantity,
                },
            ])
        )
    }

    function updateItem(item: any, caseQuantity: number) {
        dispatch(
            updateItemsOnCart([
                {
                    ...item,
                    quantity: caseQuantity,
                },
            ])
        )
    }

    function handleRemoveItemItem(item: any, caseQuantity: number) {
        dispatch(removeItemsFromCart({ id: item.id, quantity: caseQuantity }))
    }

    // function closeDropList() {
    //     setIsDropOpen({
    //         isAdd: false,
    //         isOpen: undefined,
    //     })
    // }

    function handleDiscountValue() {
        if (!placeOrder.discount) {
            dispatch(setFlatDiscount(parseFloat('0')))
        } else {
            dispatch(setFlatDiscount(Math.abs(placeOrder.discount)))
        }
    }

    function updateDiscount(event: any) {
        const inputValue = event?.target.value
        const finalPrice = getTotalPrice()
        if (inputValue) {
            if (inputValue > finalPrice) {
                setIsValidDiscount(false)
                dispatch(setFlatDiscount(finalPrice as any))
                setTimeout(() => {
                    setIsValidDiscount(true)
                }, 5000)
            } else {
                setIsValidDiscount(true)
                dispatch(setFlatDiscount(parseFloat(inputValue as any)))
            }
        } else {
            dispatch(setFlatDiscount(inputValue as any))
        }
    }

    function handleSubmit() {
        setIsSubmit(true)
        user?.organization?.isSupplier
            ? isValidCart && setPaymentModalVisible(true)
            : proceedPlaceOrder()
    }

    async function proceedPlaceOrder() {
        if (placeOrder.cartItems?.length !== 0 && isValidDiscount) {
            const order = await placeOrderAPI({
                token, data: {
                    description: placeOrder.note,
                    flatDiscount: placeOrder.discount,
                    supplierId: isSupplier ? user?.organizationId : placeOrder.orgId,
                    buyerId: isSupplier ? placeOrder.orgId : user?.organizationId,
                    orderItems: placeOrder.cartItems?.map((mapItem) => {
                        return {
                            quantity: mapItem.quantity,
                            purchasePrice: parseFloat(mapItem.rate),
                            productId: mapItem.id,
                            aliasName: mapItem.aliasName ?? '',
                            mrpPrice: parseFloat(mapItem.mrpPrice),
                        }
                    }),
                }
            })
            // .then(() => {
            // navigate(`/chat/${localStorage?.getItem('inboxId')}`)
            // })

            if (user?.organization?.isSupplier) {
                console.log('order2', order)
                return order?.data
            } else {
                navigate(`/chat/${localStorage?.getItem('inboxId')}`)
            }
        }
        return undefined
    }

    function renderCartItems() {
        if (placeOrder.cartItems?.length === 0) {
            return (
                <div>
                    <img className="m-auto mt-4 h-32 md:h-48 p-6" alt="no items" src={ChatImg} />
                    <div className="m-auto text-sm mb-8 w-2/3  md:px-6 text-center dark:text-gray-300">
                        {' '}
            You do not have any items in your cart, please add by tapping add
            more below.{' '}
                    </div>
                </div>
            )
        }
        return (
            <>
                <div className={'my-4'}>
                    <input
                        value={search}
                        onChange={(event) => setSearch(event.target.value)}
                        placeholder={'Search'}
                        className="focus:shadow-outline w-full transform rounded-lg border-transparent bg-gray-200 p-2 text-base text-black opacity-75 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                    />
                </div>
                {placeOrder.cartItems
                    ?.filter((filterItem) =>
                        `${filterItem.centralCatalogue?.name?.toLowerCase()}${filterItem.aliasName?.toLowerCase()}`.includes(
                            search
                        )
                    )
                    ?.map((item) => (
                        <div key={item.id} className="my-5 border-b border-gray-300 dark:border-gray-700">
                            <div className="grid grid-rows-2">
                                <div className="flex ">
                                    <div className="h-16 w-16 self-center overflow-hidden rounded-lg bg-gradient-to-br from-blue-100 to-indigo-100 bg-cover bg-center shadow-xl">
                                        {item?.thumbnailImage && (
                                            <img
                                                src={getImageURL(
                                                    item?.thumbnailImage,
                                                    IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE
                                                )}
                                                alt="Avatar"
                                                className="h-full w-full object-cover "
                                            />
                                        )}
                                    </div>

                                    <div className="ml-4">
                                        <div className=" text-base font-bold text-gray-600 dark:text-gray-200">
                                            {`${item.centralCatalogue?.name} `}
                                        </div>
                                        <div className=" text-sm font-bold text-gray-600 dark:text-gray-300">
                                            {item.aliasName ? `( ${item.aliasName})` : ''}
                                        </div>
                                        <div className=" text-xs font-bold text-gray-500 dark:text-gray-400">
                      MRP: ₹{item?.mrpPrice} Cost: ₹{item?.rate}
                                        </div>

                                        <div className=" text-xs font-bold text-gray-400 dark:text-gray-500">
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
                                                    hapticFeedback()
                                                    handleRemoveItemItem(item, 1)
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
                                                    className="w-12 border border-dashed border-indigo-300 px-2 rounded dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600"
                                                    type="number"
                                                    name="qty"
                                                    id="qty"
                                                    onChange={(e) => {
                                                        updateItem(item, parseInt(e.target.value))
                                                    }}
                                                    onBlur={(e) => {
                                                        item.quantity
                                                            ? parseInt(e.target.value)
                                                            : updateItem(item, 1)
                                                    }}
                                                    value={item.quantity ?? 0}
                                                />
                                            </form>
                                        </div>

                                        <div className=" ml-6 items-center text-blue-600 dark:text-blue-400">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                onClick={() => {
                                                    hapticFeedback()
                                                    handleAddItem(item, 1)
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

                                    <div className="place-self-center pb-1 ml-9">
                                        <button
                                            className="mt-1  rounded border border-blue-500 bg-transparent py-1 px-4 text-xs font-semibold text-blue-500 hover:border-transparent hover:bg-blue-500 hover:text-white"
                                            onClick={() => {
                                                hapticFeedback()
                                                handleRemoveItemItem(item, item?.quantity || 0)
                                            }}
                                        >
                      Delete
                                        </button>{' '}
                                    </div>

                                    <div className="text-right text-lg font-bold text-gray-600  dark:text-gray-200">
                    ₹{item?.quantity * parseFloat(item?.rate)}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </>
        )
    }

    return (
        <div className="min-h-screen bg-white dark:bg-gray-900">
            <div className="w-full bg-white shadow ">
                <SimpleHeader
                    backFn={() => navigate(`/chat/${localStorage?.getItem('inboxId')}`)}
                    heading={'Place Order'}
                />
            </div>
            <div className={'p-2 pt-20'}>
                
                <div className="m-2 rounded-lg border border-gray-200 px-4 pb-4 pt-4 dark:border-gray-700">
                    <div className="flex justify-between">
                        <div className="text-xl font-bold dark:text-gray-300">Items</div>
                        <div className=" dark:text-gray-300">
                            {!isOpen ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    onClick={() => {
                                        hapticFeedback()
                                        setIsOpen(true)
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
                                        hapticFeedback()
                                        setIsOpen(false)
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
                                className="m-auto w-fit px-4 my-4 flex flex-wrap 
                  transform cursor-pointer items-center justify-center rounded-full border 
                    border-indigo-600 bg-gradient-to-br from-blue-50 to-blue-100 py-2
                    text-indigo-700 transition  duration-500 ease-in-out dark:bg-gradient-to-br dark:from-blue-500 dark:to-indigo-700"
                                onClick={() => {
                                    hapticFeedback()
                                    navigate('/place-order/add-item')
                                }}
                            >
                                <div className=" rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 dark:bg-gradient-to-br dark:from-gray-800 dark:to-gray-900">
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
                                <div className="ml-2 text-lg dark:text-white">
                  Add more items
                                </div>
                            </div>

                            
                        </div>
                    )}
                </div>
                {isSupplier ? (
                    <div className="m-2 rounded-lg border border-gray-200 px-4 pb-8 pt-4  dark:border-gray-700">
                        <span className="float-left mb-2 text-sm text-gray-500">
              Flat discount amount
                        </span>
                        <input
                            value={placeOrder.discount}
                            onBlur={handleDiscountValue}
                            onChange={(event) => updateDiscount(event)}
                            className="focus:shadow-outline w-full transform rounded-lg border-transparent bg-gray-200 p-2 text-base text-black opacity-75 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                            inputMode="numeric"
                            type="number"
                            min={0}
                        />

                        <span
                            className={
                                'mt-2 ml-4 flex items-center text-xs font-medium tracking-wide text-green-500 ' +
                (isValidDiscount ? 'hidden' : '')
                            }
                        >
              * Maximum Discount Applicable: ₹{getTotalPrice()}
                        </span>
                    </div>
                ) : null}
                {/* <!-- Textarea --> */}
                <div className="p-2">
                    <span className="float-left mb-2 text-sm text-gray-500">Note</span>
                    <textarea
                        value={placeOrder.note}
                        placeholder="Enter a description or reason for the order"
                        onChange={(event) => dispatch(setNote(event.target.value as any))}
                        className="focus:shadow-outline w-full transform rounded-lg border-transparent bg-gray-200 p-4 text-base text-black opacity-75 ring-offset-2 ring-offset-current transition duration-500 ease-in-out focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                        id=""
                    />
                </div>
                <div className="">
                    <span
                        className={
                            'mt-2 ml-4 flex items-center text-xs font-medium tracking-wide text-red-500 ' +
                  (isSubmit ? (isValidCart ? 'hidden' : '') : 'hidden')
                        }
                    >
                * Add items to cart to continue order
                    </span>

                    <div className="mt-2 grid grid-cols-5 gap-3">
                        <div className="col-span-3 mt-1 ml-4">
                            <div className="text-base text-gray-400 dark:text-gray-300">
                    Cart Total :
                            </div>

                            <div className="text-base text-gray-400 dark:text-gray-300">
                    Discount :
                            </div>

                            <div className="mt-1 text-lg font-extrabold text-gray-600 dark:text-gray-300">
                    Grand Total :
                            </div>
                        </div>

                        <div className="col-span-2  mt-1 text-right mr-4">
                            <div className="text-base  dark:text-gray-400">
                    ₹{getTotalPrice()}
                            </div>
                            <div className="text-base dark:text-gray-400">
                    ₹{placeOrder.discount}
                            </div>
                            <div className="mt-1 text-lg font-extrabold dark:text-gray-400">
                    ₹
                                {getTotalPrice() -
                      (placeOrder.discount ? placeOrder.discount : 0)}
                            </div>
                        </div>
                    </div>

                    <div className="m-4">
                        <Button
                            onClick={() => {
                                handleSubmit()
                            }}
                        >
                  Place order
                        </Button>
                    </div>
                </div>
            </div>

            {paymentModalVisible && (
                <AddPaymentModal
                    isVisible={paymentModalVisible}
                    toggleVisibility={setPaymentModalVisible}
                    receiverId={isSupplier ? placeOrder.orgId : user?.organizationId}
                    orderAmount={
                        getTotalPrice() - (placeOrder.discount ? placeOrder.discount : 0)
                    }
                    btnAction={BUTTON_ACTION.PLACE_ORDER}
                    placeOrder={proceedPlaceOrder}
                />
            )}
        </div>
    )
}