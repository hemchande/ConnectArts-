import React from 'react';
import { Input } from '../../Inputs';
import s from './roles.module.css';

const Performer = ({ desiredPayRange, setDesiredPayRange }) => {
  return (
    <>
      <p className={s.text}>Desired Pay Range</p>
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
    </>
  );
};

export default Performer;
