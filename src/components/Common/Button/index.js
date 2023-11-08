import "./styles.css"

import React from 'react'

function Button({ value, onClick, color }) {
    const buttonColor = color || "rgba(52, 122, 252, 0.966)";
    return (
        <div className="btn" style={{ backgroundColor: buttonColor }} onClick={onClick}>
            <button>{value}</button>
        </div>
    )
}

export default Button