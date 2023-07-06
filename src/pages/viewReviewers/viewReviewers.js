//genre, pay range,

import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Navbar from '../../components/navBar/navbar';
import { genresOptions } from '../../constants';
import { Button } from '../../components/button';
import { Input } from '../../components/Inputs';
import ReviewerOption from '../../components/reviewerOption/reviewerOption';
import CustomSelect from '../../components/select/select';
import s from './viewReviewers.module.css';

import { useAuth } from '../../components/firebase/AuthContext';

function ViewReviewers() {
  const { currentUser } = useAuth();
  const [desiredPayRange, setDesiredPayRange] = useState({
    from: '0',
    to: '0',
  });
  const [selectedArray, setSelectedArray] = useState([]);
  const [genre, setGenre] = useState(null);
  const uid = currentUser?.uid || null;
  //const uid = currentUser?.uid || null;
  const [testReviewers, setReviewers] = useState([]);

  const handleGenreChange = selectedOptions => {
    setGenre(selectedOptions);
  };

  useEffect(() => {
    // axios
    //   .get('http://localhost:4000/routes/') // replace with your API endpoint
    //   .then(response => {
    //     if (response.status === 200) {
    //       console.log('Connection was successful');
    //     } else {
    //       console.log('Connection was not successful');
    //     }
    //   })
    //   .catch(error => {
    //     console.log('Error:', error.message);
    //   });

  
  }, []);

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
        //setId(response.data._id);
        console.log(response.data);
      })
      .catch(error => {
        console.error(error);
        window.location.href = "/"
      });
  }, [uid]);

 

  const findReviewers = async () => {
    if (!genre?.value) {
      return alert('Select Genre');
    }
    axios
      .post('http://localhost:4000/routes/reviewers_genre_pay', {
        genres: genre.value,
        lower: desiredPayRange?.from,
        upper: desiredPayRange?.to,
      })
      .then(response => {
        console.log(genre);
        console.log(response.data);
        //setpostId(response.data)
        setReviewers(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className={s.filterWrapper}>
        <div className={s.genreContainer}>
          <CustomSelect
            options={genresOptions}
            onChange={handleGenreChange}
            value={genre}
            label="Dance Genre"
            id="genresSelect"
          />
        </div>
        <div>
          <p className={s.text}>Desired Pay Range</p>
          <div className={s.priceContainer}>
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
        </div>
        <Button text="Search" type="button" onClick={findReviewers} />
      </div>
      <div className={s.container}>
        {testReviewers.length > 0 ? (
          <div className={s.reviewerContainer}>
            {testReviewers.map(reviewer => (
              <ReviewerOption
                key={reviewer}
                user={reviewer}
                setSelectedPosts={setSelectedArray}
                selectedPosts={selectedArray}
              />
            ))}
          </div>
        ) : (
          <p>No reviewers available at this time.</p>
        )}
      </div>
    </>
  );
}

export default ViewReviewers;
