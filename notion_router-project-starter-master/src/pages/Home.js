import React, { useState } from 'react';
import Testimonial from '../components/Testimonial';
import {reviewsData} from '../data';

const Home = (props) => {

  const [reviews, setReviews] = useState(reviewsData);
  return (
    <div className='flex justify-center items-center text-white text-3xl h-full'>
      <Testimonial reviews={reviews} setReviews={setReviews} isLoggedIn={props.isLoggedIn} />
    </div>
  );
};

export default Home;