import React from 'react';

const ContactDotsBackdrop = () => {
  return (
    <div
      aria-hidden
      className="contact-dots-backdrop"
    >
      <div className="contact-dots-base" />
      <div className="contact-dots-grid" />
      <div className="contact-dots-depth" />
      <div className="contact-dots-ring" />
    </div>
  );
};

export default ContactDotsBackdrop;


