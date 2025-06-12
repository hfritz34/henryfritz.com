import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import '../styles/AnimatedText.css';

const AnimatedText = () => {
  return (
    <div className="animated-text-container">
      <TypeAnimation
        sequence={[
          'Hi, I\'m',
          1000,
          'Hi, I\'m a Developer',
          2000,
          'Hi, I\'m an Architect',
          2000,
          'Hi, I\'m a Builder',
          2000,
        ]}
        wrapper="span"
        speed={30}
        deletionSpeed={20}
        repeat={Infinity}
        className="animated-text"
        cursor={true}
      />
      <h1 className="name-text">Henry Fritz</h1>
    </div>
  );
};

export default AnimatedText; 