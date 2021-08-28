import React from "react";
import "./Style/ToggleButton.css";

export default function ToggleButton() {
  return (
    <label className="switch">
      <input type="checkbox" />
      <span className="slider round"></span>
    </label>
  );
}
