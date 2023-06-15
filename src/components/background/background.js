import React from 'react';
import background from '../../assets/background.png';
import s from './background.module.css';

const Background = () => (
  <div
    className={s.background}
    style={{ backgroundImage: `url(${background})` }}
  ></div>
);

export default Background;
