import React, { useRef } from 'react';
import { ReactComponent as UploadIcon } from '../../assets/upload.svg';
import { ReactComponent as Remove } from '../../assets/close.svg';
import s from './dragAndDropField.module.css';

const DragAndDropField = ({ resume, setResume }) => {
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    const allowedTypes = [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/gif',
    ];
    const fileExtension = selectedFile.name.split('.').pop().toLowerCase();
    const isValidType =
      allowedTypes.includes(selectedFile.type) ||
      allowedTypes.includes(`image/${fileExtension}`);

    if (!isValidType) {
      alert('Invalid file type. Please select an SVG, PNG, JPG, or GIF file.');
      return;
    }

    setResume(selectedFile);
  };

  const handleDrop = e => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];

    const allowedTypes = [
      'image/svg+xml',
      'image/png',
      'image/jpeg',
      'image/gif',
    ];
    const fileExtension = droppedFile.name.split('.').pop().toLowerCase();
    const isValidType =
      allowedTypes.includes(droppedFile.type) ||
      allowedTypes.includes(`image/${fileExtension}`);

    if (!isValidType) {
      alert('Invalid file type. Please select an SVG, PNG, JPG, or GIF file.');
      return;
    }

    setResume(droppedFile);
  };

  const handleDragOver = e => {
    e.preventDefault();
  };

  const handleRemoveFile = () => {
    setResume(null);
  };

  return (
    <div className={s.container}>
      <p className={s.label}>Upload your resume</p>
      <div
        className={s.dropField}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
      >
        <UploadIcon />
        <div className={s.textWrapper}>
          <input
            type="file"
            className={s.uploadFileInput}
            onChange={handleFileChange}
            ref={fileInputRef}
          />
          <p onClick={handleButtonClick} className={s.uploadBtn}>
            Click to upload
          </p>
          <p className={s.text}>or drag and drop</p>
        </div>
        <p className={s.text}>SVG, PNG, JPG or GIF (max. 800x400px)</p>
      </div>
      {resume && (
        <p className={s.pickedFile}>
          {resume.name} <Remove onClick={handleRemoveFile} className={s.icon} />
        </p>
      )}
    </div>
  );
};

export default DragAndDropField;
