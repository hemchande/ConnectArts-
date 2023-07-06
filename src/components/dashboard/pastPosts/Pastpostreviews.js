import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Popup from 'reactjs-popup';
import { useNavigate } from 'react-router-dom';
import { ReactComponent as Flag } from '../../../assets/flag.svg';
import { TextArea } from '../../Inputs';
import { Button } from '../../button';
import { timeDifference } from '../../../helpers';

import s from './pastPosts.module.css';

const mockData = [
  {
    time: '1687267349106',
    url: 'https://images-on-off.com/images/129-130/kaknarisovatloshadsmozhetkazhdiy-f745b822.jpg',
    name: 'Olivia Rhye',
    comment: 'Interesting peformance!',
    email: 'test1@gmail.com',
    genre: 'Ballet',
    skills: ['Turn combinations', 'Allegro', 'Extensions'],
    date: '12.12.2012',
    musicality: ['Rhytmic Content', 'Timing Content'],
    structure: ['Spatial Levels', 'Movement Pathways'],
    texture: [
      'Fast + Slow Dynamics',
      'Sudden/Sustained Dynamics',
      'Acceleration + Deceleration ',
    ],
    technique: ['Posture', 'Alignment', 'Balance', 'Coordination'],
  },
  {
    time: '1687265412466',
    url: 'https://images-on-off.com/images/157/sborkadvereykupearisto-5b1654cd.png',
    name: 'Maya Caroll',
    comment: 'Want to know you better!',
    email: 'test2@gmail.com',
    genre: 'Ballet',
    skills: ['Turn combinations', 'Allegro', 'Extensions'],
    date: '12.12.2012',
    musicality: ['Rhytmic Content', 'Timing Content'],
    structure: ['Spatial Levels', 'Movement Pathways'],
    texture: [
      'Fast + Slow Dynamics',
      'Sudden/Sustained Dynamics',
      'Acceleration + Deceleration ',
    ],
    technique: ['Posture', 'Alignment', 'Balance', 'Coordination'],
  },
  {
    time: '1687263432466',
    url: 'https://images-on-off.com/images/143/finansovayaevropiramidaekspobankavebkomp-6bfb26e0.jpg',
    name: 'Andrew Smith',
    comment:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec semper, odio vitae bibendum tincidunt, nulla odio rhoncus ante, non finibus arcu lorem non ligula. Fusce consequat feugiat tincidunt. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Pellentesque eu consequat odio. Nulla id metus ut odio ornare facilisis sed vel magna. Donec enim erat, tristique eget tincidunt sit amet, dictum non ligula. Phasellus ut nisl ornare nisi finibus mattis. Nullam ultricies vel nisl eget mollis. Donec sed nulla tristique, consequat urna ac, consequat nibh. Integer vel enim interdum, lacinia justo ut, varius tellus.',
    email: 'test3@gmail.com',
    genre: 'Ballet',
    skills: ['Turn combinations', 'Allegro', 'Extensions'],
    date: '12.12.2012',
    musicality: ['Rhytmic Content', 'Timing Content'],
    structure: ['Spatial Levels', 'Movement Pathways'],
    texture: [
      'Fast + Slow Dynamics',
      'Sudden/Sustained Dynamics',
      'Acceleration + Deceleration ',
    ],
    technique: ['Posture', 'Alignment', 'Balance', 'Coordination'],
  },
];

function PastPostReviews({ post }) {
   const [reviews, setReviews] = useState([]);
   const [reviewComments, setReviewComments] = useState(null);
   const [postComments, setPostComments] = useState(null);
   const [reviewInfo, setReviewInfo] = useState([]);
  const navigate = useNavigate();

  const handleViewPerformance = () => {
    console.log(new Date().getTime());
  };

   const fetchReviewInfo = () => {
     console.log(reviewComments);

     axios
       .get('http://localhost:4000/routes/users/id/current_post/get_reviews', {
         params: {
           post_id: post._id,
         },
         withCredentials: true,
         headers: {
           'Content-Type': 'application/json',
         },
       })
       .then(response => {
         //console.log(response);
         setReviews(response.data.review_ids);
         setReviewInfo(response.data.reviewer_information);
       })
       .catch(error => {
         console.error(error);
       });
   };

   const fetchPostComments = async () => {
    //let comments = ""

    axios
      .get('http://localhost:4000/routes/getcomments', {
        params: {
          post_id: post._id,
        },
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      })
      .then(response => {
        console.log(response);
        setPostComments(response.data.comments);
      })
      .catch(error => {
        console.error(error);
      });
  };

   const fetchReviewComments = () => {
     try {
       let obj = {};

       for (let i = 0; i <= post.reviewer_ids.length; i++) {
         let revId = post.reviewer_ids[i];

         axios
           .get(
             'http://localhost:4000/routes/display_past_review_feedback_from_reviewid_new',
             {
               params: {
                 rev_id: revId,
                 post_id: post._id,
               },
               withCredentials: true,
               headers: {
                 'Content-Type': 'application/json',
               },
             },
           )
           .then(response => {
             obj[revId] = response.data;
             console.log(obj);
           })
           .catch(error => {
             console.error(error);
           });
       }

       setReviewComments(obj);
     } catch (error) {
       console.error(error);
     }
   };

   useEffect(() => {
     fetchReviewComments();

     fetchReviewInfo();

     fetchPostComments();
   }, []);

  return (
    <div className={s.pastPostContainer}>
      <div className={s.pastPostWrapper}>
        <div className={s.flagIcon}>
          <Flag />
        </div>
        {/* after date will comming from BE add to this field */}
        <h3 className={s.date}>{`Review`}</h3>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Dance Genre:</h4>
          <p className={s.genre}>{post.genre}</p>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Skills:</h4>
          <ul className={s.list}>
            {post.additional_skill_keywords && post.additional_skill_keywords.map((el, index) => (
              <li className={s.listItem} key={`${index}-${el}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Categorical Preferences:</h4>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Musicality:</h4>
          <ul className={s.list}>
            {post.musicality_fields && post.musicality_fields.map((el, index) => (
              <li className={s.skillItem} key={`${index}-${el}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Structure:</h4>
          <ul className={s.list}>
            {post.structure_fields && post.structure_fields.map((el, index) => (
              <li className={s.skillItem} key={`${index}-${el}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Technique:</h4>
          <ul className={s.list}>
            {post.technique_fields && post.technique_fields.map((el, index) => (
              <li className={s.skillItem} key={`${index}-${el}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        <div className={s.wrapper}>
          <h4 className={s.reviewTitle}>Texture:</h4>
          <ul className={s.list}>
            {post.form_fields && post.form_fields.map((el, index) => (
              <li className={s.skillItem} key={`${index}-${el}`}>
                {el}
              </li>
            ))}
          </ul>
        </div>
        {postComments && (
        <TextArea
          isDisabled
          label="Performer comments:"
          placeholder="Text"
          id="ReviewerComments"
          value={postComments} // add to this field comments string from BE
        />

        )} 
        <Button
          text="View Performance"
          type="button"
          onClick={handleViewPerformance}
        />
        {post.video_field && (
        <video className="video-player" controls>
        <source
          src={`http://localhost:4000/routes/get_post_videoFile?filename=${post.video_field}`}
          type="video/mp4"
        />
      </video>
      )}
      </div>
      <div className={s.commentsWrapper}>
        <h3 className={s.date}>View Reviewer comments</h3>
        <div className={s.line}></div>
        { reviewInfo.length > 0 &&  reviewComments && reviewInfo.map((id, index )=> (

          <div key={index}>
            <div className={s.commentInfoWrapper}>
              <div className={s.commentInfo}>
              
                 {/* <img className={s.commentIcon} src={"https://images-on-off.com/images/129-130/kaknarisovatloshadsmozhetkazhdiy-f745b822.jpg"} alt="icon" /> */}
               
                <p className={s.commentTime}>5:00 PM Today</p> 
                <p className={s.commentName}>{reviewInfo[index].name}</p>
               
              </div>
              {/* <p className={s.commentText}>{reviewComments[reviewInfo[index]._id]}</p> */}
              <div> </div>

              <Popup
                contentStyle={{ padding: '26px 32px', minWidth: '320px' }}
                trigger={<p className={s.userLink}>View Feedback</p>}
                position="left top"
              >  <p className={s.commentText}>{reviewComments[reviewInfo[index]._id]}</p>
              </Popup>
        
              <Popup
                contentStyle={{ padding: '26px 32px', minWidth: '320px' }}
                trigger={<p className={s.userLink}>View Profile</p>}
                position="left top"
              >
                <div className={s.commentInfoPopUp}>
                  {/* <img className={s.commentIcon} src={el.url} alt="icon" /> */}
                  <div className={s.user}>
                    <p className={s.name}>{reviewInfo[index].name}</p>
                    {/* <p className={s.mail}>{el?.email}</p> */}
                  </div>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Dance Genre:</h4>
                  <ul className={s.genre}>
                    {reviewInfo[index].genre.map((el, index) => (
                      <li className={s.listItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}</ul>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Skills:</h4>
                  <ul className={s.list}>
                    {reviewInfo[index].skillFields && reviewInfo[index].skillFields.map((el, index) => (
                      <li className={s.listItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>
                    Categorical Preferences:
                  </h4>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Musicality:</h4>
                  <ul className={s.list}>
                    {reviewInfo[index].musicality_fields && reviewInfo[index].musicality_fields.map((el, index) => (
                      <li className={s.skillItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Structure:</h4>
                  <ul className={s.list}>
                    {reviewInfo[index].structure_fields && reviewInfo[index].structure_fields.map((el, index) => (
                      <li className={s.skillItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Technique:</h4>
                  <ul className={s.list}>
                    { reviewInfo[index].technique_fields && reviewInfo[index].technique_fields.map((el, index) => (
                      <li className={s.skillItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={s.wrapperPopup}>
                  <h4 className={s.reviewTitlePopup}>Texture:</h4>
                  <ul className={s.list}>
                    {reviewInfo[index].form_fields && reviewInfo[index].form_fields.map((el, index) => (
                      <li className={s.skillItemPopup} key={`${index}-${el}`}>
                        {el}
                      </li>
                    ))}
                  </ul>
                </div>
              </Popup>
            </div>
            {/* <p className={s.commentText}>{reviewComments[reviewInfo[index]._id]}</p> */}
          </div>
        ))}
      </div>
    </div>
  );
}


export default PastPostReviews;
