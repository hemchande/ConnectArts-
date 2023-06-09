import React from 'react';
import { roles } from '../../../constants';
import CustomSelect from '../../select/select';
import { Reviewer, Performer } from '../roles';
import s from './secondStep.module.css';

const SecondStep = ({
  role,
  setRole,
  desiredPayRate,
  setDesiredPayRate,
  desiredPayRange,
  setDesiredPayRange,
  resume,
  setResume,
  selectedSkills,
  setSelectedSkills,
  techniqueValues,
  setTechniqueValues,
  textureValues,
  setTextureValues,
  structureValues,
  setStructureValues,
  musicalityValues,
  setMusicalityValues,
}) => {
  const handleRolesChange = selectedOptions => {
    setRole(selectedOptions);
  };

  return (
    <div className={s.container}>
      <CustomSelect
        options={roles}
        onChange={handleRolesChange}
        value={role}
        placeholder="Choose your Role"
        label="Role"
        id="rolesSelect"
      />
      {role.value === roles[0].value && (
        <Reviewer
          desiredPayRate={desiredPayRate}
          setDesiredPayRate={setDesiredPayRate}
          resume={resume}
          setResume={setResume}
          selectedSkills={selectedSkills}
          setSelectedSkills={setSelectedSkills}
          techniqueValues={techniqueValues}
          setTechniqueValues={setTechniqueValues}
          textureValues={textureValues}
          setTextureValues={setTextureValues}
          structureValues={structureValues}
          setStructureValues={setStructureValues}
          musicalityValues={musicalityValues}
          setMusicalityValues={setMusicalityValues}
        />
      )}
      {role.value === roles[1].value && (
        <Performer
          desiredPayRange={desiredPayRange}
          setDesiredPayRange={setDesiredPayRange}
        />
      )}
      {role.value === roles[2].value && (
        <>
          <Performer
            desiredPayRange={desiredPayRange}
            setDesiredPayRange={setDesiredPayRange}
          />
          <Reviewer
            desiredPayRate={desiredPayRate}
            setDesiredPayRate={setDesiredPayRate}
            resume={resume}
            setResume={setResume}
            selectedSkills={selectedSkills}
            setSelectedSkills={setSelectedSkills}
            techniqueValues={techniqueValues}
            setTechniqueValues={setTechniqueValues}
            textureValues={textureValues}
            setTextureValues={setTextureValues}
            structureValues={structureValues}
            setStructureValues={setStructureValues}
            musicalityValues={musicalityValues}
            setMusicalityValues={setMusicalityValues}
          />
        </>
      )}
    </div>
  );
};

export default SecondStep;
