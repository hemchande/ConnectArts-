import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { SideBar, Content } from '../../components/dashboard';
import NavBar from '../../components/navBar/navbar';
import Card from '../../components/card';
import { useAuth } from '../../components/firebase/AuthContext';
import s from './signedin.module.css';

function SignedInPage() {
  const { currentUser } = useAuth();
  const [openedTab, setOpenedTab] = useState(null);
  const uid = currentUser ? currentUser.uid : null;
  const [id, setId] = useState('');

  //get the
  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: 'ZhxlJLC8HXZwIVaXhgFP4HCqZSv1',
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
  }, [uid, id]);

  return (
    <div className={s.container}>
      <NavBar />
      <div className={s.wrapper}>
        <SideBar openedTab={openedTab} setOpenedTab={setOpenedTab} />
        <Content currentTab={openedTab} id={id} />
      </div>
      {/* <Card /> */}
    </div>
  );
}

export default SignedInPage;
