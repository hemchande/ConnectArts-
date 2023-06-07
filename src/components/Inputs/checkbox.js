import React from 'react';
import s from './input.module.css';

const Checkbox = ({ isChecked, onChange, labelId }) => {
  return (
    <div>
      <label htmlFor={labelId} className={s.checkboxLabel}>
        <input
          className={s.checkbox}
          id={labelId}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
        />
        Remember for 30 days
      </label>
    </div>
  );
};

export default Checkbox;
