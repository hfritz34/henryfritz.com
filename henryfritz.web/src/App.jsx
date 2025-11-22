import { useState, useEffect } from 'react'
import useResponsive from './hooks/useResponsive'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'
import './styles/About.css'
import './styles/Skills.css'
import './styles/Projects.css'
import './styles/mobile.css'
import './styles/responsive.css'
import Navbar from './components/Navbar'
import Carousel from './components/Carousel'
import MyThings from './components/MyThings'
import headshot from './assets/headshot.jpeg'
import henryJpg from './assets/adventure.jpg'
import thewaterJpeg from './assets/thewater.jpeg'
import vinlandJpeg from './assets/vinland.jpeg'
import archJpeg from './assets/arch.jpeg'
import djJpeg from './assets/dj.jpeg'
import alleyJpeg from './assets/alley.jpeg'
import studyMethodLogo from './assets/studymethod-logo.png'
import worrdayLogo from './assets/worrday-logo.png'
import prestigeWhite from './assets/prestige_white.png'
import prestigePurple from './assets/prestige_purple.png'
import prestigeWhiteBlack from './assets/prestige_white_black.png'
import prestigePurpleBlack from './assets/prestige_purple_black.png'
import prestigeBanner from './assets/prestige_logo_wtext.png'
import neudesicLogo from './assets/neudesic-logo.png'
import scratchLogo from './assets/scratch_logo2.png'
import githubLogo from './assets/github_logo.png'
import AnimatedText from './components/AnimatedText';
import HeroV2 from './components/HeroV2';
import PhotoGallery from './components/PhotoGallery';
import Experience from './components/Experience';
import ContactDotsBackdrop from './components/ContactDotsBackdrop';

function App() {
  const { windowSize, isMobile, isTablet, isDesktop } = useResponsive();
  
  const galleryImages = [
    { src: henryJpg, alt: 'Henry Fritz', orientation: 'vertical' },
    { src: thewaterJpeg, alt: 'Water', orientation: 'horizontal' },
    { src: vinlandJpeg, alt: 'Vinland', orientation: 'horizontal' },
    { src: archJpeg, alt: 'Arch', orientation: 'vertical' },
    { src: djJpeg, alt: 'DJ', orientation: 'horizontal' },
    { src: alleyJpeg, alt: 'Alley', orientation: 'horizontal' },
  ];

  return (
    <>
      <Navbar />
      <div className="app">
        <div id="home">
          <HeroV2 />
        </div>
        {/* About Section */}
        <section id="about" className="about">
          <div className="about-content">
            <h2>About Me</h2>
            <p>Student at Ohio State studying Computer Science with a deep affection for programming, tech, problem solving, and building.</p>
          </div>
          <div className="about-github">
            <a href="https://github.com/hfritz34" target="_blank" rel="noopener noreferrer">
              <img src={githubLogo} alt="GitHub - Check out my work" />
            </a>
          </div>
        </section>

        <Experience />

        {/* Projects Section */}
        <section id="projects" className="projects">
          <h2>My Projects</h2>
          <div className="project-grid">
            <div className="project-card">
              <h3>Scratch</h3>
              <p>Chrome Extension for Drawing and Annotating on Webpages</p>
              <a href="https://chromewebstore.google.com/detail/scratch/gcibnldifnbniaijhnfeaedhbeedmghh" target="_blank" rel="noopener noreferrer">View on Chrome Web Store</a>
              <Carousel
                images={[scratchLogo]}
              />
            </div>
            <div className="project-card">
              <h3>Prestige</h3>
              <p>Music Social Network Platform with Spotify Integration</p>
              <a href="https://github.com/hfritz34/prestige_native" target="_blank" rel="noopener noreferrer">View Project</a>
              <Carousel 
                images={[prestigeWhite, prestigePurple, prestigeWhiteBlack, prestigePurpleBlack]} 
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
                <span className="skill-item">AWS Practitioner</span>
                <span className="skill-item">Microsoft Azure Fundamentals</span>
                <span className="skill-item">IBM Z Xplore Concepts</span>
                <span className="skill-item">Academind Flutter & Dart</span>
              </div>
            </div>
          </div>
        </section>

        {/* My Things Section */}
        <div id="my-things">
          <MyThings />
        </div>

        <PhotoGallery images={galleryImages} />

        {/* Contact Section */}
        <section id="contact" className="contact">
          <ContactDotsBackdrop />
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
