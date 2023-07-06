import React, { useState, useEffect } from 'react';
import axios from 'axios';
import NavBar from '../../components/navBar/navbar';
import Background from '../../components/background/background';
import CustomPtogressBar from '../../components/progressBar/customProgressBar';
import { Button } from '../../components/button';
import { useAuth } from '../../components/firebase/AuthContext';
import {
  preferenceTab,
  musicalitySkills,
  textureSkills,
  structureSkills,
  techniqueSkills,
} from '../../constants';

import s from './preferencespage.module.css';

function PreferencesPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [musicality, setMusicality] = useState([]);
  const [structure, setStructure] = useState([]);
  const [technique, setTechnique] = useState([]);
  const [texture, setTexture] = useState([]);

  const [id, setId] = useState('');

  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;

  const handleSubmit = event => {
    event.preventDefault();
    const obj = {
      technique: technique.length / techniqueSkills.length,
      technique_fields: technique,
      musicality: musicality.length / musicalitySkills.length,
      musicality_fields: musicality,
      form: texture.length / textureSkills.length,
      form_fields: texture,
      structure: structure.length / structureSkills.length,
      structure_fields: structure,
    };

    axios
      .patch('https://connectarts-backend-nsty.onrender.com/routes/reviewer/edit_skills_prefs', obj, {
        params: { id: id },
      })
      .then(response => {
        console.log(response.data);
        //setaccountId(response.data);

        //stripeId = response.data;

        // console.log(stripeId);

        //navigate('/signedin')
      })
      .catch(error => {
        console.log(error);
      });

    //createAccountLink();

    //console.log(accountId);

    //createAccountLink();
  };

  useEffect(() => {
    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_id_from_firebaseuid', {
        params: { firebase_id:uid},
      })
      .then(response => {
        console.log(response.data);
        setId(response.data._id);
      })
      .catch(error => {
        console.log(error);
        window.location.href = '/signedin';
      });
  }, []);

  //

  return (
    <>
      <NavBar />
      <Background />
      <div className={s.container}>
        <h1 className={s.title}>Categorical Preferences Guide</h1>
        <div className={s.line}></div>
        <div className={s.tabWrapper}>
          {preferenceTab.map((el, index) => (
            <button
              key={index}
              type="button"
              className={`${s.tab} ${activeTab === index ? s.activeTab : ''}`}
              onClick={() => setActiveTab(index)}
            >
              {el.title}
            </button>
          ))}
        </div>
        <p className={s.description}>{preferenceTab[activeTab].description}</p>
        <h3 className={s.subTitle}>
          Rate your preferences of the importance of each performance
          subcategory to you:
        </h3>
        <div className={s.line}></div>
        <CustomPtogressBar
          label="Musicality:"
          values={musicality}
          options={musicalitySkills}
          setValues={setMusicality}
        />
        <CustomPtogressBar
          label="Structure:"
          values={structure}
          options={structureSkills}
          setValues={setStructure}
        />
        <CustomPtogressBar
          label="Technique:"
          values={technique}
          options={techniqueSkills}
          setValues={setTechnique}
        />
        <CustomPtogressBar
          label="Texture:"
          values={texture}
          options={textureSkills}
          setValues={setTexture}
        />
         <Button
          text="Submit"
          type="button"
          onClick={handleSubmit}
          center
          maxWidth={928}
        /> 
      </div>
    </>
  );
}

export default PreferencesPage;
