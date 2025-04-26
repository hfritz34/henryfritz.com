import React from 'react';
import logoUrl from '../assets/logo.svg'; // Import the URL directly

const Logo = ({ width = 40, height = 40 }) => {
  return (
    <img 
      src={logoUrl} 
      alt="Henry Fritz Logo" 
      width={width} 
      height={height} 
    />
  );
};

export default Logo; 