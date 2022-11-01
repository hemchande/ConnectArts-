import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RegisterPage from './pages/register/register';
import LoginPage from './pages/loginpage/loginpage';
import SignedInPage from './pages/signedin/signedin';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import ForgotPassWord from './pages/forgotpassword/forgotpassword';
import PreferencesPage from './pages/preferencespage/preferencespage';
import UploadPage from './pages/uploadpage/uploadpage';
import ProfilePage from './pages/profilepage/profilepage';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        <Router>

    <Routes>
        <Route exact path='/' element={<LoginPage />} />
        <Route path='/forgotpassword' element={<ForgotPassWord/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/signedin' element={<SignedInPage/>} />
        <Route path='/preferences' element={<PreferencesPage/>} />
        <Route path='/upload' element={<UploadPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />


    </Routes>
    </Router>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
