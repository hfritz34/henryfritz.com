import { useEffect, useRef, useState } from 'react';
import './styles/Home.css';
import HeroDayNight from './components/HeroDayNight';
import ProjectVideo from './components/ProjectVideo';
import prestigeScreenshot from './assets/prestige-landing-pic.png';
import scratchScreenshot from './assets/scratch-screenshot.png';
import celesteWebm from './assets/celeste-gameplay.webm';
import celesteMp4 from './assets/celeste-gameplay.mp4';
import celestePoster from './assets/celeste-poster.png';

const EMAIL = 'henryfritz02@gmail.com';

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const el = document.createElement('textarea');
    el.value = text;
    el.setAttribute('readonly', '');
    el.style.position = 'fixed';
    el.style.opacity = '0';
    document.body.appendChild(el);
    el.select();
    const ok = document.execCommand('copy');
    el.remove();
    return ok;
  }
}

const WORK = [
  { name: 'Authentic', years: 'Present', href: 'https://authenticinsurance.com', current: true },
  { name: 'Research — NOWLab', years: "'25–'26", href: 'https://nowlab.cse.ohio-state.edu' },
  { name: 'AIG', years: '2025' },
  { name: 'IBM', years: '2024' },
  { name: 'Domum Gym', years: "'22–'23" },
];

const PROJECTS = [
  {
    name: 'Celeste Clone',
    description: 'C# / MonoGame platformer',
    href: 'https://github.com/hfritz34/celeste-monogame',
    video: { webm: celesteWebm, mp4: celesteMp4, poster: celestePoster },
  },
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
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(0);

  const copyEmail = async () => {
    const ok = await copyText(EMAIL);
    setToast(ok ? `copied ${EMAIL}` : EMAIL);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 2200);
  };

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  useEffect(() => {
    const onScroll = () => {
      const f = Math.min(1, window.scrollY / 480);
      if (fieldRef.current) fieldRef.current.style.opacity = String(1 - f);
      if (titleRef.current) titleRef.current.style.opacity = String(Math.max(0, 1 - f * 1.35));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <div className="home" id="top">
      <section className="hero">
        <nav className="hero-nav">
          <a href="#top" className="wordmark">henry fritz</a>
          <div className="hero-nav-links">
            <a href="#top" className="active">home</a>
            <a href="#contact">contact</a>
          </div>
        </nav>
        <div ref={fieldRef} className="hero-field">
          <HeroDayNight />
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
                {project.video ? (
                  <ProjectVideo {...project.video} alt={`${project.name} gameplay`} />
                ) : project.image ? (
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
        <button type="button" className="contact-link" onClick={copyEmail}>
          email
        </button>
        <span className="dot">·</span>
        <a className="contact-link" href="https://www.linkedin.com/in/henry-fritz000/" target="_blank" rel="noopener noreferrer">
          linkedin
        </a>
        <span className="dot">·</span>
        <a className="contact-link" href="https://github.com/hfritz34" target="_blank" rel="noopener noreferrer">
          github
        </a>
      </section>

      <div className={`toast${toast ? ' visible' : ''}`} role="status" aria-live="polite">
        {toast}
      </div>
    </div>
  );
}

export default App;
