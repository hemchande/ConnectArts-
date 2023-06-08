import React from 'react';
import Select from 'react-select';
import s from '../Inputs/input.module.css';

const CustomSelect = ({
  options,
  isMulti,
  onChange,
  value,
  placeholder,
  customStyles,
  label,
}) => {
  return (
    <>
      {label && (
        <label className={s.label} htmlFor="custom-select">
          {label}
        </label>
      )}
      <Select
        styles={customStyles}
        options={options}
        isMulti={isMulti}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        id="custom-select"
        closeMenuOnSelect={false}
      />
    </>
  );
};

export default CustomSelect;
