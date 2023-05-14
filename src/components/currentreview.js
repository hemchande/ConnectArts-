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
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState("");
  const [newText, setNewText] = useState("");
  const [post, setPost] = useState({});
  const [postComments, setPostComments] = useState('')
  const [verificationText, setVerificationtext] = useState('')
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();


  const handleAddHeader = () => {
    setHeaders([...headers, { header: newHeader, text: newText }]);
    setNewHeader("");
    setNewText("");
  };

  


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
      (acc, h) => acc + h.header + " " + h.text + " ",
      ""
    );

    
    axios.patch(
      "http://localhost:4000/routes/attach_to_reviews",
      {
        params: {
          id: review.reviewer_id,
        },
        review_comments: feedbackText,
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

    
    <div>

      <h1>Current Review</h1>


      <h3> Skills </h3>
      
        <p> {post.additional_skill_keywords}</p>
        {post.additional_skill_keywords.map((skillField, index) => (
              <li key={index}>{skillField}</li>
              ))}

      
      

  
      

      <h3>Categorical Preferences:</h3>
     
          <li> Musicality: {post.musicality}</li>
          <li> Structure:{post.structure}</li>
          <li> Technique:{post.technique}</li>
          <li> Form:{post.form}</li>

      <strong> Post Additional Comments</strong>
        <Typography> {postComments}</Typography>




        <h3>Create Review</h3>

          <div className={classes.container}>
  <div className={classes.root}>
    {headers.map((h) => (
      <div key={h.header}>
        <Typography variant="h6" className={classes.header}>
          {h.header}
        </Typography>
        <Typography>{h.text}</Typography>
      </div>
    ))}
    <TextField
      label="Skill"
      value={newHeader}
      onChange={(e) => setNewHeader(e.target.value)}
      className={classes.textInput}
    />
    <TextField
      label="Comment"
      value={newText}
      onChange={(e) => setNewText(e.target.value)}
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



      

          


         





      
     



        


  );
}

export default CurrentReview;