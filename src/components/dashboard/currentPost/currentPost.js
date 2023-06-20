import React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import CurrentPostReviews from './currentpostreviews';
import CustomSelect from '../../select/select';
import {
  genresOptions,
  skills,
  techniqueSkills,
  structureSkills,
  textureSkills,
  musicalitySkills,
} from '../../../constants';
import CustomPtogressBar from '../../progressBar/customProgressBar';
import { Button } from '../../button';
import s from './currentPost.module.css';

const CurrentPost = ({ user }) => {
  const [post, setPost] = useState(null);
  const [genres, setGenres] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);

  const handleViewPerformancePostClick = postId => {
    try {
      const response = axios.get(
        'http://localhost:4000/routes/get_post_video_from_post',
        {
          params: {
            post_id: postId,
          },
          responseType: 'blob',
        },
      );

      // Do something with the video blob, such as displaying it in a video element
      const videoUrl = URL.createObjectURL(response.data);
      const videoElement = document.createElement('video');
      videoElement.src = videoUrl;
      document.body.appendChild(videoElement);
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const fetchData4 = async () => {
    await axios
      .get('http://localhost:4000/routes/users/id/current_post', {
        params: {
          id: user._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setPost(response.data);
        setGenres(
          genresOptions.filter(
            el => response.data.current_post?.genre === el.value,
          ),
        );
        setSelectedSkills(
          response.data.current_post?.additional_skill_keywords?.map(el => {
            const label = el.split(' ');
            return { value: el, label: label[label.length - 1] };
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });

    ///check_currentPost_reviews_updatePost_updateUser'
    //call the above after getting the current post
  };

  const updateUser = () => {
    try {
      const response = axios.get(
        'http://localhost:4000/routes/check_currentPost_reviews_updatePost_updateUser',
        {
          params: {
            id: user._id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  //check post review(performer) status
  // useEffect(() => {
  //   if (user._id) {
  //     axios
  //       .get('http://localhost:4000/routes/check_post_review_status_for_user', {
  //         params: {
  //           _id: user._id,
  //         },
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //         },
  //       })
  //       .then(response => {
  //         if (response.data != null) {
  //           setnewpostReviewStatus('New Post Reviews');
  //         }
  //       });
  //   }
  // }, [user._id]);

  useEffect(() => {
    // updateUser();
    fetchData4();
    updateUser();
  }, [user._id]);

  const handleGenresChange = selectedOptions => {
    setGenres(selectedOptions);
  };

  const handleSkilsChange = selectedOptions => {
    setSelectedSkills(selectedOptions);
  };

  return (
    <div>
      <h2 className={s.title}>Current Post</h2>
      <p className={s.description}>{`Welcome back, ${user?.name}`}</p>
      {post && (
        <>
          <div className={s.container}>
            <CustomSelect
              options={genresOptions}
              onChange={handleGenresChange}
              value={genres}
              label="Dance Genre"
              closeMenuOnSelect={false}
              id="genresSelect"
              isDisabled
            />
            <CustomSelect
              options={skills}
              onChange={handleSkilsChange}
              value={selectedSkills}
              label="Skills"
              id="skillsSelect"
              isMulti
              closeMenuOnSelect={false}
              isDisabled
            />
            <p className={s.preference}>Categorical Preferences:</p>
            {post.current_post.musicality_fields && (
              <CustomPtogressBar
                label="Musicality:"
                values={post.current_post.musicality_fields}
                options={musicalitySkills}
                isDisabled
              />
            )}
            {post.current_post.structure_fields && (
              <CustomPtogressBar
                label="Structure:"
                values={post.current_post.structure_fields}
                options={structureSkills}
                isDisabled
              />
            )}
            {post.current_post.technique_fields && (
              <CustomPtogressBar
                label="Technique:"
                values={post.current_post.technique_fields}
                options={techniqueSkills}
                isDisabled
              />
            )}
            {post.current_post.form_fields && (
              <CustomPtogressBar
                label="Texture:"
                values={post.current_post.form_fields}
                options={textureSkills}
                isDisabled
              />
            )}
            <Button
              text="View Performance"
              type="button"
              onClick={() =>
                handleViewPerformancePostClick(post.current_post._id)
              }
            />
          </div>
          <video className="video-player" controls>
            <source
              src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.current_post.video_field}`}
              type="video/mp4"
            />
          </video>
          <CurrentPostReviews post={post.current_post} user={user} />
        </>
      )}
      {!post && <strong> No Current Post</strong>}
    </div>
  );
};

export default CurrentPost;
