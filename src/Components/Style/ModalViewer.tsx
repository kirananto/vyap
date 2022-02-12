import React from 'react'

interface IModalViewerProps {
    body: JSX.Element | string | null;
    isOpen: boolean;
    onClose: () => void;
    name?: string;
}

export default function ModalViewer({
    body, isOpen, onClose, name
}: IModalViewerProps) {
    return isOpen ? (
        <div className="fixed top-0 left-0 z-10">
            <div className="relative left-0 bg-black bg-opacity-50 h-screen w-screen">
                <div onClick={onClose} className="h-screen w-screen" />
                <div className="absolute bottom-0 rounded-t-2xl flex flex-col w-full gap-3 bg-white text-left dark:bg-gray-700 px-4 pt-4 animate__animated animate__fadeInUpBig animate__faster">
                    {body}
                    {name ? (name === 'filter' &&
                        <div className="w-full mb-5">
                            <button
                                className="flex justify-center gap-1 items-center w-full h-10 font-bold text-white rounded-full bg-gradient-to-br from-blue-500 to-indigo-700"
                                onClick={onClose}
                            >
                                OK
                            </button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    ) : null
}