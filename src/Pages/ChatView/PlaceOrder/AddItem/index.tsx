import React, { useEffect } from 'react'
import { Header } from 'src/Components/Header'
import AppliedFilters from './AppliedFilters'
import DairySmall from '../../../../assets/img/DairySmall.jpeg'
import Button from 'src/Components/Style/Button'
import DropList from 'src/Components/Style/DropList'
import { useDispatch, useSelector } from 'react-redux'
import { pushItemsToCart, selectPlaceOrderInfo } from '../placeOrderSlice'
import { useHistory } from 'react-router'
import { fetchProducts } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import ChatImg from '../../../Product/assets/no_data.svg'

export default function AddItem() {

    const [itemList, setItemList] = React.useState<any[]>([])
    const [selectedItems, setSelectedItems] = React.useState<any>([])
    const [isDropOpen, setIsDropOpen] = React.useState<{
        isAdd: boolean,
        isOpen: any
    } | undefined>(undefined)

    const { token, user } = useSelector(selectCredentials)

    const placeOrder = useSelector(selectPlaceOrderInfo)

    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        // TODO use placeOrder.orgId
        fetchProducts(token!, user?.organizationId!, 20, 0).then((result: any) => {
            setItemList(result.data?.data ?? [])
        })
    }, [])

    function onSubmit() {
        //TODO Add to dispatch
        dispatch(pushItemsToCart(selectedItems))
        history.push('/place-order')
    }

    function handleAddItem(item: any, caseQuantity: number) {
        const isAlreadyPresent = selectedItems?.some((someItem: any) => someItem.id === item.id)
        if (isAlreadyPresent) {
            const _selectedItems = selectedItems?.map((mapItem: any) => {
                if (mapItem.id === item.id) {
                    return {
                        ...mapItem,
                        quantity: mapItem.quantity + caseQuantity
                    }
                }
                return mapItem
            }).filter((filterItem: any) => filterItem.quantity > 0)

            setSelectedItems(_selectedItems)
        } else {
            const _selectedItems = [...selectedItems, {
                ...item,
                quantity: caseQuantity
            }]

            setSelectedItems(_selectedItems)
        }
    }


    function handleRemoveItemItem(item: any, caseQuantity: number) {
        const _selectedItems = selectedItems?.map((mapItem: any) => {
            if (mapItem.id === item.id) {
                return {
                    ...mapItem,
                    quantity: mapItem.quantity - caseQuantity
                }
            }
            return mapItem
        }).filter((filterItem: any) => filterItem.quantity > 0)

        setSelectedItems(_selectedItems)
    }

    function calculatePriceOfSelected() {
        const price = selectedItems?.reduce((a: any, b: any) => (a + (b.quantity * parseFloat(b?.rate))), 0)
        return price
    }

    function renderItems() {
        if (itemList?.length === 0) {
            return <div>
                <img className="mt-12 h-48 p-6 m-auto" src={ChatImg} />
                <div className="text-center px-6 w-2/3 m-auto mb-8"> Sorry the seller has no products for sale. </div>
            </div>
        }
        return itemList.map((item, index) => (<div className="flex pt-4 gap-2 justify-between border-b-2 border-gray-100 dark:border-gray-700 pb-2" key={`${index}`}>
            {/* TODO: Remove this console.log */}
            {console.log(item)}
            <div className="flex gap-2 items-center">
                <div className="flex h-12 w-12 rounded border border-gray-300 bg-white">
                    <img className="h-full w-full" src={DairySmall} alt="" />
                </div>
                <div className="flex flex-col">
                    <div className="flex text-base font-bold text-gray-600 dark:text-gray-200">{`${item.centralCatalogue?.name} (${item.aliasName})`}</div>
                    <div className="flex font-bold text-xs text-gray-300">#213r423423423423423</div>
                    <div className="flex font-bold text-xs text-gray-400">MRP:  ₹{item?.mrpPrice} Cost: ₹{item?.rate}</div>
                </div>
            </div>
            <div className="flex gap-2">
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
                <div className="flex items-center dark:text-gray-200">{selectedItems?.find((findItem: any) => findItem.id === item.id)?.quantity ?? 0}</div>
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
        </div>))
    }

    return (
        <div className="bg-white dark:bg-gray-900">
            <div className="w-full pb-3 bg-white shadow dark:bg-gray-800">
                <Header heading="Add Item" />
                <AppliedFilters />
            </div>
            <div className="px-4" style={{ height: 'calc(100vh - 12rem)' }}>
                {renderItems()}
            </div>
            <div className="fixed bottom-12 m-auto left-0 right-0 px-4">
                <Button onClick={onSubmit}>Add {selectedItems?.length} items (₹{calculatePriceOfSelected()})</Button>
            </div>
        </div>
    )
}