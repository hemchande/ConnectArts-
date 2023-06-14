import React from 'react';
import { useEffect, useState } from 'react';
import { useAuth } from '../../firebase/AuthContext';
import axios from 'axios';
import CurrentPostReviews from './currentpostreviews';
import s from './currentPost.module.css';
import { Button, TextField, Typography } from '@material-ui/core';

const CurrentPost = ({ user }) => {

  const [currentPostsOpen, setCurrentPostsOpen] = useState(false);
  const [curr_post, setPost] = useState(null);
  const [id, setid] = useState(null);
  const [newpostReviewStatus, setnewpostReviewStatus] = useState(null);
  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid);

  const handleViewPerformancePostClick = postId => {
    try {
      const response = axios.get(
        'http://localhost:4000/routes/get_post_video_from_post',
        {
          params: {
            post_id: postId,
          },
          responseType: 'blob',
        },
      );

      // Do something with the video blob, such as displaying it in a video element
      const videoUrl = URL.createObjectURL(response.data);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      document.body.appendChild(videoElement);
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const fetchData4 = async () => {
    await axios
      .get('http://localhost:4000/routes/users/id/current_post', {
        params: {
          id: id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response);
        console.log(response.data);
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    ///check_currentPost_reviews_updatePost_updateUser'
    //call the above after getting the current post
  };


  const updateUser = () => {
    try {
      console.log(id)
      const response = axios.get(
        'http://localhost:4000/routes/check_currentPost_reviews_updatePost_updateUser',
        {
          params: {
            id: id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };
  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: uid,
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

  //check post review(performer) status
  useEffect(() => {
    if (id) {
      axios
        .get('http://localhost:4000/routes/check_post_review_status_for_user', {
          params: {
            _id: id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          if (response.data != null) {
            setnewpostReviewStatus('New Post Reviews');
          }
        });
    }
  }, []);
  

  useEffect(() => {
    const updateUserStatus = async () => {
      updateUser();
    };

    
      updateUserStatus();
      fetchData4();
    
  }, [id]);

  return (
    <div>
      { curr_post && (
            <div>
              <article className="card">
                <div className="accordion-content">
                  <h1>Current Post</h1>

                  <p>
                    <strong>Dance Genre:</strong> {curr_post.current_post.genre}
                  </p>
                  <p>
                    <strong>Skills:</strong>{' '}
                    {curr_post.current_post.additional_skill_keywords.map(
                      (skillField, index) => (
                        <li key={index}>{skillField}</li>
                      ),
                    )}
                  </p>
                  <p>
                    <strong>Categorical Preferences:</strong>
                    <li> Musicality: {curr_post.current_post.musicality}</li>
                    <li>Structure: {curr_post.current_post.structure}</li>
                    <li>Technique: {curr_post.current_post.technique}</li>
                    <li>Form: {curr_post.current_post.form}</li>
                  </p>
                  <Button
                    className="view-performance-btn"
                    color="secondary"
                    variant="contained"
                    onClick={() =>
                      handleViewPerformancePostClick(curr_post.current_post._id)
                    }
                  >
                    View Performance
                  </Button>
                </div>
                <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${curr_post.current_post.video_field}`} type="video/mp4" />
      </video>
      </div>

                <div>
                  <h1>My Post Reviews + Additional Comments</h1>
                  <CurrentPostReviews post={curr_post.current_post} />
                </div>
              </article>
            </div>
          )}
          { !curr_post && <strong> No Current Post</strong>}
    </div>
  );
};

export default CurrentPost;
