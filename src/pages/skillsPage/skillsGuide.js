import React, { useState, useRef } from 'react';
import { ReactComponent as Copy } from '../../assets/copy.svg';
import { ReactComponent as UserPlus } from '../../assets/userPlus.svg';
import { ReactComponent as Plus } from '../../assets/plus.svg';
import { skillsData as skills } from '../../constants';
import NavBar from '../../components/navBar/navbar';
import axios from 'axios'
import Background from '../../components/background/background';
import s from './skills.module.css';

const subtab = {
  description: 'Description',
  tehSkills: 'Skills Technique',
};

function SkillTabs() {
  const inputRef = useRef(null);
  const [currentSkill, setCurrentSkill] = useState(skills[0]);
  const [currentTab, setCurrentTab] = useState(subtab.description);
  const [numbersOfInputs, setNumbersOfInputs] = useState(1);
  const [videoUrl, setVideoUrl] = useState(null)

  const handleChangeSkill = skill => {
    setCurrentSkill(skill);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(inputRef.current.value);
  };

  const handleInviteUser = () => {
    // Add logic for invite users
  };

  const handleConfirm = () => {
    // Add logic for confirm
  };

  const handleCancel = () => {
    setNumbersOfInputs(1);
  };

  const fetchYouTubeVideo = async (skill) => {
    try {
      const skillContents =skill; // Replace with the actual skill query
      const response = await axios.get(`https://connectarts-backend-nsty.onrender.com/routes/fetch_youtube_video?skill=${skillContents}`);
      setVideoUrl(response.data);
    } catch (error) {
      console.error('Error fetching YouTube video:', error);
    }
  };



  const renderInputs = number => {
    const elements = [];
    for (let i = 0; i < number; i++) {
      elements.push(
        <input
          type="text"
          className={s.link}
          placeholder="you@yourcompany.io"
        ></input>,
      );
    }
    return <>{elements}</>;
  };
  const leftSideContent = () => {
    return (
      <div className={s.leftContainer}>
        {skills.map(el => {
          return (
            <button
              type="button"
              className={`${s.sideBarButton} ${
                currentSkill.title === el.title ? s.activeButton : ''
              }`}
              onClick={() => handleChangeSkill(el)}
            >
              {el.title}
            </button>
          );
        })}
      </div>
    );
  };

  const centerContent = () => {
    return (
      <div className={s.centerContainer}>
        <div>
          <button
            type="button"
            className={`${s.subTabButton} ${
              currentTab === subtab.description ? s.activeTab : ''
            }`}
            onClick={() => setCurrentTab(subtab.description)}
          >
            {subtab.description}
          </button>
          <button
            type="button"
            className={`${s.subTabButton} ${
              currentTab === subtab.tehSkills ? s.activeTab : ''
            }`}
            onClick={() => setCurrentTab(subtab.tehSkills)}
          >
            {subtab.tehSkills}
          </button>
        </div>
        {currentTab === subtab.description && descriptionLayout()}
        {currentTab === subtab.tehSkills && skillsLayout()}
      </div>
    );
  };

  const descriptionLayout = () => {
    return (
      <>
        <div className={s.titleContainer}>
          <h2 className={s.skillTitle}>{currentSkill?.title}</h2>
          <p className={s.skillText}>
            {`overview of  ${currentSkill?.title?.toLowerCase()}`}
          </p>
        </div>
        <div className={s.description}>{currentSkill?.description}</div>
        <div>
          {currentSkill?.skills?.map(skill => (
            <div className={s.wrapper}>
              <h3 className={s.wrapperTitle}>{skill.title}</h3>
              <p className={s.wrapperDescription}>{skill?.description}</p>
            </div>
          ))}
        </div>
      </>
    );
  };

  const skillsLayout = () => {
    return (
      <>
        <div className={s.titleContainer}>
          <h2 className={s.skillTitle}>Skills technique</h2>
          <p className={s.skillText}>
            {` ${currentSkill?.title?.toLowerCase()} base skills `}
          </p>
        </div>
        <div>
          {currentSkill?.skillsTechnique?.map(techSkill => (
            <div className={s.wrapper}>
              <h3 className={s.wrapperTitle}>{techSkill?.title}</h3>
              <div className={s.techSkillsWrapper}>
                {techSkill?.skills?.map(skill => (
                  <button className={s.techSkill} onClick={fetchYouTubeVideo(skill)} >{skill}</button>
                  
                ))}
                {videoUrl && (
                    <iframe
                      width="200"
                      height="200"
                      src={videoUrl}
                      frameborder="0"
                      allowfullscreen
                    />
                  )}
              </div>
            </div>
          ))}
        </div>
      </>
    );
  };

  const rightContent = () => {
    return (
      <div className={s.rightContainer}>
        <div className={s.shareWrapper}>
          <h3 className={s.shareTitle}>Share this document</h3>
          <p className={s.shareText}>
            Invite colleagues to read this document.
          </p>
          <p className={s.shareLinkText}>Share link</p>
          <div className={s.linkWrapper}>
            <input
              ref={inputRef}
              type="text"
              readOnly
              className={s.link}
              value="join.connectarts.io/" //need add link
            ></input>
            <Copy className={s.copyIcon} onClick={handleCopyLink} />
          </div>
        </div>
        <div className={s.shareWrapper}>
          <div className={s.userPlusWrapper}>
            <UserPlus className={s.copyIcon} onClick={handleInviteUser} />
          </div>
          <h3 className={s.shareTitle}>Invite your friends</h3>
          <p className={s.shareText}>
            Invite colleagues to use this application.
          </p>
          <p className={s.shareLinkText}>Email address</p>
          <div className={s.inviteWrapper}>{renderInputs(numbersOfInputs)}</div>
          <button
            className={s.addAnother}
            type="button"
            onClick={() => setNumbersOfInputs(prev => prev + 1)}
          >
            <Plus /> Add another
          </button>
          <div className={s.confirmWrapper}>
            <button
              type="button"
              className={`${s.confirmButton} ${s.cancel}`}
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button
              type="button"
              className={`${s.confirmButton} ${s.confirm}`}
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <NavBar />
      <Background />
      <div className={s.container}>
        <h1 className={s.title}>Skills Guide</h1>
        <div className={s.line}></div>
        <div className={s.contentContainer}>
          {leftSideContent()}
          {centerContent()}
          {rightContent()}
        </div>
      </div>
    </>
  );
}

export default SkillTabs;
