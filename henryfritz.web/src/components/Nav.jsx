import { Link, useLocation } from 'react-router-dom';
import '../styles/Nav.css';

const Nav = () => {
  const { pathname } = useLocation();
  const isHome = pathname === '/';
  const isBooks = pathname === '/books';

  return (
    <nav className="site-nav">
      <Link to="/" className="site-nav-word">henry fritz</Link>
      <div className="site-nav-links">
        <Link to="/" className={isHome ? 'active' : ''}>home</Link>
        <Link to="/books" className={isBooks ? 'active' : ''}>books</Link>
        <a href={isHome ? '#contact' : '/#contact'}>contact</a>
      </div>
    </nav>
  );
};

export default Nav;
