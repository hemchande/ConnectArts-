import React, { useState } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, Typography, TabScrollButton } from "@material-ui/core";
import { Link } from 'react-router-dom';
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import NavBar from "../../components/navbar";
import SkillDescription from "../../components/skillDescription";



const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
      height: "100vh",
      //overflow: "hidden",

      backgroundColor: theme.palette.background.paper,
    },
  
    tabs: {
      //display: "flex",
      flexDirection: "column",
      alignItems: "flex-start",
      paddingTop: theme.spacing(2),
      borderRight: `1px solid ${theme.palette.divider}`,
    },
    tab: {
      minWidth: "50px",
      textTransform: "none",
      marginBottom: theme.spacing(2),
    },
    content: {
      //flexGrow: 1,
      padding: theme.spacing(1),
      overflow: "auto",
      maxHeight: "calc(100vh - 128px)"
    },
    accordionSummary: {
      backgroundColor: theme.palette.secondary.main,
      color: theme.palette.secondary.contrastText,
    },
    accordionDetails: {
      overflow: "auto",
    },
  }));


const skillsData = {
    "Ballet": [
      "Ballet Leaps",
      "Ballet Turns",
      "Ballet Leg extensions",
      "Ballet upper body extensions",
      "Ballet basic positions",
      "Ballet Variations",
    ],
    "Tap": [
      "Tap Steps",
      "Tap Turns",
      "Tap Combinations",
      "Tap Flaps",
      "Tap Buffalo",
      "Tap Pushbacks",
      "Tap Irish",
      "Tap Wings",
    ],
    "Jazz": [
      "Jazz jumps",
      "Jazz turns",
      "Jazz combinations",
      "Jazz kicks",
      "Jazz leaps",
      "Jazz floorwork",
      "Jazz footwork",
    ],
    "Gymnastics": [
        "Tumbling",
      "Acrobatics",
    ],
    "Modern/Contemporary": [
      "Modern/Contemporary Techniques",
      "Modern/Contemporary Floorwork",
      "Modern/Contemporary Movements",
      "Modern/Contemporary Combinations",
      "Modern/Contemporary Turns",
      "Modern/Contemporary Footwork",
      "Modern/Contemporary Jumps",
      "Modern/Contemporary Lifts",
      "Modern/Contemporary Partnering",
    ],
    "Lyrical": [
      "Lyrical Techniques",
      "Lyrical Turns",
      "Lyrical Jumps",
      "Lyrical Footwork",
      "Lyrical Floorwork",
      "Lyrical Partnering",
    ],
    "Hip-Hop": [
      "Hip-Hop Styles",
      "Hip-Hop Grooves",
      "Hip-Hop Tricks",
      "Hip-Hop Combinations",
      "Hip-Hop Freeze",
      "Hip-Hop Partnering",
    ],
    "Ballroom": [
      "Ballroom Tango",
      "Ballroom Waltz",
      "Ballroom Foxtrot",
      "Ballroom QuickStep",
      "Ballroom ChaCha",
      "Ballroom Rumba",
      "Ballroom Samba",
      "Ballroom Chive",
    ],
    "African Dance": [
      "African Dance West African Dance",
      "African Dance East African Dance",
      "African Dance North African Dance",
      "African Dance South African Dance",
    ],
    "Bharatynatham": [
      "Bharatynatham Adavus ( basic steps)",
      "Bharatynatham Hastas(hand gestures)",
      "Barathynatham Raagas( Musical Modes)",
    ],
    "Bollywood": [
      "Bollywood Basic Steps",
      "Bollywood Fusion Styles",
      "Bollywood Hands and Arms",
      "Bollywood Facial Expressions",
    ],
    "Kathak": [
      "Kathak dances",
      "Kathak footwork",
      "Kathak hand gestures",
      "Khatak expressions and Emotions",
      "Kathak Spins and Turns",
    ]
    
    
}

const skillDescriptions = { " Ballet Jumps": 
"Jete- A jump in which one leg is brushed forward into the air while the other leg pushes off the floor, with the body turning away from the lifted leg. Cabriole: A jump in which the working leg is thrown into the air, with the other leg following and beating against it before both legs land on the ground.Jete battu: A jump similar to a regular jete, but with a beat of the legs in the air.Assemble: A jump in which the working leg is brushed into the air and the other leg follows, with both legs coming together in the air before landing.Brise: A jump in which the working leg is brushed into the air and the other leg beats against it before both legs land on the ground.Entrechat: A jump in which the legs are crossed and beaten in the air before landing.Sissone: A jump in which the working leg is brushed into the air and the other leg follows, with both legs landing at the same time in a crossed position.Saute: A basic jump in which both feet leave the floor and land at the same time.Echappe saute: A jump in which the feet start in a closed position and then open to a second position in the air before landing.Changement: A jump in which the feet switch positions in the air before landing.Echappe: A jump in which the feet start in a closed position and then open to a second position before returning to a closed position in the air before landing.Petite Allegro: A term for small, quick jumps performed in a series."
,  "Ballet Leaps": "Grande allegro: A term for large, traveling jumps performed with elevation.Saut de chat: A leap in which the working leg is thrown into the air and the other leg follows, with the body turning towards the lifted leg.Waltz step: A leap in which the working leg is lifted into the air and the other leg follows, with both legs landing in a lunge position.Pas de chaut: A leap in which the working leg is lifted into the air and the other leg follows, with both legs landing in a crossed position.Grand jete: A leap in which the working leg is brushed into the air and the other leg pushes off the floor, with both legs coming together in the air before landing.Pas de Basque: A leap in which the working leg is lifted into the air and the other leg follows, with both legs landing in a crossed position.Tour jete: A term for a jump that combines a tour (turn) and a jete",
 "Ballet Turns": "Soutenu: A turn in which the feet stay in the same position while the body turns.Chaine combinations: A series of turns in which the feet stay close together and alternate directions.Tour combinations: A series of turns in which the feet travel in a straight line while the body turns.Pirouette: A turn in which the working leg is lifted and the body turns on the supporting leg.Renverse: A turn in which the working leg is lifted and the body turns towards the lifted leg.Pirouette a la seconde: A turn in which the working leg is lifted to the side and the body turns on the supporting leg.Fouette: A term for a turn that combines a pirouette and a whip of the working leg.Promenade Arabesque: A slow and graceful turn in which the dancer balances on one leg and rotates the other leg while holding it in an arabesque position."}



function SkillTabs (){

    const classes = useStyles();
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
    setValue(newValue);
    };

    return (
        <div className={classes.root}>
          <NavBar />
          
          {Object.keys(skillsData).map((skill, index) => (
            <Accordion key={index} >
              <AccordionSummary
                className={classes.accordionSummary}
                aria-controls={`${skill}-content`}
                id={`${skill}-header`}
              >
                <Typography variant="h6">{skill}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {skillsData[skill].map((subskill, index) => (
                    <div key={index}>{subskill}</div>
                  ))}
                  

                </Typography>
              </AccordionDetails>
            </Accordion>
          ))}
          <div>
          
         <SkillDescription skillName="Ballet Jumps" description= "Jete- A jump in which one leg is brushed forward into the air while the other leg pushes off the floor, with the body turning away from the lifted leg Cabriole - A jump in which the working leg is thrown into the air, with the other leg following and beating against it before both legs land on the ground.\nJete battu - A jump similar to a regular jete, but with a beat of the legs in the air.\nAssemble - A jump in which the working leg is brushed into the air and the other leg follows, with both legs coming together in the air before landing.\nBrise - A jump in which the working leg is brushed into the air and the other leg beats against it before both legs land on the ground.\nEntrechat-  A jump in which the legs are crossed and beaten in the air before landing.\nSissone: A jump in which the working leg is brushed into the air and the other leg follows, with both legs landing at the same time in a crossed position.\nSaute - A basic jump in which both feet leave the floor and land at the same time.\nEchappe saute - A jump in which the feet start in a closed position and then open to a second position in the air before landing.\nChangement: A jump in which the feet switch positions in the air before landing.\nEchappe - A jump in which the feet start in a closed position and then open to a second position before returning to a closed position in the air before landing.\nPetite Allegro - A term for small, quick jumps performed in a series"/>
     

       </div>

          </div>
        
        
    )};






export default SkillTabs;









