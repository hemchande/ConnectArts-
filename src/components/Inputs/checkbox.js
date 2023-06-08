import React from 'react';
import { ReactComponent as Checked } from '../../assets/checked.svg';
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
        <div className={`${s.customCheckbox} ${isChecked ? s.checked : ''}`}>
          {isChecked && <Checked className={s.icon} />}
        </div>
        Remember for 30 days
      </label>
    </div>
  );
};

export default Checkbox;
