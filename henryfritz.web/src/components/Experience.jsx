import React from 'react';
import '../styles/Experience.css';
import aigLogo from '../assets/aig_blue.png';
import ibmLogo from '../assets/ibm-logo-transparent.png';
import ohioStateLogo from '../assets/Ohio_State_Buckeyes_logo.svg.png';
import domumLogo from '../domum_gym.png';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <h2>Where I've Worked</h2>
      <div className="logo-grid">
        <div className="logo-item logo-top-left">
          <img src={ibmLogo} alt="IBM" />
        </div>
        <div className="logo-item logo-top-right">
          <img src={aigLogo} alt="AIG" />
        </div>
        <div className="logo-item logo-bottom-left">
          <img src={domumLogo} alt="Domum Gym" />
        </div>
        <div className="logo-item logo-bottom-right">
          <img src={ohioStateLogo} alt="Ohio State" />
        </div>
      </div>
    </section>
  );
};

export default Experience;
