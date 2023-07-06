import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Content from '../../components/dashboard/content/content';
import SideBar from '../../components/dashboard/sideBar/sideBar';
import NavBar from '../../components/navBar/navbar';
// import Card from '../../components/card';
import { useAuth } from '../../components/firebase/AuthContext';
import s from './signedin.module.css';

function SignedInPage() {
  const { currentUser } = useAuth();
  const [openedTab, setOpenedTab] = useState(null);
  const uid = currentUser?.uid || null;
  const [user, setUser] = useState(null);

  // Get the user data
  useEffect(() => {
    axios
      .get('https://connectarts-backend-nsty.onrender.com/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id:uid, // uid
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        // console.log(response);
        setUser(response.data);
      })
      .catch(error => {
        console.error(error);
        window.location.href = "/"
      });
  }, []);

  return (
    user && (
      <div className={s.container}>
        <NavBar />
        <div className={s.wrapper}>
          <SideBar openedTab={openedTab} setOpenedTab={setOpenedTab} />
          <Content currentTab={openedTab} user={user} />
        </div>
        {/* <Card /> */}
      </div>
    )
  );
}

export default SignedInPage;
