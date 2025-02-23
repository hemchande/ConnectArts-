import React from 'react';
import Select from 'react-select';
import s from './select.module.css';

const customStyles = {
  container: provided => ({
    ...provided,
  }),
  control: (provided, state) => ({
    ...provided,
    backgroundColor: '#ffffff',
    border: state.isFocused ? '2px solid #e064a0' : '2px solid #475467',
    boxShadow: state.isFocused ? '0 0 0 1px #e064a0' : 'none',
    '&:hover': {
      border: '2px solid #e064a0',
      boxShadow: '0 0 0 1px #e064a0',
      color: '#e064a0',
    },
    borderRadius: '8px',
    minHeight: '44px',
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? '#e064a0' : 'white',
  }),
  dropdownIndicator: (provided, state) => ({
    ...provided,
    color: state.isFocused ? '#e064a0' : '',
    '&:hover': {
      color: '#e064a0',
    },
  }),
  multiValue: provided => ({
    ...provided,
    backgroundColor: '#ffffff',
    color: '#344054',
    border: '1px solid #D0D5DD',
    borderRadius: '6px',
  }),
};

const CustomSelect = ({
  options,
  isMulti,
  onChange,
  value,
  placeholder,
  label,
  closeMenuOnSelect,
  id,
  isDisabled,
}) => {
  return (
    <div className={s.container}>
      {label && (
        <label className={s.label} htmlFor={id}>
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
        id={id}
        closeMenuOnSelect={closeMenuOnSelect}
        isDisabled={isDisabled}
      />
    </div>
  );
};

export default CustomSelect;
