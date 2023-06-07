import React from 'react';
import s from './input.module.css';

const Input = ({ label, type, value, placeholder, name, onChange }) => {
  return (
    <div>
      {label && <label className={s.label}>{label}:</label>}
      <input
        className={s.field}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Input;
