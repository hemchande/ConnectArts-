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
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import routes from '../../routes';
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
  const [genres, setGenres] = useState([]);

  const [role, setRole] = useState('Reviewer');
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
        return (
          <FirstStep
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            genres={genres}
            setGenres={setGenres}
          />
        );
      case 2:
        return <SecondStep />;
      case 3:
        return <ThirdStep />;
    }
  };

  let stripeId = null;

  const navigate = useNavigate();

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
        <div className={s.center}>
          <p className={s.text}>Do have an account?</p>
          <Link to={routes.home} className={s.forgotPass}>
            Log in
          </Link>
        </div>
      </div>
    </>
  );
}

export default RegisterPage;
