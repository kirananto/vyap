import React from 'react'

export default function FilterCategories(props) {
    return (
        <div>
            <h1>{props.heading}</h1>
            <div>
                <input type="checkbox" />
                <p>{props.CategoryName}</p>
            </div>
        </div>
    )
}
