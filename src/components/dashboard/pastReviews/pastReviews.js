import React from 'react';

import axios from 'axios';
import { useEffect, useState } from 'react';
import PastReviewDetails from './Pastreviewdetails';
import s from './pastReviews.module.css';

const PastReviews = ({ user }) => {
  const [selectedPastReviewIndex, setSelectedPastReviewIndex] = useState(0);
  const [pastReviews, setPastReviews] = useState(null); //used to be []
  const [numReviews, setNumReviews] = useState(null);

  const handleSelectReviewChange = event => {
    setSelectedPastReviewIndex(event.target.value);
  };

  useEffect(() => {
    const fetchData2 = async () => {
      //ARRAY OF JSON OBJS
      axios
        .get('http://localhost:4000/routes/get_past_reviews_from_user_id', {
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
          setNumReviews(response.data.length);
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
    <div>
      {pastReviews && pastReviews.length > 0 && (
        <article className="card">
          <h1> Past Reviews</h1>
          <div className="accordion">
            <select
              className="select-option"
              onChange={handleSelectReviewChange}
            >
              {[...Array(pastReviews.length)].map((_, index) => (
                <option key={index} value={index}>
                  Review {index + 1}
                </option>
              ))}
            </select>
          </div>
          <PastReviewDetails review={pastReviews[selectedPastReviewIndex]} />
        </article>
      )}
      {!pastReviews && <strong> No Previous Reviews</strong>}
    </div>
  );
};

export default PastReviews;
