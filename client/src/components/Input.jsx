import React from "react";

export const Input = 
({ type, value, onChange, required }) => {
    return (
        <input 
            className="border rounded 
                px-3 py-1 w-80"
            required={required}
            type={type}
            value={value}
            onChange={onChange}
        />
    );
};




