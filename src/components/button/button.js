import React from 'react';
import s from './button.module.css';

const Button = ({ text, type, onChange, onClick, maxWidth, center }) => {
  return (
    <div className={`${s.wrapper} ${center ? s.center : ''}`}>
      <button
        type={type}
        onChange={onChange}
        onClick={onClick}
        className={s.button}
        style={{ maxWidth: `${maxWidth}px` }}
      >
        {text}
      </button>
    </div>
  );
};

export default Button;
