import store from "./redux/store";
import "./App.css";

store.dispatch({
  type: "BOOK_ADD",
  payload: {
    title: "Гарри Поттер",
    author: "Дж. Ролинг",
    year: 1967,
  },
});

store.dispatch({
  type: "BOOK_ADD",
  payload: {
    title: "1984",
    author: "Оруэлл",
    year: 1949,
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
  const { books, readers } = state;

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
    </div>
  );
}

export default App;