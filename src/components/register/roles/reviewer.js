import React from 'react';
import { Input } from '../../Inputs';
import {
  skills,
  techniqueSkills,
  textureSkills,
  structureSkills,
  musicalitySkills,
} from '../../../constants';
import CustomSelect from '../../select/select';
import DragAndDropField from '../../dragAndDropField/dragAndDropField';
import CustomPtogressBar from '../../progressBar/customProgressBar';

const Reviewer = ({
  desiredPayRate,
  setDesiredPayRate,
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
  const handleSkilsChange = selectedOptions => {
    setSelectedSkills(selectedOptions);
  };

  return (
    <div>
      <Input
        type="text"
        name="text"
        placeholder=" Desired Pay Rate"
        value={desiredPayRate}
        onChange={e => setDesiredPayRate(e.target.value.replace(/[^0-9]/g, ''))}
        label="Enter your Reviewer Feedback Desired Pay Rate"
        withSymbols
      />
      <DragAndDropField file={resume} setFile={setResume} />
      <CustomSelect
        options={skills}
        onChange={handleSkilsChange}
        value={selectedSkills}
        placeholder="Choose your skills"
        label="Choose your skills"
        id="skillsSelect"
        isMulti
        closeMenuOnSelect={false}
      />
      <CustomPtogressBar
        label="Technique:"
        values={techniqueValues}
        options={techniqueSkills}
        setValues={setTechniqueValues}
      />
      <CustomPtogressBar
        label="Texture:"
        values={textureValues}
        options={textureSkills}
        setValues={setTextureValues}
      />
      <CustomPtogressBar
        label="Structure:"
        values={structureValues}
        options={structureSkills}
        setValues={setStructureValues}
      />
      <CustomPtogressBar
        label="Musicality:"
        values={musicalityValues}
        options={musicalitySkills}
        setValues={setMusicalityValues}
      />
    </div>
  );
};

export default Reviewer;
