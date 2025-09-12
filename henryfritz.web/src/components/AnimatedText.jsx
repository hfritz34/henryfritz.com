import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/AnimatedText.css';

const AnimatedText = () => {
  return (
    <div className="animated-text-container">
      <h1 className="name-text">Hi, I'm Henry</h1>
      <div className="text-with-cursor">
        <TypeAnimation
          sequence={[
            'I build apps.',
            3000,
            'I solve problems.',
            3000,
            'I design experiences.',
            3000,
            'I connect people.',
            3000,
          ]}
          wrapper="span"
          speed={40}
          deletionSpeed={15}
          repeat={Infinity}
          className="animated-text"
          cursor={false}
          style={{ display: 'inline-block' }}
        />
        <span className="custom-cursor">|</span>
      </div>
    </div>
  );
};

export default AnimatedText; 