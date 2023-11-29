import React, { useState } from "react";
import { Container, TextField, Typography, Slider } from "@mui/material";
 
import s from "./choreoAssistance.module.css"
// import CustomPtogressBar from "";
import { Input } from "../../components/Inputs";
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Button } from "../../components/button";
import NavBar from '../../components/navBar/navbar';

import CircularProgress from '@material-ui/core/CircularProgress';


const theme = createTheme({
  palette: {
    primary: {
      main: '#ff4081', // This is a pink color
    },
  },
});



const ChoreographyPreferences = () => {
  const [preferences, setPreferences] = useState({
    genre: "",
    length: "",
    musicality: 5,
    performanceStructure: 5,
    texture: 5,
    technique: 5,
  });

  const [generatedChoreography, setGeneratedChoreography] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSliderChange = (name) => (e, newValue) => {
    setPreferences({
      ...preferences,
      [name]: newValue,
    });
  };

  const handleTextChange = (e) => {
    const { name, value } = e.target;
    setPreferences({
      ...preferences,
      [name]: value,
    });
  };




  const handleSubmit = () => {



  };


  

   const handleSubmit2 = () => {
  //   // Send the preferences to your backend or AI model for choreography generation

     console.log("User Preferences:", preferences);
     setIsLoading(true);
  //   // Replace with your actual API endpoint
     const apiEndpoint = 'https://connectarts-backend-nsty.onrender.com/routes/ get_choreography_sequence';
     try {
       const response = await axios.post(apiEndpoint, preferences);
       setGeneratedChoreography(response.data);
     } catch (error) {
       console.error('Error fetching generated choreography:', error);
       // Handle error appropriately in a real app
     }
     setIsLoading(false);
   };

  return (

    <>
    <NavBar/>

    <Container>
      
      {/* <Typography variant="h7" gutterBottom>
        Enter Choreography Preferences
      </Typography> */}


      <div className={s.container}>
      <Input
        type="genre"
        name="genre"
        placeholder="Enter your preferred genre"
        value={preferences.genre}
        onChange={handleTextChange}
        label="genre"
        required
      />
     
      
      {/* <TextField
        label="Genre"
        name="genre"
        value={preferences.genre}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
      /> */}
      {/* <TextField
        label="Length"
        name="length"
        value={preferences.length}
        onChange={handleTextChange}
        fullWidth
        margin="normal"
      /> */}
      <Input
        type="length"
        name="length"
        placeholder="Enter your preferred length of intended performance"
        value={preferences.length}
        onChange={handleTextChange}
        label="length"
        required
      />

      {["Musicality", " Structure", "Movement Texture", "Technique"].map((key) => (
        <ThemeProvider theme={theme}>
        <div key={key} style={{ marginBottom: "20px" }}>
          <Typography id={`${key}-slider`} gutterBottom>
            {key.charAt(0).toUpperCase() + key.slice(1)}
          </Typography>
          <Slider
            value={preferences[key]}
            min={1}
            step={1}
            max={10}
            onChange={handleSliderChange(key)}
            valueLabelDisplay="auto"
            aria-labelledby={`${key}-slider`}
          />
        </div>

        </ThemeProvider>
      ))}


</div>
      
      <Button variant="contained" color="primary" onClick={handleSubmit2}>
        
        {/* {isLoading ? <CircularProgress size={24} /> : 'Generate Choreography'}  */}
        {isLoading ? 'Generating...' : 'Generate Choreography'}
      </Button>

      {generatedChoreography && (
        <TextField
          label="Generated Choreography"
          multiline
          rows={4}
          value={generatedChoreography}
          variant="outlined"
          fullWidth
          margin="normal"
          InputProps={{
            readOnly: true,
          }}
        />
      )}
    </Container>

    </>
  );
};

export default ChoreographyPreferences;

