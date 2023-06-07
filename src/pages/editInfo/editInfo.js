import React, {useState, useEffect} from 'react';
import NavBar from '../../components/navbar';
import SkillsDropdown from '../../components/skillDropdown';
import {useAuth} from "../../components/firebase/AuthContext"
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios'


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

function EditInfo() {
  const [genre, setGenres] = useState([]);
  const [role, setRole] = React.useState([]);
  const [id, setId] = useState(null)
  const [resume, setResume] = React.useState(null);
  const [payRate, setPayRate] = useState(null);
  const [lower, setLower] = useState(null)
  const [upper, setUpper] = useState(null)
  const [revStatus, setrevStatus] = useState(null)
  const [perfStatus, setperfStatus] = useState(null)
  const [message, setMessage] = useState(null)
  const [newSkill, setNewSkill] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [skills, setSkills] = useState([]);
  






  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;

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


  //edit categorical prefs info and skills if revieewer

  const createAccountLink = async () => {
    try {
      // Send a request to your server to create an account link
      const response = await axios.post('http://localhost:4000/routes/create-account-link', { 
        accountId: "acct_1N1LlwReB7o3qk4I"
      });
    
      // If the request is successful, redirect the user to the newly created account link
      window.location.href = response.data.accountLinkUrl;
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };


  useEffect(() => {

    axios.get('http://localhost:4000/routes/get_id_from_firebaseuid', {params: {firebase_id: "4R7Roex5H4ZQXH0nxvuOmnz7T8D3"}
  }).then(response => {
      console.log(response.data);

      setId(response.data._id)
    })
    .catch(error => {
      console.log(error);
    })


  }, []);


  useEffect (() => {

    const get_user = () => {

    axios.get('http://localhost:4000/routes/get_user_from_id', {params: {id: id}
  }).then(response => {
      console.log(response.data);

      if(response.data.role.includes("Reviewer") ){
        setrevStatus(true);
        //setperfStatus(true);
      }
      if(response.data.role.includes("Performer") ){
        setperfStatus(true);
        //setperfStatus(true);
      }


    })
    .catch(error => {
      console.log(error);
    })





  }

  if(id){

    get_user();

  }




    

    







  }, [id]);



  











  const handleGenreChange = (event) => {
    const selectedOption = event.target.value;
      //const newGenres = [];
      setGenres(prevs=> [...prevs, selectedOption] );
  };


  const handleGenreChanges = (event) => {
    console.log(genre)
    const selectedOption = event.currentTarget.value;
    setGenres((prevGenres) => {
      const updatedGenres = [...prevGenres];
      const index = updatedGenres.indexOf(selectedOption);
      if (index > -1) {
        updatedGenres.splice(index, 1); // Remove the genre if it's already selected
      } else {
        updatedGenres.push(selectedOption); // Add the genre if it's not selected
      }
      return updatedGenres;
    });
    //console.log(genre)
  };

  const handleAddSkill = () => {
    if (newSkill !== '' && !skills.includes(newSkill)) {
      setSkills([...skills, newSkill]);
      setNewSkill('');
    }
  }

  const handleDeleteSkill = (skillToDelete) => {
    setSkills(skills.filter(skill => skill !== skillToDelete));
  }


  const handleSkillSelection = (event) => {
    const skill = event.target.value;
    if (selectedSkills.indexOf(skill) === -1) {
      setSelectedSkills([...selectedSkills, skill]);
  }
  console.log(selectedSkills)
};

  const handleSkillRemoval = (skill) => {
    setSelectedSkills(selectedSkills.filter(selectedSkill => selectedSkill !== skill));
};

  const handleRoleChange = (event) => {

    

    if (event.currentTarget.value === "Reviewer/Performer"){
      const roles = ["Reviewer", "Performer"]
      setRole(roles);
    }else {
      setRole([event.currentTarget.value]);
    }
    console.log(role)
    
  };

  const handleRoleChange2 = (event) => {

    const selectedRole = event.currentTarget.value;
  const isChecked = event.currentTarget.checked;

  if (isChecked) {
    if (!role.includes(selectedRole)) {
      setRole((prevRoles) => [...prevRoles, selectedRole]);
    }
  } else {
    setRole((prevRoles) => prevRoles.filter((role) => role !== selectedRole));
  }

  console.log(role);

  }




  const handleRoleChange1 = (event) => {

    setRole(event.target.value);

   
    
  };

  const handleResumeChange = (event) => {
    setResume(event.target.files[0]);
  };

  const handleRateChange = (event) => {

    setPayRate(event.target.value);



  }
  const handleRangeUpper = (event) => {

    setUpper(event.target.value);



  }


  const handleClose = () => {
    setMessage(null);
  };

  const handleRangeLower = (event) => {

    setLower(event.target.value);

  }




  const handleSubmit = (event) => {

    let roleNew;
    event.preventDefault();
    console.log(`Genre: ${genre}`);
    console.log(`Role: ${role}`);
    //console.log(`Resume: ${resume ? resume.name : ''}`);

    let obj1 = {};
    
    const formData = new FormData();
    //formData.append("id", id );

    //obj1["id"] = id;

    //formData.append('genres', genres);
    

    //formData.append('role', roleNew);
    obj1["role"] = role;
    //formData.append('resume', resume);
    //formData.append('payRate', payRate);
    obj1["payRate"] = payRate 
    obj1["genre"] = genre;

    if (lower == null || upper == null ){
      formData.append('payRange', null);
      obj1["payRange"] = null;

    }else{
      formData.append('payRange', [lower,upper]);
      obj1["payRange"] = [lower,upper];

    }

    

    if(resume){
      formData.append('resume',resume);
    }else{
      formData.append('resume',null);
    }

  
   

    axios.patch('http://localhost:4000/routes/editInfo',obj1, {params : {id: id}})
       .then(response => {
        console.log(obj1)
        console.log(formData);
        console.log(response.data);
        setMessage("User Info Saved")
        })
        .catch(error => {
         console.log(error);
     });


    if(resume){


    axios.patch('http://localhost:4000/routes/users/patch_resume', formData, {params : {id: id}})
     .then(response => {
      console.log(formData);
      console.log(response.data);




     }).catch(error => {
      console.log(error);


     });


    }

    let body = {}


    if(selectedSkills.length > 0 && id){
      body["skillFields"] = selectedSkills
      console.log(selectedSkills)
      console.log(body)
      axios.patch('http://localhost:4000/routes/updateSkills/' ,body, {params :
       {id: id}
    } )
     .then(response => {
      //console.log(formData);
      
      console.log(response.data);
      console.log(body)




     }).catch(error => {
      console.log(error);
      setMessage("Performers can only add skills for performances")


     });

    }


    


  };



  return (
    <div>
      <NavBar />
      {message && (
      <div className="modal">
        <div className="modal-content">
          <span className="close" onClick={handleClose}>&times;</span>
          <p>{message}</p>
        </div>
      </div>
    )};
      <h1>Edit User Fields</h1>
      <form onSubmit={handleSubmit}>

        <label>Select all Performance Genres : </label>   
            <select multiple
      value={genre}
      onChange={handleGenreChanges}  style={{
    backgroundColor: '#f5f5f5', /* Change to the color you want for the select element */
    padding: '5px',
  }}> 
                        
                        <option value="Ballet" >ballet</option>
            <option value="Contemporary" >contemporary</option>
            <option value="Jazz" >jazz</option>
            <option value="Modern" >modern</option>
            <option value="Tap" >tap</option>
            <option value="Hip-Hop" >hip-hop</option>
            <option value="Fusion" >fusion</option>
            <option value="Ballroom" >ballroom</option>
            <option value="Acrobatics" >acrobatics</option>
            <option value="Gymnastics" >gymnastics</option>
            <option value="Musical Theatre" >musical theatre</option>
            <option value="Bollywood" >bollywood</option>
            <option value="Kathak" >kathak</option>
            <option value="Barathynatham" >barathynatham</option>
            </select>
        <br />
        <label>
        Role:
        <input type="checkbox" value="Reviewer" checked={role.includes("Reviewer")} onChange={handleRoleChange2} />
        <span>Reviewer</span>
      </label>
      <label>
        <input type="checkbox" value="Performer" checked={role.includes("Performer")}  onChange={handleRoleChange2} />
        <span>Performer</span>
      </label>
        <br />


        


        <label>
          Reviewer Resume:
          <input type="file" accept=".pdf" onChange={handleResumeChange} />
        </label>


      


        
        <br />

  
        <div>
            <label htmlFor="desired-pay-range">Desired Performer Pay Range:</label>
            <input type="number" id="desired-pay-range-start" name="desired-pay-range-start" value={parseInt(lower)} onChange={handleRangeLower} />
            <input type="number" id="desired-pay-range-end" name="desired-pay-range-end" value={parseInt(upper)} onChange={handleRangeUpper} />
          </div>


        
       
       
            <div>
            <label htmlFor="desired-pay-rate">Desired Reviewer Pay Rate:</label>
            <input type="number" id="desired-pay-rate" name="desired-pay-rate" value={parseInt(payRate)} onChange={handleRateChange} />
          </div>

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
        
        <button type="submit">Save</button>
      </form>
    </div>
  );
}

export default EditInfo;



