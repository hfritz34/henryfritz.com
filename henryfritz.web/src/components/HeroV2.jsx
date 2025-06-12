import React from 'react';
import '../styles/HeroV2.css';
import AnimatedText from './AnimatedText';

const HeroV2 = () => {
  return (
    <section className="hero-v2">
      <div className="hero-v2-container">
        <div className="hero-v2-grid">
          {/* Grid lines will be generated using CSS */}
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