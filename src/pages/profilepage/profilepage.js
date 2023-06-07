import { useEffect, useState } from 'react';
import { Tabs, Tab, Box } from '@material-ui/core';
import NavBar from "../../components/navbar";
import logo1 from "../../blank-face.jpg";
import { navigate } from "@reach/router";
import { useNavigate } from 'react-router-dom';
import EditInfo from "../editInfo/editInfo";
import { useAuth } from "../../components/firebase/AuthContext";

import UserIconWithName from '../../components/userIcon';
import axios from 'axios';


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
  }
];


function ProfilePage() {
  //const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [mongoId, setMongoId] = useState(null)
  const [revbool, setrevbool] = useState({});
  const [skills, setSkills] = useState([])
  //const uid = currentUser ? currentUser.uid : null;

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleEditInfoClick = () => {
    navigate("/editinfo");
  };


  const onboardLink = () => {
    console.log(revbool.stripe_account_id)
    axios.post(`http://localhost:4000/routes/create-account-link?accountId=${revbool.stripe_account_id}`)
    .then(response => {
      // Redirect to the login link returned from the server
      window.location.href = response.data.accountLinkUrl;
    })
    .catch(error => {
      console.error(error);

    });



  }


  const stripeLink = () => {
    axios.get(`http://localhost:4000/routes/generate_stripe_dashboard_link?id=${"63f3ecc1029b963390157389"}`)
    .then(response => {
      // Redirect to the login link returned from the server
      window.location.href = response.data;
    })
    .catch(error => {
      console.error(error);
      onboardLink();

    });




  }


  //console.log(revbool)




  useEffect(() => {

    axios.get('http://localhost:4000/routes/get_id_from_firebaseuid', {params: {firebase_id: "i7JdvmMfvfe0A7dzLUCiOS4zngi1"}
  }).then(response => {
      console.log(response.data);

      setMongoId(response.data._id)
    })
    .catch(error => {
      console.log(error);
    })


  },[])



  useEffect(() => {

    const getUser =() => {

    axios.get('http://localhost:4000/routes/get_user_from_id', {params: {id: mongoId}
  }).then(response => {


    console.log(response.data);
    console.log(response.data.skillFields);


    setrevbool(response.data)
    setSkills(revbool.skillFields)

    //console.log(revbool);
    
  }).catch(err => {
    console.log(err)

  })


}

if(mongoId){
  getUser();
}



  }, [mongoId]);





  console.log(revbool)




  return (
    <div className="profilepage">

    <UserIconWithName />
      <NavBar style={{ backgroundColor: "black" }}/>
      <div style={{ display: "flex", alignItems: "center" }}>
        <button
          style={{
            marginLeft: "20px",
            fontSize: "14px",
            width: "100px",
            backgroundColor: "green",
            color: "white",
          }}
          className="edit-info-btn"
          onClick={handleEditInfoClick}
        >
          Edit Info
        </button>
        <button style={{
            marginLeft: "20px",
            fontSize: "14px",
            width: "100px",
            backgroundColor: "green",
            color: "white",
          }} onClick={stripeLink}> Finance Dashboard</button>
          
        


        


      </div>
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        variant="fullWidth"
        indicatorColor="primary"
        textColor="primary"
      >
        <Tab label="User Information" />
        <Tab label="Resume" />
      </Tabs>
      <Box p={3}>
        {activeTab === 0 && revbool &&(
          <div className="section">
            <h1>User Information</h1>

          

      <div>
        <strong>Skills</strong>
      
        {revbool && revbool.skillFields && revbool.skillFields.length > 0 && (
  <ul>
    {revbool.skillFields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
    <strong>Roles</strong>
    {revbool && revbool.role  && (
  <ul>
    {revbool.role.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}

<strong>Genres</strong>
    {revbool && revbool.genre  && (
  <ul>
    {revbool.genre.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}

    <strong>Pay Range</strong>
    {revbool && revbool.payRange  && (
  <ul>
    <p> {revbool.payRange[0]} ~ {revbool.payRange[1]}</p>
  </ul>
) 
}


<strong>Pay Rate</strong>
    {revbool && revbool.payRate  && (
  <ul>
    <p> {revbool.payRate}</p>
  </ul>
) 
}


     <strong>Technique/Physical Ability Fields</strong>
      <ul>
        {revbool.technique}
     </ul>
     <strong>Movement Texture Fields</strong>
      <ul>
        {revbool.form}
     </ul>
     <strong> Performance Structure Fields</strong>
      <ul>
        {revbool.structure}
     </ul>
     <strong>Musicality Fields</strong>
      <ul>
        {revbool.musicality}
     </ul>
      </div>

      
          
            
            
          </div>
        )}
        {activeTab === 1 && (
          <div className="section">
            <h2>Resume</h2>
            <iframe
      title="Resume"
      style={{ width: '100%', height: '600px', border: 'none' }}
      src={`http://localhost:4000/routes/users/${"6444057682ec17d80aba6db8"}/resume`}
    />
            
          </div>
        )}
        
      </Box>
    </div>
  );
}

export default ProfilePage;