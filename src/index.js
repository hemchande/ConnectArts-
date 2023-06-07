import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import RegisterPage from './pages/register/register';
import { AuthContextProvider } from './components/firebase/AuthContext';
import EditInfo from './pages/editInfo/editInfo';
import LoginPage from './pages/loginpage/loginpage';
import SignedInPage from './pages/signedin/signedin';
import SignIn from './pages/loginpage/SignIn';
import reportWebVitals from './reportWebVitals';
import ViewReviewers from './pages/viewReviewers/viewReviewers';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ForgotPassWord from './pages/forgotpassword/forgotpassword';
import PreferencesPage from './pages/preferencespage/preferencespage';
import UploadPage from './pages/uploadpage/uploadpage';
import ProfilePage from './pages/profilepage/profilepage';
import SkillTabs from './pages/skillsPage/skillsGuide';
import VideoPlayer from './pages/video';
import Matches from './pages/selectMatches/matches';
import DepthSkills from './pages/skillsPage/inDepthSkills';
import routes from './routes';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <Router>
        <Routes>
          <Route exact path={routes.home} element={<LoginPage />} />
          <Route path={routes.signin} element={<SignIn />} />
          <Route path={routes.fortgotPass} element={<ForgotPassWord />} />
          <Route path={routes.register} element={<RegisterPage />} />
          <Route path={routes.signedin} element={<SignedInPage />} />
          <Route path={routes.preferences} element={<PreferencesPage />} />
          <Route path={routes.upload} element={<UploadPage />} />
          <Route path={routes.profile} element={<ProfilePage />} />
          <Route path={routes.editinfo} element={<EditInfo />} />
          <Route path={routes.setProfile} element={<EditInfo />} />
          <Route path={routes.viewReviewers} element={<ViewReviewers />} />
          <Route path={routes.skills} element={<SkillTabs />} />
          <Route path={routes.testVideo} element={<VideoPlayer />} />
          <Route path={routes.match} element={<Matches />} />
          <Route path={routes.depthSkills} element={<DepthSkills />} />
        </Routes>
      </Router>
    </AuthContextProvider>
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
