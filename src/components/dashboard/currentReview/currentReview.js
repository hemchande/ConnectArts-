import React from 'react';
import s from './currentReview.module.css';
import { useAuth } from '../../firebase/AuthContext';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentReviewDetails from './currentreviewdetails';

const CurrentReview = ({user}) => {
  const [review, setReview] = useState(null); // used to be {}
  const [id, setid] = useState('');


  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid);


  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: "ZhxlJLC8HXZwIVaXhgFP4HCqZSv1",
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
    const fetchData = async () => {
      //JSON OBJ OF CURRENT REVIEW
      axios
        .get('http://localhost:4000/routes/get_current_reviewer_post_status', {
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
          setReview(response.data);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return (
    <div>
       { review && (
        <div>
          <article className="card">
            
            <div className="accordion-content">
              <CurrentReviewDetails review={review} />
            </div>
          </article>
        </div>
      )}
    </div>
  );
};

export default CurrentReview;
