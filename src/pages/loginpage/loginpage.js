import SignIn from "./SignIn";
import Logo from "./Logo";
import {useAuth} from "../../components/firebase/AuthContext";
import { useEffect, useState } from 'react';
import axios from 'axios';


function LoginPage() {

    const { logIn, logInWithGoogle } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleEmailChange = (event) => {
      setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const check_user_status = async (uid) => {

      try{
        axios.get(`http://localhost:4000/routes/check_user_status?firebase_id=${uid}`)
    .then(response => {
      // Redirect to the login link returned from the server
      window.location.href = "/signedin"
    })





      }catch(error) {
        // Handle error here
        console.log(error);
      }





    }

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

    const handleGoogleSignInLogin = async(event) => {

      event.preventDefault();
      try {
        await logInWithGoogle()
        .then((user) => {
          const uid = user.user.uid
          //window.location.href = "/signedin"
          check_user_status(uid)
          window.location.href = "/signedin"


        })
        .catch((error) => {

          alert(error.message)

        })

      }catch(error) {
        // Handle error here
        console.log(error);
      }



    };



    const handleLogin = async (event) => {
        event.preventDefault();
        //const email = event.target.username.value;
        //const password = event.target.password.value;
    
        try {
          await logIn(email, password)
            .then((userCredential) => {
              const user = userCredential.user;
              // Redirect to the signedin page upon successful login
              window.location.href = "/signedin";
            })
            .catch((error) => {
              alert(error.message);
            });
        } catch (error) {
          // Handle error here
          console.log(error);
        }


    }




    return (
        <div class="loginpage">
        < Logo/>
        <div>
            <h2>Login to ConnectArts</h2>
            <form onSubmit={handleLogin}>
            <label>Username : </label>   
            <input type="text" value = {email} placeholder="Enter Email" name="username" onChange={handleEmailChange} required/>  
            <br></br>

            <label>Password : </label>   
            <input type="password" value = {password} placeholder="Enter Password" name="password" onChange={handlePasswordChange}required/> 

            <a href = "/signedin"><button type="submit">Login</button></a>
            </form>
            <br></br>
            
        <button onClick={handleGoogleSignInRegister}>Register with Google</button>
        <div></div>
        <button onClick={handleGoogleSignInLogin}> Login with Google </button>
      
   
            <div class="container"> <div class="container-child">Forgot <a href="/forgotpassword"> password? </a> </div><div class="container-child"><a href="/register"> Sign up </a></div>  </div>
        </div>
        </div>
        

    )
}


export default LoginPage;
