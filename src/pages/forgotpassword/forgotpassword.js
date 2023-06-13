import React, { useState } from 'react';
import { BackButton, Button } from '../../components/button';
import { Input } from '../../components/Inputs';

import s from './forgotpassword.module.css';

const ForgotPassWord = () => {
  const [email, setEmail] = useState('');
  const handleResetPassword = e => {
    e.preventDefault();
    //   add logic for reset password
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
