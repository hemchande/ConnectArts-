import React from 'react';
import { Input } from '../../Inputs';
import CustomSelect from '../../select/select';
import { genresOptions } from '../../../constants';
import s from './firstStep.module.css';

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
        required
      />
      <Input
        type="lastname"
        name="lastname"
        placeholder="Enter your Last Name"
        value={lastName}
        onChange={e => setLastName(e.target.value)}
        label="Last Name"
        required
      />
      <Input
        type="email"
        name="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        label="Email"
        required
      />
      <Input
        type="password"
        name="password"
        placeholder="*******"
        value={password}
        onChange={e => setPassword(e.target.value)}
        label="Password"
        required
      />
      <CustomSelect
        options={genresOptions}
        isMulti
        onChange={handleGenresChange}
        value={genres}
        placeholder="Choose your Performance Genres"
        label="Select all Performance Genres"
        closeMenuOnSelect={false}
        id="genresSelect"
        required
      />
    </div>
  );
};

export default FirstStep;
