import React, { useEffect, useState } from 'react';
import PastPostReviews from './Pastpostreviews';

import axios from 'axios';

import s from './pastPosts.module.css';

const PastPosts = ({ user }) => {
  const [pastPosts, setPastPosts] = useState([]);
  const [pastPostReviews, setPastPostReviews] = useState([]);
  const [selectedPastPostIndex, setSelectedPastPostIndex] = useState(0);

  // console.log('pastPosts', pastPosts);
  // console.log('pastPostReviews', pastPostReviews);

  const fetchData3 = async () => {
    //JSON OBJ OF CURRENT REVIEW
    axios
      .get(
        'http://localhost:4000/routes/get_performer_past_posts_and_post_reviews',
        {
          params: {
            id: user._id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        setPastPosts(response.data.performer_posts);
        setPastPostReviews(response.data.performer_post_reviews);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    fetchData3();
  }, []);
  return (
    <>
      <h2 className={s.title}>Past Posts</h2>
      <p className={s.description}>{`Welcome back, ${user?.name}`}</p>
      <div className={s.container}>
        {/* lease after data will coming need 49-51 line uncommented and removed 52 lineP */}
        {/* {pastPosts?.map(el => (
          <PastPostReviews post={el} key={el} />
        ))} */}
        <PastPostReviews />
      </div>
    </>
  );
};

export default PastPosts;
