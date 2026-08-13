import Nav from './Nav';
import '../styles/Books.css';

const BOOKS = [
  {
    title: 'The Pragmatic Programmer',
    author: 'Hunt & Thomas',
    rating: 3,
    verdict: 'Dated in places, still the clearest case for craft over cleverness.',
  },
  {
    title: 'Antifragile',
    author: 'Nassim Taleb',
    rating: 2,
    verdict: 'Good core idea, buried under a lot of score-settling.',
  },
  {
    title: 'A Philosophy of Software Design',
    author: 'John Ousterhout',
    rating: 4,
    verdict: 'Short, opinionated, and right often enough to matter.',
  },
];

const Books = () => {
  return (
    <div className="books-page">
      <header className="books-header">
        <Nav />
        <h1>books &amp; reviews</h1>
      </header>
      <div className="books-list">
        {BOOKS.map((book) => (
          <article className="book-card" key={book.title}>
            <div className="book-cover" aria-hidden="true" />
            <div className="book-info">
              <h2>{book.title}</h2>
              <p className="book-author">{book.author}</p>
              <div className="book-rating">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span key={i} className={`dot${i < book.rating ? ' filled' : ''}`} />
                ))}
              </div>
              <p className="book-verdict">{book.verdict}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Books;
