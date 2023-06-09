import React from 'react';
import Dot from './dot';
import { registerProgressBarHelper as helper } from '../../helpers';
import s from './register.module.css';

const RegisterProgressBar = ({ currentStep, onClick }) => {
  return (
    <div className={s.container}>
      <div className={s.stepWrapper}>
        <div className={s.progressWrapper}>
          <Dot
            step={1}
            onClick={onClick}
            inProgress={helper(1, currentStep)}
            isFinished={helper(2, currentStep)}
          />
          <div
            className={`${s.progress} ${
              helper(1, currentStep) ? s.inProgress : ''
            }`}
          ></div>
        </div>
        <h3 className={s.title}>General Information</h3>
        <p className={s.text}>Please provide your name and email</p>
      </div>
      <div className={s.stepWrapper}>
        <div className={s.progressWrapper}>
          <Dot
            step={2}
            onClick={onClick}
            inProgress={helper(2, currentStep)}
            isFinished={helper(3, currentStep)}
          />
          <div
            className={`${s.progress} ${
              helper(2, currentStep) ? s.inProgress : ''
            }`}
          ></div>
        </div>
        <h3 className={s.title}>Skill Information</h3>
        <p className={s.text}>A few details about your skills</p>
      </div>
      <div className={s.stepWrapper}>
        <div className={s.progressWrapper}>
          <Dot step={3} onClick={onClick} inProgress={helper(3, currentStep)} />
        </div>
        <h3 className={s.title}>Stripe Onboarding</h3>
        <p className={s.text}>Start collaborating with your team</p>
      </div>
    </div>
  );
};

export default RegisterProgressBar;
