import React from 'react';
import { useNavigate } from 'react-router-dom';
import s from './button.module.css';

const BackButton = ({ text }) => {
  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <button type="button" className={s.backButton} onClick={handleGoBack}>
      {text}
    </button>
  );
};

export default BackButton;
