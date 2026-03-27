import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

function BooksList() {
  const books = useSelector((state) => state.books);
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

  const [selectedReader, setSelectedReader] = useState({});

  const handleLend = (bookId) => {
    const readerId = selectedReader[bookId];
    if (!readerId) return;

    dispatch({
      type: "BOOK_LEND_TO_READER",
      payload: { bookId, readerId },
    });
  };

  const handleReturn = (bookId, readerId) => {
    dispatch({
      type: "BOOK_RETURN_FROM_READER",
      payload: { bookId, readerId },
    });
  };

  const availableBooks = books.filter((book) => book.isAvailable);
  const borrowedBooks = books.filter((book) => !book.isAvailable);

  return (
    <div>
      <h2>Книги</h2>

      <h3>Доступные книги</h3>
      {availableBooks.map((book) => (
        <div key={book.id} className="list-card">
          <strong>
            {book.title} — {book.author} ({book.year})
          </strong>

          <div style={{ marginTop: "8px" }}>
            <select
              onChange={(e) =>
                setSelectedReader({
                  ...selectedReader,
                  [book.id]: Number(e.target.value),
                })
              }
            >
              <option value="">Выберите читателя</option>
              {readers.map((reader) => (
                <option key={reader.id} value={reader.id}>
                  {reader.name}
                </option>
              ))}
            </select>

            <button onClick={() => handleLend(book.id)}>
              Выдать
            </button>
          </div>
        </div>
      ))}

      <h3>Выданные книги</h3>
      {borrowedBooks.map((book) => (
        <div key={book.id} className="list-card">
          <strong>{book.title}</strong>

          {readers.map((reader) =>
            reader.borrowedBooks.includes(book.id) ? (
              <button
                key={reader.id}
                onClick={() => handleReturn(book.id, reader.id)}
              >
                Вернуть от {reader.name}
              </button>
            ) : null
          )}
        </div>
      ))}
    </div>
  );
}

export default BooksList;