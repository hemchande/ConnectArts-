import NavBar from '../../components/navBar/navbar';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Card from '../../components/dashboard';
import Button from '@mui/material/Button';
import { useAuth } from '../../components/firebase/AuthContext';
import Blob from 'blob';
import axios from 'axios';
function SignedInPage() {
  const { currentUser } = useAuth();
  const uid = currentUser ? currentUser.uid : null;
  const [id, setId] = useState('');

  //get the

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: 'i7JdvmMfvfe0A7dzLUCiOS4zngi1',
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response);
        setId(response.data._id);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  });

  return (
    <div>
      <NavBar />
      <Button
        variant="outlined"
        onClick={() => navigate('/viewReviewers')}
        sx={{ width: '120px' }}
      >
        View Available Reviewers
      </Button>
      <Card />
    </div>
  );
}

export default SignedInPage;
