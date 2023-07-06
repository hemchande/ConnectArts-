import React from 'react';

import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentReviewDetails from './currentreviewdetails';
import s from './currentReview.module.css';

const CurrentReview = ({ user }) => {
  const [review, setReview] = useState(null); // used to be {}

  useEffect(() => {
    const fetchData = async () => {
      //JSON OBJ OF CURRENT REVIEW
      axios
        .get('https://connectarts-backend-nsty.onrender.com/routes/get_current_reviewer_post_status', {
          params: {
            userId: user._id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          setReview(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    if (user._id) {
      fetchData();
    }
  }, [user._id]);

  return (
    <div>
      <h2 className={s.title}>Current Review</h2>
      <p className={s.description}>{`Welcome back, ${user?.name}`}</p>
      {review && <CurrentReviewDetails review={review} />}
    </div>
  );
};

export default CurrentReview;
