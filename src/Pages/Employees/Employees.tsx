import React, { useState } from 'react'
import SimpleHeader from '../../Components/Header/SimpleHeader'
import EmployeesCard from './EmployeesCard'
import Popup from '../../Components/Popup'

export default function Employees() {
    const [modalEmployee, setModalEmployee] = useState(false)

    const handlePopup = () => {
        setModalEmployee(true)
    }

    return (
        <div className="w-full h-screen overflow-y-auto bg-slate-100 dark:bg-slate-900">
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading=" Employees" />
            </div>
            {/* Caard Container  */}
            <div className="flex flex-col items-center w-full gap-4 py-2 pt-20">
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
                <EmployeesCard name="Test User" orderTaker="+915620454465" />
            </div>

            {/* Footer */}

            <div className="fixed bottom-0 flex items-center justify-center w-full h-20 bg-white drop-shadow-md dark:bg-slate-800">
                <button
                    onClick={handlePopup}
                    className="w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                >
                    Invite a new employee
                </button>
            </div>
            <Popup trigger={modalEmployee} setModalEmployee={setModalEmployee}>
                <>
                    <h1 className="text-2xl font-bold text-slate-500 dark:text-slate-300">Invite Employee</h1>
                    <div className="pt-5">
                        <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Phone number</p>
                        <input
                            type="text"
                            placeholder="Enter your phone number... "
                            className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                        />
                        <p className="pt-2 text-xs font-bold text-slate-300">
                            We{`'`}ll never share your phone number
                            <br />
                            with anyone else
                        </p>

                        <div className="pt-5">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-300">Role</p>
                            <input
                                type="text"
                                placeholder="Order Taker/ Delivery Person"
                                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                            />
                        </div>
                        {/* todo:: make this multiselect inpupt */}
                        <div className="pt-5">
                            <p className="text-sm font-bold text-slate-500 dark:text-slate-300">
                                Assigned Customers
                            </p>
                            <input
                                type="text"
                                placeholder="Order Taker/ Delivery Person"
                                className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-100 border border-transparent border-slate-200 rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                            />
                        </div>

                        <div className="pt-12">
                            <button className="w-full h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">
                                Invite Employee
                            </button>
                        </div>
                    </div>
                </>
            </Popup>
        </div>
    )
}