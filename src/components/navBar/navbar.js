import React, { useState, memo, useEffect } from 'react';
import Popup from 'reactjs-popup';
import { useAuth } from '../firebase/AuthContext';
import axios from 'axios';

import Logo from '../logo/Logo';
import { ReactComponent as ArrowDown } from '../../assets/arrowDown.svg';
import { ReactComponent as Phone } from '../../assets/phone.svg';
import { ReactComponent as Star } from '../../assets/star.svg';
import { ReactComponent as Play } from '../../assets/play.svg';
import avatar from '../../assets/Avatar.png';
import { Link, useLocation } from 'react-router-dom';
import routes from '../../routes';
import 'reactjs-popup/dist/index.css';
import s from './navBar.module.css';

function Navbar() {
  const [isOpenGuides, setIsOpenGuides] = useState(false);
  const { pathname } = useLocation();
  const [user, setUser] = useState(null);

  const handleOpenGuides = () => {
    setIsOpenGuides(!isOpenGuides);
  };

  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;

  useEffect(() => {
    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: uid,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <div className={s.contentWrapper}>
          <div className={s.leftContent}>
            <Logo isNavbar />
            <Link
              to={routes.signedin}
              className={`${s.link} ${
                pathname === routes.signedin ? `${s.active}` : ''
              }`}
            >
              Dashboard
            </Link>
            <Link
              to={routes.upload}
              className={`${s.link} ${
                pathname === routes.upload ? `${s.active}` : ''
              }`}
            >
              Upload
            </Link>
            <Link
              to={routes.upload}
              className={`${s.link} ${
                pathname === routes.choreographyAssistance ? `${s.active}` : ''
              }`}
            >
              Choreography Assistance AI
            </Link>
            <Link
              to={routes.profile}
              className={`${s.link} ${
                pathname === routes.profile ? `${s.active}` : ''
              }`}
            >
              Profile
            </Link>
            <Link
              to={routes.danceChat}
              className={`${s.link} ${
                pathname === routes.profile ? `${s.active}` : ''
              }`}
            >
              Dance Chat
            </Link>
            <Popup
              contentStyle={{ padding: '26px 32px', minWidth: '320px' }}
              trigger={
                <div onClick={handleOpenGuides} className={s.guides}>
                  Guides <ArrowDown className={s.icon} />
                </div>
              }
              position="bottom center"
            >
              <div className={s.popUp}>
                <Link to={routes.preferences} className={s.guideLink}>
                  <Phone />
                  <div>
                    <p>Categorical Preferences Guide</p>
                    <p className={s.secondaryText}>Hint text</p>
                  </div>
                </Link>
                <Link to={routes.depthSkills} className={s.guideLink}>
                  <Star />
                  <div>
                    <p>Dance Genre Guide</p>
                    <p className={s.secondaryText}>Hint text</p>
                  </div>
                </Link>
                <Link to={routes.skills} className={s.guideLink}>
                  <Play />
                  <div>
                    <p>Skills Guide</p>
                    <p className={s.secondaryText}>Hint text</p>
                  </div>
                </Link>
              </div>
            </Popup>
          </div>
          <div className={s.rightContent}>
            {user && (
              <div className={s.imageWrapper}>
                {/* <img className={s.avatar} src={avatar} alt="avatar" /> */}
                <div className={s.user}>
                   <p className={s.name}>{user.name}</p>  
                  <p className={s.mail}>{user.email}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default memo(Navbar);
