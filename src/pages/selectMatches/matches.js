import { useEffect, useState } from 'react';
import { useAuth } from '../../components/firebase/AuthContext';
import axios from 'axios';
import Navbar from '../../components/navBar/navbar';
import ReviewerOption from '../../components/reviewerOption/reviewerOption';
import { Button } from '../../components/button';

import s from './matches.module.css';

const Matches = () => {
  const { currentUser } = useAuth();
  const uid = currentUser?.uid || null;
  //  'sBhbdxxlDFaGwKPs96lK7MB5nNm2'

  const [revs, setRevs] = useState(null);
  const [info, setInfo] = useState(null);
  const [revPrefs, setPrefs] = useState(null);
  const [genre, setGenre] = useState(null);
  const [post, setPost] = useState(null);
  const [targetVector, setTargetVector] = useState(null);
  const [selectedArray, setSelectedArray] = useState([]);
  const [performer, setPerformer] = useState(null);
  //const [loading, setLoading] = useState(true);

  const updateReviewers = async () => {
    try {
      const requestBody = {
        post_id: post._id,
        reviewer_ids: selectedArray,
      };

      const response = await axios.patch(
        'http://localhost:4000/routes/reviewers/post_id',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      //setRevs(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const createReviews = async () => {
    try {
      const requestBody = {
        post_id: post._id,
        reviewer_ids: selectedArray,
        performer_choreographer_id: performer._id,
      };

      const response = await axios.post(
        'http://localhost:4000/routes/new_reviews',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      //setRevs(response.data);
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const updatePost = async () => {
    try {
      const requestBody = {
        userId: performer._id,
        reviewer_ids: selectedArray,
      };

      const response = await axios.patch(
        'http://localhost:4000/routes/post/userId',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data);
      //setRevs(response.data);
      //navigate(response.data.url);
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const checkoutReviewers = async () => {
    try {
      const requestBody = {
        reviewer_ids: selectedArray,
      };

      const response = await axios.post(
        'http://localhost:4000/routes/stripe-reviewer_checkouts',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response.data.url);
      //setRevs(response.data);
      //navigate(response.data.url)
      window.location.href = response.data.url;
    } catch (error) {
      console.error(error);
      // Handle the error as necessary
    }
  };

  const handleSubmit = () => {
    if(selectedArray.length > 0 ){
    updatePost();
    updateReviewers();
    createReviews();
     checkoutReviewers();

    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:4000/routes/get_id_from_firebaseuid', {
        params: {
          firebase_id: "CcsrSq09V1OpkDg9YWgKhmxgMbS2",
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        //console.log(response);
        setPerformer(response.data);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        window.location.href = "/"
      });
  }, [uid]);

  useEffect(() => {
    const get_post = () => {
      axios
        .get('http://localhost:4000/routes/users/id/current_post', {
          params: {
            id: performer._id,
          },
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
          },
        })
        .then(response => {
          //console.log(response);
          setPost(response.data.current_post);
          console.log(response.data);
        })
        .catch(error => {
          console.error(error);
        });
    };

    if (performer) {
      get_post();
    }
  }, [performer]);

  useEffect(() => {
    const getPostDetails = async () => {
      try {
        const requestBody = {
          postId: post._id,
        };

        const response = await axios.post(
          'http://localhost:4000/routes/get_performer_skills_genre_frompost',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response.data);
        //setRevs(response.data);
        setTargetVector(response.data.prefs);
        setGenre(response.data.genre);
      } catch (error) {
        console.error(error);
        // Handle the error as necessary
      }
    };

    if (post) {
      getPostDetails();
    }
  }, [post]);

  useEffect(() => {
    const getPerformerVector = async () => {
      try {
        const requestBody = {
          genres: [genre],
        };
        const response = await axios.post(
          'http://localhost:4000/routes/reviewer_roles_and_skills2',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        //console.log(response.data);
        console.log(genre);
        setRevs(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error as necessary
      }
    };

    if (genre) {
      console.log([genre]);
      getPerformerVector();
    }

    if (genre) {
      getPerformerVector();
    }
  }, [genre]);

  useEffect(() => {
    const getallInfo = async () => {
      try {
        const requestBody = {
          genres: [genre],
        };

        const response = await axios.post(
          'http://localhost:4000/routes/reviewer_info',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        console.log(response.data);
        setInfo(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error as necessary
      }
    };

    if (genre) {
      getallInfo();
    }
  }, [genre]);

  useEffect(() => {
    //console.log(revPrefs);

    const getDistances = async () => {
      try {
        const requestBody = {
          genre: genre,
          preferences: revs,
          targetVector: targetVector,
        };

        const response = await axios.post(
          'http://localhost:4000/routes/reviewers_total_pref_distances',
          requestBody,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );

        console.log(response.data);
        setPrefs(response.data);
      } catch (error) {
        console.error(error);
        // Handle the error as necessary
      }
    };

    if (genre && revs && targetVector) {
      getDistances();
    }

    //getDistances();
  }, [revs, genre, targetVector]);

  return (
    <>
      <Navbar />
      <div className={s.container}>
        {!revs && <p className={s.empty}> No Reviewer Matches at this time </p>}
        {revs && info && revPrefs && (
          <>
            <div className={s.reviewerContainer}>
              {Object.keys(revs).map(reviewer => (
                <ReviewerOption
                  key={reviewer}
                  user={info[reviewer]}
                  setSelectedPosts={setSelectedArray}
                  selectedPosts={selectedArray}
                />
              ))}
            </div>
            <Button
              type="button"
              text="Confirm matches"
              onClick={handleSubmit}
              center
            />
          </>
        )}
      </div>
    </>
  );
};

export default Matches;
