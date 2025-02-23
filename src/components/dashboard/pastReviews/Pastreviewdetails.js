import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ReactComponent as Attachment } from '../../../assets/attachment.svg';
import { TextArea } from '../../Inputs';
import { Button } from '../../button';
import s from './pastReviews.module.css';
import TextareaAutosize from 'react-textarea-autosize';

const mockData = {
  date: '12.12.2012',
  musicality: ['Rhytmic Content', 'Timing Content'],
  structure: ['Spatial Levels', 'Movement Pathways'],
  texture: [
    'Fast + Slow Dynamics',
    'Sudden/Sustained Dynamics',
    'Acceleration + Deceleration ',
  ],
  technique: ['Posture', 'Alignment', 'Balance', 'Coordination'],
};

function PastReviewDetails({ review }) {
  const [post, setPost] = useState({});
  const [commentLink, setCommentLink] = useState(null);

  useEffect(() => {
    //get the review feedback file

    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_post_from_review', {
        params: {
          review_id: review._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response.data);
        setPost(response.data);
      })
      .catch(error => {
        console.error(error);
      });

    
    fetchComments();

    //get the review post skills

    //get the review post actegorical prefs
  }, [review]);



  const handleViewPerformanceClick = postId => {
    try {
      const response = axios.get(
        'https://connectarts-backend-nsty.onrender.com/routes/get_post_video_from_review',
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

  const  fetchComments = async () => {




    axios.get(`https://connectarts-backend-nsty.onrender.com/routes/display_past_review_feedback_from_reviewid_new`, {params: {
      rev_id: review.reviewer_id,
      post_id: review.post_id
    }, responseType: 'text' })
.then(response => {
  
  setCommentLink(response.data);
})
.catch(error => {
  console.error(error);
  alert('Error downloading review comments file.');
});


};

  return (
    <div className={s.container}>
      <div className={s.attachment}>
        <Attachment />
      </div>
      {/* after date will comming from BE add to this field */}
      <h3 className={s.date}>{`Review`}</h3>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Dance Genre:</h4>
        <p className={s.genre}>{post.genre}</p>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Skills:</h4>
        <ul className={s.list}>
          {post?.additional_skill_keywords?.map((el, index) => (
            <li className={s.listItem} key={`${index}-${el}`}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Categorical Preferences:</h4>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Musicality:</h4>
        <ul className={s.list}>
          {mockData.musicality.map((el, index) => (
            <li className={s.skillItem} key={`${index}-${el}`}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Structure:</h4>
        <ul className={s.list}>
          {mockData.structure.map((el, index) => (
            <li className={s.skillItem} key={`${index}-${el}`}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Technique:</h4>
        <ul className={s.list}>
          {mockData.technique.map((el, index) => (
            <li className={s.skillItem} key={`${index}-${el}`}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <div className={s.wrapper}>
        <h4 className={s.reviewTitle}>Texture:</h4>
        <ul className={s.list}>
          {mockData.texture.map((el, index) => (
            <li className={s.skillItem} key={`${index}-${el}`}>
              {el}
            </li>
          ))}
        </ul>
      </div>
      <TextArea
        isDisabled
        label="Performer comments:"
        placeholder="Text"
        id="PerformerComments"
        value="TEST Test test TEST Performer comments" // add to this field comments string from BE
      />
      {/* {commentLink && (

<TextArea
isDisabled
label="Reviewer comments:"
placeholder="Text"
id="ReviewerComments"
value={commentLink}// add to this field comments string from BE
/>

      )} */
      }


      {commentLink && (
        

<TextareaAutosize
      disabled
      label="Reviewer comments:"
      placeholder="Text"
      id="ReviewerComments"
      value={commentLink}
    />



      )}



      {post.video_field && (
        <video className="video-player" controls>
        <source
          src={`https://connectarts-backend-nsty.onrender.com/routes/get_post_videoFile?filename=${post.video_field}`}
          type="video/mp4"
        />
      </video>
      )}
       {/* <TextArea 
        isDisabled
        label="Reviewer comments:"
        placeholder="Text"
        id="ReviewerComments"
        value="TEST Test test TEST Reviewer comments" // add to this field comments string from BE
      /> */}
      <Button
        text="View Performance"
        type="button"
        onClick={() => handleViewPerformanceClick(post._id)}
      />
    </div>
  );
}

export default PastReviewDetails;
