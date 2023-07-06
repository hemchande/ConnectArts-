import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';
import CustomSelect from '../../select/select';
import CustomPtogressBar from '../../progressBar/customProgressBar';
import { TextArea, Input } from '../../Inputs';
import { Button } from '../../button';
import {
  genresOptions,
  skills,
  techniqueSkills,
  structureSkills,
  textureSkills,
  musicalitySkills,
} from '../../../constants';
import { useNavigate } from 'react-router-dom';

import s from './currentReview.module.css';

function CurrentReviewDetails({ review }) {
  const [fields, setFields] = useState([]);
  const [title, setTitle] = useState('');

  const [genres, setGenres] = useState(null);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [comments, setComments] = useState(null);
  const [post, setPost] = useState(null);
  const [headers, setHeaders] = useState([]);
  const [newHeader, setNewHeader] = useState('');
  const [newText, setNewText] = useState('');
  const [newExplanation, setNewExplanation] = useState('');
  const [newSuggestion, setNewSuggestion] = useState('');
  const [newObservation, setNewObservation] = useState('');
  const [generalFeedback, setGeneralFeedback] = useState('');
  const [verificationText, setVerificationtext] = useState(null)

  const navigate = useNavigate();


  const checkViabilities = async() => {
    let skillValues = [];
    const feedbackText = headers.reduce(
           (acc, h) => acc + h.header + ' ' + h.text + ' ' + h.explanation + ' ' + h.observation + ' '+ h.suggestion,
           '',
         ); 


    for(let i = 0; i< selectedSkills.length; i++){
      let skill = selectedSkills[i];
      skillValues.push(skill.value);
    
    
    
    


    }

    axios
       .post(
         'http://localhost:4000/routes/check_skill_viabilities_forcomments/within_reviews',
         { comment: feedbackText, skills: skillValues }
        // {
        //   //  withCredentials: true,
        //   //  headers: {
        //   //    'Content-Type': 'application/json',
        //   //    Authorization: `Bearer ${'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'}`,
        //   //    // add any other headers you need here
        //   //  },
        //  },
       )
       .then(response => {
        console.log(response.data);
         setVerificationtext(response.data.choices[0].text);
       })
       .catch(error => {
         console.error(error);
       });


    



  }

  const addField = () => {
    if (!title) {
      return;
    }
    setFields([...fields, { title, value: '' }]);
    setTitle('');
    setHeaders([
           ...headers,
          {
             header: newHeader,
             text: newText,
             explanation: newExplanation,
             observation: newObservation,
             suggestion: newSuggestion,
           },
         ]);
         setNewHeader('');
         setNewText('');
         setNewExplanation('');
         setNewObservation('');
         setNewSuggestion('');
       };
  

  const handleChange = (index, event) => {
    const updatedFields = [...fields];
    updatedFields[index].value = event.target.value;
    setFields(updatedFields);
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
  };

  // const [error, setError] = useState(null);

  // const handleAddHeader = () => {
  //   if (countWords(newText) < 60) {
  //     // Display an error message or handle the validation failure
  //     console.log('Optional Skill Comments must be at least 60 words.');
  //     setError('Optional Skill Comments must be at least 60 words.');
  //     return;
  //   }

  //   if (countWords(newExplanation) < 60) {
  //     console.log('Explanation of skill must be at least 60 words.');
  //     setError('Explanation of skill must be at least 60 words.');
  //     return;
  //   }

  //   if (countWords(newObservation) < 60) {
  //     console.log('Observation in performance must be at least 60 words.');
  //     setError('Observation in performance must be at least 60 words.');
  //     return;
  //   }

  //   if (countWords(newSuggestion) < 60) {
  //     console.log(
  //       'Suggestions for better execution must be at least 60 words.',
  //     );
  //     setError('Suggestions for better execution must be at least 60 words.');
  //     return;
  //   }

  //   setHeaders([
  //     ...headers,
  //     {
  //       header: newHeader,
  //       text: newText,
  //       explanation: newExplanation,
  //       observation: newObservation,
  //       suggestion: newSuggestion,
  //     },
  //   ]);
  //   setNewHeader('');
  //   setNewText('');
  //   setNewExplanation('');
  //   setNewObservation('');
  //   setNewSuggestion('');
  // };

  // const handleGeneralFeedback = event => {};

   

  // Helper function to count words in a string
  // const countWords = text => {
  //   const words = text.trim().split(/\s+/);
  //   return words.length;
  // };

  // const verifyFeedback = async () => {
  //   const feedbackText = headers.reduce(
  //     (acc, h) => acc + h.header + ' ' + h.text + ' ',
  //     '',
  //   );

  //   setIsOpen(!isOpen);

  //   axios
  //     .post(
  //       'http://localhost:4000/routes/check_skill_viabilities_forcomments/within_reviews',
  //       { comment: feedbackText, skills: ['ballet', 'jazz'] },
  //       {
  //         withCredentials: true,
  //         headers: {
  //           'Content-Type': 'application/json',
  //           Authorization: `Bearer ${'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'}`,
  //           // add any other headers you need here
  //         },
  //       },
  //     )
  //     .then(response => {
  //       console.log(response.data);
  //       setVerificationtext(response.data.choices[0].text);
  //     })
  //     .catch(error => {
  //       console.error(error);
  //     });
  // };

  // const close = () => {
  //   setIsOpen(!isOpen);
  // };

  const handlepostFeedback = () => {
    const feedbackText = headers.reduce(
      (acc, h) =>
        acc +
        h.header +
        '\n ' +
        h.text +
        ' ' +
        h.explanation +
        ' ' +
        h.observation +
        ' ' +
        h.suggestion,
      '',
    );

    const feedback = 'General Feedback:' +  " \n" + generalFeedback;

    const finalText = feedbackText + '\n ' + feedback;

    console.log(review.reviewer_id)

    console.log(finalText)

    axios
    .patch(
      'http://localhost:4000/routes/attach_to_reviews',
      {
        review_comments: finalText,
      },
      {
        params: {
          id: review.reviewer_id,
        },
        headers: {
          'Content-Type': 'application/json',
          // add any other headers you need here
        },
      }
    )
    .then(response => {
      console.log(response.data);
      setHeaders([]);
    })
    .catch(error => {
      console.error(error);
    });
  
     navigate('/signedin');
  };

  const fetchPostComments = async () => {
    //let comments = ""

    axios
      .get('http://localhost:4000/routes/getcomments', {
        params: {
          post_id: review.post_id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);
        setComments(response.data.comments);
      })
      .catch(error => {
        console.error(error);
      });
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_post_from_review', {
        params: {
          review_id: review._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        setPost(response.data);
        setGenres(genresOptions.filter(el => response.data.genre === el.value));
        setSelectedSkills(
          response?.data?.additional_skill_keywords?.map(el => {
            const label = el.split(' ');
            return { value: el, label: label[label.length - 1] };
          }),
        );
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  useEffect(() => {


    fetchPostComments();
  }, [])

  const handleGenresChange = selectedOptions => {
    setGenres(selectedOptions);
  };

  const handleSkilsChange = selectedOptions => {
    setSelectedSkills(selectedOptions);
  };

  if (!post) {
    return <strong> No Current Post</strong>;
  }

  return (
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
      <TextArea
          label="General Performance Comments + Suggestions"
          id="GeneralPerformanceComments"
          value={generalFeedback}
          setValue={setGeneralFeedback}
          width={1000}
        />
      <p className={s.preference}>Skill Specific Feedback</p>

      <div className={s.commentsContainer}>
      
        <TextArea
          label="Skill"
          id="AddSkill"
          value={newHeader}
          setValue={setNewHeader}
          width={320}
        />
        {/* <TextArea
          label="General Performance Comments"
          id="GeneralPerformanceComments"
          value={generalFeedback}
          setValue={setGeneralFeedback}
          width={320}
        /> */}
        
        <TextArea
          label="Optional Skill Comments"
          id="OptionalSkillComments"
          value={newText}
          setValue={setNewText}
          width={320}
        />
        <TextArea
          label="Explanation of skill"
          id="ExplanationOfSkill"
          value={newExplanation}
          setValue={setNewExplanation}
          width={320}
        />
        <TextArea
          label="What is an observation in your performance related to the skill?"
          id="ObservationSkill"
          value={newObservation}
          setValue={setNewObservation}
          width={320}
        />
        <TextArea
          label="What are suggestions for  better ways of executing the  skill in the performance?"
          id="ObservationSkill"
          value={newSuggestion}
          setValue={setNewSuggestion}
          width={320}
        />
        {/* {fields.map((field, index) => (
          <div key={index} className={s.textAreaWrapper}>
            <label className={s.label}>{field.title}</label>
            <textarea
              className={s.textarea}
              value={field.value}
              onChange={event => handleChange(index, event)}
            />
          </div>
        ))} */}
      </div>
      <div className={s.addFieldWrapper}>
        <button type="button" onClick={addField} className={s.addField}>
          Add New Skill Field
        </button>
        <Input
          type="text"
          name="title"
          placeholder="Add title for new field"
          value={title}
          onChange={handleTitleChange}
          maxWidth={300}
        />
      </div>
      {verificationText && (
        <TextArea
        label="Feedback Suggestions"
        id="Performercomments"
        placeholder="Suggestions"
        value={verificationText}
        setValue={verificationText}
        isDisabled
      />


      )}

      {comments && (
        <TextArea
          label="Performer comments:"
          id="Performercomments"
          placeholder="Text"
          value={comments}
          setValue={setComments}
          isDisabled
        />
      )}

      <p className={s.preference}>Categorical Preferences:</p>
      {post?.musicality_fields && (
        <CustomPtogressBar
          label="Musicality:"
          values={post.musicality_fields}
          options={musicalitySkills}
          isDisabled
        />
      )}
      {post?.structure_fields && (
        <CustomPtogressBar
          label="Structure:"
          values={post.structure_fields}
          options={structureSkills}
          isDisabled
        />
      )}
      {post?.technique_fields && (
        <CustomPtogressBar
          label="Technique:"
          values={post.technique_fields}
          options={techniqueSkills}
          isDisabled
        />
      )}
      {post?.form_fields && (
        <CustomPtogressBar
          label="Texture:"
          values={post.form_fields}
          options={textureSkills}
          isDisabled
        />
      )}

      {post?.video_field && (
        <video className="video-player" controls>
          <source
            src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`}
            type="video/mp4"
          />
        </video>
      )}

      <Button text="Verify feedback" type="button" onClick={checkViabilities} />

      <Button text="Post feedback" type="button" onClick={handlepostFeedback} />
    </div>
  );
}

export default CurrentReviewDetails;
