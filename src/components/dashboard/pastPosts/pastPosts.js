import React from 'react';
import s from './pastPosts.module.css';
import { useAuth } from '../../firebase/AuthContext';
import PastPostReviews from './Pastpostreviews';
import { useEffect, useState } from 'react';
import axios from 'axios'




const PastPosts = ({user}) => {

  const [pastPosts, setPastPosts] = useState([]);
  const [id, setid] = useState(null);
  const [pastPostReviews, setPastPostReviews] = useState(null); // used to be []
  const [selectedPastPostIndex, setSelectedPastPostIndex] = useState(0);
  const [numPosts, setNumPosts] = useState(4);
  const [numPostReviews, setNumPostReviews] = useState(null);

  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid);


  const handleSelectPostChange = event => {
    setSelectedPastPostIndex(event.target.value);
  };

  const fetchData3 = async () => {
    //JSON OBJ OF CURRENT REVIEW
    axios
      .get(
        'http://localhost:4000/routes/get_performer_past_posts_and_post_reviews',
        {
          params: {
            id: id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      .then(response => {
        //console.log(response);
        setPastPosts(response.data.performer_posts);
        setNumPosts(response.data.performer_posts.length);
        setPastPostReviews(response.data.performer_post_reviews);
        setNumPostReviews(response.data.performer_post_reviews.length);
      })
      .catch(error => {
        console.error(error);
      });
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
    if(id){
      fetchData3();

    }
    
  }, [id]);


  function PastPostOption({ post }) {
    return (
      <>
        <p>
          <strong>Reviewer:</strong> John Smith
        </p>
        <p>
          <strong>Dance Genre:</strong> {post.genre}
        </p>
        <p>
          <strong>Skills:</strong>
          {post.additional_skill_keywords.map((skillField, index) => (
            <li key={index}>{skillField}</li>
          ))}
        </p>
        <p>
          <strong>Categorical Preferences:</strong>
          <li> {post.musicality}</li>
          <li>{post.structure}</li>
          <li>{post.technique}</li>
          <li>{post.form}</li>
        </p>
        <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`} type="video/mp4" />
      </video>
      </div>
        <div>
          <h1>My Post Reviews</h1>
          <PastPostReviews post={post} />
        </div>
      </>
    );
  }
  return (
    <div>
      {pastPosts && pastPosts.length > 0 && (
            <div>
              <div>
                <article className="card">
                  <div className="accordion">
                    <select
                      className="select-option"
                      onChange={handleSelectPostChange}
                    >
                      {[...Array(pastPosts.length)].map((_, index) => (
                        <option key={index} value={index}>
                          Post {index + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <PastPostOption post={pastPosts[selectedPastPostIndex]} />
                </article>
              </div>
            </div>
          )}
          {pastPosts.length == 0 && (
            <strong> No Previous Posts</strong>
          )}
    </div>
  );
};

export default PastPosts;
