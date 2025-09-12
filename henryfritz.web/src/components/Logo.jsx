import React from 'react';

const Logo = ({ width = 40, height = 40 }) => {
  // Option 1: Gradient HF initials
  const LogoOption1 = () => (
    <div style={{
      fontSize: `${width * 0.6}px`,
      fontWeight: '800',
      background: 'linear-gradient(135deg, #f472b6, #c084fc)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'Satoshi, sans-serif',
      width: width,
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      letterSpacing: '-0.1em'
    }}>
      HF
    </div>
  );
  
  // Option 2: Hexagon with H
  const LogoOption2 = () => (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="hexGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <polygon 
        points="30,20 70,20 85,50 70,80 30,80 15,50" 
        fill="url(#hexGradient)" 
        stroke="rgba(255,255,255,0.1)" 
        strokeWidth="1"
      />
      <text 
        x="50" 
        y="58" 
        textAnchor="middle" 
        fill="white" 
        fontSize="32" 
        fontWeight="700" 
        fontFamily="Satoshi, sans-serif"
      >
        H
      </text>
    </svg>
  );
  
  // Option 3: Modern geometric H
  const LogoOption3 = () => (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="hGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4ff" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      <rect x="20" y="25" width="8" height="50" fill="url(#hGradient)" rx="4" />
      <rect x="72" y="25" width="8" height="50" fill="url(#hGradient)" rx="4" />
      <rect x="28" y="46" width="44" height="8" fill="url(#hGradient)" rx="4" />
    </svg>
  );

  // Option 6: Modern geometric HMF
  const LogoOption6 = () => (
    <svg width={width} height={height} viewBox="0 0 160 100">
      <defs>
        <linearGradient id="hmfGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2dd4ff" />
          <stop offset="50%" stopColor="#f472b6" />
          <stop offset="100%" stopColor="#c084fc" />
        </linearGradient>
      </defs>
      {/* H - Left letter */}
      <rect x="10" y="25" width="6" height="50" fill="url(#hmfGradient)" rx="3" />
      <rect x="30" y="25" width="6" height="50" fill="url(#hmfGradient)" rx="3" />
      <rect x="16" y="46" width="20" height="6" fill="url(#hmfGradient)" rx="3" />
      
      {/* M - Middle letter */}
      <rect x="50" y="25" width="6" height="50" fill="url(#hmfGradient)" rx="3" />
      <rect x="94" y="25" width="6" height="50" fill="url(#hmfGradient)" rx="3" />
      <polygon points="56,25 72,45 88,25 88,32 75,48 69,48 56,32" fill="url(#hmfGradient)" />
      
      {/* F - Right letter */}
      <rect x="114" y="25" width="6" height="50" fill="url(#hmfGradient)" rx="3" />
      <rect x="120" y="25" width="26" height="6" fill="url(#hmfGradient)" rx="3" />
      <rect x="120" y="46" width="18" height="6" fill="url(#hmfGradient)" rx="3" />
    </svg>
  );
  
  // Option 4: Circular badge with HF
  const LogoOption4 = () => (
    <svg width={width} height={height} viewBox="0 0 100 100">
      <defs>
        <linearGradient id="circleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#c084fc" />
          <stop offset="100%" stopColor="#f472b6" />
        </linearGradient>
      </defs>
      <circle 
        cx="50" 
        cy="50" 
        r="35" 
        fill="url(#circleGradient)" 
        stroke="rgba(255,255,255,0.2)" 
        strokeWidth="2"
      />
      <text 
        x="50" 
        y="58" 
        textAnchor="middle" 
        fill="white" 
        fontSize="20" 
        fontWeight="700" 
        fontFamily="Satoshi, sans-serif"
      >
        HF
      </text>
    </svg>
  );
  
  // Option 5: Code brackets </>
  const LogoOption5 = () => (
    <div style={{
      fontSize: `${width * 0.7}px`,
      fontWeight: '600',
      background: 'linear-gradient(135deg, #2dd4ff, #c084fc, #f472b6)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      fontFamily: 'JetBrains Mono, monospace',
      width: width,
      height: height,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      {"</>"}  
    </div>
  );
  
  // Return Option 6 by default (HMF version of the geometric design)
  return <LogoOption6 />;
};

export default Logo; 