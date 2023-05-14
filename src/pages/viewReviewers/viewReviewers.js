//genre, pay range, 

import React, { useState,useEffect } from 'react';
import Navbar from '../../components/navbar';
import { Grid, Typography, TextField, Button, Select, MenuItem, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import axios from 'axios';
//import { AlignList } from '@material-ui/core/AlignList';
import ListItemText from '@mui/material/ListItemText';


const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  button: {
    margin: theme.spacing(1),
  },
}));

function ViewReviewers() {
  const classes = useStyles();

  const [genre, setGenre] = useState('');
  const [payRange, setPayRange] = useState([0,100]);
  const [testReviewers, setReviewers] = useState([])
  const [min, setMin] = useState(0)
  const [max, setMax] = useState(0)
  const [test, settest] = useState('')

  const handleGenreChange = (event) => {

    //const genre1 = event.target.value;

    setGenre(event.target.value);

    

  };

  const handlePayRangeChange = (event) => {
    setPayRange(event.target.value);
  };

  const handleMinPay = (event) => {
    setMin(event.target.value)


  };

  const handleMaxPay = (event) => {

    setMax(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    // TODO: Implement submission logic
  };

  useEffect(() => {
    axios.get('http://localhost:4000/routes/') // replace with your API endpoint
      .then(response =>  {
        if (response.status === 200) {
          console.log('Connection was successful');
        } else {
          console.log('Connection was not successful');
        }
      })
      .catch(error => {
        console.log('Error:', error.message);
      })
    }, []);



  const findReviewers = async() => {

    console.log(genre);


    axios.post('http://localhost:4000/routes/reviewers_genre_pay',  {genres: genre, lower: min, upper: max}
  )
  .then(response => {
      console.log(genre)
      console.log(response.data);
      //setpostId(response.data)
      setReviewers(response.data)
    })
    .catch(error => {
      console.log(error);
    })






  }


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
        
        <p>
          <strong>Categorical Preferences:</strong>
          <li> {user.musicality}</li>
          <li >{user.structure}</li>
          <li>{user.technique}</li>
          <li>{user.form}</li>

        </p>
        
      </Box>
    );
  }



  const reviewers = [
    {
      id: 1,
      name: "Alice",
      genre: "ballet",
      payRange: "30-40",
      available: true,
    },
    {
      id: 2,
      name: "Bob",
      genre: "tap",
      payRange: "50-60",
      available: false,
    },
    {
      id: 3,
      name: "Charlie",
      genre: "jazz",
      payRange: "20-30",
      available: true,
    },
    {
      id: 4,
      name: "David",
      genre: "contemporary",
      payRange: "70-80",
      available: true,
    },
    {
      id: 5,
      name: "Eve",
      genre: "hip-hop",
      payRange: "90-100",
      available: false,
    },
  ];

  return (
  
    <Grid container direction="column" alignItems="center" spacing={2}>
        <Navbar/>
        <div style={{ display: "flex", alignItems: "center" }}></div>
      <Typography variant="h4" gutterBottom>View Reviewers</Typography>
      <form className={classes.root} onSubmit={handleSubmit}>
        <Grid container direction="row" alignItems="center" spacing={2}>
          <Grid item>
            <TextField select label="Genre" value={genre} onChange={handleGenreChange}>
          
              <MenuItem value="Ballet" onClick={handleGenreChange}>Ballet</MenuItem>
              <MenuItem value="Jazz" onClick={handleGenreChange}>Jazz</MenuItem>
              <MenuItem value="Contemporary" onClick={handleGenreChange}>Contemporary</MenuItem>
              <MenuItem value="Lyrical" onClick={handleGenreChange}>Lyrical</MenuItem>
              <MenuItem value="Hip-hop" onClick={handleGenreChange}>Hip-Hop</MenuItem>
              <MenuItem value="Fusion" onClick={handleGenreChange}>Fusion</MenuItem>
              <MenuItem value="Tap" onClick={handleGenreChange}>Tap</MenuItem>
              <MenuItem value="Ballroom" onClick={handleGenreChange}>Ballroom</MenuItem>
              <MenuItem value="Modern" onClick={handleGenreChange}>Modern </MenuItem>
            </TextField>
        
          </Grid>
          <div>

        

          </div>
          <Grid item>
          <TextField
  label="Minimum Pay"
  type="number"
  inputProps={{ min: 0, max: 200 }}
  value={min}
  onChange={handleMinPay}
/>
<TextField
  label="Maximum Pay"
  type="number"
  inputProps={{ min: 0, max: 200 }}
  value={max}
  onChange={handleMaxPay}
/>
            {min && max && (
        <Typography>
          Selected pay range: ${min} - ${max}
        </Typography>
      )}
          </Grid>
          <Grid item>
            <Button type="submit" variant="contained" onClick = {findReviewers} color="primary" className={classes.button}>Search</Button>
          </Grid>
        </Grid>
      </form>
      {testReviewers.length > 0 ? (
  <List header="Available Reviewers">
    {testReviewers.map((reviewer) => (
     <ReviewerOption user ={reviewer}/>
    ))}
  </List>
) : (
  <p>No reviewers available at this time.</p>
)}

      
    </Grid>
  );
}

export default ViewReviewers;