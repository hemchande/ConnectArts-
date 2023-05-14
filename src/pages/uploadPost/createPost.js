import { Grid, Typography, Divider, TextField, Button, Chip,Box } from "@material-ui/core";
import React, { useState, useEffect } from 'react';
import SkillsDropdown from "../../components/skillDropdown";
import { makeStyles } from '@material-ui/core/styles';
import {useAuth} from "../../components/firebase/AuthContext";
import axios from 'axios';
import Matches from "../selectMatches/matches";
import { useNavigate } from 'react-router-dom';



const useStyles = makeStyles((theme) => ({
  formContainer: {
    backgroundColor: theme.palette.common.white,
    padding: theme.spacing(3),
    borderRadius: theme.spacing(1),
    boxShadow: `0px 0px 20px rgba(0, 0, 0, 0.1)`,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 600,
      margin: 'auto',
    },
  },
  formInput: {
    marginBottom: theme.spacing(2),
  },
  formLabel: {
    fontWeight: 'bold',
  },
  divider: {
    margin: `${theme.spacing(2)}px 0`,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: theme.spacing(2),
  },
  chip: {
    margin: theme.spacing(0.5),
    height: '1.5rem',
    minWidth: '1.5rem',
  },
  input: {
    width: '20rem',
  },
  selectedSkills: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing(0.5),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  }
}));

const skillOptions = [  {    category: 'Ballet',    subcategories: ['Jumps', 'Leaps', 'Turns', 'Leg extensions', 'Upper body extensions', 'Basic positions']
  },
  {
    category: 'Tap',
    subcategories: ['Steps', 'Turns', 'Combinations', 'Flaps', 'Buffalo', 'Pushbacks', 'Irish', 'Wings']
  },
  {
    category: 'Jazz',
    subcategories: ['Jumps', 'Turns', 'Combinations', 'Kicks', 'Leaps', 'Floorwork', 'Footwork']
  },
  {
    category: 'Gymnastics',
    subcategories: ['Floor Acrobatics', 'Tumbling']
  },
  {
    category: 'Modern/Contemporary',
    subcategories: ['Techniques', 'Floorwork', 'Movements', 'Combinations', 'Turns', 'Footwork', 'Jumps', 'Lifts', 'Partnering']
  },
  {
    category: 'Lyrical',
    subcategories: ['Techniques', 'Turns', 'Jumps', 'Footwork', 'Floorwork', 'Partnering']
  },
  {
    category: 'Hip-Hop',
    subcategories: ['Styles', 'Grooves', 'Tricks', 'Combinations', 'Freeze', 'Partnering']
  },
  {
    category: 'Ballroom',
    subcategories: ['Tango', 'Waltz', 'Foxtrot', 'QuickStep', 'ChaCha', 'Rumba', 'Samba', 'Chive']
  },
  {
    category: 'African Dance',
    subcategories: ['West African Dance', 'East African Dance', 'North African Dance', 'South African Dance']
  }
];



function CreatePost() {
  const navigate = useNavigate();
  const [genre, setGenre] = useState('');
  const [comments, setComments] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [video, setVideo] = useState(null);
  const [techniqueValue, setTechniqueValue] = useState(0);
  const [musicalityValue, setMusicalityValue] = useState(0);
  const [structureValue, setStructureValue] = useState(0);
  const [formValue, setFormValue] = useState(0);
  const [techniqueFields, setTechniqueFields] = useState([]);
  const [musicalityFields, setMusicalityFields] = useState([]);
  const [structureFields, setStructureFields] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [id, setId] = useState('');
  const [postId, setpostId] = useState(null)
  const [error, setError] = useState('');
  const [showComponent, setShowComponent] = useState(false);
  const [showInfo, setShowInfo] = useState([
      { category: "Technique", info: "Description of technique", show: false },
      { category: "Musicality", info: "Description of musicality", show: false },
      { category: "Structure", info: "Description of structure", show: false },
      { category: "Form", info: "Description of form", show: false }
    ]);

  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;

  const handleGenreChange = (event) => {
    setGenre(event.target.value);
  }

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  }

  const handleNewSkillChange = (event) => {
    setNewSkill(event.target.value);
  }

  const handleSkillSelection = (event) => {
    const skill = event.target.value;
    if (selectedSkills.indexOf(skill) === -1) {
      setSelectedSkills([...selectedSkills, skill]);
  }
};

  const handleSkillRemoval = (skill) => {
    setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
};

  const handleTechniqueValueChange = () => {
    setTechniqueValue(techniqueValue + 1);
  }

  const handleTechniqueFieldChange = (event) => {
    //setTechniqueFields(techniqueFields.push(event.target.id));
    setTechniqueValue(techniqueValue + 1);
    const technique = event.target.id;
    setTechniqueFields(prevValues => [...prevValues, technique]); 
  }

  const handleFormFieldChange = (event) => {
    //setFormFields(formFields.push(event.target.id));
    setFormValue(formValue + 1);
    const form = event.target.id;
    setFormFields(prevValues => [...prevValues, form]);

  }
  const handleStructureFieldChange = (event) => {
    //setStructureFields(structureFields.push(event.target.id));
    setStructureValue(structureValue + 1);
    const structure = event.target.id;
    setStructureFields(prevValues => [...prevValues, structure]);
  }

  const handleMusicalityFieldChange = (event) => {
    //setMusicalityFields(musicalityFields.push(event.target.id));
    setMusicalityValue(musicalityValue + 1);
    const musicality = event.target.id;
    setMusicalityFields(prevValues => [...prevValues, musicality]);

  }



  const handleMusicalityValueChange = () => {
    setMusicalityValue(musicalityValue + 1);
  }

  const handleFormValueChange = () => {
    setFormValue(formValue + 1);
  }

  const handleStructureValueChange = () => {
    setStructureValue(structureValue + 1);
  }


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

  const handleVideoChange = (event) => {
    setVideo(event.target.files[0]);
  }

  const handleClick = () => {
    //setShowComponent(true);
    navigate("/match");
  };


  useEffect(() => {

    axios
    .get("http://localhost:4000/routes/get_id_from_firebaseuid", {
      params: {
        firebase_id: "VuU2sorXLMQoUYJp9lup3RKROpi2",
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response);
      setId(response.data._id);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });

  }, []);


  const postVideo = async() => {

    axios.post('http://localhost:4000/routes/upload_video_new', {params : {post_id: postId}}, 
    {"videofile": video}).then(response => {
      console.log(response.data);
      //setpostId(response.data)
    })
    .catch(error => {
      console.log(error);
      
    })


    



  }

  const handleClose = () => {
    setError('');
  };


  const postComments = async (postId) => {

    axios.post('http://localhost:4000/routes/add-additional-comments', {postId: postId, comments: comments})
    .then(response => {
      console.log(response.data);
      //setpostId(response.data)
    })
    .catch(error => {
      console.log(error);
    })


  };





  const patchPerformer = async(postId) => {


    axios.patch ("http://localhost:4000/routes/update_performer_reviewer_withPost", {postId: postId})
        .then(response => {
          console.log(response.data);
         })
        .catch(error => {
          console.log(error);
        });






  };


  const handleUploadVideo = async(postId) => {
    const formData = new FormData();
    formData.append("videofile", video);

    axios
      .post(`http://localhost:4000/routes/upload_video_new?post_id=${postId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((response) => console.log(response.data))
      .catch((error) => console.error(error));
  };






  function handleMatch(){


    //


  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();

    //still need to edit 

     formData.append('genre', genre);
     formData.append('performer_choreographer_id', id);
            //formData.append('skillFields', skills);
     formData.append('technique_fields', techniqueFields);
     formData.append('form_fields', formFields);
     formData.append('structure_fields', structureFields);
     formData.append('musicality_fields', musicalityFields);
     formData.append('technique', techniqueValue/13);
     formData.append('form', formValue/9);
     formData.append('structure', structureValue/7);
     formData.append('musicality', musicalityValue/3);
     formData.append('additional_skill_keywords', selectedSkills)


     const obj = {
      "genre": genre,
      "performer_choreographer_id": id,
      "technique_fields": techniqueFields,
      "form_fields": formFields,
      "structure_fields": structureFields,
      "musicality_fields":  musicalityFields,
      "technique": techniqueValue/13,
      "form": formValue/9,
      "structure": structureValue/7,
      "musicality":  musicalityValue/3,
      "additional_skill_keywords": selectedSkills



     }

     let post = null;



          




     try {
      axios.post('http://localhost:4000/routes/post_without_video', obj)
        .then(response => {
          console.log(response.data.data.insertedId);
          setpostId(response.data.data.insertedId)
          //post = response.data.insertedId;
          handleUploadVideo(response.data.data.insertedId);
          patchPerformer(response.data.data.insertedId);
          postComments(response.data.data.insertedId);
          console.log(response.data.insertedId);

        


          //postComments(response.data.insertedId);

          //patchPerformer(response.data.insertedId);
        });
    } catch (error) {
      console.log(error);
      setError('Error: ' + error.message);
    }



 
    
    

   

        





            
        
    
  }




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
    <Grid container direction="column" alignItems="center" justify="center">
      <Typography variant="h4" gutterBottom>Create Post</Typography>
      <form onSubmit={handleSubmit}>
        <Grid container direction="column" alignItems="flex-start" spacing={2}>
          <Grid item>
            <TextField select label="Genre" value={genre} onChange={handleGenreChange}>
              <option value="">Select a genre</option>
              <option value="Ballet">Ballet</option>
              <option value="Jazz">Jazz</option>
              <option value="Contemporary">Contemporary</option>
              <option value="Lyrical">Lyrical</option>
              <option value="Hip-hop">Hip-Hop</option>
              <option value="Fusion">Fusion</option>
              <option value="Tap">Tap</option>
              <option value="Bollywood">Bollywood</option>
              <option value="Kathak">Kathak</option>
              <option value="Barathynatham">Barathynatham</option>
              <option value="African">African</option>
              <option value="Ballroom">Ballroom</option>
            </TextField>
          </Grid>

          <Grid item>
            <TextField multiline rows={4} variant="outlined" label="Additional comments" value={comments} onChange={handleCommentsChange} fullWidth />
          </Grid>
          <div className={useStyles.container}>
      <select onChange={handleSkillSelection}>
        <option value="">Select All Skills</option>
        {skillOptions.map(skill => (
          <optgroup label={skill.category} key={skill.category}>
            {skill.subcategories.map(subcategory => (
              <option value={`${skill.category} - ${subcategory}`} key={`${skill.category} - ${subcategory}`}>{subcategory}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className={useStyles.selectedSkills}>
      {selectedSkills.map(selectedSkill => (
        <div className={useStyles.chip} key={selectedSkill}>
          {selectedSkill}
          <button onClick={() => handleSkillRemoval(selectedSkill)}>X</button>
        </div>
      ))}
    </div>
    </div>

          <Grid item>
            Upload Your Performance:  
            <input type="file" id="video" name="video" accept="video/*" onChange={handleVideoChange} />
          </Grid>
          <label htmlFor="checkboxes" style={{fontSize: "1.2rem"}}>Select all the categories relevant to your performance :</label>
<div id="checkboxes"></div>

        <div id="checkboxes">
          
          <label htmlFor="technique">
            Technique:
            <input type="range" id="technique" name="technique" min="1" max="13" value={techniqueValue} onChange={handleTechniqueChange} />
          </label>
    <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p>The tools and skills needed to produce a genre of dance as well as general physical skills such as posture, alignment, balance, coordination, control, mobility, and flexibility 
</p>
<Grid container spacing={1}>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Posture"
          >
            Posture
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Alignment"
          >
            Alignment 
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Balance"
          >
            Balance
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id= "Coordination"
          >
            Coordination
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Control"
          >
            Control
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Flexibility"
          >
            Flexibility
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id  = "Mobility"
          >
            Mobility
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Strength"
          >
            Strength
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Stamina"
          >
            Stamina
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Extension"
          >
            Extension
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Floorwork"
          >
            Floorwork
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Elevation"
          >
            Elevation
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleTechniqueFieldChange}
            style={{ cursor: "pointer" }}
            id = "Body Coordination"
          >
            Body Coordination
          </Box>
        </Grid>

        </Grid>

    </div>
          <br />
          <label htmlFor="form">
            Form:
            <input type="range" id="form" name="form" min="1" max="9" value={formValue} onChange={handleFormChange} />
          </label>
          <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p> where the body moves and how the space is used eg pathways, body positioning levels, directions, size of movements, patterns, spatial design, and shape of movements and poses; 

</p>
<Grid container spacing={1}>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Fast + Slow Dynamics"
          >
            Fast + Slow Dynamics
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Sudden/Sustained Dynamics"
          >
            Sudden/Sustained Dynamics
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Acceleration + Deceleration"
          >
            Acceleration + Deceleration
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Strong and Light Movements"
          >
            Strong and Light Movements
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Direct + Indirect Movements"
          >
            Direct + Indirect Movements
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Choreographic Intent"
          >
            Choreographic Intent 
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Choreographic Mood"
          >
            Choreographic Mood
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Style Fusions"
          >
            Style Fusions 
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleFormFieldChange}
            style={{ cursor: "pointer" }}
            id = "Movement Flow"
          >
            Movement Flow
          </Box>
        </Grid>

        </Grid>
    </div>
          <br />
          <label htmlFor="structure">
            Structure:
            <input type="range" id="structure" name="structure" min="1" max="7" value={structureValue} onChange={handleStructureChange} />
          </label>
          <div className={`info-description ${showInfo === "technique" ? "show" : ""}`}>
      <p> the way the movements are organized and combined to create a dance.   the progression of movement in a piece ie  eg motif and development, repetition, and traveling, turning, elevation, gesture, stillness, use of body parts,floor-work and the transference of weight.

</p>
<Grid container spacing={1}>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
            id = "Spatial Levels"
          >
            Spatial Levels
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
            id = "Movement Pathways"
          >
            Movement Pathways
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
            id = "Directions"
          >
            Directions
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
            id = "Size of Movement"
          >
            Size of Movement
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
            id = "Patterns"
          >
            Patterns
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            id = "Phrasing Structure"
            onClick={handleStructureFieldChange}
            style={{ cursor: "pointer" }}
          >
            Phrasing Structure
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            id = "Element Composition"
            onClick={handleStructureFieldChange}
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
            border={1}
            borderRadius={16}
            p={1}
            id = "rhythmic content "
            onClick={handleMusicalityFieldChange}
            style={{ cursor: "pointer" }}
          >
            Rhythmic Content
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            id = "timing content"
            onClick={handleMusicalityFieldChange}
            style={{ cursor: "pointer" }}
          >
            Timing Content
          </Box>
        </Grid>
        <Grid item>
          <Box
            border={1}
            borderRadius={16}
            p={1}
            id = "stylic accuracy"
            onClick={handleMusicalityFieldChange}
            style={{ cursor: "pointer" }}
          >
            Stylistic Accuracy
          </Box>
        </Grid>


        </Grid>

    </div>

    </div>

          <Grid item>
            <Button type="submit" variant="contained" color="primary" onClick={handleSubmit}>Upload </Button>
          </Grid>
        </Grid>
      </form>
    </Grid>

    <div>
      <button onClick={handleClick}> Find Reviewer Matches</button>
      {showComponent ? <Matches /> : null}
    </div>


    </>
  

  )};

export default CreatePost



