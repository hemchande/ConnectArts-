import React from 'react';

import { ReactComponent as LogoIcon } from '../../assets/ArtLogo.svg';
import { Link } from 'react-router-dom';
import routes from '../../routes';
import s from './Logo.module.css';

const Logo = ({ isNavbar }) => {
  const className = isNavbar ? `${s.navBarLogo}` : `${s.logo}`;
  return (
    <div className={s.logoWrapper}>
      <Link to={routes.home}>
        <LogoIcon className={className} />
      </Link>
    </div>
  );
};

export default Logo;
