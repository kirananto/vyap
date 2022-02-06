import React from 'react'
import { useNavigate } from 'react-router'
import Button from 'src/Components/Style/Button'

export default function SignupStepFour() {
    const navigate = useNavigate()
    return (
        <div className="flex flex-col items-center h-screen bg-white dark:bg-gray-900">
            <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-2/6 mt-48 mb-4 text-green-800 bg-green-200 rounded-full p-4"
                viewBox="0 0 20 20"
                fill="currentColor"
            >
                <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                />
            </svg>
            <h1 className="mt-4 mb-2 text-4xl font-bold text-gray-600 dark:text-gray-200">Success 🎉</h1>
            <p className="text-lg font-bold text-gray-400">You can now proceed using the app.</p>

            <Button onClick={() => navigate('/add-product')} className="w-8/12 h-12 mt-24 ">Start by adding products</Button>
        </div>
    )
}