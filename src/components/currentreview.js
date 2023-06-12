import React, { useEffect } from 'react';
import  { useState } from "react";
import axios from 'axios';
import { Button, TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { useNavigate } from 'react-router-dom';




const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    margin: theme.spacing(2),
  },
  container: {
    // add your styles here
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    margin: theme.spacing(2),
    padding: theme.spacing(2),
    border: `1px solid ${theme.palette.primary.main}`,
    borderRadius: theme.shape.borderRadius,
  },
  header: {
    fontWeight: "bold",
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
  textInput: {
    marginBottom: theme.spacing(2),
  },
  addButton: {
    alignSelf: "flex-end",
  },
}));

function CurrentReview({ review }) {

  const classes = useStyles();
  const [error, setError] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState("");
  const [newText, setNewText] = useState("");
  const [newExplanation, setNewExplanation] = useState("");
  const [newSuggestion, setNewSuggestion] = useState("");
  const [newObservation, setNewObservation] = useState("");
  const [post, setPost] = useState({});
  const [postComments, setPostComments] = useState('')
  const [generalFeedback, setGeneralFeedback] = useState('')
  const [verificationText, setVerificationtext] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const handleClose = () => {
    setError('');
  };



  const handleAddHeader = () => {
    if (countWords(newText) < 60) {
      // Display an error message or handle the validation failure
      console.log("Optional Skill Comments must be at least 60 words.");
      setError("Optional Skill Comments must be at least 60 words.")
      return;
    }
  
    if (countWords(newExplanation) < 60) {
      console.log("Explanation of skill must be at least 60 words.");
      setError("Explanation of skill must be at least 60 words.")
      return;
    }
  
    if (countWords(newObservation) < 60) {
      console.log("Observation in performance must be at least 60 words.");
      setError("Observation in performance must be at least 60 words.")
      return;
    }
  
    if (countWords(newSuggestion) < 60) {
      console.log("Suggestions for better execution must be at least 60 words.");
      setError("Suggestions for better execution must be at least 60 words.")
      return;
    }

    setHeaders([...headers, { header: newHeader, text: newText, explanation: newExplanation, observation: newObservation, suggestion: newSuggestion }]);
    setNewHeader("");
    setNewText("");
    setNewExplanation("")
    setNewObservation("")
    setNewSuggestion("")
  };


  const handleGeneralFeedback = (event) => {







  }

  


  const fetchPostComments = async() =>{

    //let comments = ""

    axios
      .get("http://localhost:4000/routes/getcomments", {
        params: {
          post_id: review.post._id,
        },
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log(response);
        setPostComments(response.data.comments);

      })
      .catch((error) => {
        console.error(error);
      });



  }

  // Helper function to count words in a string
  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    return words.length;
  };

  const verifyFeedback = async() => {

    const feedbackText = headers.reduce(
      (acc, h) => acc + h.header + " " + h.text + " ",
      ""
    );

    setIsOpen(!isOpen);

    axios.post("http://localhost:4000/routes/check_skill_viabilities_forcomments/within_reviews", {comment: feedbackText, skills: ["ballet", "jazz"]},
    {
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${"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"}`
        // add any other headers you need here
      },
    }).then((response) => {
      console.log(response.data);
      setVerificationtext(response.data.choices[0].text);
    })
    .catch((error) => {
      console.error(error);
    });




  

    





  };


  const close = () => {

    setIsOpen(!isOpen);


  }




  const handlepostFeedback= () => {

    const feedbackText = headers.reduce(
      (acc, h) => acc + h.header + " " + h.text + " " + h.explanation + " " + h.observation + " " + h.suggestion ,
      ""
    );

    const feedback =  "General Feedback" + generalFeedback

    const finalText = feedbackText + " " + feedback



    
    axios.patch(
      "http://localhost:4000/routes/attach_to_reviews",
      {
        params: {
          id: review.reviewer_id,
        },
        review_comments: finalText,
      },
      {
      
        headers: {
          "Content-Type": "application/json",
          // add any other headers you need here
        },
      }
    )
    .then((response) => {
      //console.log(response.data);
      setHeaders([]);
    })
    .catch((error) => {
      console.error(error);
    });
    

    navigate("/signedin");
    




  };

  

  useEffect(() => {



    axios.get('http://localhost:4000/routes/get_post_from_review', { 
      params: {
        review_id: review._id
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },




     })
      .then(response => {
      //console.log(response.data);
      setPost(response.data)
      //console.log(post)
     })
    .catch(error => {
    console.error(error);
    });


  






  }, []);



  
  return (
    <>
    {error && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <p>{error}</p>
        </div>
      </div>
    )};

    
    <div>

      <h1>Current Review</h1>


      <h3>Categorical Preferences:</h3>
<ul>
  {post && post.musicality && <li>Musicality: {post.musicality}</li>}
  {post && post.structure && <li>Structure: {post.structure}</li>}
  {post && post.technique && <li>Technique: {post.technique}</li>}
  {post && post.form && <li>Form: {post.form}</li>}
</ul>

{post && post.additional_skill_keywords && (
  <div>
    <h3>Skills:</h3>
    <ul>
      {post.additional_skill_keywords.map((skillField, index) => (
        <li key={index}>{skillField}</li>
      ))}
    </ul>
  </div>
)}

      


      <strong> Post Additional Comments</strong>
        <Typography> {postComments}</Typography>

        <div >
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`} type="video/mp4" />
      </video>
      </div>




        <h3>Create Review</h3>

          <div className={classes.container}>
  <div className={classes.root}>
  <TextField
      label="General Performance Comments"
      value={generalFeedback}
      onChange={(e) => setGeneralFeedback(e.target.value)}
      className={classes.textInput}
    />


    {headers.map((h) => (
      <div key={h.header}>
        <Typography variant="h6" className={classes.header}>
          {h.header}
        </Typography>
        <Typography>{h.text}</Typography>
        <Typography>{h.explanation}</Typography>
        <Typography>{h.observation}</Typography>
        <Typography>{h.suggestion}</Typography>
      </div>
    ))}
    <TextField
      label=" Add Skill"
      value={newHeader}
      onChange={(e) => setNewHeader(e.target.value)}
      className={classes.textInput}
    />
    <TextField
      label="Optional Skill Comments"
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="Explanation of skill "
      value={newExplanation}
      onChange={(e) => setNewExplanation(e.target.value)}
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="What is an observation in your performance related to the skill"
      value={newObservation}
      onChange={(e) => setNewObservation(e.target.value)}
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="What are suggestions for  better ways of executing the  skill in the performance?"
      value={newSuggestion}
      onChange={(e) => setNewSuggestion(e.target.value)}
      className={classes.textInput}
      multiline
      rows={4}
    />

    <Button
      variant="contained"
      color="primary"
      className={classes.addButton}
      onClick={handleAddHeader}
    >
      Add Skill
    </Button>
  </div>
  <div className={classes.buttons}>
    <Button color="primary" onClick={verifyFeedback}>Verify Feedback</Button>
    {isOpen && (
      <div className="popup">
        <p>{verificationText}</p>
        <button onClick={close}>Close</button>
      </div>
    )}
    
  </div>
  
</div>
<Button
      variant="contained"
      color="secondary"
      onClick={handlepostFeedback}
    >
      Post Feedback
    </Button>


</div>



      

          


         





      
</>



        


  );
}

export default CurrentReview;