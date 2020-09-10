import React from "react";

export default ({ options, ref, errors, ...rest }) => {
  return (
    <>
      <input ref={ref} {...rest} type="text" list="list" className="form-control" />
      {errors && errors[rest.name] && (
        <p className="text-danger">{errors[rest.name].message}</p>
      )}

      <datalist id="list">
        <select name={rest.name} className="form-control">
          {options.map((option, key) => (
            <option key={key} value={option.label} />
          ))}
        </select>
      </datalist>
    </>
  );
};
