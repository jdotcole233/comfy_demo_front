import React, { forwardRef } from "react";

const Input = forwardRef(({ label, ...props }, ref) => {
  return (
    <div
      className={
        props.type && props.type === "checkbox" ? "form-check" : "form-group"
      }
    >
      {label && (
        <label
          className={
            props.type && props.type === "checkbox" ? "form-check-label" : ""
          }
          htmlFor=""
        >
          {label}
        </label>
      )}
      <input
        {...props}
        ref={ref}
        className={
          props.type && props.type === "checkbox"
            ? "form-check-input"
            : "form-control"
        }
      />
    </div>
  );
});

export const Select = forwardRef(({ label, ...props }, ref) => {
  return (
    <div className="form-group">
      {label && <label htmlFor="">{label}</label>}
      <select ref={ref} {...props} className="form-control">
        <option value="">Select one ...</option>
        {props.options?.map((option, key) => (
          <option key={key} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
});

export default Input;
