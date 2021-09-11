import React from 'react'

export default function FilterTag(props: any) {
    return (
        <div className="flex px-2 py-1 bg-blue-200 rounded">
            <p className="text-sm font-bold text-blue-500">{props.tagName}</p>
        </div>
    )
}
