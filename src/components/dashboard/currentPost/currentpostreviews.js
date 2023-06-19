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
  const [reviewerInfo, setreviewerInfo] = useState([]);
  const [ratingStatus, setratingStatus] = useState(null);
  const [reviewComments, setreviewComments] = useState({});
  const [rating, setRating] = useState(null);

  const changeRating = event => {
    setRating(event.target.value);
  };

  const fetchPostComments = async () => {
    //let comments = ""

    axios
      .get('http://localhost:4000/routes/getcomments', {
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
      .get('http://localhost:4000/routes/get_post_reviews_withoutratings', {
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
      .patch('http://localhost:4000/routes/add_review_rating', {
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

    for (let i = 0; i <= post.reviewers; i++) {
      let revId = post.reviewers[i];

      axios
        .get(
          'http://localhost:4000/routes/display_past_review_feedback_from_reviewid_new',
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
          console.error(error);
        });
    }

    setreviewComments(obj);
  };

  useEffect(() => {
    fetchReviewComments();
  }, []);

  useEffect(() => {
    fetchPostComments();
    checkRatingStatus();
  }, []);

  //get the reviews for the post

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/users/id/current_post/get_reviews', {
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
        'http://localhost:4000/routes/add_review_rating',
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
      <h2 className={s.title}>Reviewer information</h2>
      <div className={s.reviewWrapper}>
        <div className={s.userInfoWrapper}>
          <div className={s.userInfo}>
            {/* don't see avatar field please check it and change src*/}
            <img className={s.avatar} src={avatar} alt="avatar" />
            <div className={s.user}>
              <p className={s.name}>{user?.name || 'Eisha'}</p>
              {/* don't see mail field please check it and change this field*/}
              <p className={s.mail}>{user?.mail || 'olivia@gmail .com'}</p>
            </div>
          </div>
        </div>
        {user?.payRate && (
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
        )}
        <div className={s.wrapper}>
          <h3 className={`${s.postTitle} ${s.minWidth}`}>Dance Genre:</h3>
          <p className={s.genreItem}>{post?.genre}</p>
        </div>
        <div className={s.wrapper}>
          <h3 className={`${s.postTitle} ${s.minWidth}`}>Skills:</h3>
          <ul className={s.list}>
            {post?.additional_skill_keywords?.map((skillField, index) => (
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
            {post?.musicality_fields?.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h3 className={s.postTitle}>Structure:</h3>
          <ul className={s.list}>
            {post?.structure_fields?.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h3 className={s.postTitle}>Technique:</h3>
          <ul className={s.list}>
            {post?.technique_fields?.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h3 className={s.postTitle}>Texture:</h3>
          <ul className={s.list}>
            {post?.form_fields?.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        </div>
        {postComments && (
        <TextArea
          label="Additional comments:"
          id="AdditionalComments:"
          value={postComments}
          setValue={setComment}
          isDisabled
        />

        )}
      </div>
    </div>
  );
};

export default CurrentPostReviews;
