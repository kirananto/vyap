import React from 'react'

interface iProps {
    statusList?: string[]
    setStatusNote: React.Dispatch<React.SetStateAction<string>>
}


const DropDown = ({statusList, setStatusNote} : iProps) => {
    return (
        <div className="w-full">
            <div
                className={`flex flex-col bg-white mt-2 gap-3 p-4 border boder-slate-200 rounded-log overflow-scroll
             dark:bg-slate-700  dark:border-slate-500 rounded overflow-x-hidden h-48 break-all `}
            >
                {
                    statusList && statusList?.map((item: string, key) => {

                        return <div key={key} className="border w-full rounded text-sm p-2 flex 
                bg-white dark:bg-slate-600 dark:text-blue-200 text-blue-400 dark:border-slate-500
                 "
                        onClick={() =>setStatusNote(item)}
                        >
                            {item}
                        </div>
                    })
                }
            </div>
        </div>
    )
}

export default DropDown