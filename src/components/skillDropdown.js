import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';





const useStyles = makeStyles((theme) => ({
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
    },
  }));

const skills = [
  {
    category: 'Ballet',
    subcategories: ['Jumps', 'Leaps', 'Turns', 'Leg extensions', 'Upper body extensions', 'Basic positions']
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
    category: 'Tumbling',
    subcategories: ['Floor Acrobatics']
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
  },
  {
    category: 'Barathynatham',
    subcategories: ['Adavus', 'Hastas(Hand Gestures)', 'Abhinaya (Expression)', 'Nritta(Rhythmic Patterns)', 'Nritya(Expression + Rhythym']
  }
];

const SkillsDropdown = () => {
    const classes = useStyles();
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleSkillSelection = (event) => {
      const skill = event.target.value;
      if (selectedSkills.indexOf(skill) === -1) {
        setSelectedSkills([...selectedSkills, skill]);
    }
  };

    const handleSkillRemoval = (skill) => {
      setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
  };

  return (
    <div className={classes.container}>
      <select onChange={handleSkillSelection}>
        <option value="">Select All Skills</option>
        {skills.map(skill => (
          <optgroup label={skill.category} key={skill.category}>
            {skill.subcategories.map(subcategory => (
              <option value={`${skill.category} - ${subcategory}`} key={`${skill.category} - ${subcategory}`}>{subcategory}</option>
            ))}
          </optgroup>
        ))}
      </select>
      <div className={classes.selectedSkills}>
      {selectedSkills.map(selectedSkill => (
        <div className={classes.chip} key={selectedSkill}>
          {selectedSkill}
          <button onClick={() => handleSkillRemoval(selectedSkill)}>X</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default SkillsDropdown;
