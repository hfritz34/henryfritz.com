import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTokenFromUrl, setAccessToken } from '../services/spotify';

const SpotifyCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = getTokenFromUrl();
    if (token) {
      setAccessToken(token);
      // Store the token in localStorage
      localStorage.setItem('spotify_token', token);
      // Redirect back to the My Things section
      navigate('/#my-things');
    }
  }, [navigate]);

  return (
    <div className="callback-container">
      <h2>Authenticating with Spotify...</h2>
    </div>
  );
};

export default SpotifyCallback; 