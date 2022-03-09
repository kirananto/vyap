import React from 'react'
import { hapticFeedback } from 'src/utils/vibrate'
import Archive from 'src/Components/Style/Icons/Archive'

interface iProps {
    onClose: () => void,
    inboxId?: string
    deleteInbox: (arg : string) => void,
}

const CustomerOptionsPopup = ({ onClose, inboxId, deleteInbox }
    : iProps
) => {

    const handleDelete = () => {
        if(inboxId)
            deleteInbox(inboxId)
    }

    return (
        <div className="pb-8 pt-2 px-4">
            {/* Heading */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-lg w-full font-bold text-slate-500 dark:text-slate-200">Customer Options</h1>
            </div>
            {/* row-1 */}
            <div className="flex flex-col mt-6 ml-2">

                <button onClick={() => {
                    handleDelete()
                    hapticFeedback()
                    onClose()
                }} className="flex items-center py-3 gap-2 text-md font-semibold text-red-500 dark:text-red-300">
                    <Archive />
                    <span>Hide Customer</span>
                </button>
            </div>
        </div>
    )
}

export default CustomerOptionsPopup