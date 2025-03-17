import React from 'react';
import { Link } from 'react-router-dom';
import './landingintro.css';

const LandingIntro = () => {
  return(
    <div className="hero min-h-full rounded-l-xl bg-base-200 landing-img">
      <div className="hero-content py-12">
        <div className="max-w-md">
          <h1 className='text-3xl text-center font-bold'><Link to={'/'}>StayTrack</Link></h1>              
        </div>
      </div>
    </div>
  )
}

export default LandingIntro