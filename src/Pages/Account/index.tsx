import SimpleHeader from '../../Components/Header/SimpleHeader'
import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { profileImageUrl, selectCredentials, setBusinessName, setPinCode, setUserEmail, setUserName } from '../Login/credentialsSlice'
import { patchUser } from 'src/API/user.axios'
import { useIntl } from 'react-intl'
import { patchOrganization } from 'src/API/organization.axios'
import { IsEmail, IsString, Length, validate, IsOptional } from 'class-validator'
import profPic from 'src/assets/icons/profile/profile-icon.svg'
import Button from 'src/Components/Style/Button'
import { getImageURL, IMAGEKIT_FOLDERS } from 'src/utils/imageKit'
import { imageUpload } from 'src/API/image.axios'
import type { IProductImageUploadResult } from 'src/types/productImageUploadResult'
import Compressor from 'compressorjs'


export class Organization {

    @Length(3, 64)
    @IsString()
        name?: string

    @Length(3, 64)
    @IsString()
        bizName?: string

    @IsEmail()
    @IsOptional()
        email?: string

    @Length(6)
    @IsString()
        pinCode?: string


}

export default function Account() {

    const { user, token } = useSelector(selectCredentials)
    const [nameError, setNameError] = useState(false)
    const [bizNameError, setBizNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [pinCodeError, setPinCodeError] = useState(false)
    const [loading, setLoading] = useState(false)
    const [success, setSuccess] = useState(false)
    const fileUploaderRef = useRef<HTMLInputElement>(null)
    const [spinner, setSpinner] = useState(false)

    const dispatch = useDispatch()
    const intl = useIntl()

    function handleValidation() {

        setNameError(false)
        setBizNameError(false)
        setPinCodeError(false)
        setEmailError(false)

        const post = new Organization()
        post.name = user?.name
        post.bizName = user?.organization?.name
        post.pinCode = user?.organization?.pinCode
        post.email = user?.email

        console.log(post)
        validate(post).then(errors => {
            console.log('errors', errors)
            if (errors.length > 0) {
                errors.forEach(errorItem => {
                    switch (errorItem.property) {
                        case 'name': setNameError(true); break
                        case 'bizName': setBizNameError(true); break
                        case 'pinCode': setPinCodeError(true); break
                        case 'email': setEmailError(true); break
                    }
                })
            } else {
                handleSave()
            }
        })
    }

    function handleSave() {
        setLoading(true)
        // TODO location
        // TODO category
        Promise.allSettled([
            patchUser({ token: token, id: user?.id, name: user?.name, email: user?.email }),
            patchOrganization({ token: token, id: user?.organizationId, pinCode: user?.organization?.pinCode, name: user?.organization?.name })
        ]).then(() => {
            setSuccess(true)
            setTimeout(() => setSuccess(false), 2000)
            setLoading(false)
        })
    }


    function uploadImage() {
        if (fileUploaderRef.current?.files) {
            if (fileUploaderRef.current?.files?.length > 0) {
                setSpinner(true)
                new Compressor(fileUploaderRef.current?.files?.[0], {
                    quality: 0.8,
                    maxWidth: 500,
                    maxHeight: 500,

                    // The compression process is asynchronous,
                    // which means you have to access the `result` in the `success` hook function.
                    success(result) {
                        const data = new FormData()
                        data.append('file', result)
                        imageUpload({ token, data, folder: IMAGEKIT_FOLDERS.USER_PIC })
                            .then((result: IProductImageUploadResult) => {
                                console.log('result.data', result.data)
                                patchOrganization({ token: token, id: user?.organizationId, profileImageUrl: result.data?.name })
                                    .then(() => {
                                        // TODO Patch org object
                                        dispatch(profileImageUrl(result.data?.name))
                                        setSpinner(false)
                                    })
                            })
                            .catch((error) => {
                                //TODO Handle Error
                                console.log('error', error)
                                setSpinner(false)
                            })
                    },
                    error(err) {
                        //TODO Handle Error
                        console.log(err.message)
                        setSpinner(false)
                    },
                })

            }
        }

    }

    return (
        <div className="w-full h-screen overflow-y-auto bg-white dark:bg-slate-900">
            <div className="w-full mb-2 bg-white shadow">
                <SimpleHeader heading={intl.formatMessage({ id: 'global.myAccount' })} />
            </div>
            {/* Caard Container  */}
            <div className="flex flex-col items-center w-full gap-4 px-8 py-20 pb-64">
                <div
                    className="relative w-32 h-32 rounded-full"
                >
                    <div 
                        className="mt-4 mb-8"
                        onClick={() => fileUploaderRef.current?.click()}>
                        {!spinner ? (

                            <img
                                loading="lazy"
                                src={user?.organization?.profileImageUrl ? getImageURL(user?.organization?.profileImageUrl, IMAGEKIT_FOLDERS.USER_PIC) : profPic}
                                className={`w-32 rounded-full border border-2 p-6 dark:border-slate-800 bg-[#373465]`}
                                alt="profile-pic"
                                height={128}
                                width={128}
                            />
                        ) : (
                            <div className="w-32 h-32 rounded-full flex justify-center items-center border dark:border-slate-700">
                                <svg className="animate-spin m-auto h-8 w-8 text-slate-600 dark:text-slate-300" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>                   
                            </div>
                        )}
                        <input
                            type="file"
                            style={{ display: 'none' }}
                            ref={fileUploaderRef}
                            accept={'image/*'}
                            onChange={uploadImage}
                        />
                    </div>
                    {/* <div
                        className="absolute top-0 right-0 object-none p-2 text-slate-600 bg-white rounded-full shadow-md w-min"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                    </div> */}
                </div>
                <div className="pb-8 mt-2 text-2xl font-bold text-slate-500 dark:text-slate-200">{user?.organization?.name}</div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Your name
                    </label>
                    <input
                        name="tel"
                        value={user?.name}
                        onChange={(event) => dispatch(setUserName(event?.target.value))}
                        id="tel"
                        placeholder="Your name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                    />
                    {nameError && <span className={'font-medium tracking-wide text-rose-500 text-xs mt-1'} >
                        Enter a valid name
                    </span>}
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Business name
                    </label>
                    <input
                        name="text"
                        value={user?.organization?.name}
                        onChange={(event) => dispatch(setBusinessName(event?.target.value))}
                        id="text"
                        placeholder="Business name"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2  dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600"
                    />
                    {bizNameError && <span className={'font-medium tracking-wide text-rose-500 text-xs mt-1'} >
                        Enter a valid business name
                    </span>}
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Email
                    </label>
                    <input
                        name="email"
                        value={user?.email}
                        onChange={(event) => dispatch(setUserEmail(event?.target.value))}
                        id="email"
                        placeholder="Email"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                    {emailError && <span className={'font-medium tracking-wide text-rose-500 text-xs mt-1'} >
                        Enter a valid email
                    </span>}
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Pin code
                    </label>
                    <input
                        name="pin"
                        value={user?.organization?.pinCode}
                        onChange={(event) => dispatch(setPinCode(event?.target.value))}
                        id="pin"
                        placeholder="Pin code"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                    {pinCodeError && <span className={'font-medium tracking-wide text-rose-500 text-xs mt-1'} >
                        Enter a valid pin code
                    </span>}
                </div>
                {/* TODO: Update this */}
                {/* <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Location
                    </label>
                    <input
                        name="tel"
                        value={'No Information'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Location"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div>
                <div className="w-full">
                    <label className="block text-sm font-semibold leading-relaxed tracking-tighter text-slate-500 dark:text-slate-300">
                        Category
                    </label>
                    <input
                        name="tel"
                        value={'No Information'}
                        onChange={(event) => console.log(event?.target.value)}
                        id="tel"
                        placeholder="Category"
                        className="w-full px-4 py-2 mt-2 text-base text-black transition duration-500 ease-in-out transform bg-slate-200 border-transparent rounded opacity-75 focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    />
                </div> */}
            </div>

            {/* Footer */}

            <div className="fixed bottom-0 flex items-center justify-center w-full h-20 bg-slate-100 drop-shadow-md dark:bg-slate-800">
                <Button onClick={loading || success ? undefined : handleValidation} className={`w-2/4 h-10 font-semibold text-white rounded-full  ${success ? 'bg-gradient-to-br from-green-500 to-green-700' : loading ? 'bg-gradient-to-br from-slate-500 to-slate-700' : 'bg-gradient-to-br from-blue-500 to-indigo-700'}`}>{loading ? 'Saving...' : success ? 'Success' : 'Update'}</Button>
            </div>
        </div>
    )
}