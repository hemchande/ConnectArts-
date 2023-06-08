import React from 'react';
import { Input } from '../../Inputs';
import CustomSelect from '../../select/select';
import { genresOptions } from '../../../constants';
import s from './firstStep.module.css';

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
    backgroundColor: state.isSelected ? '#007bff' : 'white',
    color: state.isSelected ? 'white' : 'black',
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

const FirstStep = ({
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  genres,
  setGenres,
}) => {
  const handleGenresChange = selectedOptions => {
    setGenres(selectedOptions);
  };

  return (
    <div className={s.container}>
      <Input
        type="firstname"
        name="firstname"
        placeholder="Enter your First Name"
        value={firstName}
        onChange={e => setFirstName(e.target.value)}
        label="First Name"
        requirerd
      />
      <Input
        type="lastname"
        name="lastname"
        placeholder="Enter your Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        label="Last Name"
        requirerd
      />
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        label="Email"
        requirerd
      />
      <Input
        type="password"
        name="password"
        placeholder="*******"
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Password"
        requirerd
      />
      <CustomSelect
        options={genresOptions}
        isMulti
        onChange={handleGenresChange}
        value={genres}
        placeholder="Choose your Performance Genres"
        customStyles={customStyles}
        label="Select all Performance Genres"
      />
    </div>
  );
};

export default FirstStep;
