import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Books from './components/Books'
import SpotifyCallback from './components/SpotifyCallback'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router>
      <Routes>
        <Route path="/callback" element={<SpotifyCallback />} />
        <Route path="/books" element={<Books />} />
        <Route path="*" element={<App />} />
      </Routes>
    </Router>
  </StrictMode>,
)
