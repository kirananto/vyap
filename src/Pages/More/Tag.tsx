import React from 'react'




export default function Tag(props: { tagName: string}) {
    const padding ={
        paddingTop:'1px',
        paddingBottom:'1px'
    }
    return <div style={padding} className="flex items-center justify-center px-2 text-xs font-bold text-center rounded-full min-w-min bg-green-200 text-green-700 dark:bg-green-900 dark:text-green-400">{props.tagName}</div>
}