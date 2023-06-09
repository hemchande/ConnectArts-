import React from 'react';
import s from './customProgressBar.module.css';

const CustomPtogressBar = ({ label, values, options, setValues }) => {
  const progress = (values.length / options.length) * 100;

  const handleAddSkill = e => {
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
            <button
              className={`${s.button} ${values.includes(el) ? s.picked : ''}`}
              key={el}
              onClick={e => handleAddSkill(e)}
            >
              {el}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CustomPtogressBar;
