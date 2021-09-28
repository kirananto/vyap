import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'
import { SimpleHeader } from 'src/Components/Header'
import Button from 'src/Components/Style/Button'
import DairySmall from '../../../assets/img/DairySmall.jpeg'
import ChatImg from '../../Product/assets/no_data.svg'
import { selectPlaceOrderInfo, setFlatDiscount, setNote } from './placeOrderSlice'

export default function PlaceOrder() {

    const [isOpen, setIsOpen] = React.useState(true)

    const placeOrder = useSelector(selectPlaceOrderInfo)
    const dispatch = useDispatch()
    const history = useHistory()

    function renderCartItems() {
        if (placeOrder.cartItems?.length === 0) {
            return <div>
                <img className="mt-12 h-48 p-6 m-auto" src={ChatImg} />
                <div className="text-center px-6 w-2/3 m-auto mb-8"> You do not have any items in your cart, please add by tapping add more below. </div>
            </div>
        }
        return (<>
            <div className={'my-4'}>
                <input placeholder={'Search'} className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " />
            </div>
            {placeOrder.cartItems.map((item, index) => (<div className="flex justify-between" key={`${index}`}>
                {/* TODO: Remove this console.log */}
                {console.log(item)}
                <div className="flex pt-4 gap-2 items-center">
                    <div className="h-10 w-10 rounded border border-gray-300 bg-white">
                        <img className="h-full w-full" src={DairySmall} alt="" />
                    </div>
                    <div className="flex flex-col">
                        <div className="flex text-base font-bold text-gray-600">Dairy Milk Silk</div>
                        <div className="flex font-bold text-xs text-gray-300">15 Gms</div>
                        <div className="flex font-bold text-xs text-gray-400">MRP: 50 Cost: 50</div>
                    </div>
                    <div className="flex text-blue-600 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div className="flex items-center">10</div>
                    <div className="flex text-blue-600 items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                </div>
                <div className="flex text-lg font-bold text-gray-600 items-center">
                    ₹500
                </div>
            </div>
            ))}
        </>)
    }

    return (
        <div className="bg-white">
            <div className="w-full bg-white shadow ">
                <SimpleHeader heading={'Place Order'} />
            </div>
            <div className={'p-2'}>
                {/* <!-- Textarea --> */}
                <div className="p-2">
                    <span className="float-left mb-2 text-sm text-gray-500">Note</span>
                    <textarea value={placeOrder.note} onChange={(event) => dispatch(setNote(event.target.value as any))} className="p-4 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 " id=""></textarea>
                </div>
                <div className="border rounded-lg m-2 px-4 border-gray-200 pb-8 pt-4">
                    <div className="flex text-red-600 text-xs justify-end">* only available for supplier</div>
                    <span className="float-left mb-2 text-sm text-gray-500">Flat discount amount</span>
                    <input value={placeOrder.discount} onChange={(event) => dispatch(setFlatDiscount(parseFloat(event?.target.value as any)))} className="p-2 w-full text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                        inputMode="numeric" type="number" />
                </div>
                <div className="border rounded-lg m-2 px-4 border-gray-200 pb-4 pt-4">
                    <div className="flex justify-between">
                        <div className="text-xl font-bold">Items</div>
                        <div>
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
                        <div className="flex w-full border border-dashed py-2 mt-4 cursor-pointer justify-center items-center" onClick={() => history.push('/place-order/add-item')}>
                            <div className="flex ">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="flex font-bold text-gray-600 text-lg">
                                Add more items
                            </div>
                        </div>
                        <div className="mt-4 text-right">
                            <div className="text-gray-400 text-xl font-extrabold">Total</div>
                            <div className="text-xl font-extrabold">₹1660</div>
                            <div className="text-xl font-extrabold">₹660</div>
                        </div>
                        <div className="mt-4">
                            <Button>Place order</Button>
                        </div>
                    </div>}
                </div>
            </div>
        </div>
    )
}