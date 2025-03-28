import React from 'react';
import '../styles/BeatVisualizer.css';

const BeatVisualizer = ({ color = '#4ade80', isPlaying = false }) => {
  // Create bars with different delays and colors
  const bars = Array.from({ length: 32 }, (_, i) => {
    // Calculate a slightly different shade of green for each bar
    const hue = 142 + (i % 4) * 2; // Base green hue with slight variations
    const lightness = 45 + (i % 3) * 5; // Varying lightness
    const baseColor = `hsl(${hue}, 84%, ${lightness}%)`;
    
    return {
      delay: `${(i % 8) * 0.15}s`,
      color: baseColor
    };
  });

  return (
    <div className="beat-visualizer">
      {bars.map((bar, index) => (
        <div
          key={index}
          className={`bar ${isPlaying ? 'playing' : ''}`}
          style={{
            backgroundColor: bar.color,
            '--delay': bar.delay
          }}
        />
      ))}
    </div>
  );
};

export default BeatVisualizer;