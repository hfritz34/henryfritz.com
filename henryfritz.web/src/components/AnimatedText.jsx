import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/AnimatedText.css';

const AnimatedText = () => {
  return (
    <div className="animated-text-container">
      <div className="text-with-cursor">
        <TypeAnimation
          sequence={[
            'Hi, I\'m',
            1000,
            'Hi, I\'m a Developer.',
            2000,
            'Hi, I\'m an Architect.',
            2000,
            'Hi, I\'m a Builder.',
            2000,
            'Hi, I\'m a Creative.',
            2000,
          ]}
          wrapper="span"
          speed={30}
          deletionSpeed={20}
          repeat={Infinity}
          className="animated-text"
          cursor={false}
          style={{ display: 'inline-block' }}
        />
        <span className="custom-cursor">|</span>
      </div>
      <h1 className="name-text">Henry Fritz</h1>
    </div>
  );
};

export default AnimatedText; 