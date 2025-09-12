import React from 'react';
import '../styles/HeroV2.css';
import AnimatedText from './AnimatedText';

const HeroV2 = () => {
  return (
    <section className="hero-v2">
      {/* Half-and-Half Spotlight Effect */}
      <div className="spotlight-effects" aria-hidden="true">
        <div className="spotlight"></div>
      </div>
      
      {/* Grid background - positioned at hero section level */}
      <div className="hero-v2-grid">
        {/* Horizontal shooting stars */}
        <div className="bullet-h" style={{ top: '15%', animationDelay: '0s' }}></div>
        <div className="bullet-h" style={{ top: '35%', animationDelay: '1.5s' }}></div>
        <div className="bullet-h" style={{ top: '55%', animationDelay: '3s' }}></div>
        <div className="bullet-h" style={{ top: '75%', animationDelay: '4.5s' }}></div>
        <div className="bullet-h" style={{ top: '85%', animationDelay: '6s' }}></div>
        
        {/* Vertical shooting stars */}
        <div className="bullet-v" style={{ left: '15%', animationDelay: '0.8s' }}></div>
        <div className="bullet-v" style={{ left: '30%', animationDelay: '2.3s' }}></div>
        <div className="bullet-v" style={{ left: '50%', animationDelay: '3.8s' }}></div>
        <div className="bullet-v" style={{ left: '70%', animationDelay: '5.3s' }}></div>
        <div className="bullet-v" style={{ left: '85%', animationDelay: '1.3s' }}></div>
        
        {/* Additional mobile-only stars */}
        <div className="bullet-v mobile-only" style={{ left: '10%', animationDelay: '2.8s' }}></div>
        <div className="bullet-h mobile-only" style={{ top: '25%', animationDelay: '4.3s' }}></div>
      </div>
      
      <div className="hero-v2-container">
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