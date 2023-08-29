import { AirlineSeatLegroomNormalSharp } from '@material-ui/icons';
import React from 'react';
import { Input } from '../../Inputs';
import s from './roles.module.css';

const Performer = ({ desiredPayRange, setDesiredPayRange }, {goal, setGoal}) => {

  const changeGoal = (event) => {

    setGoal(event.target.value)

  }
  return (
    <>
      <p className={s.text}>Enter Your Performer Session Desired Pay Range</p>
      <div className={s.performerContainer}>
        <Input
          type="text"
          name="text"
          placeholder="From"
          value={desiredPayRange.from}
          onChange={e =>
            setDesiredPayRange({
              from: e.target.value.replace(/[^0-9]/g, ''),
              to: desiredPayRange.to,
            })
          }
          withSymbols
        />
        <Input
          type="text"
          name="text"
          placeholder="To"
          value={desiredPayRange.to}
          onChange={e =>
            setDesiredPayRange({
              from: desiredPayRange.from,
              to: e.target.value.replace(/[^0-9]/g, ''),
            })
          }
          withSymbols
        />
       
      </div>
      <p className={s.text}>Enter Your Short/Long Term Dance Goals</p>
      <div className={s.performerContainer}></div>
        <Input
          type="text"
          name="text"
          placeholder="Short/Long Term Goals"
          value={goal}
          onChange = {changeGoal}
    
        
        />
    </>
  );
};

export default Performer;
