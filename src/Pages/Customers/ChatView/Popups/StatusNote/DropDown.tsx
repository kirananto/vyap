import React from 'react'
import CloseIcon from 'src/Components/Style/Icons/CloseIcon'

interface iProps {
    statusList?: string[]
    setStatusNote: React.Dispatch<React.SetStateAction<string>>
    setisSuggestionsEnabled: React.Dispatch<React.SetStateAction<boolean>>
}

const DropDown = ({statusList, setStatusNote, setisSuggestionsEnabled} : iProps) => {
    return (
        <div className="w-full">          
            <div
                className={`flex flex-col bg-white gap-3 p-2 border boder-slate-200 rounded-log 
             dark:bg-slate-700  dark:border-slate-500 rounded overflow-x-hidden h-48 break-all `}
            >

                <div className="flex justify-between align-middle">
                    <div className="flex text-xs text-slate-400 dark:border-slate-700 ">
                        Suggestions:
                    </div>

                    <span className="text-red-400" onClick={() => setisSuggestionsEnabled(false)}>
                        <CloseIcon size={5} />
                    </span>
                </div>

                <div className="overflow-scroll">
                    {
                        statusList && statusList?.map((item: string, key) => {

                            return <div key={key} className="border w-full rounded text-sm p-2 flex 
                bg-slate-50 dark:bg-slate-600 dark:text-blue-200 text-blue-400 dark:border-slate-500 mb-2
                 "
                            onClick={() =>setStatusNote(item)}
                            >
                                {item}
                            </div>
                        })
                    }

                </div>
            </div>
        </div>
    )
}

export default DropDown