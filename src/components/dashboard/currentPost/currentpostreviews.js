import React from 'react';
import { useState, useEffect } from 'react';
import avatar from '../../../assets/Avatar.png';
import { TextArea } from '../../Inputs';
import axios from 'axios';

import s from './currentPost.module.css';

const CurrentPostReviews = ({ post, user }) => {
  const [postReviews, setReviews] = useState([]);
  const [comment, setComment] = useState('HelloWorld'); // add comments to this useState or from the post immediately in the TextArea
  const [postComments, setpostComments] = useState(null);
  const [postReviewIds, setReviewIds] = useState([post.reviewers]);
  const [reviewerInfo, setreviewerInfo] = useState(null); //used to be {}
  const [ratingStatus, setratingStatus] = useState(null);
  const [reviewComments, setreviewComments] = useState(null); //used to be {}
  const [rating, setRating] = useState(null);

  const changeRating = event => {
    setRating(parseInt(event.target.value));
  };

  const fetchPostComments = async () => {
    //let comments = ""

    axios
    .get('https://connectarts-backend-nsty.onrender.com/routes/getcomments', {
      params: {
        post_id: post._id,
      },
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => {
      console.log(response);
      setpostComments(response.data.comments);
    })
    .catch(error => {
      console.error(error);
    });
  
  };

  const checkRatingStatus = async () => {
    let array = [];
    let ratingobj = {};

    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_post_reviews_withoutratings', {
        params: {
          post_id: post._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        array = response.data;

        try {
          for (let i = 0; i < array.length; i++) {
            ratingobj[array[i]] = true;
          }
          setratingStatus(ratingobj);
        } catch (error) {}
      })
      .catch(error => {
        console.error(error);
      });
  };

  const addRating = async event => {
    const revId = event.target.id;

    axios
      .patch('https://connectarts-backend-nsty.onrender.com/routes/add_review_rating', {
        review_id: revId,
        rating: rating, // The rating value you want to send
      })
      .then(response => {
        // Handle the successful response
        console.log(response.data);
      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  };

  const fetchReviewComments = async () => {
    let obj = {};

    console.log(post.reviewer_ids)

    for (let i = 0; i < post.reviewer_ids.length; i++) {
      let revId = post.reviewer_ids[i];
      console.log(revId)

      axios
        .get(
          'https://connectarts-backend-nsty.onrender.com/routes/display_past_review_feedback_from_reviewid_new',
          {
            params: {
              rev_id: revId,
              post_id: post._id,
            },
            withCredentials: true,
            headers: {
              'Content-Type': 'application/json',
            },
          },
        )
        .then(response => {
          obj[revId] = response.data;
        })
        .catch(error => {
          obj[revId] = null
          console.error(error);
        });
    }

    setreviewComments(obj);
  };

  useEffect(() => {
    //fetchReviewComments();
  }, []);

  useEffect(() => {
    fetchPostComments();
    fetchReviewComments();
    checkRatingStatus();
  }, []);

  //get the reviews for the post

  useEffect(() => {
    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/users/id/current_post/get_reviews', {
        params: {
          post_id: post._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setReviews(response.data.review_ids);
        setreviewerInfo(response.data.reviewer_information);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const updateReview = async event => {
    const rev_id = event.target.id;

    axios
      .post(
        'https://connectarts-backend-nsty.onrender.com/routes/add_review_rating',
        {
          review_id: rev_id,
          rating: rating,
        },
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        console.log(response.data);
        setRating(null);
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      {postComments && (
              <TextArea
                label="Additional Performer comments"
                id="AdditionalComments:"
                value={postComments}
                setValue={setComment}
                isDisabled
              />
            )}

      {reviewerInfo && ratingStatus && reviewComments && reviewerInfo.map((id, index) => (
        <React.Fragment key={reviewerInfo[index]}>
        {/* {postComments && (
              <TextArea
                label="Additional Performer comments"
                id="AdditionalComments:"
                value={postComments}
                setValue={setComment}
                isDisabled
              />
            )} */}
          <h2 className={s.title}>Reviewer Information</h2>

          <div className={s.reviewWrapper}>
            <div className={s.userInfoWrapper}>
              <div className={s.userInfo}>
                {/* don't see avatar field please check it and change src*/}
                {/* <img className={s.avatar} src={avatar} alt="avatar" /> */}
                <div className={s.user}>
                  <p className={s.name}>{reviewerInfo[index].name || 'Eisha'}</p>
                  {/* don't see mail field please check it and change this field*/}
                  <p className={s.mail}>{reviewerInfo[index].email || ''}</p>
                </div>
              </div>
            </div>
            {/* {user?.payRate && (
              <div className={s.wrapper}>
                <h3 className={`${s.postTitle} ${s.minWidth}`}>Pay Rate:</h3>
                <p className={s.payRate}>{`${user.payRate}$`}</p>
              </div>
            )}
            {user?.payRange?.from && user?.payRange?.to && (
              <div className={s.wrapper}>
                <h3 className={`${s.postTitle} ${s.minWidth}`}>Pay Range:</h3>
                <p
                  className={s.payRate}
                >{`${user.payRange.from}$ - ${user.payRange.to}$`}</p>
              </div>
            )} */}
            <div className={s.wrapper}>
              <h3 className={`${s.postTitle} ${s.minWidth}`}>Dance Genres:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].genre.map((skillField, index) => (
                  <ul key={index} className={s.genreItem}>
                    {skillField}
                  </ul>
                ))}</ul>
            </div>
            <div className={s.wrapper}>
              <h3 className={`${s.postTitle} ${s.minWidth}`}>Skills:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].skillFields.map((skillField, index) => (
                  <li key={index} className={s.skillItem}>
                    {skillField}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.wrapper}>
              <h3 className={s.postTitle}>Categorical Preferences:</h3>
            </div>
            <div className={s.wrapper}>
              <h3 className={s.postTitle}>Musicality:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].musicality_fields?.map((skillField, index) => (
                  <li key={index} className={s.preferencesItem}>
                    {skillField}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.wrapper}>
              <h3 className={s.postTitle}>Structure:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].structure_fields?.map((skillField, index) => (
                  <li key={index} className={s.preferencesItem}>
                    {skillField}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.wrapper}>
              <h3 className={s.postTitle}>Technique:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].technique_fields?.map((skillField, index) => (
                  <li key={index} className={s.preferencesItem}>
                    {skillField}
                  </li>
                ))}
              </ul>
            </div>
            <div className={s.wrapper}>
              <h3 className={s.postTitle}>Texture:</h3>
              <ul className={s.list}>
                {reviewerInfo[index].form_fields?.map((skillField, index) => (
                  <li key={index} className={s.preferencesItem}>
                    {skillField}
                  </li>
                ))}
              </ul>
            </div>

            {/* {postComments && (
              <TextArea
                label="Additional comments:"
                id="AdditionalComments:"
                value={postComments}
                setValue={setComment}
                isDisabled
              />
            )} */}

            {reviewComments[reviewerInfo[index]._id]  && reviewerInfo ? (
               <React.Fragment key={reviewComments[reviewerInfo[index]]}>

            <div className={s.commentsWrapper}>
              <h3 className={s.date}>Reviewer comments:</h3>
              <div className={s.line}></div>
              
                <div key={index}>
                  <div className={s.commentInfo}>
                    
                   
                  </div>
                  {/* <p className={s.commentText}>{reviewComments[reviewerInfo[index]._id]}</p> */}
                  <p className={s.commentText}>{reviewComments[reviewerInfo[index]._id]}</p>
                  
                </div>
             
            </div>
            </React.Fragment>

): (
  <p>No reviewer comments available.</p>
)}
            {ratingStatus && postReviews.length > 0 && Object.keys(ratingStatus).includes(postReviews[index]) && ratingStatus[postReviews[index]] && (
  <p>
    <strong>Add Rating</strong>
    <input
      type="number"
      value={rating}
      onChange={changeRating}
      name="Reviewer Rating"
      min="1"
      max="5"
      step="1"
    />
    <button id={postReviews[index]} onClick = {addRating}>Add</button>
  </p>

  
)}


          </div>
        </React.Fragment>
      ))}
    </div>
  );
};

export default CurrentPostReviews;

