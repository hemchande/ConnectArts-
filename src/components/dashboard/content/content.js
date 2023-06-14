import React from 'react';
import CurrentPost from '../currentPost/currentPost';
import PastPosts from '../pastPosts/pastPosts';
import CurrentReview from '../currentReview/currentReview';
import PastReviews from '../pastReviews/pastReviews';
import { sideBarConst } from '../../../constants';
import s from './content.module.css';

const Content = ({ currentTab, user }) => {
  console.log('user', user);
  return (
    <div className={s.container}>
      {currentTab === sideBarConst.curentPost && <CurrentPost user={user} />}
      {currentTab === sideBarConst.pastPost && <PastPosts user={user} />}
      {currentTab === sideBarConst.currentReview && (
        <CurrentReview user={user} />
      )}
      {currentTab === sideBarConst.pastReview && <PastReviews user={user} />}
    </div>
  );
};

export default Content;
