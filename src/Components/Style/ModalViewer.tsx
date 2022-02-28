import React from 'react'
import Button from './Button'

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
                <div className="absolute bottom-0 rounded-t-2xl flex flex-col w-full gap-3 bg-white text-left dark:bg-slate-700 px-4 pt-4 animate__animated animate__fadeInUpBig animate__faster">
                    {body}
                    {name ? (name === 'filter' &&
                        <div className="w-full mb-5">
                            <Button
                                onClick={onClose}
                            >
                                OK
                            </Button>
                        </div>
                    ) : (
                        ''
                    )}
                </div>
            </div>
        </div>
    ) : null
}