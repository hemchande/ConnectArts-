import React from 'react';
import s from './customProgressBar.module.css';
import Tooltip from '@mui/material/Tooltip';

const CustomPtogressBar = ({
  label,
  values,
  options,
  setValues,
  isDisabled,
}) => {
  const progress = (values.length / options.length) * 100;

  const handleAddSkill = e => {
    if (isDisabled) {
      return;
    }
    if (!values.includes(e.target.textContent)) {
      setValues([...values, e.target.textContent]);
    } else {
      setValues(values.filter(el => el !== e.target.textContent));
    }
  };

  return (
    <div className={s.container}>
      <p className={s.label}>{label}</p>
      <div className={s.progressBar}>
        <div className={s.progressBarFill} style={{ width: `${progress}%` }} />
      </div>
      <div className={s.optionsWrapper}>
        {options.map(el => {
          return (
            <Tooltip title={el.value}>
            <button
              type="button"
              className={`${s.button} ${values.includes(el.key) ? s.picked : ''}`}
              key={el.key}
              onClick={e => handleAddSkill(e)}
            >
              {el.key}
            </button>
            </Tooltip>
          );
        })}
      </div>
    </div>
  );
};

export default CustomPtogressBar;
