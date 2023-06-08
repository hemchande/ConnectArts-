import { useAuth } from '../../components/firebase/AuthContext';
import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Divider,
  TextField,
  Chip,
  Box,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  RegisterProgressBar,
  FirstStep,
  SecondStep,
  ThirdStep,
} from '../../components/register';
import Button from '../../components/button/button';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import s from './register.module.css';

const useStyles = makeStyles(theme => ({
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
  },
}));

const skillOptions = [
  {
    category: 'Ballet',
    subcategories: [
      'Jumps',
      'Leaps',
      'Turns',
      'Leg extensions',
      'Upper body extensions',
      'Basic positions',
    ],
  },
  {
    category: 'Tap',
    subcategories: [
      'Steps',
      'Turns',
      'Combinations',
      'Flaps',
      'Buffalo',
      'Pushbacks',
      'Irish',
      'Wings',
    ],
  },
  {
    category: 'Jazz',
    subcategories: [
      'Jumps',
      'Turns',
      'Combinations',
      'Kicks',
      'Leaps',
      'Floorwork',
      'Footwork',
    ],
  },
  {
    category: 'Tumbling',
    subcategories: ['Floor Acrobatics'],
  },
  {
    category: 'Modern/Contemporary',
    subcategories: [
      'Techniques',
      'Floorwork',
      'Movements',
      'Combinations',
      'Turns',
      'Footwork',
      'Jumps',
      'Lifts',
      'Partnering',
    ],
  },
  {
    category: 'Lyrical',
    subcategories: [
      'Techniques',
      'Turns',
      'Jumps',
      'Footwork',
      'Floorwork',
      'Partnering',
    ],
  },
  {
    category: 'Hip-Hop',
    subcategories: [
      'Styles',
      'Grooves',
      'Tricks',
      'Combinations',
      'Freeze',
      'Partnering',
    ],
  },
  {
    category: 'Ballroom',
    subcategories: [
      'Tango',
      'Waltz',
      'Foxtrot',
      'QuickStep',
      'ChaCha',
      'Rumba',
      'Samba',
      'Chive',
    ],
  },
  {
    category: 'African Dance',
    subcategories: [
      'West African Dance',
      'East African Dance',
      'North African Dance',
      'South African Dance',
    ],
  },
];

function RegisterPage() {
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Reviewer');
  const [genres, setGenres] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [desiredPayRate, setDesiredPayRate] = useState(null);
  const [desiredPayRange, setDesiredPayRange] = useState([]);
  const [resume, setResume] = useState(null);
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [techniqueValue, setTechniqueValue] = useState(0);
  const [techniqueFields, setTechniqueFields] = useState([]);
  const [musicalityFields, setMusicalityFields] = useState([]);
  const [formFields, setFormFields] = useState([]);
  const [structureFields, setStructureFields] = useState([]);
  const [musicalityValue, setMusicalityValue] = useState(0);
  const [structureValue, setStructureValue] = useState(0);
  const [formValue, setFormValue] = useState(0);
  const [stripeUrl, setStripeUrl] = useState('');
  const [accountId, setaccountId] = useState('');
  const [showInfo, setShowInfo] = useState([
    { category: 'Technique', info: 'Description of technique', show: false },
    { category: 'Musicality', info: 'Description of musicality', show: false },
    { category: 'Structure', info: 'Description of structure', show: false },
    { category: 'Form', info: 'Description of form', show: false },
  ]);

  const renderStep = currentStep => {
    switch (currentStep) {
      case 1:
        return <FirstStep />;
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
    }
  };

  let stripeId = null;

  const navigate = useNavigate();

  const handleFirstNameChange = event => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = event => {
    setLastName(event.target.value);
  };

  const handleInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handleRoleChange1 = event => {
    if (event.target.value == 'Performer/Reviewer') {
      const roles = ['Performer', 'Reviewer'];
      setRole(roles);
      console.log(role);
    } else if (event.target.value == 'Performer') {
      const role1 = ['Performer'];
      setRole(role1);
      console.log(role);
    } else if (event.target.value == 'Reviewer') {
      setRole(['Reviewer']);
      console.log(role);
    }
  };

  const handleRoleChange = event => {
    setRole(event.target.value);
    console.log(event.target.value);
  };

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleDesiredPayRateChange = event => {
    setDesiredPayRate(event.target.value);
  };

  const handleDesiredPayRangeChange = event => {
    setDesiredPayRange(event.target.value);
  };

  function handleDesiredPayRangeStartChange(event) {
    setDesiredPayRange([parseInt(event.target.value), desiredPayRange[1]]);
  }

  function handleDesiredPayRangeEndChange(event) {
    setDesiredPayRange([desiredPayRange[0], parseInt(event.target.value)]);
  }

  const handleNewSkillChange = event => {
    setNewSkill(event.target.value);
  };

  const handleAddSkill = () => {
    if (newSkill !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  };

  const handleDeleteSkill = skillToDelete => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  };

  const handleTechniqueFieldChange = event => {
    const technique = event.target.id;
    setTechniqueFields(prevValues => [...prevValues, technique]);
  };
  const handleFormFieldChange = event => {
    const form = event.target.id;
    setFormFields(prevValues => [...prevValues, form]);
  };
  const handleStructureFieldChange = event => {
    const structure = event.target.id;
    setStructureFields(prevValues => [...prevValues, structure]);
  };
  const handleMusicalityFieldChange = event => {
    const musicality = event.target.id;
    setMusicalityFields(prevValues => [...prevValues, musicality]);
  };

  const handleMusicalityValueChange = event => {
    setMusicalityValue(musicalityValue + 1);
    const musicality = event.target.id;
    setMusicalityFields(prevValues => [...prevValues, musicality]);
  };

  const handleTechniqueValueChange = event => {
    setTechniqueValue(techniqueValue + 1);
    const technique = event.target.id;
    setTechniqueFields(prevValues => [...prevValues, technique]);
  };

  const handleFormValueChange = event => {
    setFormValue(formValue + 1);
    const form = event.target.id;
    setFormFields(prevValues => [...prevValues, form]);
  };

  const handleStructureValueChange = event => {
    setStructureValue(structureValue + 1);
    const structure = event.target.id;
    setStructureFields(prevValues => [...prevValues, structure]);
  };

  const handleResumeChange = event => {
    setResume(event.target.files[0]);
  };

  const handleTechniqueChange = event => {
    setTechniqueValue(parseInt(event.target.value));
  };

  const handleMusicalityChange = event => {
    setMusicalityValue(parseInt(event.target.value));
  };

  const handleStructureChange = event => {
    setStructureValue(parseInt(event.target.value));
  };

  const handleFormChange = event => {
    setFormValue(parseInt(event.target.value));
  };

  const handleSkillSelection = event => {
    const skill = event.target.value;
    if (selectedSkills.indexOf(skill) === -1) {
      setSelectedSkills([...selectedSkills, skill]);
    }
  };

  const handleSkillRemoval = skill => {
    setSelectedSkills(
      selectedSkills.filter(selectedSkill => selectedSkill !== skill),
    );
  };

  const handleGenreChanges1 = event => {
    const selectedOption = event.target.value;
    //const newGenres = [];
    setGenres(prevs => [...prevs, selectedOption]);
  };

  const handleGenreChanges = event => {
    const selectedOption = event.target.value;
    console.log(desiredPayRange);
    setGenres(prevGenres => {
      const updatedGenres = [...prevGenres];
      const index = updatedGenres.indexOf(selectedOption);
      if (index > -1) {
        updatedGenres.splice(index, 1); // Remove the genre if it's already selected
      } else {
        updatedGenres.push(selectedOption); // Add the genre if it's not selected
      }
      return updatedGenres;
    });

    console.log(genres);
  };

  const createAccountLink = async accountId => {
    try {
      // Send a request to your server to create an account link
      const response = await axios.post(
        `http://localhost:4000/routes/create-account-link?accountId=${accountId}`,
      );

      // If the request is successful, redirect the user to the newly created account link
      window.location.href = response.data.accountLinkUrl;
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  const handleSignUp = event => {
    event.preventDefault();
    signUp(email, password)
      .then(userCredential => {
        const user = userCredential.user;

        const formData = new FormData();
        const formData1 = new FormData();

        let newRole = null;

        formData.append('name', `${firstName} ${lastName}`);
        formData.append('email', email);
        formData.append('genres', genres);
        formData.append('payRange', parseInt(desiredPayRange));

        formData.append('skillFields', selectedSkills);
        formData.append('payRate', parseInt(desiredPayRate));
        formData.append('technique', techniqueValue / 13);
        formData.append('form', parseFloat(formValue / 9));
        formData.append('structure', parseFloat(structureValue / 7));
        formData.append('musicality', parseFloat(musicalityValue / 3));
        formData.append('current_post', null);
        formData.append('resume', resume);
        formData.append('uid', user.uid);
        formData.append('structure_fields', structureFields);
        formData.append('technique_fields', techniqueFields);
        formData.append('form_fields', formFields);
        formData.append('musicality_fields', musicalityFields);
        formData.append('reviewer_avg_rating', null);
        formData.append('modelCritique', null);

        if (role == 'Reviewer') {
          formData.append('role', ['Reviewer']);
          newRole = ['Reviewer'];
        }

        if (role == 'Performer') {
          formData.append('role', ['Performer']);
          newRole = ['Performer'];
        }

        if (role == 'Performer/Reviewer') {
          formData.append('role', ['Performer', 'Reviewer']);
          newRole = ['Performer', 'Reviewer'];
        }

        formData.append('role', role);
        if (role.includes('Reviewer')) {
          formData.append('reviewer_post_status', null);
        }

        formData1.append('resume', resume);

        const obj = {
          name: `${firstName} ${lastName}`,
          email: email,
          genres: genres,
          payRange: desiredPayRange,
          skillFields: selectedSkills,
          payRate: parseInt(desiredPayRate),
          technique: techniqueValue / 13,
          form: parseFloat(formValue / 9),
          structure: parseFloat(structureValue / 7),
          musicality: parseFloat(musicalityValue / 3),
          current_post: null,
          resume: resume,
          uid: user.uid,
          structure_fields: structureFields,
          technique_fields: techniqueFields,
          form_fields: formFields,
          musicality_fields: musicalityFields,
          reviewer_avg_rating: null,
          modelCritique: null,
          role: newRole,
          reviewer_post_status: null,
        };

        //if(obj[role].includes("Reviewer")){
        //obj["reviewer_post_status"] = null
        //}

        //if(obj[role].includes("Performer")){
        //obj["reviewer_post_status"] = null
        //}

        if (resume) {
          axios
            .post('http://localhost:4000/routes/adduserwithResume', formData)
            .then(response => {
              console.log(response.data);
              //setaccountId(response.data);

              //stripeId = response.data;

              // console.log(stripeId);

              //navigate('/signedin')
              createAccountLink(response.data);
            })
            .catch(error => {
              console.log(error);
            });

          //createAccountLink();

          //console.log(accountId);

          //createAccountLink();
        }
        if (!resume) {
          console.log(obj);

          axios
            .post('http://localhost:4000/routes/adduserwithNoResumeNew', obj)
            .then(response => {
              console.log(obj);
              console.log(response.data);
              //setaccountId(response.data);

              //stripeId = response.data;

              // console.log(stripeId);

              //navigate('/signedin')
              createAccountLink(response.data);
            })
            .catch(error => {
              console.log(error);
            });
        }

        console.log('User signed up:', user);
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <>
      <div className={s.container}>
        <RegisterProgressBar
          currentStep={currentStep}
          onClick={setCurrentStep}
        />
        {renderStep(currentStep)}
        {currentStep < 3 ? (
          <Button
            type="button"
            text="Next step"
            onClick={() => setCurrentStep(currentStep + 1)}
            maxWidth={532}
            center
          />
        ) : (
          <Button
            type="button"
            text="Sign up"
            onClick={handleSignUp}
            maxWidth={532}
            center
          />
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div className={useStyles.formContainer}>
          <Typography variant="h5" gutterBottom>
            Set Up Profile
          </Typography>
          <Divider className={useStyles.divider} />

          <label>First Name : </label>
          <input
            type="firstname"
            value={firstName}
            placeholder="Enter First Name"
            name="firstname"
            onChange={e => setFirstName(e.target.value)}
            required
          />
          <br></br>
          <div />
          <label>Last Name : </label>
          <input
            type="lastname"
            value={lastName}
            placeholder="Enter Last Name"
            name="lastname"
            onChange={e => setLastName(e.target.value)}
            required
          />
          <br></br>
          <div />

          <label>Email : </label>
          <input
            type="text"
            value={email}
            placeholder="Enter Email"
            name="email"
            onChange={e => setEmail(e.target.value)}
            size={5}
            required
          />
          <br></br>
          <div />

          <label>Password : </label>
          <input
            type="password"
            value={password}
            placeholder="Enter Password"
            name="password"
            onChange={e => setPassword(e.target.value)}
            required
          />
          <br></br>
          <div />

          <label>Select all Performance Genres : </label>
          <select
            multiple
            value={genres}
            onChange={handleGenreChanges}
            required
            style={{
              backgroundColor:
                '#f5f5f5' /* Change to the color you want for the select element */,
              padding: '5px',
            }}
          >
            <option value="Ballet">ballet</option>
            <option value="Contemporary">contemporary</option>
            <option value="Jazz">jazz</option>
            <option value="Modern">modern</option>
            <option value="Tap">tap</option>
            <option value="Hip-Hop">hip-hop</option>
            <option value="Fusion">fusion</option>
            <option value="Ballroom">ballroom</option>
            <option value="Acrobatics">acrobatics</option>
            <option value="Musical Theatre">musical theatre</option>
            <option value="Bollywood">bollywood</option>
            <option value="Kathak">kathak</option>
            <option value="Barathynatham">barathynatham</option>
          </select>
          <div />

          <div>
            <label htmlFor="role">Role:</label>
            <select
              placeholder="Select Role"
              value={role}
              onChange={handleRoleChange}
            >
              <option value="Reviewer">Reviewer </option>
              <option value="Performer">Performer </option>
              <option value="Performer/Reviewer">Performer/Reviewer</option>
            </select>
          </div>
          {role == 'Reviewer' || role == 'Performer/Reviewer' ? (
            <div>
              <label htmlFor="desired-pay-rate">Desired Pay Rate:</label>
              <input
                type="number"
                id="desired-pay-rate"
                name="desired-pay-rate"
                value={desiredPayRate}
                onChange={handleDesiredPayRateChange}
              />
            </div>
          ) : null}
          {role === 'Performer' || role === 'Performer/Reviewer' ? (
            <div>
              <label htmlFor="desired-pay-range">Desired Pay Range:</label>
              <input
                type="number"
                id="desired-pay-range-start"
                name="desired-pay-range-start"
                value={desiredPayRange[0]}
                onChange={handleDesiredPayRangeStartChange}
              />
              <input
                type="number"
                id="desired-pay-range-end"
                name="desired-pay-range-end"
                value={desiredPayRange[1]}
                onChange={handleDesiredPayRangeEndChange}
              />
            </div>
          ) : null}

          {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
            <div>
              <label htmlFor="resume">Resume:</label>
              <input
                type="file"
                id="resume"
                name="resume"
                onChange={handleResumeChange}
              />
            </div>
          ) : null}

          {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
            <div className={useStyles.container}>
              <select onChange={handleSkillSelection}>
                <option value="">Select All Skills</option>
                {skillOptions.map(skill => (
                  <optgroup label={skill.category} key={skill.category}>
                    {skill.subcategories.map(subcategory => (
                      <option
                        value={`${skill.category} - ${subcategory}`}
                        key={`${skill.category} - ${subcategory}`}
                      >
                        {subcategory}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
              <div className={useStyles.selectedSkills}>
                {selectedSkills.map(selectedSkill => (
                  <div className={useStyles.chip} key={selectedSkill}>
                    {selectedSkill}
                    <button onClick={() => handleSkillRemoval(selectedSkill)}>
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          ) : null}

          {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
            <label>
              Reviewer Resume:
              <input type="file" accept=".pdf" onChange={handleResumeChange} />
            </label>
          ) : null}

          <label htmlFor="checkboxes" style={{ fontSize: '1.1rem' }}>
            Reviewer preferences of the importance of each performance
            subcategory to you when reviewing a performance :
          </label>
          <div id="checkboxes"></div>

          <div id="checkboxes">
            <label htmlFor="technique">
              Technique:
              <input
                type="range"
                id="technique"
                name="technique"
                min="1"
                max="13"
                value={techniqueValue}
                onChange={handleTechniqueChange}
              />
            </label>
            <div
              className={`info-description ${
                showInfo === 'technique' ? 'show' : ''
              }`}
            >
              <p>
                The tools and skills needed to produce a genre of dance as well
                as general physical skills such as posture, alignment, balance,
                coordination, control, mobility, and flexibility
              </p>

              {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
                <Grid container spacing={1}>
                  <Grid item>
                    <Box
                      id="Posture"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Posture
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Alignment"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Alignment
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Balance"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Balance
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Coordination"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Coordination
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Control"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Control
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Flexibility"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Flexibility
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Mobility"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Mobility
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Strength"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Strength
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Stamina"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Stamina
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Extension"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Extension
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Floorwork"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Floorwork
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Elevation"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleTechniqueValueChange}
                      style={{ cursor: 'pointer' }}
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
                      style={{ cursor: 'pointer' }}
                    >
                      Body Coordination
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </div>
            <br />
            <label htmlFor="form">
              Texture:
              <input
                type="range"
                id="form"
                name="form"
                min="1"
                max="9"
                value={formValue}
                onChange={handleFormChange}
              />
            </label>
            <div
              className={`info-description ${
                showInfo === 'technique' ? 'show' : ''
              }`}
            >
              <p>
                {' '}
                How the body moves and how the space is used eg pathways, body
                positioning levels, directions, size of movements, patterns,
                spatial design, and shape of movements and poses;
              </p>

              {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
                <Grid container spacing={1}>
                  <Grid item>
                    <Box
                      id="Fast + Slow Dynamics"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Fast + Slow Dynamics
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Sudden/Sustained Dynamics"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Sudden/Sustained Dynamics
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Acceleration + Deceleration"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Acceleration + Deceleration
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Strong and Light Movements"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Strong and Light Movements
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Direct + Indirect Movements"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Direct + Indirect Movements
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Choreographic Intent"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Choreographic Intent
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Choreographic Mood"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Choreographic Mood
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Style Fusions"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Style Fusions
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Movement Flow"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleFormValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Movement Flow
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </div>
            <br />
            <label htmlFor="structure">
              Structure:
              <input
                type="range"
                id="structure"
                name="structure"
                min="1"
                max="7"
                value={structureValue}
                onChange={handleStructureChange}
              />
            </label>
            <div
              className={`info-description ${
                showInfo === 'technique' ? 'show' : ''
              }`}
            >
              <p>
                {' '}
                the way the movements are organized and combined to create a
                dance. the progression of movement in a piece ie eg motif and
                development, repetition, and traveling, turning, elevation,
                gesture, stillness, use of body parts,floor-work and the
                transference of weight.
              </p>

              {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
                <Grid container spacing={1}>
                  <Grid item>
                    <Box
                      id="Spatial Levels"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Spatial Levels
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Movement Pathways"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Movement Pathways
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Directions"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Directions
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Size of Movement"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Size of Movement
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Patterns"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Patterns
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Phrasing Structure"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Phrasing Structure
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Element Composition"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleStructureValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Element Composition
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </div>
            <br />
            <label htmlFor="form">
              Musicality:
              <input
                type="range"
                id="musicality"
                name="musicality"
                min="1"
                max="3"
                value={musicalityValue}
                onChange={handleMusicalityChange}
              />
            </label>
            <div
              className={`info-description ${
                showInfo === 'technique' ? 'show' : ''
              }`}
            >
              <p>
                {' '}
                how a dancer expresses music in his or her body; involves
                dynamics of how the dancer moves eg fast/slow, sudden/sustained,
                acceleration/deceleration, strong/light, direct/indirect,
                flowing/abrupt, influenced by the music
              </p>
              {role === 'Reviewer' || role === 'Performer/Reviewer' ? (
                <Grid container spacing={1}>
                  <Grid item>
                    <Box
                      id="Rhythmic Content"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleMusicalityValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Rhythmic Content
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Timing Content"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleMusicalityValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Timing Content
                    </Box>
                  </Grid>
                  <Grid item>
                    <Box
                      id="Stylistic Accuracy"
                      border={1}
                      borderRadius={16}
                      p={1}
                      onClick={handleMusicalityValueChange}
                      style={{ cursor: 'pointer' }}
                    >
                      Stylistic Accuracy
                    </Box>
                  </Grid>
                </Grid>
              ) : null}
            </div>

            <br />
          </div>

          <button type="submit" onClick={handleSignUp}>
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
