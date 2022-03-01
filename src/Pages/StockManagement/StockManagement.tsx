import React from 'react'
import SimpleHeader from '../../Components/Header/SimpleHeader'
import ToggleButton from '../../Components/ToggleButton'
import { SimpleFooter } from '../../Components/Footer'
import { Link } from 'react-router-dom'

export default function StockManagement() {
    return (
        <>
            <SimpleHeader heading="Stock Management" />
            <div className="flex flex-col gap-4 pl-8 pt-20 bg-white dark:bg-slate-900 h-screen">
                <div className="flex flex-col gap-3">
                    <h1 className="text-sm text-slate-500 dark:text-slate-300">Low stock warning</h1>
                    <ToggleButton />
                </div>

                <div className="flex flex-col gap-3 mb-7">
                    <h1 className="text-sm text-slate-500 dark:text-slate-300">Allow negative purchases</h1>
                    <ToggleButton />
                </div>

                <h1 className="text-lg font-bold text-slate-500 dark:text-slate-300">Stock management</h1>
                <div>
                    <Link to="/purchase-order" className="font-medium text-blue-600 underline dark:text-blue-400">10 Purchase orders</Link>
                </div>
            </div>
            <SimpleFooter btnName="Add Purchase Order" />
        </>
    )
}