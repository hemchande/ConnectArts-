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
        label="Select all Performance Genres"
      />
    </div>
  );
};

export default FirstStep;
