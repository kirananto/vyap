import React from 'react'
import './Style/ToggleButton.css'

export default function ToggleButton({ onChange, value, className }: { onChange?: () => void, value?: boolean, className?: string }) {
    return (
        <label className={`switch ${className ? className : ''}`}>
            <input type="checkbox" onChange={onChange} checked={value}/>
            <span className="slider round"></span>
        </label>
    )
}