import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../../components/firebase/AuthContext';
import { Tabs, Tab, Box } from '@material-ui/core';
import { ReactComponent as Stripe } from '../../assets/stripe.svg';
import { Input } from '../../components/Inputs';
import DragAndDropField from '../../components/dragAndDropField/dragAndDropField';
import CustomPtogressBar from '../../components/progressBar/customProgressBar';
import CustomSelect from '../../components/select/select';
import {
  roles,
  genresOptions,
  skills,
  musicalitySkills,
  techniqueSkills,
  textureSkills,
  structureSkills,
} from '../../constants';
import avatar from '../../assets/Avatar.png';
import NavBar from '../../components/navBar/navbar';
import s from './profilepage.module.css';

const ProfilePage = () => {
  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;

  const [editUser, setEditUser] = useState(true);
  const [editSkills, setEditSkills] = useState(true);
  const [editResume, setEditResume] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const [mongoId, setMongoId] = useState(null);
  const [revbool, setrevbool] = useState({});
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [resume, setResume] = useState(null);
  const [role, setRole] = useState(roles[0]);
  const [desiredPayRate, setDesiredPayRate] = useState(null);
  const [desiredPayRange, setDesiredPayRange] = useState({
    from: null,
    to: null,
  });
  const [genres, setGenres] = useState([]);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const [technique, setTechnique] = useState([]);
  const [texture, setTexture] = useState([]);
  const [structure, setStructure] = useState([]);
  const [musicality, setMusicality] = useState([]);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleViewReviewers = () => {
    console.log('handleViewReviewers');
  };

  const handleSave = () => {
    let finalGenres = []
    let obj1 = {};
    if(role.value === "Reviewer"){
      obj1["role"] = ["Reviewer"]
    } if (role.value === "Performer"){
      obj1["role"] = ["Performer"]
    }else{
      obj1["role"] = ["Performer","Reviewer"]
    }

    

    if(genres.length > 0){
      console.log(genres)
      for(let i = 0; i < genres.length; i ++){
        console.log(genres[i])
        finalGenres.push(genres[i]["value"])
      }
      obj1["genre"] = finalGenres
    

    }else{
      obj1["genre"] = []

    }

    if(desiredPayRate){
      obj1["payRate"] = parseInt(desiredPayRate)
    }
    if(!desiredPayRate){
      obj1["payRate"] = null
    }

    if(!desiredPayRange.from && !desiredPayRange.to){
      obj1["payRange"] = null
    }
    if(desiredPayRange.from && desiredPayRange.to){
      obj1["payRange"] = [parseInt(desiredPayRange.from), parseInt(desiredPayRange.to) ]
    }


    try {


    axios.patch('https://connectarts-frontend-2.onrender.com/routes/editInfo',obj1, {params : {id: mongoId}})
       .then(response => {
        console.log(obj1)
        //console.log(formData);
        console.log(response.data);
        //setMessage("User Info Saved")
        })
        .catch(error => {
         console.log(error);
     });


    }catch(err){
      console.log(err);
    }



    if(selectedSkills.length > 0){
      let body = {}
      let finalSkills = []

      for(let i = 0; i < selectedSkills.length; i ++){
        finalSkills.push(selectedSkills[i].value)
      }
      body["skillFields"] = finalSkills
      axios.patch('https://connectarts-frontend-2.onrender.com/routes/updateSkills/' ,body, {params :
      {id: mongoId}
   } )
    .then(response => {
     //console.log(formData);
     
     console.log(response.data);
     console.log(body)




    }).catch(error => {
     console.log(error);
     //setMessage("Performers can only add skills for performances")


    });

    }



    





    console.log('handleSave');
    
  };

  const handleSaveResume = () => {
    console.log('handleSaveResume');
    const formData = new FormData();
    if(resume){
      formData.append('resume',resume);
      axios.patch('https://connectarts-frontend-2.onrender.com/routes/users/patch_resume', formData, {params : {id: mongoId}})
      .then(response => {
       console.log(formData);
       console.log(response.data);
 
 
 
 
      }).catch(error => {
       console.log(error);
 
 
      });


    }

  };

  const handleRolesChange = selectedOptions => {
    setRole(selectedOptions);
    //console.log(role)
    console.log(selectedSkills)
    
  };

  const handleGenresChange = selectedOptions => {
    setGenres(selectedOptions);
    console.log(genres)
    console.log(selectedSkills)
  };

  const handleSkilsChange = selectedOptions => {
    setSelectedSkills(selectedOptions);
    console.log(selectedSkills)
    //console.log(desiredPayRange)
  };

  const onboardLink = () => {
    console.log(revbool.stripe_account_id);
    axios
      .post(
        `https://connectarts-backend-nsty.onrender.com/routes/create-account-link?accountId=${revbool.stripe_account_id}`,
      )
      .then(response => {
        // Redirect to the login link returned from the server
        window.location.href = response.data.accountLinkUrl;
      })
      .catch(error => {
        console.error(error);
      });
  };

  const stripeLink = () => {
    axios
      .get(
        `https://connectarts-backend-nsty.onrender.com/routes/generate_stripe_dashboard_link?id=${mongoId}`,
      )
      .then(response => {
        // Redirect to the login link returned from the server
        window.location.href = response.data;
      })
      .catch(error => {
        console.error(error);
        onboardLink();
      });
  };

  //console.log(revbool)

  const fetchData = async () => {
    await axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_id_from_firebaseuid', {
        params: { firebase_id: uid }, // uid
      })
      .then(response => {
        console.log('data', response.data);
        const name = response?.data?.name?.split(' ');
        setFirstName(name?.[0]);
        setLastName(name?.[1]);
        setEmail(response?.data?.email || ''); // need add email to responce
        setRole(() => {
          if (response?.data?.role?.length === 2) {
            return roles[2];
          } else if (response?.data?.role?.[0] === roles[0].value) {
            return roles[0];
          } else if (response?.data?.role?.[0] === roles[1].value) {
            return roles[1];
          }
        });
        setDesiredPayRate(response?.data?.payRate);
        setDesiredPayRange({
          from: response?.data?.payRange?.[0],
          to: response?.data?.payRange?.[1],
        });
        setGenres(
          genresOptions.filter(el => response?.data?.genre?.includes(el.value)),
        );
        setSelectedSkills(
          response?.data?.skillFields?.map(el => {
            const label = el.split(' ');
            return { value: el, label: label[label.length - 1] };
          }),
        );
        setTechnique(response?.data?.technique_fields || []);
        setTexture(response?.data?.form_fields || []);
        setStructure(response?.data?.structure_fields || []);
        setMusicality(response?.data?.musicality_fields || []);
        setMongoId(response?.data?._id);
      })
      .catch(error => {
        console.log(error);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const getUser = () => {
      axios
        .get('https://connectarts-backend-nsty.onrender.com/routes/get_user_from_id', {
          params: { id: mongoId },
        })
        .then(response => {
          console.log(response.data);
          console.log(response.data.skillFields);

          setrevbool(response.data);

          //console.log(revbool);
        })
        .catch(err => {
          console.log(err);
        });
    };

    if (mongoId) {
      getUser();
    }
  }, [mongoId]);

  return (
    <div className={s.container}>
      <NavBar />
      <div className={s.navigate}>
        <div className={s.navigate}>
          <p
            className={`${s.subTab} ${activeTab === 0 ? s.active : ''}`}
            onClick={() => setActiveTab(0)}
          >
            My details
          </p>
          <p
            className={`${s.subTab} ${activeTab === 1 ? s.active : ''}`}
            onClick={() => setActiveTab(1)}
          >
            Resume
          </p>
          <p className={s.stripe} onClick={stripeLink}>
            <Stripe />
            View Stripe Dashboard
          </p>
        </div>
        <p className={s.searchReviewers} onClick={handleViewReviewers}>
          Search Reviewers
        </p>
      </div>
      {activeTab === 0 ? (
        <div className={s.userWrapper}>
          <h2 className={s.title}>Personal info</h2>
          <p className={s.description}>
            Update your photo and personal details here.
          </p>
          <div className={s.userInfoWrapper}>
            <div className={s.userNameWrapper}>
              <Input
                type="text"
                name="firstname"
                placeholder="Enter your First Name"
                value={firstName}
                onChange={e => setFirstName(e.target.value)}
                label="First Name"
                isDisabled={editUser}
              />
              <Input
                type="text"
                name="Last name"
                placeholder="Enter your Last name"
                value={lastName}
                onChange={e => setLastName(e.target.value)}
                label="LastName"
                isDisabled={editUser}
              />
            </div>
            <Input
              type="text"
              name="Email address"
              placeholder="Enter your Email address"
              value={email}
              onChange={e => setEmail(e.target.value)}
              label="Email address"
              isDisabled={editUser}
            />
            <div className={s.uploadWrapper}>
              {/* need add avatar from responce */}
              <img className={s.avatar} src={avatar} alt="avatar" />
              <DragAndDropField
                file={resume}
                setFile={setResume}
                withoutLabel
              />
            </div>
            <div className={s.controlBtnWrapper}>
              <p
                className={`${s.saveBtn} ${s.edit}`}
                onClick={() => {
                  if (!editUser) {
                    fetchData();
                  }
                  setEditUser(prev => !prev);
                }}
              >
                {!editUser ? 'Cancel' : 'Edit'}
              </p>
              <p className={s.saveBtn} onClick={handleSave}>
                Save changes
              </p>
            </div>
          </div>
          <h2 className={s.title}>Skills info</h2>
          <p className={s.description}>Change your skills here.</p>
          <div className={s.userInfoWrapper}>
            <CustomSelect
              options={roles}
              onChange={handleRolesChange}
              value={role}
              placeholder="Choose your Role"
              label="Role"
              id="rolesSelect"
              isDisabled={editSkills}
            />
            {role?.value === roles[0].value && (
              <Input
                type="text"
                name="text"
                placeholder="Enter your Desired Pay Rate"
                value={desiredPayRate}
                onChange={e =>
                  setDesiredPayRate(e.target.value.replace(/[^0-9]/g, ''))
                  
                }
                label="Desired Pay Rate"
                withSymbols
                isDisabled={editSkills}
              />
            )}
            {role?.value === roles[1].value && (
              <div className={s.payRangeContainer}>
                <Input
                  type="text"
                  name="text"
                  placeholder="From"
                  value={desiredPayRange.from}
                  onChange={e =>
                    setDesiredPayRange({
                      from: e.target.value.replace(/[^0-9]/g, ''),
                      to: desiredPayRange.to,
                    })
                  }
                  label= "lower pay range"
                  withSymbols
                  isDisabled={editSkills}
                />
                <Input
                  type="text"
                  name="text"
                  placeholder="To"
                  value={desiredPayRange.to}
                  onChange={e =>
                    setDesiredPayRange({
                      from: desiredPayRange.from,
                      to: e.target.value.replace(/[^0-9]/g, ''),
                    })
                  }
                  label = "upper pay range"
                  withSymbols
                  isDisabled={editSkills}
                />
              </div>
            )}
            {role?.value === roles[2].value && (
              <>
                <Input
                  type="text"
                  name="text"
                  placeholder="Enter your Desired Pay Rate"
                  value={desiredPayRate}
                  onChange={e =>
                    setDesiredPayRate(e.target.value.replace(/[^0-9]/g, ''))
                  }
                  label="Desired Pay Rate"
                  withSymbols
                  isDisabled={editSkills}
                />
                <div className={s.payRangeContainer}>
                  <Input
                    type="text"
                    name="text"
                    placeholder="From"
                    value={desiredPayRange.from}
                    onChange={e =>
                      setDesiredPayRange({
                        from: e.target.value.replace(/[^0-9]/g, ''),
                        to: desiredPayRange.to,
                      })
                    }
                    withSymbols
                    isDisabled={editSkills}
                  />
                  <Input
                    type="text"
                    name="text"
                    placeholder="To"
                    value={desiredPayRange.to}
                    onChange={e =>
                      setDesiredPayRange({
                        from: desiredPayRange.from,
                        to: e.target.value.replace(/[^0-9]/g, ''),
                      })
                    }
                    withSymbols
                    isDisabled={editSkills}
                  />
                  
                </div>
              </>
            )}
            {(role?.value === roles[0].value ||
              role?.value === roles[2].value) && (
              <>
                <CustomSelect
                  options={genresOptions}
                  isMulti
                  onChange={handleGenresChange}
                  value={genres}
                  placeholder="Choose your Performance Genres"
                  label="Select all Performance Genres"
                  closeMenuOnSelect={false}
                  id="genresSelect"
                  isDisabled={editSkills}
                />
                <CustomSelect
                  options={skills}
                  onChange={handleSkilsChange}
                  value={selectedSkills}
                  placeholder="Choose your skills"
                  label="Choose your skills"
                  id="skillsSelect"
                  isMulti
                  closeMenuOnSelect={false}
                  isDisabled={editSkills}
                />
              </>
            )}
            <CustomPtogressBar
              label="Technique:"
              values={technique}
              options={techniqueSkills}
              setValues={setTechnique}
              isDisabled={editSkills}
            />
            <CustomPtogressBar
              label="Texture:"
              values={texture}
              options={textureSkills}
              setValues={setTexture}
              isDisabled={editSkills}
            />
            <CustomPtogressBar
              label="Structure:"
              values={structure}
              options={structureSkills}
              setValues={setStructure}
              isDisabled={editSkills}
            />
            <CustomPtogressBar
              label="Musicality:"
              values={musicality}
              options={musicalitySkills}
              setValues={setMusicality}
              isDisabled={editSkills}
            />
            <div className={s.controlBtnWrapper}>
              <p
                className={`${s.saveBtn} ${s.edit}`}
                onClick={() => {
                  if (!editSkills) {
                    fetchData();
                  }
                  setEditSkills(prev => !prev);
                }}
              >
                {!editSkills ? 'Cancel' : 'Edit'}
              </p>
              <p className={s.saveBtn} onClick={handleSave}>
                Save changes
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={s.userWrapper}>
          
          <div className={s.userInfoWrapper}>
            <DragAndDropField file={resume} setFile={setResume} withoutLabel />
            <div>
              <h2>Resume</h2>
              <iframe
                title="Resume"
                className={s.frame}
                src={`https://connectarts-backend-nsty.onrender.com/routes/users/${mongoId}/resume`} //need adapted from data
              />
            </div>
            <div className={s.controlBtnWrapper}>
              <p
                className={`${s.saveBtn} ${s.edit}`}
                onClick={() => {
                  if (!editResume) {
                    fetchData();
                  }
                  setEditResume(prev => !prev);
                }}
              >
                {!editResume ? 'Cancel' : 'Edit'}
              </p>
              <p className={s.saveBtn} onClick={handleSaveResume}>
                Save changes
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
