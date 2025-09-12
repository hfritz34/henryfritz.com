import React, { useState, useEffect } from 'react';
import '../styles/RecentlyLikedSongs.css';

const RecentlyLikedSongs = () => {
  const [tracks, setTracks] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);

  // API endpoint for Henry's recent likes
  const API_BASE_URL = 'https://prestigeapi-gbdzagg5e4a3aahc.eastus-01.azurewebsites.net';

  const fetchRecentLikes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`${API_BASE_URL}/spotify/henry/recent-likes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch recent likes: ${response.status}`);
      }

      const data = await response.json();
      setTracks(data);
      setLastUpdated(new Date());
    } catch (err) {
      console.error('Error fetching recent likes:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchRecentLikes();
  }, []);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    const interval = setInterval(fetchRecentLikes, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const refreshTracks = () => {
    fetchRecentLikes();
  };

  const formatTimeAgo = (date) => {
    if (!date) return '';
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours}h ago`;
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays}d ago`;
  };

  return (
    <div className="recently-liked-section">
      <div className="section-header" onClick={toggleExpansion}>
        <h4>Recently Liked</h4>
        <div className="header-controls">
          {lastUpdated && (
            <span className="last-updated">
              {formatTimeAgo(lastUpdated)}
            </span>
          )}
          <button 
            className="refresh-button"
            onClick={(e) => {
              e.stopPropagation();
              refreshTracks();
            }}
            disabled={loading}
          >
            {loading ? '⟳' : '↻'}
          </button>
          <span className={`expand-icon ${isExpanded ? 'expanded' : ''}`}>
            ▼
          </span>
        </div>
      </div>
      
      <div className={`tracks-container ${isExpanded ? 'expanded' : ''}`}>
        {error && (
          <div className="error-message">
            <p>Failed to load recent likes: {error}</p>
            <button onClick={refreshTracks}>Try Again</button>
          </div>
        )}
        
        {loading && !tracks.length && (
          <div className="loading-message">
            <p>Loading your recent likes...</p>
          </div>
        )}
        
        {tracks.length > 0 && (
          <div className="tracks-list">
            {tracks.map((track, index) => (
              <a 
                key={track.id}
                href={`https://open.spotify.com/track/${track.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="track-item-link"
              >
                <div className="track-item">
                  <div className="track-number">
                    #{index + 1}
                  </div>
                  <div className="track-image">
                    <img 
                      src={track.album?.images?.[0]?.url} 
                      alt={`${track.name} by ${track.artists?.[0]?.name}`}
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />
                  </div>
                  <div className="track-info">
                    <div className="track-name">
                      {track.name}
                    </div>
                    <div className="track-artist">
                      {track.artists?.map((artist, idx) => (
                        <span key={artist.id}>
                          {artist.name}
                          {idx < track.artists.length - 1 && ', '}
                        </span>
                      ))}
                    </div>
                    <div className="track-album">
                      {track.album?.name}
                    </div>
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
        
        {tracks.length === 0 && !loading && !error && (
          <div className="empty-message">
            <p>No recent likes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentlyLikedSongs;