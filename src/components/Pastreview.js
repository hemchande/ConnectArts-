import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    container: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gridTemplateRows: 'auto 1fr',
      gridGap: theme.spacing(2),
      height: '100vh',
    },
    videoSection: {
      gridColumn: '1 / 2',
      gridRow: '1 / 2',
    },
    feedbackSection: {
      gridColumn: '2 / 3',
      gridRow: '1 / 2',
    },
    bottomSection: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gridGap: theme.spacing(2),
      gridColumn: '1 / 3',
      gridRow: '2 / 3',
    },
    categoryPrefs: {
      backgroundColor: 'lightblue',
    },
    additionalSkills: {
      backgroundColor: 'lightgreen',
    },
    additionalNotes: {
      backgroundColor: 'lightpink',
    },
  }));



function PastReview ({review}) {

    const [post, setPost] = useState({})
    //const [review, setReview] = useState(review)
    const [commentLink, setCommentLink] = useState(null);

    const classes = useStyles();


    const  fetchComments = async () => {




      axios.get(`http://localhost:4000/routes/display_past_review_feedback_from_reviewid_new`, {params: {
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


    useEffect(() => {

        //get the review feedback file 
        

        axios.get('http://localhost:4000/routes/get_post_from_review', {
          params: {
            review_id: review._id,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }).then(response => {
          //console.log(response.data);
          setPost(response.data)
         })
        .catch(error => {
        console.error(error);
        });



      



        //get the review post skills





        //get the review post actegorical prefs 


    }, [review]);

    useEffect(() => { 


      fetchComments();



  }, []);




  const handleViewPerformanceClick =  (postId) => {
    try {
      const response = axios.get("http://localhost:4000/routes/get_post_video_from_review", {
        params: {
          post_id: postId,
        },
        responseType: 'blob',
      });
      
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



    return (
      <>
    
      
      <p>
        <strong>Dance Genre:</strong> {post.genre}
      </p>
      <p>


      <strong>Categorical Preferences:</strong>

      
      <p> Technique {post.technique}</p>
      <p> Structure {post.structure}</p>
      <p> Musicality {post.musicality}</p>
      <p> Form {post.form}</p>

      <p>
      <strong>Post Skills </strong>
{post && post.additional_skill_keywords && post.additional_skill_keywords.length > 0 && (
  <ul>
    {post.additional_skill_keywords.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
  
        
      
        
      </p>
      
      <p>
        <strong>View Provided Feedback </strong> {commentLink}
      </p>
      <button className="view-performance-btn" onClick={() => handleViewPerformanceClick(post._id)}>View Performance</button>
      <div>
      <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`} type="video/mp4" />
      </video>
      </div>
      
    
      </div>


     


      </p>

      </>




    )};


    export default PastReview;
    










