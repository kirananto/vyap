import React, { useState } from 'react'
import DropDown from './DropDown'
import ListIcon from 'src/Components/Style/Icons/List'

interface statusNoteProps {
    statusNote: string;
    setStatusNote: React.Dispatch<React.SetStateAction<string>>;
    statusHistory: string[];
}
export const StatusNote = ({ statusNote, setStatusNote, statusHistory }: statusNoteProps) => {

    const [isSuggestionsEnabled, setisSuggestionsEnabled] = useState(false)

    return <>
        <div className="flex flex-col gap-2 mt-4 mb-2 ">
            <label className=" text-slate-700  dark:text-slate-300"> Note:</label>
            <div className="flex justify-between">
                <input
                    key={'note'}
                    onChange={(e) => setStatusNote(e.target.value)}
                    value={statusNote}

                    className="flex flex-grow text-sm p-2 pr-10  text-black transition duration-500 ease-in-out transform 
                                                    border-transparent rounded bg-slate-200 opacity-75 
                                                    focus:border-blue-500 focus:bg-white focus:outline-none focus:shadow-outline focus:ring-2 ring-offset-current ring-offset-2 
                                                    dark:bg-slate-500 dark:text-slate-200 dark:focus:bg-slate-600 "
                    type="text" />

                <span className='dark:text-blue-300 text-blue-500 self-center  absolute right-10' onClick={() => setisSuggestionsEnabled(prevState => !prevState)}> <ListIcon /> </span>

            </div>

        </div>

        {isSuggestionsEnabled && <DropDown setisSuggestionsEnabled={setisSuggestionsEnabled} statusList={statusHistory} setStatusNote={setStatusNote} />}
    </>

}