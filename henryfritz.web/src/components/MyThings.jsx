import React, { useState } from 'react';
import '../styles/MyThings.css';
import prestigeImage4 from '../assets/image4.png';
import BeatVisualizer from './BeatVisualizer';

const MyThings = () => {
  const [showPlayer, setShowPlayer] = useState(false);

  // Handle player visibility toggle
  const handlePlayerToggle = () => {
    setShowPlayer(!showPlayer);
  };

  // Hardcoded current listening data
  const currentlyListening = {
    song: {
      name: "TONY ON THE RADIO",
      artist: "Igwe Aka",
      id: "0nmJuIGEzy8Exr9uF10jvx",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b27343d7eb7b6016d78e90e5f58d",
      color: "#4ade80"
    },
    album: {
      name: "Jump Out",
      artist: "OsamaSon",
      imageUrl: "https://i.scdn.co/image/ab67616d0000b273b2ea42b7a47a6b58ca111fee",
      spotifyUrl: "https://open.spotify.com/album/5Vb4K4Xf4KPFupmhHi5COM"
    },
    artist: {
      name: "Paris Texas",
      imageUrl: "https://i.scdn.co/image/ab6761610000e5ebcd4785b475935db2fdb9915d",
      spotifyUrl: "https://open.spotify.com/artist/1SCrMreNPJYSRZIlRe9SUq"
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
        </div>

        {/* What I'm Working On */}
        <div className="working-section">
          <h3>What I'm Working On</h3>
          <div className="project-display">
            <img src={prestigeImage4} alt="Current Project - Prestige" />
            <div className="project-info">
              <h4>Prestige</h4>
              <p>Music Social Network Platform with Spotify Integration</p>
              <a 
                href="https://github.com/hfritz34/Prestige" 
                target="_blank" 
                rel="noopener noreferrer"
                className="project-link"
              >
                View Project
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MyThings;