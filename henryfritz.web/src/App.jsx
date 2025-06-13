import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import './styles/About.css'
import './styles/Skills.css'
import './styles/Resume.css'
import './styles/Projects.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import MyThings from './components/MyThings'
import headshot from './assets/headshot.jpeg'
import henryJpg from './assets/adventure.jpg'
import thewaterJpeg from './assets/thewater.jpeg'
import vinlandJpeg from './assets/vinland.jpeg'
import studyMethodLogo from './assets/studymethod-logo.png'
import worrdayLogo from './assets/worrday-logo.png'
import prestigeImage1 from './assets/image1.png'
import prestigeImage2 from './assets/image2.png'
import prestigeImage3 from './assets/image3.png'
import prestigeImage4 from './assets/image4.png'
import neudesicLogo from './assets/neudesic-logo.png'
import alphabetLogo from './assets/alphabetlogo.png'
import ResumeViewer from './components/ResumeViewer'; // Import the new component
import AnimatedText from './components/AnimatedText';
import HeroV2 from './components/HeroV2';
import PhotoGallery from './components/PhotoGallery';
import Experience from './components/Experience';

function App() {
  const galleryImages = [
    { src: henryJpg, alt: 'Henry Fritz', orientation: 'vertical' },
    { src: thewaterJpeg, alt: 'Water', orientation: 'horizontal' },
    { src: vinlandJpeg, alt: 'Vinland', orientation: 'horizontal' },
  ];

  return (
    <>
      <Navbar />
      <div id="home"></div>
      <div className="app">
        <HeroV2 />
        {/* About Section */}
        <section id="about" className="about">
          <div className="about-content">
            <h2>About Me</h2>
            <p> I am a Computer Science student at The Ohio State University, graduating May 2026. Currently in the University Honors Program. Passionate about software development with experience in cloud engineering, full-stack development, and mobile development.</p>
            <p>I thrive on turning complex problems into elegant solutions and am constantly exploring new technologies to expand my skill set. My experience ranges from developing iOS applications to working with cloud platforms like Azure and AWS.</p>
            <p>Outside of coding, I enjoy contributing to the tech community through teaching and mentoring, helping others discover their passion for software development.</p>
          </div>
          <div className="about-image">
            <img src={headshot} alt="Henry Fritz" className="headshot" />
          </div>
        </section>

        <Experience />

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2>My Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>AlphaBet</h3>
              <p>Building a new way to bet on sports with friends</p>
              <a href="https://joinalphabet.com/" target="_blank" rel="noopener noreferrer">View Project</a>
              <div className="project-logo">
                <img src={alphabetLogo} alt="AlphaBet Logo" className="company-logo" />
              </div>
            </div>
            <div className="project-card">
              <h3>Prestige</h3>
              <p>Music Social Network Platform with Spotify Integration</p>
              <a href="https://github.com/hfritz34/Prestige" target="_blank" rel="noopener noreferrer">View Project</a>
              <Carousel 
                images={[prestigeImage1, prestigeImage2, prestigeImage3, prestigeImage4]} 
              />
            </div>
            <div className="project-card">
              <h3>iOS Development</h3>
              <p>Published multiple successful applications to the iOS App Store, generating 34,000+ organic impressions and 2,000+ downloads across 22 countries.</p>
              <div className="ios-apps">
                <div className="app-card">
                  <a href="https://apps.apple.com/us/app/studymethod/id1589023481" target="_blank" rel="noopener noreferrer">
                    <img src={studyMethodLogo} alt="StudyMethod App" className="app-logo" />
                    <div className="app-name">StudyMethod</div>
                  </a>
                </div>
                <div className="app-card">
                  <a href="https://apps.apple.com/us/app/worrday/id6451059203" target="_blank" rel="noopener noreferrer">
                    <img src={worrdayLogo} alt="Worrday App" className="app-logo" />
                    <div className="app-name">Worrday</div>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="skills">
          <h2>Skills</h2>
          <div className="skills-grid">
            <div className="skill-category">
              <h3>Languages</h3>
              <div className="skill-list">
                <span className="skill-item">Python</span>
                <span className="skill-item">TypeScript</span>
                <span className="skill-item">JavaScript</span>
                <span className="skill-item">Swift</span>
                <span className="skill-item">Java</span>
                <span className="skill-item">C</span>
                <span className="skill-item">C++</span>
                <span className="skill-item">Dart</span>
                <span className="skill-item">COBOL</span>
                <span className="skill-item">SQL</span>
                <span className="skill-item">HTML</span>
                <span className="skill-item">CSS</span>
                <span className="skill-item">XML</span>
                <span className="skill-item">Ruby</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Developer Tools</h3>
              <div className="skill-list">
                <span className="skill-item">Azure</span>
                <span className="skill-item">AWS</span>
                <span className="skill-item">Git</span>
                <span className="skill-item">Postman</span>
                <span className="skill-item">Docker</span>
                <span className="skill-item">Prisma</span>
                <span className="skill-item">Jira</span>
                <span className="skill-item">MongoDB</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Libraries & Frameworks</h3>
              <div className="skill-list">
                <span className="skill-item">ReactJS</span>
                <span className="skill-item">NextJS</span>
                <span className="skill-item">NodeJS</span>
                <span className="skill-item">Flutter</span>
                <span className="skill-item">PostgreSQL</span>
                <span className="skill-item">VueJS</span>
                <span className="skill-item">Flask</span>
                <span className="skill-item">AngularJS</span>
                <span className="skill-item">ASP.NET</span>
                <span className="skill-item">Express.js</span>
              </div>
            </div>
            <div className="skill-category">
              <h3>Certifications</h3>
              <div className="skill-list">
                <span className="skill-item">Microsoft Azure Fundamentals</span>
                <span className="skill-item">IBM Z Xplore Concepts</span>
                <span className="skill-item">Academind Flutter & Dart</span>
              </div>
            </div>
          </div>
        </section>

        {/* Resume Section */}
        <section id="resume" className="resume">
          <h2>Resume</h2>
          <div className="resume-content">
            <ResumeViewer fileUrl="/resume.pdf" />
            <div className="resume-download-link">
              Having trouble viewing? <a href="/resume.pdf" target="_blank" rel="noopener noreferrer">Download PDF</a>
            </div>
          </div>
        </section>

        {/* My Things Section */}
        <MyThings />

        <PhotoGallery images={galleryImages} />

        {/* Contact Section */}
        <section id="contact" className="contact">
          <h2>Get In Touch</h2>
          <div className="contact-info">
            <p>Email: henryfritz02@gmail.com</p>
            <p>Phone: (440) 773-6213</p>
            <div className="social-links">
              <a href="https://www.linkedin.com/in/henry-fritz-6049a3268/" target="_blank" rel="noopener noreferrer">LinkedIn </a>
              <a href="https://github.com/hfritz34" target="_blank" rel="noopener noreferrer">GitHub</a>
            </div>
          </div>
        </section>

        <footer>
          <p>&copy; 2024 Henry Fritz. All rights reserved.</p>
        </footer>
      </div>
    </>
  )
}

export default App
