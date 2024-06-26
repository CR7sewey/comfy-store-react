import React from "react";

const FormInput = ({ label, name, type, defaultValue }) => {
  return (
    <form>
      <div className="form-control">
        <label className="label">
          <span className="label-text">{label}</span>
        </label>
        <input
          type={type}
          name={name}
          value={defaultValue}
          placeholder="Type here"
          className="input input-bordered"
        />
      </div>
    </form>
  );
};

export default FormInput;
