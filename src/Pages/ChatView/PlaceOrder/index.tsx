import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { SimpleHeader } from 'src/Components/Header'
import Button from 'src/Components/Style/Button'
import ChatImg from '../../Product/assets/no_data.svg'
import DropList from 'src/Components/Style/DropList'

import { pushItemsToCart, removeItemsFromCart, selectPlaceOrderInfo, setFlatDiscount, setNote } from './placeOrderSlice'
import { placeOrderAPI } from 'src/API/order.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'

export default function PlaceOrder() {
    const { token, user } = useSelector(selectCredentials)

    const [isOpen, setIsOpen] = React.useState(true)
    const [isDropOpen, setIsDropOpen] = React.useState<{
        isAdd: boolean,
        isOpen: any
    } | undefined>(undefined)

    const placeOrder = useSelector(selectPlaceOrderInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    function handleAddItem(item: any, caseQuantity: number) {
        dispatch(pushItemsToCart([{
            ...item,
            quantity: caseQuantity
        }]))
    }

    function handleRemoveItemItem(item: any, caseQuantity: number) {
        dispatch(removeItemsFromCart({ id: item.id, quantity: caseQuantity }))
    }

    function getTotalPrice() {
        const price = placeOrder.cartItems?.reduce((a: any, b: any) => (a + (b.quantity * parseFloat(b?.rate))), 0)
        return price
    }

    function handleSubmit() {
        console.log('handleSubmit')
        placeOrderAPI(token!, {
            description: placeOrder.note,
            flatDiscount: placeOrder.discount,
            supplierId: placeOrder.orgId,
            buyerId: user?.organizationId!,
            orderItems: placeOrder.cartItems?.map(mapItem => {
                return {
                    quantity: mapItem.quantity,
                    purchasePrice: parseFloat(mapItem.rate),
                    productId: mapItem.id
                }
            })
        }).then(result => {
            history.push(`/chat/${localStorage?.getItem('inboxId')}`)
        })
    }

    function renderCartItems() {
        if (placeOrder.cartItems?.length === 0) {
            return <div>
                <img className="mt-12 h-48 p-6 m-auto" src={ChatImg} />
                <div className="text-center px-6 w-2/3 m-auto mb-8 dark:text-gray-300"> You do not have any items in your cart, please add by tapping add more below. </div>
            </div>
        }
        return (<>
            <div className={'my-4'}>
                <input placeholder={'Search'} className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 " />
            </div>
            {placeOrder.cartItems.map((item, index) => (<div className="flex justify-between" key={`${index}`}>
                {/* TODO: Remove this console.log */}
                {console.log(item)}
                <div className="flex pt-4 gap-2 items-center">
                    <div className="h-10 w-10 rounded border border-gray-300 bg-white">
                        <img className="h-full w-full" src={getImageURL(item?.thumbnailImage, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-base font-bold text-gray-600 dark:text-gray-200">{`${item.centralCatalogue?.name} (${item.aliasName})`}</div>
                        <div className="flex font-bold text-xs text-gray-300 dark:text-gray-300">{item?.centralCatalogue?.description}</div>
                        <div className="flex font-bold text-xs text-gray-400 dark:text-gray-400">MRP: ₹{item?.mrpPrice} Cost: ₹{item?.rate}</div>
                    </div>
                    <div className="flex text-blue-600 dark:text-blue-400 items-center">
                        <DropList
                            isOpen={isDropOpen?.isOpen === index && !isDropOpen.isAdd}
                            list={[{
                                appearance: 'danger',
                                label: 'Remove 1 Item',
                                onClick: () => handleRemoveItemItem(item, 1)
                            }, {
                                appearance: 'danger',
                                label: 'Remove 1 Case (10 Pc)',
                                onClick: () => handleRemoveItemItem(item, 10)
                            }]}
                            trigger={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>}
                            onClick={() => {
                                if (isDropOpen?.isOpen === index && !isDropOpen.isAdd) {
                                    setIsDropOpen({
                                        isAdd: false,
                                        isOpen: undefined
                                    })
                                } else {
                                    setIsDropOpen({
                                        isAdd: false,
                                        isOpen: index
                                    })
                                }
                            }}
                        />
                    </div>
                    <div className="flex items-center dark:text-gray-200">{item.quantity ?? 0}</div>
                    <div className="flex text-blue-600 dark:text-blue-400 items-center">
                        <DropList
                            isOpen={isDropOpen?.isOpen === index && isDropOpen.isAdd}
                            list={[{
                                appearance: 'primary',
                                label: 'Add 1 Item',
                                onClick: () => handleAddItem(item, 1)
                            }, {
                                appearance: 'primary',
                                label: 'Add 1 Case (10 Pc)',
                                onClick: () => handleAddItem(item, 10)
                            }]}
                            trigger={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>}
                            onClick={() => {
                                if (isDropOpen?.isOpen === index && isDropOpen.isAdd) {
                                    setIsDropOpen({
                                        isAdd: true,
                                        isOpen: undefined
                                    })
                                } else {
                                    setIsDropOpen({
                                        isAdd: true,
                                        isOpen: index
                                    })
                                }
                            }}
                        />
                    </div>
                </div>
                <div className="flex text-lg font-bold text-gray-600 items-center dark:text-gray-200">
                    ₹{item?.quantity * parseFloat(item?.rate)}
                </div>
            </div>
            ))}
        </>)
    }

    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen">
            <div className="w-full bg-white shadow ">
                <SimpleHeader heading={'Place Order'} />
            </div>
            <div className={'p-2 pt-20'}>
                {/* <!-- Textarea --> */}
                <div className="p-2">
                    <span className="float-left mb-2 text-sm text-gray-500">Note</span>
                    <textarea value={placeOrder.note} onChange={(event) => dispatch(setNote(event.target.value as any))} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 " id=""></textarea>
                </div>
                <div className="border rounded-lg m-2 px-4 border-gray-200 pb-8 pt-4  dark:border-gray-700">
                    <div className="flex text-red-600 text-xs justify-end">* only available for supplier</div>
                    <span className="float-left mb-2 text-sm text-gray-500">Flat discount amount</span>
                    <input value={placeOrder.discount} onChange={(event) => dispatch(setFlatDiscount(parseFloat(event?.target.value as any)))} className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-gray-500 dark:text-gray-200 dark:focus:bg-gray-600 "
                        inputMode="numeric" type="number" />
                </div>
                <div className="border rounded-lg m-2 px-4 border-gray-200 dark:border-gray-700 pb-4 pt-4">
                    <div className="flex justify-between">
                        <div className="text-xl font-bold dark:text-gray-300">Items</div>
                        <div className=" dark:text-gray-300">
                            {!isOpen ? (<svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsOpen(true)} className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>) : (
                                <svg xmlns="http://www.w3.org/2000/svg" onClick={() => setIsOpen(false)} className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                                </svg>
                            )}
                        </div>
                    </div>
                    {isOpen && <div>

                        {renderCartItems()}
                        <div className="flex w-full border border-dashed dark:border-gray-500 py-2 mt-4 cursor-pointer justify-center items-center" onClick={() => history.push('/place-order/add-item')}>
                            <div className="flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600 dark:text-gray-300 " viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex font-bold text-gray-600 dark:text-gray-300 text-lg">
                                Add more items
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <div className="text-gray-400 dark:text-gray-300 text-xl font-extrabold">Total</div>
                            <div className="text-xl font-extrabold dark:text-gray-400">₹{getTotalPrice()}</div>
                            <div className="text-xl font-extrabold dark:text-gray-400">₹{getTotalPrice() - placeOrder.discount}</div>
                        </div>
                        <div className="mt-4">
                            <Button onClick={handleSubmit}>Place order</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}