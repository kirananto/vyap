import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import {
    fetchCentralProductImages,
    fetchCentralProducts,
} from 'src/API/products.axios'
import { selectCredentials } from 'src/Pages/Login/credentialsSlice'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import './Drop.css'
import { Length, validate } from 'class-validator'
import type { ICentralProduct, IFetchCentralProducts } from 'src/types/fetchCentralProducts'
import type { ICentralImage, IFetchCentralProductImages } from 'src/types/fetchCentralProductImages'

export class Post {
  @Length(3, 50)
      productName!: string
}

interface IProps {
    key : string
    opt: ICentralProduct
    onSelect: (e: any) => void
}

function List(props: IProps) {
    const { token } = useSelector(selectCredentials)
    const [productImage, setProductImage] = useState<string>()

    useEffect(() => {
        fetchCentralProductImages({ token, limit: 100, offset: 0, catalogueId: props?.opt?.id }).then(
            (result: IFetchCentralProductImages) => {
                const imageName = result.data?.data?.filter((filterItem: ICentralImage) =>
                    filterItem.imageName?.includes('.')
                )?.[0]?.imageName
                if (imageName) {
                    setProductImage(
                        getImageURL(imageName, IMAGEKIT_FOLDERS.CENTRAL_CATALOGUE_IMAGE)
                    )
                }
            }
        )
        return () => {
            setProductImage('') 
        }

    }, [props?.opt?.id, token])

    return (
        <div
            className="drop-main cursor-pointer flex flex-shrink-0"
            onClick={() => props.onSelect(props.opt)}
        >
            <div className="flex flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden bg-cover bg-center bg-gradient-to-br from-blue-100 to-indigo-100">
                {productImage && (
                    <img
                        src={productImage}
                        alt="Avatar"
                        className="object-cover w-full h-full"
                    />
                )}
            </div>
            <div className="flex flex-col">
                <div className="text-xl font-bold text-gray-700 dark:text-gray-200 truncate">
                    {props.opt.name}
                </div>
                <div className="text-base text-gray-400 dark:text-gray-300 truncate">
                    {props.opt.description}
                </div>
                {/* <div className="text-xs font-bold text-gray-400">{props.opt.price}</div> */}
            </div>
        </div>
    )
}

function DropDown(props: any) {
    const [value, setValue] = useState('')
    const [options, setOptions] = useState<ICentralProduct[]>([])

    // const [isOpen, setIsOpen] = useState(false)
    const [isValidProduct, setIsValidProduct] = useState<boolean>(true)
    const { token } = useSelector(selectCredentials)

    // const myRef = useRef<HTMLInputElement>(null)

    // const handleClickOutside = (e: any) => {
    //     if (!myRef?.current?.contains(e.target)) {
    //         setIsOpen(false)
    //     }
    // }

    // useEffect(() => {
    //     document.addEventListener('mousedown', handleClickOutside)
    //     return () => document.removeEventListener('mousedown', handleClickOutside)
    // })

    useEffect(() => {
        fetchCentralProducts({ token, limit: 100, offset: 0, search: value }).then((result: IFetchCentralProducts) => {
            console.log('result', result.data?.data)
            setOptions(result.data?.data!)
        })
    }, [token, value])

    const navigate = useNavigate()

    function search(e: any) {
        const text = e.target.value
        setValue(text)
    }

    function add() {
        const post = new Post()
        post.productName = value

        validate(post).then((errors) => {
            if (errors.length > 0) {
                console.log('validation failed. errors: ', errors)
                setIsValidProduct(false)
            } else {
                setIsValidProduct(true)
                console.log('validation succeed')
                navigate('/create-product')
                props.onSelect({
                    name: value,
                })
            }
        })
    }

    function select(e: any) {
        // setIsOpen(false)
        setValue(e.name)
        if (props.onSelect) {
            props.onSelect(e)
            navigate('/create-product')
        }
    }

    function renderListItems() {
        const listItems = options
        if (listItems?.length === 0) {
            return (
                <div className="p-4">
                    <button
                        className="border w-full rounded mb-6 p-6 flex bg-white dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
                        onClick={add}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-8 h-8"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <div className="ml-4 mt-1">
              Create <strong>{value}</strong> as a new product{' '}
                        </div>
                    </button>
                    <span
                        className={
                            'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-10 ml-1 ' +
              (isValidProduct ? 'hidden' : '')
                        }
                    >
            Invalid product name !
                    </span>
                    <div className="text-center dark:text-gray-300">
            No existing products found, add this as a new product by Clicking
            Add Button.
                    </div>
                </div>
            )
        }
        return [
            ...(value.length > 0
                ? [
                    <>
                        {' '}
                        <button
                            className="border w-full rounded p-6 flex bg-white dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500"
                            onClick={add}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-8 h-8"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                    clipRule="evenodd"
                                />
                            </svg>
                            <div className="ml-4 mt-1">
                  Create <strong>{value}</strong> as a new product{' '}
                            </div>
                        </button>
                        <span
                            className={
                                'flex items-center font-medium tracking-wide text-red-500 text-xs mt-1 mb-10 ml-1 ' +
                  (isValidProduct ? 'hidden' : '')
                            }
                        >
                Invalid product name !
                        </span>
                    </>,
                ]
                : []),
            ...listItems.map((opt: ICentralProduct) => {
                return <List key={opt.id} opt={opt} onSelect={select} />
            }),
        ]
    }
    return (
        <div className="w-full">
            <input
                type="text"
                onChange={search}
                value={value}
                className="p-2 pl-4 w-full border border-gray-200 rounded-lg input-field focus:ring-2 focus:outline-none dark:border-gray-600 dark:bg-gray-600 dark:text-gray-200 dark:focus:bg-gray-600"
                placeholder="Search or create product..."
            />
            <div
                // ref={myRef}
                className={`dark:bg-gray-700 ${'drop-open h-72'}`}
            >
                {renderListItems()}
            </div>
        </div>
    )
}

export default DropDown