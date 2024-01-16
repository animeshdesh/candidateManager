/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from "react";

const ReusableInput = ({
  label,
  type,
  value,
  placeholder,
  onChange,
  disabled,
}) => {
  return (
    <div>
      <label>{label}</label>
      <input
        type={type || "text"} // Default to 'text' if type prop is not provided
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        disabled={disabled}
        style={{
          border: "1px solid #ccc", // Add your desired border styles
          borderRadius: "4px", // Add your desired border-radius
          padding: "8px", // Add your desired padding
          outline: "none",
          backgroundColor: "#FFF5E0",
          fontSize: "18px",
          color: "black",
          fontWeight: "500",
        }}
      />
    </div>
  );
};

export default ReusableInput;
