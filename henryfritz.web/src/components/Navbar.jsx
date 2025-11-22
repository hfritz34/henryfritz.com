import React, { useState } from 'react';
import '../styles/Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <input 
        type="checkbox" 
        id="menuToggle" 
        checked={isMenuOpen}
        onChange={toggleMenu}
      />
      <label htmlFor="menuToggle" className="menu-toggle-label">
        <span className="bar top"></span>
        <span className="bar middle"></span>
        <span className="bar bottom"></span>
      </label>

      <aside className="fullscreen-menu">
        <ul className="aside-list">
          <li><a href="#home" className="aside-anchor" onClick={closeMenu}>Home</a></li>
          <li><a href="#about" className="aside-anchor" onClick={closeMenu}>About</a></li>
          <li><a href="#projects" className="aside-anchor" onClick={closeMenu}>Projects</a></li>
          <li><a href="#skills" className="aside-anchor" onClick={closeMenu}>Skills</a></li>
          <li><a href="#my-things" className="aside-anchor" onClick={closeMenu}>My Things</a></li>
          <li><a href="#contact" className="aside-anchor" onClick={closeMenu}>Contact</a></li>
        </ul>
      </aside>
    </>
  );
};

export default Navbar;
