import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navBar/navbar';
import { Grid, Typography, Divider, TextField, Button, Chip,Box,Tooltip } from "@material-ui/core";
import axios from 'axios';

function PreferencesPage() {
  const [id, setId] = useState("")
  const [message, setMessage] = useState(null)
  const [techniqueValue, setTechniqueValue] = useState(0);
  const [musicalityValue, setMusicalityValue] = useState(0);
  const [structureValue, setStructureValue] = useState(0);
  const [formValue, setFormValue] = useState(0);
  const [techniqueFields, setTechniqueFields] = useState([]);
  const [musicalityFields, setMusicalityFields] = useState([]);
  const [structureFields, setStructureFields] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [skills, setSkills] = useState([]);
  const [showInfo, setShowInfo] = useState([
    { category: "Technique", info: "Description of technique", show: false },
    { category: "Musicality", info: "Description of musicality", show: false },
    { category: "Structure", info: "Description of structure", show: false },
    { category: "Form", info: "Description of form", show: false }
  ]);



  const handleTechniqueChange = (event) => {
    setTechniqueValue(parseInt(event.target.value));
  }

  const handleMusicalityChange = (event) => {
    setMusicalityValue(parseInt(event.target.value));
  }

  const handleStructureChange = (event) => {
    setStructureValue(parseInt(event.target.value));
  }

  const handleFormChange = (event) => {
    setFormValue(parseInt(event.target.value));
  }

  const handleMusicalityValueChange = (event) => {
    setMusicalityValue(musicalityValue + 1);
    const musicality = event.target.id;
    setMusicalityFields(prevValues => [...prevValues, musicality]);
  }

  const handleTechniqueValueChange = (event) => {
    setTechniqueValue(techniqueValue + 1);
    const technique = event.target.id;
    setTechniqueFields(prevValues => [...prevValues, technique]);
  }

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handleFormValueChange = (event) => {
    setFormValue(formValue + 1);
    const form = event.target.id;
    setFormFields(prevValues => [...prevValues, form]);
  }

  const handleStructureValueChange = (event) => {
    setStructureValue(structureValue + 1);
    const structure = event.target.id;
    setStructureFields(prevValues => [...prevValues, structure]);
  }

  const handleClose = () => {
    setMessage(null);
  };





  const handleSubmit = (event) => {

    event.preventDefault();
    console.log(techniqueValue)
    console.log(techniqueFields)

    const obj = {

      "technique": techniqueValue/13,
      "techniqueFields" : techniqueFields,
      "musicality": musicalityValue/3,
      "musicalityFields": musicalityFields,
      "form": formValue/9,
      "formFields" : formFields,
      "formValue": formValue,
      "formFields" : formFields,
      "structure": structureValue/7,
      "structureFields" : structureFields,





    }


    axios.patch("http://localhost:4000/routes/reviewer/edit_skills_prefs",obj, {params: {id: id}})
    .then(response => {
      console.log(response.data);
      //setaccountId(response.data);

      //stripeId = response.data;

     // console.log(stripeId);
     setMessage(response.data)
      
      //navigate('/signedin')
    })
    .catch(error => {
      console.log(error);
      setMessage("Must be a Reviewer in order to edit categorical preferences!")
    });

    //createAccountLink();

    //console.log(accountId);


    //createAccountLink();






  };

  useEffect(() => {

    axios.get('http://localhost:4000/routes/get_id_from_firebaseuid', {params: {firebase_id: "VuU2sorXLMQoUYJp9lup3RKROpi2"}
  }).then(response => {
      console.log(response.data);

      setId(response.data._id)
    })
    .catch(error => {
      console.log(error);
    })


  }, []);


    
    

    









  //

  return (
    <div className="preferencespage">
      <NavBar />
      {message && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <p>{message}</p>
        </div>
      </div>
    )};
      <h2>Categorical Preferences  Guide</h2>
      <div class="accordion">
  <div class="accordion-item">
    <div class="accordion-header">Performance Structure</div>
    <p>The way movements are organized and combined to create a dance. This includes the progression of movement in a piece, such as motif and development, repetition, and traveling, turning, elevation, gesture, stillness, use of body parts, floor-work, and the transference of weight. </p>
   
  </div>
  <div class="accordion-item">
    <div class="accordion-header">Movement Texture</div>
    <p>Where the body moves and how the space is used. This includes pathways, body positioning levels, directions, size of movements, patterns, spatial design, and shape of movements and poses.</p>
    
  </div>
  <div class="accordion-item">
    <div class="accordion-header">Musicality</div>
    <p>How a dancer expresses music in their body. This involves the dynamics of how the dancer moves, such as fast/slow, sudden/sustained, acceleration/deceleration, strong/light, direct/indirect, flowing/abrupt, and is influenced by the music.</p>
    
  </div>
  <div class="accordion-item">
    <div class="accordion-header">Physical Ability/Technique</div>
    <p>The tools and skills needed to produce a particular style of movement for a specific style of performance, such as ballet, contemporary, Martha Graham, Balanchine, as well as general physical skills such as posture.</p>
    
  </div>
</div>

<label htmlFor="checkboxes" style={{fontSize: "1.2rem"}}>Rate your preferences of the importance of each performance subcategory to you:</label>
<div id="checkboxes"></div>

        <div id="checkboxes">
          
          <label htmlFor="technique">
            Physical Skills/Technique:
            <input type="range" id="technique" name="technique" min="1" max="13" value={techniqueValue} onChange={handleTechniqueChange} />
          </label>
    <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p>The tools and skills needed to produce a genre of dance as well as general physical skills such as posture, alignment, balance, coordination, control, mobility, and flexibility 
</p>
<Grid container spacing={1}>
        <Grid item>
           <Tooltip title="the alignment and positioning of the body while dancing. Good posture involves an upright spine, relaxed shoulders, engaged core muscles, and a balanced distribution of weight" arrow>
          <Box
            id="Posture"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Posture
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title = "The correct positioning and alignment of body parts in relation to each other. It involves maintaining proper joint and muscle alignment to optimize movement efficiency and reduce the risk of injury." arrow >
          <Box
            id="Alignment"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Alignment 
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title = "" arrow>
          <Box
            id="Balance"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Balance
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title = "maintaining control and stability while executing movements and poses. In dance, balance is crucial for maintaining steady positions, executing turns, and performing movements on one leg" arrow >
          <Box
            id="Coordination"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Coordination
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
        <Tooltip title = "The ability to synchronize and control different body parts and movements simultaneously. In dance, coordination involves the harmonious integration of movements between the arms, legs, torso, and head." arrow >
          <Box
            id="Control"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Control
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title = "The range of motion achievable by a dancer's joints and muscles. Flexibility allows dancers to achieve extended positions, execute dynamic movements with ease, and reduce the risk of injuries related to restricted mobility." arrow>
          <Box
           id="Flexibility"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Flexibility
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
        <Tooltip title = "" arrow>
          <Box
           id="Mobility"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Mobility
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title = " The muscular power and capacity to generate force. In dance, strength is important for executing movements that require control, precision, and resistance to gravity, such as jumps, lifts, and sustained poses." arrow> 
          <Box
            id="Strength"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Strength
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title= "The ability to sustain physical effort over an extended period of time. In dance, stamina is necessary for enduring lengthy rehearsals, performances, and demanding choreography without experiencing excessive fatigue" arrow>
          <Box
             id="Stamina"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Stamina
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Box
           id="Extension"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Extension
          </Box>
        </Grid>
        <Grid item>
        <Tooltip title= "Refers to the specific movements and patterns performed by the feet. It involves precise foot placement, weight distribution, and rhythmic coordination, and is particularly important in dance styles that emphasize intricate footwork, such as tap or flamenco.">
          <Box
           id="Floorwork"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Floorwork
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Box
           id="Elevation"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Elevation
          </Box>
        </Grid>
        <Grid item>
          <Box
           id="Body Coordination"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueValueChange}
            style={{ cursor: "pointer" }}
          >
            Body Coordination
          </Box>
        </Grid>

        </Grid>

    </div>
          <br />
          <label htmlFor="form">
            Movement Texture:
            <input type="range" id="form" name="form" min="1" max="9" value={formValue} onChange={handleFormChange} />
          </label>
          <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p> where the body moves and how the space is used eg pathways, body positioning levels, directions, size of movements, patterns, spatial design, and shape of movements and poses; 

</p>
<Grid container spacing={1}>
        <Grid item>
        <Tooltip title= "the speed or tempo at which movements are executed. Fast dynamics involve quick, rapid movements, while slow dynamics involve slower, more controlled movements. The use of fast and slow dynamics in dance adds variation, contrast, and expressiveness to the overall movement quality.">
          <Box
           id="Fast + Slow Dynamics"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Fast + Slow Dynamics
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title= "the abruptness or continuity of movement. Sudden dynamics involve quick and abrupt changes in movement, while sustained dynamics involve smooth and continuous movements. Sudden dynamics create moments of surprise or contrast, while sustained dynamics create a sense of flow and continuity">
          <Box
            id = "Sudden/Sustained Dynamics"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Sudden/Sustained Dynamics
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title= "the change in speed or intensity of movement. Acceleration refers to an increase in speed or intensity, while deceleration refers to a decrease. The use of acceleration and deceleration adds dynamic variation and rhythmic interest to dance sequences">
          <Box
          id ="Acceleration + Deceleration"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Acceleration + Deceleration
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title="Describes the amount of energy or force applied to movements. Strong movements involve power, force, and intensity, while light movements involve gentleness, delicacy, and grace. The contrast between strong and light movements creates dynamic range and emotional expression in dance.">
          <Box
          id = "Strong and Light Movements"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Strong and Light Movements
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Tooltip title= " Refers to the clarity or fluidity of movement pathways. Direct movements involve clear and straight pathways, while indirect movements involve curved or circuitous pathways. Direct movements create strong lines and clear intentions, while indirect movements create a sense of fluidity, grace, and unpredictability.">
          <Box
          id = "Direct + Indirect Movements"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Direct + Indirect Movements
          </Box>
          </Tooltip>
        </Grid>
        <Grid item>
          <Box
          id = "Choreographic Intent"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Choreographic Intent 
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Choreographic Mood"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Choreographic Mood
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Style Fusions"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Style Fusions 
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Movement Flow"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormValueChange}
            style={{ cursor: "pointer" }}
          >
            Movement Flow
          </Box>
        </Grid>

        </Grid>
    </div>
          <br />
          <label htmlFor="structure">
            Performance Structure:
            <input type="range" id="structure" name="structure" min="1" max="7" value={structureValue} onChange={handleStructureChange} />
          </label>
          <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p> the way the movements are organized and combined to create a dance.   the progression of movement in a piece ie  eg motif and development, repetition, and traveling, turning, elevation, gesture, stillness, use of body parts,floor-work and the transference of weight.

</p>
<Grid container spacing={1}>
        <Grid item>
          <Box
          id = "Spatial Levels"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Spatial Levels
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Movement Pathways"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Movement Pathways
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Directions"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Directions
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Size of Movement"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Size of Movement
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Patterns"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Patterns
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Phrasing Structure"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Phrasing Structure
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Element Composition"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureValueChange}
            style={{ cursor: "pointer" }}
          >
            Element Composition 
          </Box>

          </Grid>


        </Grid>


    </div>
          <br />
          <label htmlFor="form">
            Musicality:
            <input type="range" id="musicality" name="musicality" min="1" max="3" value={musicalityValue} onChange={handleMusicalityChange} />
          </label>
          <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p> how a dancer expresses music in his or her body; involves dynamics of how the dancer moves eg fast/slow, sudden/sustained, acceleration/deceleration, strong/light, direct/indirect, flowing/abrupt, influenced by the music

</p>
<Grid container spacing={1}>
        <Grid item>
          <Box
          id = "Rhythmic Content"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleMusicalityValueChange}
            style={{ cursor: "pointer" }}
          >
            Rhythmic Content
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Timing Content"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleMusicalityValueChange}
            style={{ cursor: "pointer" }}
          >
            Timing Content
          </Box>
        </Grid>
        <Grid item>
          <Box
          id = "Stylistic Accuracy"
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleMusicalityValueChange}
            style={{ cursor: "pointer" }}
          >
            Stylistic Accuracy
          </Box>
        </Grid>


        </Grid>

        <input type="submit" onClick = {handleSubmit} value="Submit" />


        </div>


      
    </div>


    </div>

    
  )
}

export default PreferencesPage;
