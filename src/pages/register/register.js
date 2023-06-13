import { useAuth } from '../../components/firebase/AuthContext';
import React, { useState } from 'react';
import {
  RegisterProgressBar,
  FirstStep,
  SecondStep,
  ThirdStep,
} from '../../components/register';
import { Button } from '../../components/button';
import { Link } from 'react-router-dom';
import axios from 'axios';
import routes from '../../routes';
import {
  roles,
  techniqueSkills,
  textureSkills,
  structureSkills,
  musicalitySkills,
} from '../../constants';
import s from './register.module.css';

function RegisterPage() {
  const { signUp } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [genres, setGenres] = useState([]);

  const [role, setRole] = useState(roles[0]);
  const [desiredPayRate, setDesiredPayRate] = useState('');
  const [desiredPayRange, setDesiredPayRange] = useState({
    from: '',
    to: '',
  });
  const [resume, setResume] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [techniqueValues, setTechniqueValues] = useState([]);
  const [textureValues, setTextureValues] = useState([]);
  const [structureValues, setStructureValues] = useState([]);
  const [musicalityValues, setMusicalityValues] = useState([]);

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
        formData.append(
          'genres',
          Object.values(genres).map(item => item.value),
        );
        formData.append('payRange', parseInt(desiredPayRange));

        formData.append(
          'skillFields',
          Object.values(selectedSkills).map(item => item.value),
        );
        formData.append('payRate', parseInt(desiredPayRate));
        formData.append(
          'technique',
          techniqueValues.length / techniqueSkills.length,
        );
        formData.append(
          'texture',
          parseFloat(textureValues.length / textureSkills.length),
        );
        formData.append(
          'structure',
          parseFloat(structureValues.length / structureSkills.length),
        );
        formData.append(
          'musicality',
          parseFloat(musicalityValues.length / musicalitySkills.length),
        );
        formData.append('current_post', null);
        formData.append('resume', resume);
        formData.append('uid', user.uid);
        formData.append('structure_fields', structureValues);
        formData.append('technique_fields', techniqueValues);
        formData.append('musicality_fields', musicalityValues);
        formData.append('reviewer_avg_rating', null);
        formData.append('modelCritique', null);

        if (role.value === roles[0].value) {
          formData.append('role', [roles[0].value]);
          newRole = [roles[0].value];
        }

        if (role.value === roles[1].value) {
          formData.append('role', [roles[1].value]);
          newRole = [roles[1].value];
        }

        if (role.value === roles[2].value) {
          formData.append('role', [roles[0].value, roles[1].value]);
          newRole = [roles[0].value, roles[1].value];
        }

        formData1.append('resume', resume);

        const obj = {
          name: `${firstName} ${lastName}`,
          email: email,
          genres: Object.values(genres).map(item => item.value),
          payRange: desiredPayRange,
          skillFields: Object.values(selectedSkills).map(item => item.value),
          payRate: parseInt(desiredPayRate),
          technique: techniqueValues.length / techniqueSkills.length,
          texture: textureValues.length / textureSkills.length,
          structure: structureValues.length / structureSkills.length,
          musicality: musicalityValues.length / musicalitySkills.length,
          current_post: null,
          resume: resume,
          uid: user.uid,
          structure_fields: structureValues,
          technique_fields: techniqueValues,
          musicality_fields: musicalityValues,
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
        } else {
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
        return (
          <SecondStep
            role={role}
            setRole={setRole}
            desiredPayRate={desiredPayRate}
            setDesiredPayRate={setDesiredPayRate}
            desiredPayRange={desiredPayRange}
            setDesiredPayRange={setDesiredPayRange}
            resume={resume}
            setResume={setResume}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            techniqueValues={techniqueValues}
            setTechniqueValues={setTechniqueValues}
            textureValues={textureValues}
            setTextureValues={setTextureValues}
            structureValues={structureValues}
            setStructureValues={setStructureValues}
            musicalityValues={musicalityValues}
            setMusicalityValues={setMusicalityValues}
          />
        );
      case 3:
        return <ThirdStep />;
    }
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
