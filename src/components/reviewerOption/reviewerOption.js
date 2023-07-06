import React, { useState } from 'react';
import { Checkbox } from '../Inputs';
import avatar from '../../assets/Avatar.png';
import { ReactComponent as Resume } from '../../assets/resume.svg';
import { ReactComponent as Success } from '../../assets/success.svg';
import s from './reviewerOption.module.css';

const ReviewerOption = ({ user, selectedPosts, setSelectedPosts }) => {
  const [checked, setChecked] = useState(false);

  const handleCheck = e => {
    e.preventDefault();
    if (!checked) {
      setSelectedPosts(prev => [...prev, user._id]);
    } else {
      setSelectedPosts(selectedPosts.filter(el => el !== user._id));
    }
    setChecked(!checked);
  };

  return (
    <div
      className={`${s.container} ${checked ? s.cheked : ''}`}
      onClick={e => handleCheck(e)}
    >
      <div className={s.userInfoWrapper}>
        <div className={s.userInfo}>
          {/* don't see avatar field please check it and change src*/}
          {/* <img className={s.avatar} src={avatar} alt="avatar" /> */}
          <div className={s.user}>
            <p className={s.name}>{user.name}</p>
            {/* don't see mail field please check it and change this field*/}
            {/* <p className={s.mail}>{user.mail || 'olivia@gmail .com'}</p> */}
          </div>
        </div>
        <Checkbox isChecked={checked} labelId="myCheckbox" readOnly />
      </div>
      {user?.payRate && (
        <div className={s.wrapper}>
          <h3 className={`${s.title} ${s.minWidth}`}>Pay Rate:</h3>
          <p className={s.payRate}>{`${user.payRate}$`}</p>
        </div>
      )}
      {user?.payRange?.from && user?.payRange?.to && (
        <div className={s.wrapper}>
          <h3 className={`${s.title} ${s.minWidth}`}>Pay Range:</h3>
          <p
            className={s.payRate}
          >{`${user.payRange.from}$ - ${user.payRange.to}$`}</p>
        </div>
      )}
      <div className={s.wrapper}>
        <h3 className={`${s.title} ${s.minWidth}`}>Dance Genre:</h3>
        {user?.genre?.length > 0 && (
          <ul className={s.list}>
            {user.genre.map((genre, index) => (
              <li key={index} className={s.genreItem}>
                {genre}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.wrapper}>
        <h3 className={`${s.title} ${s.minWidth}`}>Skills:</h3>
        {user?.skillFields?.length > 0 && (
          <ul className={s.list}>
            {user.skillFields.map((skillField, index) => (
              <li key={index} className={s.skillItem}>
                {skillField}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Categorical Preferences:</h3>
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Musicality:</h3>
        {user?.musicality_fields?.length > 0 && (
          <ul className={s.list}>
            {user.musicality_fields.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Structure:</h3>
        {user?.structure_fields?.length > 0 && (
          <ul className={s.list}>
            {user.structure_fields.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Technique:</h3>
        {user?.technique_fields?.length > 0 && (
          <ul className={s.list}>
            {user.technique_fields.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className={s.wrapper}>
        <h3 className={s.title}>Texture:</h3>
        {user?.form_fields?.length > 0 && (
          <ul className={s.list}>
            {user.form_fields.map((skillField, index) => (
              <li key={index} className={s.preferencesItem}>
                {skillField}
              </li>
            ))}
          </ul>
        )}
      </div>
      {/* if we have resume show this container and change 2 fields with name and size because i don't find user with resume*/}
      <div className={s.resume}>
        <Resume className={s.icon} />
        <div className={s.resumeWrapper}>
          <div>
            <p className={s.resumeName}>Resume.pdf</p>
            <p className={s.resumeSize}>200kb</p>
            <iframe
            title="Resume"
            style={{ width: '100%', height: '600px', border: 'none' }}
            src={`http://localhost:4000/routes/users/${user._id}/resume`}
          /> 
          </div>
          <Success />
        </div>
      </div>
    </div>
  );
};

export default ReviewerOption;
