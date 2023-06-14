import { useEffect, useState } from "react";
import axios from "axios";
import {useAuth} from "./firebase/AuthContext"
import CurrentPost from "./currentpost";
import CurrentReview from "./currentreview";
import PastPost from "./Pastpost";
import PastReview from "./Pastreview";
import { Button, TextField, Typography } from "@material-ui/core";




function Card() {
  const [currentPostsOpen, setCurrentPostsOpen] = useState(false);
  const [currentReviewsOpen, setCurrentReviewsOpen] = useState(false);
  //const [uid,setUid] = useState('');
  const [userId,setUserId] = useState('');
  const [review, setReview] = useState(null);// used to be {}
  const [reviewPost, setReviewPost] = useState({});
  const [selectedPastPostIndex, setSelectedPastPostIndex] = useState(0);
  const [selectedPastReviewIndex, setSelectedPastReviewIndex] = useState(0);
  const [newpostReviewStatus, setnewpostReviewStatus] = useState(null)
  const [newreviewStatus, setnewreviewStatus] = useState(null)

  const [curr_post, setPost] = useState(null);
  const [pastReviews, setPastReviews] = useState(null);//used to be []
  const [pastPosts, setPastPosts] = useState([])
  const [id, setid] = useState("")
  const [pastPostReviews, setPastPostReviews] = useState(null) // used to be []
  const[numPosts, setNumPosts] = useState(4);
  const[numPostReviews, setNumPostReviews] = useState(null);
  const[numReviews, setNumReviews] = useState(null);
  
  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  console.log(uid);


  // const finalObj = {"performer_posts": posts,
//"performer_post_reviews": performer_posts}


  function toggleCurrentPosts() {
    console.log(curr_post);
    setCurrentPostsOpen((prevOpen) => !prevOpen);
  }

  function toggleCurrentReviews() {
    setCurrentReviewsOpen((prevOpen) => !prevOpen);
  }

  

  const handleSelectPostChange = (event) => {
    setSelectedPastPostIndex(event.target.value);
  };

  const handleSelectReviewChange = (event) => {
    setSelectedPastReviewIndex(event.target.value);
  };




  const handleViewPerformancePostClick =  (postId) => {
    try {
      const response =  axios.get("http://localhost:4000/routes/get_post_video_from_post", {
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


  const updateUser = () => {

    try {

      const response = axios.get("http://localhost:4000/routes/check_currentPost_reviews_updatePost_updateUser", {

      params : {
        id: id
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })

  } catch (error) {
    console.error(error);
    // Handle the error as necessary
  }
    






  }



  const handleViewPerformanceReviewClick =  (reviewId) => {
    try {
      const response =  axios.get("http://localhost:4000/routes/get_post_video_from_review", {
        params: {
          review_id: reviewId,
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




  

//reviews

//'/get_past_reviews_from_user_id'


  
  useEffect(() => {

    axios
    .get("http://localhost:4000/routes/get_id_from_firebaseuid", {
      params: {
        firebase_id: "ZhxlJLC8HXZwIVaXhgFP4HCqZSv1",

      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response);
      setid(response.data._id);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });


  }, []);

//check post review(performer) status
  useEffect(() => {

    axios.get("http://localhost:4000/routes/check_post_review_status_for_user", {
    params: {
      _id: id,
    },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.data != null) {
      setnewpostReviewStatus("New Post Reviews");
    }
  });







  }, [id])


  useEffect(() => {

    axios.get("http://localhost:4000/routes/check_reviewer_status_for_reviewer", {
    params: {
      _id: id,
    },
    withCredentials: true,
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    if (response.data != null) {
      setnewpostReviewStatus("New Review Matches");
    }
  });







  }, [id])



//check review(reviewer) status
  useEffect(() => {







  })


  useEffect(() => {
 
    const updateUserStatus = async() => {

      updateUser();





    }

    if(id){
      updateUserStatus();
    }




  }, [id])






    useEffect(() => {const fetchData = async () => {
      //JSON OBJ OF CURRENT REVIEW
    axios
      .get("http://localhost:4000/routes/get_current_reviewer_post_status", {
        params: {
          userId: id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response);
        setReview(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });


    
      

    }

    if (id) {
      fetchData();
    }
  
  }, [id]);


    

    
    //fetchData1();

    useEffect(() => {


    const fetchData1 = async () => {

      axios
        .get("http://localhost:4000/routes/get_post_from_review", {
          params: {
            review_id: review._id,
          },
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          //console.log(response);
          setReviewPost(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
  
  
      }
    
    if(review){
      fetchData1();

    }

    


    }, [review]);


    useEffect(() => {
  

    const fetchData2 = async () => {
      //ARRAY OF JSON OBJS
      axios
      .get("http://localhost:4000/routes/get_past_reviews_from_user_id", {
        params: {
          userId: id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response);
        setPastReviews(response.data);
        setNumReviews(response.data.length);
      })
      .catch((error) => {
        console.error(error);
      });

      


    }
    if(id){
      fetchData2();
    }

    
  }, [id]);

  //posts

  useEffect(() => {

    const fetchData3 = async () => {
      //JSON OBJ OF CURRENT REVIEW
    axios
      .get("http://localhost:4000/routes/get_performer_past_posts_and_post_reviews", {
        params: {
          id: id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response);
        setPastPosts(response.data.performer_posts);
        setNumPosts(response.data.performer_posts.length);
        setPastPostReviews(response.data.performer_post_reviews);
        setNumPostReviews(response.data.performer_post_reviews.length)

      })
      .catch((error) => {
        console.error(error);
      });
      

    }
    

    const fetchData4 = async() => {

      await axios
      .get("http://localhost:4000/routes/users/id/current_post", {
        params: {
          id: id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        //console.log(response);
        console.log(response.data);
        setPost(response.data);


      })
      .catch((error) => {
        console.error(error);
      });



      ///check_currentPost_reviews_updatePost_updateUser'
      //call the above after getting the current post 



   


    
      





    }
    if(id){
      fetchData3();
      fetchData4();

    }
    






    //"/get_performer_past_posts_and_post_reviews"( JSON OBJ OF PAST POSTS AND POST REVIEWS)

  //'/users/id/current_post(JSON OBJ OF CURRENT POST)



  }, [id]);

  //function handle_view_reviewPostclick() 

  //function handle_view_Post_click() 


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
          <li >{post.structure}</li>
          <li>{post.technique}</li>
          <li>{post.form}</li>

        </p>

        <button className="view-performance-btn" onClick={() => handleViewPerformancePostClick(post._id)}>View Performance</button>
        <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`} type="video/mp4" />
      </video>
      </div>
        <div>
          <h1>My Post Reviews</h1>
          <PastPost post={post} />
        </div>
      </>
    );
  }


  return (

    <div className="card">
    <section className="main--container">
      <div className="card-heading" style={{ display: "flex", flexDirection: "row"  }}>
        <button className="accordion" onClick={toggleCurrentPosts}>
          Post Dashboard
        </button>
        <button className="accordion" onClick={toggleCurrentReviews}>
          Review Dashboard
        </button>
      </div>

      <div>
      {newpostReviewStatus && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" >&times;</span>
          <p>{newpostReviewStatus}</p>
        </div>
      </div>
    )};
        {currentPostsOpen && curr_post && (
          <div>
            <article className="card">
              <div className="accordion-content">
                <h1>Current Post</h1>
              

              
                <p>
                  <strong>Dance Genre:</strong> {curr_post.current_post.genre}
                </p>
                <p>
                <strong>Skills:</strong>{curr_post.current_post.additional_skill_fields}
                 
                {curr_post.current_post.additional_skill_fields && curr_post.current_post.additional_skill_keywords.map((skillField, index) => (
    <li key={index}>{skillField}</li>
))}


                </p>
                <p>
                  <strong>Categorical Preferences:</strong>
                  <li> Musicality: {curr_post.current_post.musicality}</li>
                  <li>Structure: {curr_post.current_post.structure}</li>
                  <li>Technique: {curr_post.current_post.technique}</li>
                  <li>Form: {curr_post.current_post.form}</li>
                </p>
                <Button
                  className="view-performance-btn" color="secondary" variant="contained"
                  onClick={() => handleViewPerformancePostClick(curr_post.current_post._id)}
                >
                  View Performance
                </Button>
                <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${curr_post.current_post.video_field}`} type="video/mp4" />
      </video>
      </div>
              </div>
              <div>
                <h1>My Post Reviews + Additional Comments</h1>
                <CurrentPost post={curr_post.current_post} />
              </div>
            </article>
          </div>
        )}

        {currentPostsOpen && !curr_post && (

          <strong> No Current Post</strong>
        )

        }

        {currentPostsOpen && pastPosts && pastPosts.length > 0 && (
          <div>
            <div>
              <article className="card">
                <div className="accordion">
                  <select className="select-option" onChange={handleSelectPostChange}>
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

        {currentPostsOpen && pastPosts.length == 0 && (
          <strong> No Previous Posts</strong>
        )}
      </div>
    </section>

    
    {currentReviewsOpen &&  review && (
      <div>
        <article className="card">
        <Button
              className="view-performance-btn" color="primary" variant="contained"
              onClick={() => handleViewPerformanceReviewClick(review._id)}
              style={{ width: "20%" }}
            >
              View Post Performance
            </Button>
          <div className="accordion-content">
            <CurrentReview review={review} />
            
          </div>
        </article>
      </div>
    )}
    {newreviewStatus && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" >&times;</span>
          <p>{newreviewStatus}</p>
        </div>
      </div>
    )};
    {currentReviewsOpen && !review && (
      <strong> No Current Review</strong>


    )}
    {currentReviewsOpen && pastReviews && pastReviews.length > 0 && (
      
      <article className="card">
        <h1> Past Reviews</h1>
        <div className="accordion">
          <select className="select-option" onChange={handleSelectReviewChange}>
            {[...Array(pastReviews.length)].map((_, index) => (
              <option key={index} value={index}>
                Review {index + 1}
              </option>
            ))}
          </select>
        </div>
        <PastReview review={pastReviews[selectedPastReviewIndex]} />
      </article>
    )}

    {currentReviewsOpen && !pastReviews && (
      <strong> No Previous Reviews</strong>


    )}


  </div>
)};




export default Card;