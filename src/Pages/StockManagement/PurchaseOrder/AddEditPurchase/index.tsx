import SimpleHeader from '../../../../Components/Header/SimpleHeader'
import React from 'react'
import { useLocation } from 'react-router-dom'
import AddRemoveItems from './AddRemoveItems'

export default function AddEditPurchase() {
    const location = useLocation()

    return (
        <div className="w-full h-screen overflow-y-auto bg-slate-100 dark:bg-slate-900">
            {/* header */}
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading={location.pathname.replace('/purchase-order/', '') === 'new' ? 'Add Purchase Order' : 'Edit Purchase Order'} />
            </div>

            {/* body */}
            <div className="flex flex-col items-center w-full gap-4 py-2 px-8 pt-20 ">
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700 dark:text-slate-300">
                        Supplier name
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Name of the supplier"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700 dark:text-slate-300">
                        GST Number
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="1234567890"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700 dark:text-slate-300">
                        Invoice number
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="223422345678"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700 dark:text-slate-300">
                        Invoice Date
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="5th March 2021"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700 dark:text-slate-300">
                        Invoice amount
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="12,3123 /-"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded bg-slate-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <AddRemoveItems />
            </div>
        </div>
    )
}