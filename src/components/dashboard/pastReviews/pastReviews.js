import React from 'react';
import s from './pastReviews.module.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import PastReviewDetails from './Pastreviewdetails';

const PastReviews = ({ user }) => {
  const [selectedPastReviewIndex, setSelectedPastReviewIndex] = useState(0);
  const [pastReviews, setPastReviews] = useState(null); //used to be []
  const [numReviews, setNumReviews] = useState(null);
  const [id, setid] = useState(null);

  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid);

  const handleSelectReviewChange = event => {
    setSelectedPastReviewIndex(event.target.value);
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: 'ZhxlJLC8HXZwIVaXhgFP4HCqZSv1',
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response);
        setid(response.data._id);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);


  useEffect(() => {
    const fetchData2 = async () => {
      //ARRAY OF JSON OBJS
      axios
        .get('http://localhost:4000/routes/get_past_reviews_from_user_id', {
          params: {
            userId: id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          //console.log(response);
          setPastReviews(response.data);
          setNumReviews(response.data.length);
        })
        .catch(error => {
          console.error(error);
        });
    };
    if (id) {
      fetchData2();
    }
  }, [id]);
  return (
    <div>
      { pastReviews && pastReviews.length > 0 && (
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
      { !pastReviews && (
        <strong> No Previous Reviews</strong>
      )}
    </div>
  );
};

export default PastReviews;
