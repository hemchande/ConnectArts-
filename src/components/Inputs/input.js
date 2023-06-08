import React from 'react';
import s from './input.module.css';

const Input = ({
  label,
  type,
  value,
  placeholder,
  name,
  onChange,
  requirerd,
}) => {
  return (
    <div>
      {label && <label className={s.label}>{label}</label>}
      <input
        className={s.field}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={requirerd}
      />
    </div>
  );
};

export default Input;
