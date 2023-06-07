import React from 'react';
import { ReactSVG } from 'react-svg';

import logo from '../../assets/ArtLogo.svg';
import s from './loginpage.module.css';

const Logo = () => (
  <div className={s.logoWrapper}>
    <ReactSVG src={logo} />
  </div>
);

export default Logo;
