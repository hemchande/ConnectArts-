import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PastReviewDetails from './Pastreviewdetails';
import s from './pastReviews.module.css';

const PastReviews = ({ user }) => {
  const [pastReviews, setPastReviews] = useState([]); //used to be []

  useEffect(() => {
    const fetchData2 = async () => {
      //ARRAY OF JSON OBJS
      axios
        .get('https://connectarts-backend-nsty.onrender.com/routes/get_past_reviews_from_user_id', {
          params: {
            userId: user._id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          console.log(response);
          setPastReviews(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };
    if (user._id) {
      fetchData2();
    }
  }, [user._id]);
  return (
    <>
      <h2 className={s.title}>Past Reviews</h2>
      <p className={s.description}>{`Welcome back, ${user?.name}`}</p>
      <div className={s.pastReviewontainer}>
        {pastReviews?.map(el => (
          <PastReviewDetails review={el} key={el} />
        ))}
      </div>
      {pastReviews.length < 1 && <strong> No Previous Reviews</strong>}
    </>
  );
};

export default PastReviews;
