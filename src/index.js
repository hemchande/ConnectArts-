import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RegisterPage from './pages/register/register';
import { AuthContextProvider } from './components/firebase/AuthContext';
import EditInfo from './pages/editInfo/editInfo';
import LoginPage from './pages/loginpage/loginpage';
import SignedInPage from './pages/signedin/signedin';
import reportWebVitals from './reportWebVitals';
import ViewReviewers from './pages/viewReviewers/viewReviewers';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import ForgotPassWord from './pages/forgotpassword/forgotpassword';
import PreferencesPage from './pages/preferencespage/preferencespage';
import UploadPage from './pages/uploadpage/uploadpage';
import ProfilePage from './pages/profilepage/profilepage';
import SkillTabs from './pages/skillsPage/skillsGuide';
import VideoPlayer from './pages/video';
import Matches from './pages/selectMatches/matches';
import DepthSkills from './pages/skillsPage/inDepthSkills';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
     <AuthContextProvider>
        <Router>

    <Routes>
        <Route exact path='/' element={<LoginPage />} />
        <Route path='/forgotpassword' element={<ForgotPassWord/>} />
        <Route path='/register' element={<RegisterPage/>} />
        <Route path='/signedin' element={<SignedInPage/>} />
        <Route path='/preferences' element={<PreferencesPage/>} />
        <Route path='/upload' element={<UploadPage/>} />
        <Route path='/profile' element={<ProfilePage/>} />
        <Route path='/editinfo' element={<EditInfo/>} />
        <Route path='/setProfile' element={<EditInfo/>} />
        <Route path='/viewReviewers' element={<ViewReviewers/>} />
        <Route path='/skills' element={<SkillTabs/>} />
        <Route path='/testVideo' element={<VideoPlayer/>} />
        <Route path='/match' element={<Matches/>} />
        <Route path='/depthSkills' element={<DepthSkills/>} />



    </Routes>
    </Router>
    </AuthContextProvider>

  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
