import React from "react";


function ReportCard(props: { bgIllus: any, heading: string }) {
  return (
    <div className="flex flex-col h-auto p-4 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h1 className="pr-10 text-2xl font-black text-gray-500 dark:text-gray-200">
        {props.heading}
      </h1>
      <div className="flex justify-end w-full ">
        <img
          className="justify-end w-8/12"
          src={props.bgIllus}
          alt=""
        />
      </div>
    </div>
  );
}
// ! Component for Empty Card

function EmptyReportCard(props: { heading: string }){

    return(
        <div className="flex items-center justify-center h-auto p-4 bg-white border-4 border-gray-100 border-dashed rounded-lg dark:bg-gray-800 dark:border-gray-300">
      <h1 className="text-xl font-black text-center text-gray-100 ">
        {props.heading}
      </h1>
    </div>
    )
}

export {ReportCard, EmptyReportCard};