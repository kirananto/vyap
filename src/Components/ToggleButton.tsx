import React from "react";
import "./Style/ToggleButton.css";

export default function ToggleButton({ onChange, value }: { onChange?: any, value?: boolean }) {
  return (
    <label className="switch">
      <input type="checkbox" onChange={onChange} checked={value}/>
      <span className="slider round"></span>
    </label>
  );
}
