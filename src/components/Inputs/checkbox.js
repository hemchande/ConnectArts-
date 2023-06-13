import React from 'react';
import { ReactComponent as Checked } from '../../assets/checked.svg';
import s from './input.module.css';

const Checkbox = ({ isChecked, onChange, labelId, remember, readOnly }) => {
  return (
    <div>
      <label htmlFor={labelId} className={s.checkboxLabel}>
        <input
          className={s.checkbox}
          id={labelId}
          type="checkbox"
          checked={isChecked}
          onChange={onChange}
          readOnly={readOnly}
        />
        <div className={`${s.customCheckbox} ${isChecked ? s.checked : ''}`}>
          {isChecked && <Checked className={s.icon} />}
        </div>
        {remember && 'Remember for 30 days'}
      </label>
    </div>
  );
};

export default Checkbox;
