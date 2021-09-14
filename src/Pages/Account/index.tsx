import { SimpleHeader } from '../../Components/Header'
import React from 'react'

export default function Account() {
    return (
        <div className="w-full h-screen overflow-y-auto bg-gray-100">
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading=" My Account " />
            </div>
            {/* Caard Container  */}
            <div className="flex flex-col items-center w-full gap-4 py-2 px-8 ">
                <div 
                    className="bg-gradient-to-br from-blue-500 to-indigo-900 rounded-full w-32 h-32 relative"
                >
                    <div
                        className="bg-white rounded-full w-min p-2 text-gray-600 shadow-md object-none absolute top-0 right-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div>
                </div>
                <div className="text-gray-600 text-2xl font-bold pb-8">K & K Automobiles</div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Your name
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Your name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Business name
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Business name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Email
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Pin Code
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Pin Code"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                {/* TODO: Update this */}
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Location
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Location"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-grey-700">
                        Category
                    </label>
                    <input
                        name="tel"
                        value={'123'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Category"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform border-transparent rounded-lg bg-gray-200 opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 "
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