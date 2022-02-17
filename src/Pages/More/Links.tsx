import React from 'react'

export default function Links(props: { linkName: string }) {
    return (
        <>
            {/* Link */}
            <h1 className="text-md md:text-lg font-bold text-slate-500 dark:text-slate-300">{props.linkName}</h1>
        </>
    )
}