import React, { useState } from 'react';
import '../styles/MyThings.css';
import BeatVisualizer from './BeatVisualizer';
// import RecentlyLikedSongs from './RecentlyLikedSongs'; // temporarily hidden while Prestige API is down
import newPrestige from '../assets/PRESTIGED.png'
import prestigeLogo from '../assets/prestige_logo.png';
import ventusLogo from '../assets/ventus _black.png';
import gamgeeLogo from '../assets/gamgee_rounded.png';

const MyThings = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  // Handle player visibility toggle
  const handlePlayerToggle = () => {
    setShowPlayer(!showPlayer);
  };

  // Hardcoded current listening data
  const currentlyListening = {
    song: {
      name: "Imaginary Folklore",
      artist: "clammbon, Nujabes",
      id: "7xNpCuqDKASx2f64nkhzNm",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273b272e55a046e153084ad6d6b",
      color: "#D4A574"
    },
    album: {
      name: "Icedancer",
      artist: "Bladee",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b2737e041a457bd312e73440532a",
      spotifyUrl: "https://open.spotify.com/album/0cT1SQDE7wSh1eUJkGFXse"
    },
    artist: {
      name: "Lucy Bedroque",
      imageUrl: "https://i.scdn.co/image/ab6761610000e5eb46d54cd46ec87c6838c9f0d5",
      spotifyUrl: "https://open.spotify.com/artist/2I8H267eH5va9da4vGt38O"
    }
  };

  return (
    <section id="my-things" className="my-things">
      <h2>My Things</h2>
      
      <div className="things-container">
        {/* What I'm Listening To */}
        <div className="listening-section">
          <h3>What I'm Listening To</h3>
          <div className="music-grid">
            {/* Current Song with Player */}
            <div className="music-item">
              <h4>Song</h4>
              <div 
                className="music-image-container" 
                onClick={handlePlayerToggle}
              >
                <img 
                  src={currentlyListening.song.imageUrl} 
                  alt={`${currentlyListening.song.name} by ${currentlyListening.song.artist}`}
                />
                <div className="play-overlay">
                  <span className="play-icon">{showPlayer ? '✕' : '▶'}</span>
                </div>
              </div>
              <div className="music-info">
                <p className="title">{currentlyListening.song.name}</p>
                <p className="artist-name">{currentlyListening.song.artist}</p>
              </div>
              {showPlayer && (
                <div className="spotify-player">
                  <iframe
                    src={`https://open.spotify.com/embed/track/${currentlyListening.song.id}?enableApi=1`}
                    width="100%"
                    height="80"
                    frameBorder="0"
                    allowtransparency="true"
                    allow="encrypted-media"
                  ></iframe>
                </div>
              )}
            </div>

            {/* Current Album */}
            <a 
              href={currentlyListening.album.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="music-item"
            >
              <h4>Album</h4>
              <img 
                src={currentlyListening.album.imageUrl} 
                alt={`${currentlyListening.album.name} by ${currentlyListening.album.artist}`}
              />
              <div className="music-info">
                <p className="title">{currentlyListening.album.name}</p>
                <p className="artist-name">{currentlyListening.album.artist}</p>
              </div>
            </a>

            {/* Current Artist */}
            <a 
              href={currentlyListening.artist.spotifyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="music-item"
            >
              <h4>Artist</h4>
              <img 
                src={currentlyListening.artist.imageUrl} 
                alt={currentlyListening.artist.name}
              />
              <div className="music-info">
                <p className="title">{currentlyListening.artist.name}</p>
              </div>
            </a>
          </div>
          
          <BeatVisualizer color={currentlyListening.song.color} isPlaying={showPlayer} />
          
          {/* Recently Liked Songs (temporarily hidden) */}
          {/* <RecentlyLikedSongs /> */}
        </div>

        {/* What I'm Working On */}
        <div className="working-section">
          <h3>What I'm Building</h3>
          
          {/* Prestige */}
          <div className="current-project">
            <div className="project-image">
              <img src={prestigeLogo} alt="Current Project - Prestige" />
            </div>
            <div className="project-info">
              <div className="project-header">
               
              </div>
              <div className="project-details">
                <div className="project-name-container">
                  <h4>Prestige</h4>
                  <p>Music Social Network Platform with Spotify Integration</p>
                  <a 
                    href="https://github.com/hfritz34/prestige_native" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-project-button"
                  >
                    View Project
                  </a>
                  <a 
                    href="https://prestigedmusic.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-project-button"
                  >
                    View Website
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Ventus */}
          <div className="current-project">
            <div className="project-image">
              <img src={ventusLogo} alt="Current Project - Ventus" />
            </div>
            <div className="project-info">
              <div className="project-header">
               
              </div>
              <div className="project-details">
                <div className="project-name-container">
                  <h4>Ventus</h4>
                  <p>Smart Alarm + AI Verification App Built for Consistency and Discipline</p>
                  <a 
                    href="https://github.com/hfritz34/Ventus?tab=readme-ov-file" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="view-project-button"
                  >
                    View Project
                  </a>
                  <a 
                    href="#" 
                    className="view-project-button disabled"
                    onClick={(e) => e.preventDefault()}
                  >
                    Mobile Coming Soon
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Gamgee */}
          <div className="current-project">
            <div className="project-image">
              <img src={gamgeeLogo} alt="Current Project - Gamgee" />
            </div>
            <div className="project-info">
              <div className="project-header">
               
              </div>
              <div className="project-details">
                <div className="project-name-container">
                  <h4>Gamgee</h4>
                  <p>A Quiet, Privacy-First Companion That Watches Your Tech When You Can't</p>
                  <a 
                    href="#" 
                    className="view-project-button disabled"
                    onClick={(e) => e.preventDefault()}
                  >
                    Refining...
                  </a>
                  <a 
                    href="#" 
                    className="view-project-button disabled"
                    onClick={(e) => e.preventDefault()}
                  >
                    Desktop App Coming Soon
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyThings;