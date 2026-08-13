import { useEffect, useRef } from 'react';
import './styles/Home.css';
import HeroAsciiField from './components/HeroAsciiField';
import prestigeScreenshot from './assets/prestige-landing-pic.png';
import scratchScreenshot from './assets/scratch-screenshot.png';

const WORK = [
  { name: 'Authentic', years: 'Present', href: 'https://authenticinsurance.com', current: true },
  { name: 'Research — NOWLab', years: "'25–'26", href: 'https://nowlab.cse.ohio-state.edu' },
  { name: 'AIG', years: '2025' },
  { name: 'IBM', years: '2024' },
  { name: 'Domum Gym', years: "'22–'23" },
];

const PROJECTS = [
  {
    name: 'Prestige',
    description: 'Music social network',
    href: 'https://www.prestigedmusic.com/',
    image: prestigeScreenshot,
  },
  {
    name: 'Scratch',
    description: 'Webpage annotation extension',
    href: 'https://chromewebstore.google.com/detail/Scratch/gcibnldifnbniaijhnfeaedhbeedmghh',
    image: scratchScreenshot,
  },
];

function App() {
  const fieldRef = useRef(null);
  const titleRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const f = Math.min(1, window.scrollY / 480);
      if (fieldRef.current) fieldRef.current.style.opacity = String(1 - f);
      if (titleRef.current) titleRef.current.style.opacity = String(1 - f * 1.35);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home">
      <section className="hero">
        <div ref={fieldRef} className="hero-field">
          <HeroAsciiField />
        </div>
        <div ref={titleRef} className="hero-title">
          <h1>henry fritz</h1>
        </div>
      </section>

      <section className="about">
        <p>
          <span className="accent">engineering @ authentic</span> — software engineer building
          embedded insurance infrastructure. Ohio State grad, MS UPenn.
        </p>
      </section>

      <section className="work">
        <h2 className="section-label">work</h2>
        <div className="work-list">
          {WORK.map((job) => (
            <div className={`work-row${job.current ? ' current' : ''}`} key={job.name}>
              <span>
                {job.href ? (
                  <a href={job.href} target="_blank" rel="noopener noreferrer">{job.name}</a>
                ) : (
                  job.name
                )}
                {job.current && <span className="current-tag">— current</span>}
              </span>
              <span className="work-years">{job.years}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="education">
        <div>Ohio State — B.S. CS</div>
        <div>UPenn — M.S.</div>
      </section>

      <section className="projects">
        <h2 className="section-label">projects</h2>
        <div className="project-grid">
          {PROJECTS.map((project) => (
            <a
              className="project-card"
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              key={project.name}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={`${project.name} screenshot`} />
                ) : (
                  'project screenshot'
                )}
              </div>
              <div className="project-name">{project.name}</div>
              <div className="project-description">{project.description}</div>
            </a>
          ))}
        </div>
      </section>

      <section className="contact" id="contact">
        <a href="mailto:henryfritz02@gmail.com">email</a>
        <span className="dot">·</span>
        <a href="https://www.linkedin.com/in/henry-fritz000/" target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <span className="dot">·</span>
        <a href="https://github.com/hfritz34" target="_blank" rel="noopener noreferrer">
          github
        </a>
      </section>
    </div>
  );
}

export default App;
