import React, { useState } from 'react';
import { BackButton, Button } from '../../components/button';
import { Input } from '../../components/Inputs';
import { auth } from '../../firebase';

import s from './forgotpassword.module.css';

const ForgotPassWord = () => {
  const [email, setEmail] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleResetPassword = e => {
    e.preventDefault();
    //   add logic for reset password
    auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setSuccessMessage('Password reset email sent. Please check your inbox.');
        setErrorMessage('');
      })
      .catch(error => {
        setErrorMessage(error.message);
        setSuccessMessage('');
      });
    console.log('email', email);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  return (
    <div className={s.container}>
      <form className={s.form} onSubmit={handleResetPassword}>
        <BackButton text="Go back" />
        <Input
          type="text"
          value={email}
          name="email"
          placeholder="Enter Email"
          onChange={handleEmailChange}
          required
        />
        <Button type="submit" text="Reset password" center />
      </form>
    </div>
  );
};
export default ForgotPassWord;
