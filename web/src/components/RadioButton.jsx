import React from "react";
// import '../assets/styles/radioButton.scss'

const RadioButton = (props) => {
    return (
        <div className="RadioButton">
            <input id={props.id} onChange={props.changed} value={props.value} type="radio" checked={props.isSelected} disabled={props.disabled ? "disabled" : ""}/>
            <label htmlFor={props.id}>{props.label}</label>
        </div>
    );
}

export default RadioButton;