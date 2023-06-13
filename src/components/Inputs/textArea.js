import React from 'react';
import s from './input.module.css';

const TextArea = ({ label, id, placeholder, value, setValue }) => {
  return (
    <div>
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
        onChange={e => setValue(e.target.value)}
      />
    </div>
  );
};

export default TextArea;
