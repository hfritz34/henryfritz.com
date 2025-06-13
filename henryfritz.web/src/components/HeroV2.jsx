import React from 'react';
import '../styles/HeroV2.css';
import AnimatedText from './AnimatedText';

const HeroV2 = () => {
  return (
    <section className="hero-v2">
      <div className="hero-v2-container">
        <div className="hero-v2-grid">
          <div className="bullet-h" style={{ top: '20%', animationDelay: '0s' }}></div>
          <div className="bullet-h" style={{ top: '65%', animationDelay: '3s' }}></div>
          <div className="bullet-v" style={{ left: '30%', animationDelay: '1.5s' }}></div>
          <div className="bullet-v" style={{ left: '70%', animationDelay: '4.5s' }}></div>
        </div>
        <div className="hero-v2-content">
          <AnimatedText />
          <p className="hero-v2-tagline">Software Engineer | Student at The Ohio State University</p>
          <div className="hero-v2-buttons">
            <a href="#about" className="hero-v2-button primary">About Me</a>
            <a href="#projects" className="hero-v2-button secondary">My Projects</a>
          </div>
        </div>
      </div>
      <canvas className="hero-v2-canvas"></canvas>
    </section>
  );
};

export default HeroV2; 