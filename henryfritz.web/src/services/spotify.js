import SpotifyWebApi from 'spotify-web-api-js';

const spotifyApi = new SpotifyWebApi();

// Replace these with your Spotify App credentials
const CLIENT_ID = '8dee6cbc238d459e94b67cbd9c25ec2b';
const REDIRECT_URI = process.env.NODE_ENV === 'production' 
  ? 'https://henryfritz.com/callback'
  : 'http://localhost:5173/callback';
const SCOPES = [
  'user-read-private',
  'user-read-email',
  'user-top-read',
  'user-read-recently-played'
];

// Authentication URL
export const getAuthUrl = () => {
  const baseUrl = 'https://accounts.spotify.com/authorize';
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    response_type: 'token',
    redirect_uri: REDIRECT_URI,
    scope: SCOPES.join(' '),
    show_dialog: true
  });
  return `${baseUrl}?${params.toString()}`;
};

// Parse the access token from URL hash
export const getTokenFromUrl = () => {
  const hash = window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      const parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
  
  window.location.hash = '';
  return hash.access_token;
};

// Set the access token for future calls
export const setAccessToken = (token) => {
  spotifyApi.setAccessToken(token);
};

// Get user's current favorite tracks
export const getTopTracks = async (limit = 1) => {
  try {
    const response = await spotifyApi.getMyTopTracks({ limit, time_range: 'short_term' });
    return response.items;
  } catch (error) {
    console.error('Error fetching top tracks:', error);
    return null;
  }
};

// Get user's current favorite artists
export const getTopArtists = async (limit = 1) => {
  try {
    const response = await spotifyApi.getMyTopArtists({ limit, time_range: 'short_term' });
    return response.items;
  } catch (error) {
    console.error('Error fetching top artists:', error);
    return null;
  }
};

// Get recently played tracks (to determine current favorite album)
export const getRecentAlbums = async (limit = 1) => {
  try {
    const response = await spotifyApi.getMyRecentlyPlayedTracks({ limit: 20 });
    // Get the most frequently played album from recent tracks
    const albums = response.items.map(item => item.track.album);
    const albumCounts = albums.reduce((acc, album) => {
      acc[album.id] = (acc[album.id] || 0) + 1;
      return acc;
    }, {});
    const topAlbumId = Object.entries(albumCounts)
      .sort(([,a], [,b]) => b - a)[0][0];
    return albums.find(album => album.id === topAlbumId);
  } catch (error) {
    console.error('Error fetching recent albums:', error);
    return null;
  }
};

export default spotifyApi; 