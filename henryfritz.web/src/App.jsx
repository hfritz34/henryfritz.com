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
        <p className="hero-text">Software Engineer | Student at The Ohio State University</p>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <h2>About Me</h2>
        <p>Computer Science student at The Ohio State University, graduating May 2026. Currently in the University Honors Program. Passionate about software development with experience in cloud engineering, full-stack development, and teaching.</p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="projects">
        <h2>My Projects</h2>
        <div className="project-grid">
          <div className="project-card">
            <h3>Prestige</h3>
            <p>Music Social Network Platform with Spotify Integration</p>
            <a href="https://github.com/hfritz34/Prestige" target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
          <div className="project-card">
            <h3>Neudesic Project</h3>
            <p>Loan-amortization calculator project developed during internship</p>
            <a href="https://github.com/hfritz34/neudesic-project" target="_blank" rel="noopener noreferrer">View Project</a>
          </div>
          <div className="project-card">
            <h3>iOS Development</h3>
            <p>Published multiple successful applications to the iOS App Store, generating 34,000+ organic impressions and 2,000+ downloads across 22 countries.</p>
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
              <li>Python</li>
              <li>TypeScript</li>
              <li>JavaScript</li>
              <li>Swift</li>
              <li>Java</li>
              <li>C/C++</li>
              <li>COBOL</li>
            </ul>
          </div>
          <div className="skill-category">
            <h3>Technologies</h3>
            <ul>
              <li>Azure</li>
              <li>AWS</li>
              <li>React</li>
              <li>Node.js</li>
              <li>Flutter</li>
              <li>PostgreSQL</li>
              <li>MongoDB</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <h2>Get In Touch</h2>
        <div className="contact-info">
          <p>Email: henryfritz02@gmail.com</p>
          <p>Phone: (440) 773-6213</p>
          <p>Location: Rocky River, Ohio</p>
          <div className="social-links">
            <a href="https://www.linkedin.com/in/henry-fritz-6049a3268/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a href="https://github.com/hfritz34" target="_blank" rel="noopener noreferrer">GitHub</a>
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
