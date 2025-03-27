import React, { useState } from 'react';
import './Carousel.css';

const Carousel = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const getImageClass = (index) => {
    const total = images.length;
    const diff = (index - currentIndex + total) % total;
    
    if (diff === 0) return 'carousel-image center';
    if (diff === 1) return 'carousel-image right';
    if (diff === total - 1) return 'carousel-image left';
    return 'carousel-image back';
  };

  const handleClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const isRightHalf = x > rect.width / 2;
    
    setCurrentIndex((prev) => {
      if (isRightHalf) {
        return (prev + 1) % images.length;
      } else {
        return (prev - 1 + images.length) % images.length;
      }
    });
  };

  return (
    <div className="carousel-container">
      <div className="carousel" onClick={handleClick}>
        <div className="carousel-content">
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Project screenshot ${index + 1}`}
              className={getImageClass(index)}
            />
          ))}
        </div>
      </div>
      <div className="carousel-dots">
        {images.map((_, index) => (
          <button
            key={index}
            className={`carousel-dot ${index === currentIndex ? 'active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(index);
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel; 