import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PostIcon } from '../../../assets/post.svg';
import { ReactComponent as ReviewIcon } from '../../../assets/review.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/arrowUp.svg';
import routes from '../../../routes';
import s from './sideBar.module.css';

const SideBar = ({ openedTab, setOpenedTab }) => {
  const handleOpenTab = tab => {
    if (openedTab === 'dashboard' && tab !== 'review') {
      return setOpenedTab(null);
    } else if (openedTab === 'review' && tab !== 'dashboard') {
      return setOpenedTab(null);
    }
    setOpenedTab(tab);
  };

  return (
    <div className={s.sideBarContainer}>
      <ul className={s.list}>
        <li
          className={`${s.item} ${
            openedTab === 'dashboard' ? s.activeItem : ''
          }`}
          onClick={() => handleOpenTab('dashboard')}
        >
          <div className={s.iconContainer}>
            <PostIcon />
            <span>Post Dashboard</span>
          </div>
          <ArrowUpIcon
            className={`${s.icon} ${openedTab === 'dashboard' ? s.active : ''}`}
          />
        </li>
        <li
          className={`${s.item} ${openedTab === 'review' ? s.activeItem : ''}`}
          onClick={() => handleOpenTab('review')}
        >
          <div className={s.iconContainer}>
            <ReviewIcon />
            <span>Review Dashboard</span>
          </div>
          <ArrowUpIcon
            className={`${s.icon} ${openedTab === 'review' ? s.active : ''}`}
          />
        </li>
        <li className={`${s.item} ${s.linkWrapper}`}>
          <Link to={routes.viewReviewers} className={s.link}>
            View Available Reviewers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
