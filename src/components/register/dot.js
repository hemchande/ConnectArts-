import React from 'react';
import { ReactComponent as DotIcon } from '../../assets/dot.svg';
import { ReactComponent as ConfirmIcon } from '../../assets/confirm.svg';
import s from './register.module.css';

const Dot = ({ inProgress, isFinished, onClick, step }) => (
  <button
    onClick={() => onClick(step)}
    type="button"
    className={`${s.step} ${inProgress ? s.active : ''}`}
  >
    {isFinished ? (
      <ConfirmIcon className={s.icon} />
    ) : (
      <DotIcon className={`${s.icon} ${inProgress ? s.dot : ''}`} />
    )}
  </button>
);

export default Dot;
