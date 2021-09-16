import { SimpleHeader } from '../../Components/Header'
import React from 'react'

export default function Account() {
    return (
        <div className="w-full h-screen overflow-y-auto bg-gray-100">
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading=" My Account " />
            </div>
            {/* Caard Container  */}
            <div className="flex flex-col items-center w-full gap-4 px-8 py-2 ">
                <div 
                    className="relative w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-indigo-900"
                >
                    <div
                        className="absolute top-0 right-0 object-none p-2 text-gray-600 bg-white rounded-full shadow-md w-min"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
                <div className="pb-8 text-2xl font-bold text-gray-500">K & K Automobiles</div>
                <div className="w-full">
                    <label className="block text-sm font-bold leading-relaxed tracking-tighter text-gray-500">
                        Your name
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Your name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500">
                        Business name
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Business name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500">
                        Email
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500">
                        Pin Code
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Pin Code"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                {/* TODO: Update this */}
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500">
                        Location
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Location"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-gray-500">
                        Category
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Category"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-gray-200 border-transparent rounded-lg opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
            </div>

            {/* Footer */}

            <div className="fixed bottom-0 flex items-center justify-center w-full h-16 bg-white shadow">
                <button className="w-2/4 h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700">Update account details</button>
            </div>
        </div>
    )
}