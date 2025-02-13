import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="nav-brand">Henry Fritz</div>
        <ul className="nav-links">
          <li><a href="#home">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#skills">Skills</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <h1>Hi, I'm Henry Fritz</h1>
        <p className="hero-text">Software Engineer</p>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <p>Write a brief introduction about yourself here.</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>My Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Project 1</h3>
            <p>Project description goes here</p>
          </div>
          <div className="project-card">
            <h3>Project 2</h3>
            <p>Project description goes here</p>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          <div className="skill-category">
            <h3>Languages</h3>
            <ul>
              <li>JavaScript</li>
              <li>Python</li>
              {/* Add more skills */}
            </ul>
          </div>
          <div className="skill-category">
            <h3>Technologies</h3>
            <ul>
              <li>React</li>
              <li>Node.js</li>
              {/* Add more technologies */}
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <p>Email: your.email@example.com</p>
          <div className="social-links">
            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="#" target="_blank" rel="noopener noreferrer">GitHub</a>
          </div>
        </div>
      </section>

      <footer>
        <p>&copy; 2024 Henry Fritz. All rights reserved.</p>
      </footer>
    </>
  )
}

export default App
