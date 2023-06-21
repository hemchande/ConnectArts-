import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

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
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [request, setRequest] = useState("how to improve my turnout in ballet ");
  const [requestResponse, setRequestResponse] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const SAS_token = "?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupyx&se=2023-05-12T01:29:09Z&st=2023-05-11T17:29:09Z&spr=https&sig=GefmB0LLTuPHpG9aRKsRcZ6m7Q2XX2zkrcnBK8JySio%3D";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const callChat2 = async (event) => {
    const req = event.target.value;
    try {
      const requestBody = {
        request: req,
      };
      const response = await axios.post('http://localhost:4000/routes/call_chat', requestBody);
      console.log(response.data);
      setRequestResponse(response.data.text);
    } catch (error) {
      console.error(error);
    }
  };

  const callChatEndpoint = async (event) => {
    console.log(event.target.value);
    const req = event.target.value;
    try {
      const requestBody = {
        model: "text-davinci-003",
        prompt: req,
        temperature: 0.9,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0.6,
      };
      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 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',
      };
      const response = await axios.post('https://api.openai.com/v1/completions', requestBody, { headers });
      console.log(response.data.choices[0].text);
      setRequestResponse(response.data.choices[0].text);
    } catch (error) {
      console.error(error);
    }
  };

  const changeRequest = (event) => {
    const bod = event.target.value;
    setRequest(bod);
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
        label="Send Chat"
        value={request}
        onChange={changeRequest}
        className={classes.textInput}
        multiline
  rows={4}
  variant="outlined"
      />

      <Button
        variant="contained"
        color="primary"
        className={classes.addButton}
        value={request}
        onClick={callChat2}
      >
        Send Chat
      </Button>

      <div>
        {requestResponse && <div>{requestResponse}</div>}
      </div>
    </div>
  );
}

export default VideoPlayer;

