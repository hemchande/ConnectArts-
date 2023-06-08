import React from 'react';
import s from './button.module.css';

const Button = ({ text, type, onChange }) => {
  return (
    <div className={s.wrapper}>
      <button type={type} onChange={onChange} className={s.button}>
        {text}
      </button>
    </div>
  );
};

export default Button;
