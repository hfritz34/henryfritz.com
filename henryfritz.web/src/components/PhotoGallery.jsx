import React from 'react';
import '../styles/PhotoGallery.css';

const PhotoGallery = ({ images }) => {
  const verticalImage = images.find(img => img.orientation === 'vertical');
  const horizontalImages = images.filter(img => img.orientation === 'horizontal');

  return (
    <section className="photo-gallery">
      <h2>Scenery</h2>
      <div className="photo-gallery-grid">
        {verticalImage && (
          <div className="photo-container vertical">
            <img src={verticalImage.src} alt={verticalImage.alt} className="gallery-photo" />
          </div>
        )}
        {horizontalImages.map((image, index) => (
          <div key={index} className="photo-container horizontal">
            <img src={image.src} alt={image.alt} className="gallery-photo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery; 