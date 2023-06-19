import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useAuth } from '../../components/firebase/AuthContext';
import { Input, Checkbox } from '../../components/Inputs';
import { Button } from '../../components/button';
import { useState } from 'react';
import routes from '../../routes';
import s from './loginpage.module.css';
import axios from 'axios';

function LoginPage() {
  const { logIn, logInWithGoogle } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isChecked, setIsChecked] = useState(false);

  const handleEmailChange = event => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = event => {
    setPassword(event.target.value);
  };

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const checkUserUidAuth = async (firebaseUid) => {
    try {
      const response = await axios.get('http://localhost:4000/routes/check_user_uid_auth', {
        params: {
          firebase_uid: firebaseUid
        }
      });
  
      const reviewer = response.data;
      // Process the reviewer data
      window.location.href = "/signedin"
  
      //return reviewer;
    } catch (error) {
      console.error(error);
      alert("No user with provided credentials")
      // Handle error here
      window.location.href = "/register"
    }
  };

  const handleGoogleSignInRegister = async(event) => {

    event.preventDefault();
    try {
      await logInWithGoogle()
      .then((user) => {
        
        window.location.href = "/register"


      })
      .catch((error) => {

        alert(error.message)

      })

    }catch(error) {
      // Handle error here
      console.log(error);
    }
  };

  const handleGoogleSignInLogin = async event => {

    event.preventDefault();
    try {
      await logInWithGoogle()
      .then((user) => {
        const uid = user.uid;
        checkUserUidAuth(uid)
        window.location.href = "/signedin"


      })
      .catch((error) => {

        alert(error.message)
        window.location.href = "/register"

      })

    }catch(error) {
      // Handle error here
      console.log(error);
    }



  }



  const handleLogin = async event => {
    event.preventDefault();
    //const email = event.target.username.value;
    //const password = event.target.password.value;

    try {
      await logIn(email, password)
        .then(userCredential => {
          const user = userCredential.user;
          // Redirect to the signedin page upon successful login
          window.location.href = '/signedin';
        })
        .catch(error => {
          alert(error.message);
        });
    } catch (error) {
      // Handle error here
      console.log(error);
    }
  };

  return (
    <div className={s.container}>
      <div className={s.wrapper}>
        <Logo />
        <div>
          <h2 className={s.title}>Welcome back</h2>
          <p className={s.subTitle}>Please enter your details.</p>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              value={email}
              name="email"
              placeholder="Enter Email"
              onChange={handleEmailChange}
              required
            />
            <Input
              type="password"
              value={password}
              name="password"
              placeholder="Enter Password"
              onChange={handlePasswordChange}
              required
            />
            <div className={s.infoContainer}>
              <Checkbox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                labelId="myCheckbox"
                remember
              />
              <Link to={routes.fortgotPass} className={s.forgotPass}>
                Forgot password
              </Link>
            </div>
            <Button type="submit" text="Sign in" />
            <div className={s.logoWrapper}>
              <p className={s.text}>Don’t have an account?</p>
              <Link to={routes.register} className={s.forgotPass}>
                Sign up
              </Link>
            </div>
          </form>
          <button style={{
            padding: '10px 10px',
            fontSize: '18px',
            backgroundColor: '#000',
            color: '#fff',
            border: 'none',
            borderRadius: '2px',
            cursor: 'pointer',
            fontFamily: 'Comic Sans MS, cursive',
            marginRight: '10px'
          }} onClick={handleGoogleSignInLogin}>
            <img src="https://www.freepnglogos.com/uploads/google-logo-png/google-logo-png-google-logos-vector-eps-cdr-svg-download-10.png" alt="Google Logo" style={{ width: '20px', height: '20px', marginRight: '5px' }} />Google Sign-On</button>
  
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
