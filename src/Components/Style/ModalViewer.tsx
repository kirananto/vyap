import React from 'react'

interface IModalViewerProps {
    body: any
    isOpen: boolean
    onClose: any
}

export default function ModalViewer(props: IModalViewerProps) {
    return props.isOpen ? (
        <div className="absolute top-0 left-0 z-10">
        <div className="relative left-0 bg-black bg-opacity-50 h-screen w-screen">
            <div onClick={props.onClose} className="h-screen w-screen" />
            <div className="absolute bottom-0 rounded-t-2xl flex flex-col w-full gap-3 bg-white text-left dark:bg-gray-700 px-4 pt-4 animate__animated animate__fadeInUpBig animate__faster">
                {props.body}
            </div>
        </div></div>
    ) : null
} 