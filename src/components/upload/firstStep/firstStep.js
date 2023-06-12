import React from 'react';

import CustomSelect from '../../select/select';
import { TextArea } from '../../Inputs';
import {
  genresOptions,
  skills,
  techniqueSkills,
  textureSkills,
  structureSkills,
  musicalitySkills,
} from '../../../constants';
import DragAndDropField from '../../dragAndDropField/dragAndDropField';
import CustomPtogressBar from '../../progressBar/customProgressBar';

const FirstStep = ({
  genre,
  setGenre,
  comments,
  setComments,
  selectedSkills,
  setSelectedSkills,
  video,
  setVideo,
  techniqueValues,
  setTechniqueValues,
  textureValues,
  setTextureValues,
  structureValues,
  setStructureValues,
  musicalityValues,
  setMusicalityValues,
}) => {
  const handleGenreChange = selectedOptions => {
    setGenre(selectedOptions);
  };

  const handleSelectedSkills = selectedOptions => {
    setSelectedSkills(selectedOptions);
  };

  return (
    <div>
      <CustomSelect
        options={genresOptions}
        onChange={handleGenreChange}
        value={genre}
        placeholder="Choose your Performance Genres"
        label="Dance Genre"
        id="uploadGenresSelect"
      />
      <TextArea
        label="Comments"
        id="genresComments"
        placeholder="Text"
        value={comments}
        setValue={setComments}
      />
      <CustomSelect
        options={skills}
        onChange={handleSelectedSkills}
        value={selectedSkills}
        placeholder="Skills"
        label="Skills"
        id="uploadSkills"
        isMulti
        closeMenuOnSelect={false}
      />
      <DragAndDropField
        file={video}
        setFile={setVideo}
        isVideo
        label="Upload your performance:"
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

export default FirstStep;
