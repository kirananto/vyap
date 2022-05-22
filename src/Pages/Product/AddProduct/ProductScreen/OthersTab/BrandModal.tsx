import React, { useEffect, useState } from 'react'
import { useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { fetchBrands } from 'src/API/brand.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { setBrand } from '../../redux/addProductSlice'

export interface BrandInterface {
  id?: string
  name: string
  description?: string
}

interface BrandModalInterface {
    setModal: (value: boolean) => void
    trigger: boolean

}

function BrandModal(props: BrandModalInterface) {
    const { token } = useSelector(selectCredentials)
    const intl = useIntl()
    const [searchValue, setSearchValue] = useState<string | undefined>(undefined)
    const [brands, setBrands] = useState<BrandInterface[]>([])

    const dispatch = useDispatch()

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target?.value)
    }

    useEffect(() => {
        fetchBrands({ token, limit: 100, offset: 0, search: searchValue?.toLowerCase() }).then(result => {
            setBrands(result.data?.data)
        })
    }, [searchValue, token])

    function selectBrand(value: BrandInterface) {
        dispatch(setBrand(value))
        props.setModal(false)
    }

    function showCreationBox() {
        const search = searchValue?.toLowerCase()?.trim()
        if(!search) {
            return null
        }
        if(brands?.some(brand => brand.name.toLowerCase() === search)) {
            return null
        }
        return <div key='New' onClick={() => selectBrand({
            name: searchValue ?? ''
        })} className="border border-slate-300 dark:border-slate-600 rounded p-4 my-2">
            <div className="text-slate-700 dark:text-slate-300">{searchValue} </div>
            <div className="mt-1 text-slate-500 dark:text-slate-400 text-xs"> Create this new brand. </div>
        </div>
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
                <h3 className="font-bold text-slate-500 dark:text-slate-200">Brands</h3>
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
                    {showCreationBox()}
                    {brands.map((mapItem) => (
                        <div key={mapItem.id} onClick={() => selectBrand(mapItem)} className="border border-slate-300 dark:border-slate-600 rounded p-4 my-2">
                            <div className="text-slate-700 dark:text-slate-300">{mapItem.name} </div>
                            <div className="mt-1 text-slate-500 dark:text-slate-400 text-xs"> {mapItem.description} </div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    ) : null
}

export default BrandModal