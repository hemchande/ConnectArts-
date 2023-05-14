import React, { useEffect } from 'react';
import {useState} from 'react';
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



function PastPost ({post}) {

    const [activeId, setActiveId] = useState(null);

    //const [post, setPost] = useState({post})
    const [reviews, setReviews] = useState([])
    const [reviewComments, setReviewComments] = useState({})
    const [reviewInfo, setReviewInfo] = useState([])

    const classes = useStyles();

    const toggleAccordion = (id) => {
      setActiveId(activeId === id ? null : id);
    }

    const fetchReviewInfo = () => {


      axios
        .get("http://localhost:4000/routes/users/id/current_post/get_reviews", {
      params: {
        post_id: post._id,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response);
      setReviews(response.data.review_ids);
      setReviewInfo(response.data.reviewer_information);

    })
    .catch((error) => {
      console.error(error);
    });








    }



    const fetchReviewComments = () => {

      try {
        let obj = {};
    
        for (let i = 0; i <= post.reviewer_ids; i++) {
          let revId = post.reviewer_ids[i];
    
          axios
            .get(
              "http://localhost:4000/routes/display_past_review_feedback_from_reviewid_new",
              {
                params: {
                  rev_id: revId,
                  post_id: post._id
                },
                withCredentials: true,
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              obj[revId] = response.data;
            })
            .catch((error) => {
              console.error(error);
            });
        }
    
        setReviewComments(obj);
      } catch (error) {
        console.error(error);
      }
  
  
  
  
    }



    useEffect(() => {


    

      
    
    
      fetchReviewComments();


      
      fetchReviewInfo();



    
    

        

    }, []);

   


  



    





    return (
      <div className="accordion-container">
        <h1> Past Posts</h1>
      {reviews.map((review, index) => (
        <div className="accordion-card" key={index}>
          <button className={`accordion-title ${activeId === review._id ? 'active' : ''}`} onClick={() => toggleAccordion(review)}>
            Reviewer ID: {review}
          </button>
          {activeId === review && (
            <div className="accordion-content">
              <p><strong>Reviewer Information:</strong></p>
              {reviewInfo[index] && Object.entries(reviewInfo[index]).map(([key, value]) =>{
                if (['technique', 'musicality', 'form', 'structure', 'genres', 'payRate', 'name'].includes(key
                  )) {
                    return <p key={key}><strong>{key}:</strong> {value}</p>;
                    }
                    return null;
      
                  })}


<h2> <strong> Skill Fields</strong></h2>

{reviewInfo[index]["skillFields"].map((skillField, index) => (
<li key={index}>{skillField}</li>
))}
              <p><strong>Reviewer Comments:</strong></p>
              {reviewComments[review] && reviewComments[review].map((comment, index) => (
                <p key={index}>{comment}</p>
              ))}

              <h2>Resume</h2>
            <iframe
              title="Resume"
              style={{ width: '100%', height: '600px', border: 'none' }}
              src={`http://localhost:4000/routes/users/${review}/resume`}
              />
            </div>
            
          )}
        </div>
      ))}
    </div>
       
      );
    }

export default PastPost;