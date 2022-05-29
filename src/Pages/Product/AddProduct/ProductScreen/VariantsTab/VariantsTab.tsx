import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    createVariant,
    selectAddProductInfo,
    setMrpPrice,
    setSalesPrice
} from '../../redux/addProductSlice'
import { PAGE_ACTION } from '../types'
import VariantRow from './VariantRow'
import ChatImg from 'src/Pages/Customers/ChatView/assets/Chats.svg'


interface Props {
    action?: PAGE_ACTION
    saveAttempt: number
}

function VariantsTab({ action, saveAttempt }: Props) {
    const addProductInfo = useSelector(selectAddProductInfo)

    const dispatch = useDispatch()


    const resetSalesToZero = () => {
        console.log('data', 'data')
        // dispatch(setSalesPrice(!isNaN(parseFloat(`${addProductInfo.pricing?.salesPrice ?? 0}`)) ? parseFloat(`${addProductInfo.pricing?.salesPrice ?? 0}`) ?? 0 : 0))
    }

    const resetMRPToZero = () => {
        console.log('data', 'data')
        // dispatch(setMrpPrice(!isNaN(parseFloat(`${addProductInfo.pricing?.mrpPrice ?? 0}`)) ? parseFloat(`${addProductInfo.pricing?.mrpPrice ?? 0}`) ?? 0 : 0))
    }

    useEffect(() => {
        if (saveAttempt) {
            resetSalesToZero()
            resetMRPToZero()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [saveAttempt])

    function addMoreVariantsHandler () {
        dispatch(createVariant())
    }

    const variantIndex = addProductInfo?.centralCatalogue?.variants?.findIndex(findItem => findItem.id === addProductInfo.editProduct.variantId)

    const variants = action !== PAGE_ACTION.EDIT ? addProductInfo?.centralCatalogue?.variants : addProductInfo?.centralCatalogue?.variants
            ?.filter(findItem => findItem.id === addProductInfo.editProduct.variantId)
            ?.map(mapItem => ({ ...mapItem, isSelected: true }))
    return (
        <div
            className="flex flex-col w-100 mt-2 pb-24 overflow-auto"
            style={{ height: 'calc(100vh - 22rem)' }}
        >
            {action !== PAGE_ACTION.EDIT ? <div className="text-slate-500 text-sm mb-4">
                Please add your variants here.
            </div> : null}
            {(variants?.length ?? 0) < 1 ? (
                <div>
                    <img
                    loading="lazy"
                    className="m-auto mt-12 h-auto p-12"
                    alt="no transactions"
                    src={ChatImg}
                />
                </div>
            ): null}
            {variants?.map((mapItem) => {
                return <VariantRow key={variantIndex} saveAttempt={saveAttempt} item={mapItem} index={variantIndex}/>
            })}
            {addProductInfo?.centralCatalogue?.id ? <div className="text-center text-sm mt-2 text-slate-500 dark:text-slate-200">
                For adding new variants please contact support.
                {/* 
                    temp sol - Add option to edit variants
                    permanent - Add options to edit variants for admins only 
                */}
            </div> : <div className="mt-6 flex justify-center">
                <button onClick={addMoreVariantsHandler} className="flex flex-wrap border p-4 px-6 rounded-full active:bg-slate-100 ">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    Add more variants
                </button>
            </div>}
        </div>
    )
}

export default VariantsTab