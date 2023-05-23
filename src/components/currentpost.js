import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, TextField, Typography } from "@material-ui/core";
import { RateReviewOutlined } from '@mui/icons-material';

const CurrentPost = ({ post }) => {



  const [activeId, setActiveId] = useState(null);



  const [postId, setPostId] = useState()
  const [postReviewersLength, setPostReviewersLength] = useState()
  const [postReviews, setReviews] = useState([])
  const [postComments, setpostComments] = useState('')
  const [postReviewIds, setReviewIds] = useState([post.reviewers])
  const [reviewerInfo, setreviewerInfo] = useState([])
  const [ratingStatus, setratingStatus] = useState(null)
  const [reviewComments, setreviewComments] = useState({})
  const [rating,setRating] = useState(null);



  const toggleAccordion = (id) => {
    console.log(id);
    setActiveId(activeId === id ? null : id);
  }


  const changeRating = (event) => {

    setRating(event.target.value);


  }

  const fetchPostComments = async() =>{

    //let comments = ""

    axios
      .get("http://localhost:4000/routes/getcomments", {
        params: {
          post_id: post._id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setpostComments(response.data.comments);

      })
      .catch((error) => {
        console.error(error);
      });



  }


  const checkRatingStatus = async() => {

    let array = []
    let ratingobj = {}


    axios.get("http://localhost:4000/routes/get_post_reviews_withoutratings", {
      params: {
        post_id: post._id
      },withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      array = response.data;

      try{
      for (let i = 0; i < array.length; i ++){
        ratingobj[array[i]] = true

      }
      setratingStatus(ratingobj);
    }catch(error) {

    }
  







    })
    .catch((error) => {
      console.error(error);
    });








  }


  const addRating = async() => {




  }

  const fetchReviewComments = async () => {

    let obj = {}

    for(let i = 0;i <= post.reviewers; i ++ ){
      let revId = post.reviewers[i]

      axios
      .get("http://localhost:4000/routes/display_past_review_feedback_from_reviewid_new", {
        params: {
          rev_id: revId,
          post_id: post._id
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        obj[revId] = response.data;

      })
      .catch((error) => {
        console.error(error);
      });


    }

    setreviewComments(obj)

    





  }

  useEffect(() => {




  


  fetchReviewComments();


}, []);


useEffect(() => {

  fetchPostComments();



}, []);









  //get the reviews for the post

  useEffect(() => {

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
        console.log(response);
        setReviews(response.data.review_ids);
        setreviewerInfo(response.data.reviewer_information);

      })
      .catch((error) => {
        console.error(error);
      });




    console.log(postReviewIds);

    
    
    







  }, []);



  const updateReview = async(event) => {

    const rev_id = event.target.id;

    axios
    .post("http://localhost:4000/routes/add_review_rating", {
      review_id: rev_id,
      rating: rating,
    }, {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      console.log(response.data);
      setRating(null)
    })
    .catch((error) => {
      console.error(error);
    });





  }





  return (

    <div>
      <strong> Post Additional Comments</strong>
      <Typography> {postComments}</Typography>

    <div className="accordion-container">
      {post.reviewer_ids.map((reviewId, index) => (
        <div className="accordion-card" key={index}>
          <Button className={`accordion-title ${activeId === reviewId ? 'active' : ''}`} id = {reviewId} color="primary" variant="contained" onClick={() => toggleAccordion(reviewId)}>
            Reviewer Name: {reviewId}
          </Button>
          {activeId === reviewId && (
            <div className="accordion-content">
              <h1><strong>Reviewer Information:</strong></h1>
              {reviewerInfo[index] && Object.entries(reviewerInfo[index]).map(([key, value]) => {
                if (['technique', 'musicality', 'form', 'structure', 'genres', 'payRate'].includes(key
                  )) {
                    return <p key={key}><strong>{key}:</strong> {value}</p>;
                    }
                    return null;
      
                  })}

              <p> <strong> Skill Fields</strong></p>

              {reviewerInfo[index]["skillFields"].map((skillField, index) => (
              <p key={index}>{skillField}</p>
              ))}

                
              <p><strong>Reviewer Comments:</strong></p>
              {reviewComments[reviewId] &&  (
                <p> {reviewComments[reviewId]}</p>
              )}

              <p><strong> Add Rating </strong></p>
             {ratingStatus[reviewId]&& (

                <><input type="number" value={rating} onChange = {changeRating} name="Reviewer Rating" min="1" max="5" step="1" /><Button id= {reviewId}> Add </Button></>


              

              )}
                
        
              
            </div>
          )}
        </div>
      ))}
    </div>


    </div>
 
  
  );
}


export default CurrentPost;
