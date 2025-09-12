import React from 'react';
import '../styles/Experience.css';
import aigLogo from '../assets/aig.png';
import ibmLogo from '../assets/ibm.png';
import ohioStateLogo from '../assets/OhioStAthlWhite_0.png';
import neudesicLogo from '../assets/neudesic.png';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <h2>Where I've Worked</h2>
      <div className="logo-grid">
        <div className="logo-item">
          <img src={aigLogo} alt="AIG" />
        </div>
        <div className="logo-item">
          <img src={ibmLogo} alt="IBM" />
        </div>
        <div className="logo-item">
          <img src={ohioStateLogo} alt="Ohio State" />
        </div>
        <div className="logo-item">
          <img src={neudesicLogo} alt="Neudesic" />
        </div>
      </div>
    </section>
  );
};

export default Experience; 