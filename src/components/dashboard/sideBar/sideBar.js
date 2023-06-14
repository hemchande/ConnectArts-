import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as PostIcon } from '../../../assets/post.svg';
import { ReactComponent as ReviewIcon } from '../../../assets/review.svg';
import { ReactComponent as ArrowUpIcon } from '../../../assets/arrowUp.svg';
import routes from '../../../routes';
import { sideBarConst } from '../../../constants';
import s from './sideBar.module.css';

const SideBar = ({ openedTab, setOpenedTab }) => {
  const [openPost, setOpenPost] = useState(false);
  const [openReview, setOpenReview] = useState(false);

  const handleOpenTab = tab => {
    setOpenedTab(tab);
  };

  return (
    <div className={s.sideBarContainer}>
      <ul className={s.list}>
        <li>
          <div
            className={s.titleContainer}
            onClick={() => setOpenPost(prev => !prev)}
          >
            <div className={s.iconContainer}>
              <PostIcon />
              <span>Post Dashboard</span>
            </div>
            <ArrowUpIcon className={`${s.icon} ${openPost ? s.active : ''}`} />
          </div>
          <div className={`${s.subTabContainer} ${openPost ? s.opened : ''}`}>
            <buttno
              type="button"
              className={`${s.subTab} ${
                openedTab === sideBarConst.curentPost ? s.activeSubTab : ''
              }`}
              onClick={() => handleOpenTab(sideBarConst.curentPost)}
            >
              Current Post
            </buttno>
            <buttno
              type="button"
              className={`${s.subTab} ${
                openedTab === sideBarConst.pastPost ? s.activeSubTab : ''
              }`}
              onClick={() => handleOpenTab(sideBarConst.pastPost)}
            >
              Past Posts
            </buttno>
          </div>
        </li>
        <li>
          <div
            className={s.titleContainer}
            onClick={() => setOpenReview(prev => !prev)}
          >
            <div className={s.iconContainer}>
              <ReviewIcon />
              <span>Review Dashboard</span>
            </div>
            <ArrowUpIcon
              className={`${s.icon} ${openReview ? s.active : ''}`}
            />
          </div>
          <div className={`${s.subTabContainer} ${openReview ? s.opened : ''}`}>
            <buttno
              type="button"
              className={`${s.subTab} ${
                openedTab === sideBarConst.currentReview ? s.activeSubTab : ''
              }`}
              onClick={() => handleOpenTab(sideBarConst.currentReview)}
            >
              Current Review
            </buttno>
            <buttno
              type="button"
              className={`${s.subTab} ${
                openedTab === sideBarConst.pastReview ? s.activeSubTab : ''
              }`}
              onClick={() => handleOpenTab(sideBarConst.pastReview)}
            >
              Past Reviews
            </buttno>
          </div>
        </li>
        <li className={s.linkWrapper}>
          <Link to={routes.viewReviewers} className={s.link}>
            View Available Reviewers
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default SideBar;
