import { useState, useEffect } from "react";
import axios from "axios";


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

function VideoPlayer() {
  const classes = useStyles();
  const [videoURL, setVideoURL] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const SAS_token = "?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupyx&se=2023-05-12T01:29:09Z&st=2023-05-11T17:29:09Z&spr=https&sig=GefmB0LLTuPHpG9aRKsRcZ6m7Q2XX2zkrcnBK8JySio%3D"


  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };


  

  return (
    <div className={`video-player ${isExpanded ? 'expanded' : ''}`}>
      <video controls>
        <source src={`http://localhost:4000/routes/get_post_videoFile?filename=${"VID_20210910_152033.mp4"}`} type="video/mp4" />
      </video>
      <button onClick={toggleExpand}>
        {isExpanded ? 'Collapse' : 'Expand'}
      </button>

      


    <TextField
      label=" Add Skill"
      value= "5"
      
      className={classes.textInput}
    />
    <TextField
      label="Optional Skill Comments"
      value="4"
      
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="Explanation of skill "
      value="3"
      
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="What is an observation in your performance related to the skill"
      value="2"
      
      className={classes.textInput}
      multiline
      rows={4}
    />
    <TextField
      label="What are suggestions for  better ways of executing the  skill in the performance?"
      value="1"
      
      className={classes.textInput}
      multiline
      rows={4}
    />

    <Button
      variant="contained"
      color="primary"
      className={classes.addButton}
     
    >
      Add Skill
    </Button>
    </div>

  );
}

export default VideoPlayer;
