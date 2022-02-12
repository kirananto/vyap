import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { SimpleHeader } from '../../../../Components/Header'
import { clearAll, setCentralCatalogue } from '../redux/addProductSlice'
import DropDown from './DropDown'

export default function AddProductMain() {
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(clearAll())
    }, [dispatch])

    return (
        <div className="w-full h-screen dark:bg-gray-900">
            <SimpleHeader
                heading="Add product"
                backFn={() => navigate('/my-products')}
            />
            <div className="w-11/12 p-3 pt-48 mx-auto dark:bg-gray-900">
                <h1 className="mb-2 font-bold text-gray-500 dark:text-gray-300">What is the product?</h1>
                <DropDown
                    onSelect={(e) =>{
                        dispatch(setCentralCatalogue(e))
                    }} 
                />
            </div>
        </div>
    )
}