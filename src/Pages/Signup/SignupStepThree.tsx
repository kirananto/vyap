import React, { useEffect, useState } from 'react'
import vyapLogo from 'src/assets/new_logo.svg'
import './Signup.css'
import { SimpleFooter } from '../../Components/Footer'
import { useNavigate } from 'react-router'
import { fetchCategories } from 'src/API/category.axios'
import { useDispatch, useSelector } from 'react-redux'
import { selectCredentials, setCredentials } from '../Login/credentialsSlice'
import { clearAll, selectSignupInfo, setCategory } from './signupSlice'
import { signupAPI } from 'src/API/signup.axios'
import { hapticFeedback } from 'src/utils/vibrate'
import type { ICategories, IFetchCategories } from 'src/types/categories'

interface CardInterface {
    title: string
    description: string
    isSelected?: boolean
    onSelect?: () => void
}

const Card = ({ title, description, isSelected, onSelect }: CardInterface) => {
    return (
        <div onClick={() => {
            hapticFeedback()
            onSelect ? onSelect() : undefined
        }} className="flex cursor-pointer items-center gap-3 bg-white custom dark:bg-slate-700">
            {/* ===tick-div=== */}
            <div className={`inline-flex items-center justify-center w-8 h-8 mx-2 p-1 transition duration-500 ease-in-out rounded-full ${isSelected ? 'bg-green-200' : 'bg-slate-200 dark:bg-slate-500'}`}>
                {isSelected && <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 text-green-800"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                    />
                </svg>}
            </div>
            {/* === */}
            <div className="flex flex-col custom-width-para-text ml-2">
                <h1 className="text-lg font-bold text-slate-600 dark:text-slate-200">{title}</h1>
                <p className="text-xs text-slate-500 dark:text-slate-300 w-32 break-words	">
                    {description}
                </p>
                {/* <img src="" alt="" /> */}
            </div>
            <div className="background-graphics"></div>
        </div>
    )
}

export default function SignupStepThree() {
    const logoStyle = { marginLeft: '-20px' }
    const [categories, setCategories] = useState<ICategories[]>([])
    const [categoryError, setCategoryError] = useState(false)
    const [error, setError] = useState<boolean | undefined>(undefined)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { token } = useSelector(selectCredentials)
    const signup = useSelector(selectSignupInfo)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        fetchCategories(token).then((result: IFetchCategories) => {
            setCategories(result.data?.data)
        }).catch(() => {
            console.log('error')
        })
    }, [token])

    function handleSubmit() {
        //TODO Fix this
        if (signup.category) {
            setLoading(true)
            setError(undefined)
            setCategoryError(false)
            signupAPI({
                phone: signup.phone,
                name: signup.name,
                email: signup.email,
                businessName: signup.businessName,
                address: signup.address,
                category: signup.category.map(item => ({ id: item?.id })),
                pinCode: signup.pinCode,
                listPrivately: signup.listPrivately,
                organizationLocation: {
                    lat: signup.organizationLocation.lat,
                    lng: signup.organizationLocation.lng,
                    address: signup.address,
                    city: 'Nil',
                    pinCode: signup.pinCode,
                    state: 'Kerala'
                }
            }).then(result => {
                console.log('result,', result.data)
                dispatch(setCredentials(result.data))
                dispatch(clearAll())
                navigate('/signup-step-4')
            }).catch(error => {
                console.log('error.', error.response)
                setError(error?.response?.data?.message ?? true)
            }).finally(() => {
                setLoading(false)
            })
        } else {
            setCategoryError(true)
        }
    }

    return (
        <div className="flex flex-col items-start w-full min-h-screen bg-slate-100 dark:bg-slate-900 pb-48">
            <div className="w-11/12 mx-auto ">
                <div className="flex items-center justify-start mt-32 mb-5">
                    <img style={logoStyle} className="w-24 m--5" src={vyapLogo} alt="" />
                    <h1 className="text-4xl font-bold text-slate-600 dark:text-slate-300">VYAP</h1>
                </div>

                <h1 className="text-lg font-bold text-slate-600 dark:text-slate-300">
                    Please specify the <br /> category of business
                </h1>

                {categoryError && <div className="text-rose-500 dark:text-rose-400 mt-2 text-xs">
                    * Please select a category to proceed
                </div>}
                {error && <div className="text-rose-500 dark:text-rose-400 mt-2 text-xs">
                    <span className="pl-1">* {typeof error === 'string' ? error : 'Something went wrong during the signup.'} </span>
                    {Array.isArray(error) ? <ul className="border border-slate-300 dark:border-slate-700 p-4 px-8 rounded bg-slate-200 dark:bg-slate-900 m-2 mx-2 text-xs list-disc">
                        {error?.map((mapItem: string) => <li key={mapItem}>{mapItem} </li>)}
                    </ul> : null}
                </div>}
                <div className="flex flex-col gap-4 mt-6">
                    {categories.map(mapItem => <Card isSelected={signup.category?.some(someItem => someItem.id === mapItem?.id)} onSelect={() => dispatch(setCategory(mapItem))} title={mapItem.name} key={mapItem.id} description={mapItem?.description} />)}
                </div>
            </div>
            <SimpleFooter isDisabled={loading} btnName="Create account" onClick={handleSubmit} />
        </div>
    )
}