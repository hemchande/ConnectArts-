import { useEffect, useState } from "react";
import axios from "axios";
import { Grid, Typography, TextField, Button, Select, MenuItem, Box } from '@material-ui/core';
import List from '@mui/material/List';
import { useNavigate } from 'react-router-dom';




function Matches() {

    const [matches, setMatches] = useState([]);
    const [performerSkillVector, setSkillVector] = useState([]);
    const [performerPrefVector,setPrefVector] = useState([]);
    const [revs, setRevs] = useState(null)
    const [info, setInfo] = useState(null)
    const [revPrefs,setPrefs] = useState(null);
    const [picks, setPicks] = useState([]);
    const [genre, setGenre] = useState(null);
    const [post,setPost] = useState(null)
    const [targetVector, setTargetVector] = useState(null)
    const [selectedArray, setSelectedArray] = useState([]);
    const [selected, setSelected] = useState(false);
    const [performer, setPerformer] = useState(null);
    const navigate = useNavigate();
    //const [loading, setLoading] = useState(true);


    const handleSelectArray = (event) => {
      const reviewerId = event.target.value;
      console.log(reviewerId);
      //console.log(event);
      setSelectedArray((selectedArray) => [...selectedArray, reviewerId]);
      setSelected(true);
    };


    const updateReviewers = async() => {


    try{

      const requestBody = {
        post_id: post._id,
        reviewer_ids: selectedArray
      }

      const response = await axios.patch("http://localhost:4000/routes/reviewers/post_id", requestBody, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);
        //setRevs(response.data);






    }catch (error) {
        console.error(error);
        // Handle the error as necessary
    }









      






    };



    const createReviews = async() => {


      try{

        const requestBody = {
          post_id: post._id,
          reviewer_ids: selectedArray,
          performer_choreographer_id: performer._id
        }
  
        const response = await axios.post("http://localhost:4000/routes/new_reviews", requestBody, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          console.log(response.data);
          //setRevs(response.data);
  
  
  
  
  
  
      }catch (error) {
          console.error(error);
          // Handle the error as necessary
      }
  




    }


    const checkoutReviewers = async() => {


      try {

        const requestBody = {

          reviewer_ids: selectedArray
        }

        const response = await axios.post("http://localhost:4000/routes/stripe-reviewer_checkouts", requestBody, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          console.log(response.data.url);
          //setRevs(response.data);
          //navigate(response.data.url)
          window.location.href = response.data.url;
  
  
  
  







      }catch (error) {
          console.error(error);
          // Handle the error as necessary
      }







    }


    const updatePost = async() => {

      try{

        const requestBody = {
          userId: performer._id,
          reviewer_ids: selectedArray
        }
  
        const response = await axios.patch("http://localhost:4000/routes/post/userId", requestBody, {
            headers: {
              "Content-Type": "application/json",
            }
          });
          console.log(response.data);
          //setRevs(response.data);
          //navigate(response.data.url);
  
  
  
  
  
  
      }catch (error) {
          console.error(error);
          // Handle the error as necessary
      }
  








    }


    const handleSubmit = () => {

      updatePost();


      updateReviewers();

      createReviews();


      checkoutReviewers();




    }








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
        setPerformer(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  
    }, []);



  useEffect(() => {

    const get_post = ()=> {

    axios
    .get("http://localhost:4000/routes/users/id/current_post", {
      params: {
        id: performer._id,
      },
      withCredentials: true,
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((response) => {
      //console.log(response);
      setPost(response.data.current_post);
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });


  }

  if(performer){
    get_post();
  }








  }, [performer])



useEffect(() => {

  const getPostDetails = async() => {


    try{

      const requestBody = {
        postId: post._id
      }

      const response = await axios.post("http://localhost:4000/routes/get_performer_skills_genre_frompost", requestBody, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);
        //setRevs(response.data);
        setTargetVector(response.data.prefs);
        setGenre(response.data.genre);






    }catch (error) {
        console.error(error);
        // Handle the error as necessary
      }








  }

  if(post){

  getPostDetails();


  }








}, [post]);



    




useEffect(() => {

    const getPerformerVector = async() => {
        
 
      try {
        const requestBody = {
          genres: [genre]
        };
        const response = await axios.post("http://localhost:4000/routes/reviewer_roles_and_skills2", requestBody, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        //console.log(response.data);
        console.log(genre);
        setRevs(response.data);
      }
      catch (error) {
        console.error(error);
        // Handle the error as necessary
      }
    };

    if(genre){
      console.log([genre])
      getPerformerVector();

    }


    if(genre){
      getPerformerVector();
    }


  




  }, [genre]);



  

useEffect(() => {
    
  

    const getallInfo = async() => {

      try {
        const requestBody = {
          genres: [genre]
        };

        const response = await axios.post("http://localhost:4000/routes/reviewer_info", requestBody, {
          headers: {
            "Content-Type": "application/json",
          }
        });
        console.log(response.data);
        setInfo(response.data);


      }catch (error) {
        console.error(error);
        // Handle the error as necessary
      }









    }


    if(genre){

      getallInfo();



    }

  

  
    


    
    
    
    
    
    
    
    
}, [genre]);



useEffect(() => {

  //console.log(revPrefs);

  const getDistances = async() => {
    try {
      const requestBody = {
        genre: genre,
        preferences: revs,
        targetVector: targetVector
      };

      const response = await axios.post("http://localhost:4000/routes/reviewers_total_pref_distances", requestBody, {
        headers: {
          "Content-Type": "application/json",
        }
      });

      console.log(response.data);
      setPrefs(response.data);

    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  if(genre && revs && targetVector){
    getDistances();
  }

  //getDistances();





}, [revs, genre, targetVector]);





function ReviewerOption({ user }) {
  return (
    <Box border={1} padding={2}>
      <p>
        <strong>Reviewer:</strong> {user.name}
      </p>
      <p>
        <strong>Pay Rate:</strong> {user.payRate}
      </p>
      <p>
        <strong>Dance Genre:</strong> {user.genre}
      </p>
      <strong>Skills:</strong>{user.skillFields[0]}
      {user && user.skillFields && user.skillFields.length > 0 && (
  <ul>
    {user.skillFields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}

     
      
      <p>
        <strong>Categorical Preferences:</strong>
        <li> Musicality: {user.musicality_fields}</li>
        {user && user.musicality_fields && user.musicality_fields.length > 0 && (
  <ul>
    {user.musicality_fields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
       

        <strong > Performance Structure: {user.structure_fields}</strong>
        {user && user.structure_fields && user.structure_fields.length > 0 && (
  <ul>
    {user.structure_fields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
        


        <strong> Physical Skills + Technique: {user.technique_fields}</strong>
        {user && user.technique_fields && user.technique_fields.length > 0 && (
  <ul>
    {user.technique_fields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
        

        <strong> Movement Texture: {user.form_fields}</strong>
        {user && user.form_fields && user.form_fields.length > 0 && (
  <ul>
    {user.form_fields.map((skillField, index) => (
      <li key={index}>{skillField}</li>
    ))}
  </ul>
) 
}
        

      </p>
      <p>
        <strong> Resume </strong>
        <iframe
      title="Resume"
      style={{ width: '100%', height: '600px', border: 'none' }}
      src={`http://localhost:4000/routes/users/${user._id}/resume`}
    />
      </p>

      <button type="button" value={user._id} onClick={handleSelectArray}>
  Select
</button>
      
    </Box>
  );
}








return (

    <div>
      {revs == null && (
        <p> No Reviewer Matches at this time </p>
      )}


{revs  && info && revPrefs && (
  <List header="Available Reviewers">
    {Object.keys(revs).map((reviewer) => (
     <ReviewerOption user ={info[reviewer]}/>
    ))}
  </List>

)}




<Button variant="contained" color="primary" onClick = {handleSubmit} >
Confirm Matches
</Button>












      







    </div>






);


}

export default Matches;





