import React from "react";
import '../assets/styles/radioButton.css'

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} disabled={props.disabled ? "disabled" : ""}/>
            <label htmlFor={props.id} style={{fontSize: "14px"}}>{props.label}</label>
        </div>
    );
}

export default RadioButton;