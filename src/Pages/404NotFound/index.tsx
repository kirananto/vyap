import React from 'react'
import { Link } from 'react-router-dom'
import Button from 'src/Components/Style/Button'

export default function PageNotFound() {
    return (<div className="bg-white dark:bg-gray-900 flex flex-col items-center h-screen">
        <div className="flex items-center justify-center w-full h-screen px-6 md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 lg:px-16 xl:px-12">
            <div>
                404
                <div>Please go to home</div>
                <div>
                    <Link to="/home">
                        <Button> Home </Button>
                    </Link>
                </div>
            </div>
        </div>
    </div>)
}