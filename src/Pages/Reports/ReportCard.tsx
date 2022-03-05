import React from 'react'


function ReportCard(props: { bgIllus: string, heading: string }) {
    return (
        <div className="flex flex-col h-auto p-4 bg-white rounded shadow-md dark:bg-slate-800">
            <h1 className="pr-10 text-xl font-black text-slate-500 dark:text-slate-200">
                {props.heading}
            </h1>
            <div className="flex justify-end w-full ">
                <img
                    className="justify-end w-8/12 mt-3"
                    src={props.bgIllus}
                    alt="vyap"
                />
            </div>
        </div>
    )
}
// ! Component for Empty Card

function EmptyReportCard(props: { heading: string }){

    return(
        <div className="flex items-center justify-center h-auto p-4 bg-white border-4 border-slate-100 border-dashed rounded dark:bg-slate-800 dark:border-slate-300">
            <h1 className="text-xl font-black text-center text-slate-100 ">
                {props.heading}
            </h1>
        </div>
    )
}

export {ReportCard, EmptyReportCard}