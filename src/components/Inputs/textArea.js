import React from 'react';
import s from './input.module.css';

const TextArea = ({
  label,
  id,
  placeholder,
  value,
  setValue,
  isDisabled,
  width,
  index,
}) => {
  return (
    <div style={width && { width: `${width}px` }}>
      {label && (
        <label htmlFor={id} className={s.label}>
          {label}
        </label>
      )}
      <textarea
        className={s.textarea}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={e =>
          index ? setValue(index, e.target.value) : setValue(e.target.value)
        }
        disabled={isDisabled}
      />
    </div>
  );
};

export default TextArea;
