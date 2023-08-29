import React, { useState } from "react";
import axios from "axios";
import { Button, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { TextArea } from "../../components/Inputs";
import navbar from "../../components/navBar/navbar";
import Navbar from "../../components/navBar/navbar";


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

function  DanceChat() {
  const classes = useStyles();
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState('');
  const [request, setRequest] = useState("");
  const [requestResponse, setRequestResponse] = useState(null);
  const [videoURL, setVideoURL] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const SAS_token = "?sv=2022-11-02&ss=bfqt&srt=c&sp=rwdlacupyx&se=2023-05-12T01:29:09Z&st=2023-05-11T17:29:09Z&spr=https&sig=GefmB0LLTuPHpG9aRKsRcZ6m7Q2XX2zkrcnBK8JySio%3D";

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  // const model = new ChatOpenAI({
  //   temperature: 0.9,
  //   openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
  // });

  // const responseB = await chat.call([
  //   new SystemChatMessage(
  //     "You are a helpful assistant that helps dancers with  menatl health, performance execution, physical health, and career advicd."
  //   ),
  //   new HumanChatMessage("How do i decide what dance career to go into?"),
  // ]);
  

  const callChat2 = async (event) => {
    // const embeddings = new OpenAIEmbeddings();
    // const res = await embeddings.embedQuery("Ballet-leaps");
    // console.log(res)
    // const model = new ChatOpenAI({
    //   temperature: 0.9,
    //   openAIApiKey: "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", // In Node.js defaults to process.env.OPENAI_API_KEY
    // });
    // const responseB = await model.call([
    //   new SystemChatMessage(
    //     "You are a helpful assistant that helps dancers with  menatl health, performance execution, physical health, and career advicd."
    //   ),
    //   new HumanChatMessage("How do i decide what dance career to go into?"),
    // ]);
  
    //console.log(responseB);
    const req = event.target.value;
    try {
      const requestBody = {
        request: req,
      };
      const response = await axios.post('https://connectarts-backend-nsty.onrender.com/routes/call_chat1', requestBody);
      console.log(response.data);
      setRequestResponse(response.data);
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
    <>
    <Navbar/>
    {/* <div className={`video-player ${isExpanded ? 'expanded' : ''}`}> */}

    <div>
      

      <TextField
        label="Type Chat"
        value={request}
        onChange={changeRequest}
        className={classes.textInput}
        multiline
  rows={4}
  variant="outlined"
      />
      

      {/* <Button
        variant="contained"
        color="pink"
        className={classes.addButton}
        value={request}
        onClick={callChat2}
      >
        Send Chat
      </Button> */}
      <button  value={request} style={{
            padding: '5px 10px',
            fontSize: '14px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'Comic Sans MS, cursive',
            marginRight: '10px'
          }} onClick={callChat2}> 
         Send Dancer Request</button>
  

      <div>
        {/* {requestResponse &&
        
       <div>{requestResponse}</div>} */}

<TextArea
        label=" Response"
        id="genresComments"
        placeholder=""
        value={requestResponse}
        isDisabled
      />
      </div>

      </div>
   
    </>
  );
}


export default DanceChat;

