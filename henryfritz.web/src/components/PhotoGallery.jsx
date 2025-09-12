import React from 'react';
import '../styles/PhotoGallery.css';

const PhotoGallery = ({ images }) => {
  return (
    <section className="photo-gallery">
      <h2>Scenery</h2>
      <div className="photo-gallery-grid">
        {images.map((image, index) => (
          <div key={index} className={`photo-container ${image.orientation}`}>
            <img src={image.src} alt={image.alt} className="gallery-photo" />
          </div>
        ))}
      </div>
    </section>
  );
};

export default PhotoGallery; 