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
  withSymbols,
  isDisabled,
}) => {
  return (
    <div className={withSymbols ? `${s.container} ${s.maxWidth}` : s.maxWidth}>
      {label && <label className={s.label}>{label}</label>}
      <input
        className={`${s.field} ${withSymbols ? s.withSymbolField : ''}`}
        type={type}
        value={value}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        required={requirerd}
        disabled={isDisabled}
      />
    </div>
  );
};

export default Input;
