import React from 'react'

export default function Links(props: { linkName: string }) {
    return (
       <>
       {/* Link */}
       <h1 className="text-lg font-bold text-gray-500 dark:text-gray-300">{props.linkName}</h1>
       </>
    )
}
