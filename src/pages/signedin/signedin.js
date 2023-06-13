import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { SideBar, Content } from '../../components/dashboard';
import NavBar from '../../components/navBar/navbar';
import Card from '../../components/card';
import Button from '@mui/material/Button';
import { useAuth } from '../../components/firebase/AuthContext';
import s from './signedin.module.css';

function SignedInPage() {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const [openedTab, setOpenedTab] = useState(null);

  const uid = currentUser ? currentUser.uid : null;
  const [id, setId] = useState('');

  //get the
  console.log('openedTab', openedTab);
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
    <div className={s.container}>
      <NavBar />
      <div className={s.wrapper}>
        <SideBar openedTab={openedTab} setOpenedTab={setOpenedTab} />
        <Content />
      </div>
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
