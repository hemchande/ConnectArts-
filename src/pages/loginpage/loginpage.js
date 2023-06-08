import { Link } from 'react-router-dom';
import Logo from '../../components/logo/Logo';
import { useAuth } from '../../components/firebase/AuthContext';
import { Input, Checkbox } from '../../components/Inputs';
import Button from '../../components/button/button';
import { useState } from 'react';
import routes from '../../routes';
import s from './loginpage.module.css';

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
    <div class={s.container}>
      <div class={s.wrapper}>
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
            <div class={s.infoContainer}>
              <Checkbox
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                labelId="myCheckbox"
              />
              <Link to={routes.fortgotPass} className={s.forgotPass}>
                Forgot password
              </Link>
            </div>
            <Button type="submit" text="Sign in" />
            <div className={s.center}>
              <p className={s.text}>Don’t have an account?</p>
              <Link to={routes.register} className={s.forgotPass}>
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
