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
      {currentTab === sideBarConst.curentPost && <CurrentPost />}
      {currentTab === sideBarConst.pastPost && <PastPosts />}
      {currentTab === sideBarConst.currentReview && <CurrentReview />}
      {currentTab === sideBarConst.pastReview && <PastReviews />}
    </div>
  );
};

export default Content;
