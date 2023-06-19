import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useAuth } from '../../components/firebase/AuthContext';
import Upload from '../../components/upload/upload';
import { Button } from '../../components/button';
import {
  techniqueSkills,
  textureSkills,
  structureSkills,
  musicalitySkills,
} from '../../constants';
import s from './createPost.module.css';
import routes from '../../routes';

function CreatePost() {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid || null;
  const [genre, setGenre] = useState([]);
  //const [error, setError] = useState('');
  const [comments, setComments] = useState('');
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [video, setVideo] = useState(null);
  const [techniqueValues, setTechniqueValues] = useState([]);
  const [textureValues, setTextureValues] = useState([]);
  const [structureValues, setStructureValues] = useState([]);
  const [musicalityValues, setMusicalityValues] = useState([]);

  const [id, setId] = useState('');
  const [error1, setError] = useState(null);

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: uid,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response);
        setId(response.data._id);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, [uid]);

  const handleClose = () => {
    setError(null);
  };

  const postComments = async postId => {
    axios
      .post('http://localhost:4000/routes/add-additional-comments', {
        postId: postId,
        comments: comments,
      })
      .then(response => {
        console.log(response.data);
        //setpostId(response.data)
      })
      .catch(error => {
        console.log(error);
      });
  };

  const patchPerformer = async postId => {
    axios
      .patch(
        'http://localhost:4000/routes/update_performer_reviewer_withPost',
        { postId: postId },
      )
      .then(response => {
        console.log(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleUploadVideoOld = async postId => {
    const formData = new FormData();
    formData.append('videofile', video);

    axios
      .post(
        `http://localhost:4000/routes/upload_video_new?post_id=${postId}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  const handleUploadVideo = async postId => {
    const formData2 = new FormData();
    formData2.append('video', video);

    axios
      .post(
        `http://localhost:4000/routes/attach_post_video?post_id=${postId}`,
        formData2,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      .then(response => console.log(response.data))
      .catch(error => console.error(error));
  };

  const handleSubmit = event => {
    event.preventDefault();
    const formData = new FormData();

    //still need to edit

    formData.append('genre', genre);
    formData.append('performer_choreographer_id', id);
    formData.append('technique_fields', techniqueValues);
    formData.append('texture_fields', textureValues);
    formData.append('structure_fields', structureValues);
    formData.append('musicality_fields', musicalityValues);
    formData.append(
      'technique',
      techniqueValues.length / techniqueSkills.length,
    );
    formData.append('texture', textureValues.length / textureSkills.length);
    formData.append(
      'structure',
      structureValues.length / structureSkills.length,
    );
    formData.append(
      'musicality',
      musicalityValues.length / musicalitySkills.length,
    );
    formData.append('additional_skill_keywords', selectedSkills);

    const obj = {
      genre: genre.value,
      performer_choreographer_id: id,
      technique_fields: techniqueValues,
      texture_fields: textureValues,
      structure_fields: structureValues,
      musicality_fields: musicalityValues,
      technique: techniqueValues.length / techniqueSkills.length,
      texture: textureValues.length / textureSkills.length,
      structure: structureValues.length / structureSkills.length,
      musicality: musicalityValues.length / musicalitySkills.length,
      additional_skill_keywords: Object.values(selectedSkills).map(
        item => item.value,
      ),
    };

    console.log('obj', obj);

    let post = null;

    try {
      axios
        .post('http://localhost:4000/routes/post_without_video', obj)
        .then(response => {
          console.log(response.data.data.insertedId);
          // setpostId(response.data.data.insertedId);
          //post = response.data.insertedId;
          handleUploadVideo(response.data.data.insertedId);
          patchPerformer(response.data.data.insertedId);
          postComments(response.data.data.insertedId);
          console.log(response.data.insertedId);

          //postComments(response.data.insertedId);

          //patchPerformer(response.data.insertedId);
        });
    } catch (error) {
      console.log(error);
      setError('Error: ' + error.message);
    }
  };

  return (
    <>
      {error1 && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleClose}>
              &times;
            </span>
            <p>{error1}</p>
          </div>
        </div>
      )}
      <div className={s.container}>
        <form>
          <div className={s.uploadWrapper}>
            <Upload
              genre={genre}
              setGenre={setGenre}
              comments={comments}
              setComments={setComments}
              selectedSkills={selectedSkills}
              setSelectedSkills={setSelectedSkills}
              video={video}
              setVideo={setVideo}
              techniqueValues={techniqueValues}
              setTechniqueValues={setTechniqueValues}
              textureValues={textureValues}
              setTextureValues={setTextureValues}
              structureValues={structureValues}
              setStructureValues={setStructureValues}
              musicalityValues={musicalityValues}
              setMusicalityValues={setMusicalityValues}
            />
            <Button
              type="button"
              text="Upload"
              onClick={handleSubmit}
              maxWidth={532}
              center
            />
            <div className={s.linkWrapper}>
              <Link className={s.link} to={routes.match}>
                Go to matches
              </Link>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default CreatePost;
