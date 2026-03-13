import store from "./redux/store";
import "./App.css";

store.dispatch({
  type: "BOOK_ADD",
  payload: {
    title: "Гарри Поттер",
    author: "Дж. Роулинг",
    year: 1967,
  },
});

store.dispatch({
  type: "BOOK_ADD",
  payload: {
    title: "1984",
    author: "Дж. Оруэлл",
    year: 1949,
  },
});

store.dispatch({
  type: "BOOK_ADD",
  payload: {
    title: "Сумеречные охотники",
    author: "Кассандра Клэр",
    year: 2013,
  },
});

const harryBookId = store.getState().books[0].id;
const book1984Id = store.getState().books[1].id;

store.dispatch({
  type: "BOOK_REMOVE",
  payload: harryBookId,
});

store.dispatch({
  type: "BOOK_UPDATE_INFO",
  payload: {
    id: book1984Id,
    year: 1948,
  },
});

store.dispatch({
  type: "READER_ADD",
  payload: {
    name: "Иван Петров",
    email: "ivan@mail.com",
  },
});

store.dispatch({
  type: "READER_ADD",
  payload: {
    name: "Анна Смирнова",
    email: "anna@mail.com",
  },
});

const ivanId = store.getState().readers[0].id;
const annaId = store.getState().readers[1].id;

store.dispatch({
  type: "BOOK_LEND_TO_READER",
  payload: {
    bookId: book1984Id,
    readerId: ivanId,
  },
});

store.dispatch({
  type: "BOOK_RETURN_FROM_READER",
  payload: {
    bookId: book1984Id,
    readerId: ivanId,
  },
});

store.dispatch({
  type: "BOOK_LEND_TO_READER",
  payload: {
    bookId: book1984Id,
    readerId: annaId,
  },
});

function App() {
  const state = store.getState();
  const { books, readers, statistics } = state;

  return (
    <div className="container">
      <h1>Library Catalog</h1>

      <div className="section">
        <h2>Books</h2>
        {books.map((book) => (
          <div key={book.id} className="card">
            <div>{book.title}</div>
            <div>{book.author}</div>
            <div>{book.year}</div>
            <div className={book.isAvailable ? "available" : "unavailable"}>
              {book.isAvailable ? "Available" : "Borrowed"}
            </div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Readers</h2>
        {readers.map((reader) => (
          <div key={reader.id} className="card">
            <div>{reader.name}</div>
            <div>{reader.email}</div>
            <div>Books: {reader.borrowedBooks.length}</div>
          </div>
        ))}
      </div>

      <div className="section">
        <h2>Statistics</h2>
        <div className="card">
          <div>Total books: {statistics.totalBooks}</div>
          <div>Available books: {statistics.availableBooks}</div>
          <div>Borrowed books: {statistics.borrowedBooks}</div>
          <div>Active readers: {statistics.activeReadersCount}</div>
          <div>
            Most popular author: {statistics.mostPopularAuthor.name} (
            {statistics.mostPopularAuthor.booksCount})
          </div>
          <div>
            Consistency check:{" "}
            {statistics.consistencyCheck ? "true" : "false"}
          </div>
        </div>

        <div className="card">
          <h3>Books by decade</h3>
          {Object.entries(statistics.booksByDecade).map(([decade, count]) => (
            <div key={decade}>
              {decade}: {count}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;