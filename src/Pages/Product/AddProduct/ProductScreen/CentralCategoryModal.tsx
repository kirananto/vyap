import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCentralProductCategories } from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import type { ICategories } from 'src/types/categories'
import { setCentralCategory } from '../redux/addProductSlice'
import type { BrandInterface } from './BrandModal'
import './HSNmodal.css'

interface IProps {
    trigger: boolean
    setModal: (arg: boolean) => void
}

function CentralCategoryModal(props: IProps) {
    const { token } = useSelector(selectCredentials)
    const intl = useIntl()
    const [searchValue, setSearchValue] = useState<string>()
    const [items, setItems] = useState<BrandInterface[]>([])

    const dispatch = useDispatch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target?.value)
    }

    useEffect(() => {
        fetchCentralProductCategories({ token, limit: 100, offset: 0, search: searchValue }).then(result => {
            setItems(result.data?.data?.filter((item: ICategories) => item.name))
        })
    }, [searchValue, token])

    function selectHSN(value: BrandInterface) {
        dispatch(setCentralCategory(value))
        props.setModal(false)
    }


    return props.trigger ? (
        <div className="border-t border-slate-100 shadow-2xl popup-container dark:bg-slate-700 dark:border-slate-800">
            <div className="popup-inner">
                <button className="popup-btn" onClick={() => props.setModal(false)}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-8 h-8 text-blue-600 dark:text-blue-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                        />
                    </svg>
                </button>
                <h3 className="font-bold text-slate-500 dark:text-slate-200">Categories</h3>
                <div className="text-slate-400 dark:text-slate-300 mt-2 text-xs font-light">
                </div>
                <div className="relative flex w-full mt-8">
                    <input
                        type="text"
                        id="input"
                        value={searchValue}
                        className="w-full h-10 pl-4 pr-5 bg-slate-100 dark:bg-slate-500 dark:text-slate-100 rounded outline-none "
                        placeholder={intl.formatMessage({ id: `action.search` })}
                        onChange={handleInputChange}
                    />
                </div>
                <div className=" mt-4 overflow-scroll  overflow-x-hidden h-64">
                    {items.map((mapItem) => (
                        <div key={mapItem.id} onClick={() => selectHSN(mapItem)} className="border border-slate-300 dark:border-slate-600 rounded p-4 my-2">
                            <div className="text-slate-700 dark:text-slate-300">{mapItem.name} </div>
                            <div className="mt-1 text-slate-500 dark:text-slate-400 text-xs"> {mapItem.description} </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    ) : null
}

export default CentralCategoryModal