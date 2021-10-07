import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/Components/Style/Button'
import NotFoundImage from './NotFoundImage.svg'

export default function PageNotFound() {
    return (<div className="bg-white dark:bg-gray-900 flex flex-col items-center h-screen">
        <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
            <div>
                <img src={NotFoundImage} className="w-64" />
                <div
                    className="text-2xl font-semibold leading-relaxed  text-gray-700 dark:text-gray-200 mt-8"
                >
                    This page does not exist
                </div>
                <div className="mt-8">
                    <Link to="/home">
                        <Button> Go back home </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}