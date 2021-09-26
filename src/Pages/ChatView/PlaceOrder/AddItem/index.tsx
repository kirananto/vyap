import React from 'react'
import { Header } from 'src/Components/Header'
import AppliedFilters from './AppliedFilters'
import DairySmall from '../../../../assets/img/DairySmall.jpeg'
import Button from 'src/Components/Style/Button'
import DropList from 'src/Components/Style/DropList'

export default function AddItem() {

    const [itemList, setItemList] = React.useState([1, 1, 1, 1, 1, 1, 1, 1, 1, 1])
    const [isDropOpen, setIsDropOpen] = React.useState<{
        isAdd: boolean,
        isOpen: any
    } | undefined>(undefined)

    return (
        <div className="bg-white">
            <div className="w-full pb-3 bg-white shadow ">
                <Header heading="Add Item" />
                <AppliedFilters />
            </div>
            <div className="px-4" style={{ height: 'calc(100vh - 12rem)' }}>
                {itemList.map((item, index) => (<div className="flex pt-4 gap-2 justify-between border-b-2 border-gray-100 pb-2" key={`${index}`}>
                    {/* TODO: Remove this console.log */}
                    {console.log(item)}
                    <div className="flex gap-2 items-center">
                        <div className="flex h-12 w-12 rounded border border-gray-300 bg-white">
                            <img className="h-full w-full" src={DairySmall} alt="" />
                        </div>
                        <div className="flex flex-col">
                            <div className="flex text-base font-bold text-gray-600">Dairy Milk Silk 15Gm Item</div>
                            <div className="flex font-bold text-xs text-gray-300">#213r423423423423423</div>
                            <div className="flex font-bold text-xs text-gray-400">MRP: 50 Cost: 48.5</div>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="flex text-blue-600 items-center">
                            <DropList
                                isOpen={isDropOpen?.isOpen === index && !isDropOpen.isAdd}
                                list={[{
                                    appearance: 'danger',
                                    label: 'Remove 1 Item'
                                }, {
                                    appearance: 'danger',
                                    label: 'Remove 1 Case (10 Pc)'
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
                        <div className="flex items-center">10</div>
                        <div className="flex text-blue-600 items-center">
                            <DropList
                                isOpen={isDropOpen?.isOpen === index && isDropOpen.isAdd}
                                list={[{
                                    appearance: 'primary',
                                    label: 'Add 1 Item'
                                }, {
                                    appearance: 'primary',
                                    label: 'Add 1 Case (10 Pc)'
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
                </div>))}
            </div>
            <div className="fixed bottom-12 m-auto left-0 right-0 px-4">
                <Button>Add 10 items (₹1660)</Button>
            </div>
        </div>
    )
}