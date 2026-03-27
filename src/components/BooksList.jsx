import { useSelector, useDispatch } from "react-redux";
import { useMemo } from "react";

function BooksList() {
  const books = useSelector((state) => state.books);
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

  const availableBooks = useMemo(
    () => books.filter((book) => book.isAvailable),
    [books]
  );

  const borrowedBooks = useMemo(
    () => books.filter((book) => !book.isAvailable),
    [books]
  );

  const handleLend = (bookId, readerId) => {
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

  return (
    <div>
      <h2>Книги</h2>

      <h3>Доступные книги</h3>
      <ul>
        {availableBooks.map((book) => (
          <li key={book.id}>
            <strong>{book.title}</strong> — {book.author} ({book.year})
            <div>
              {readers.map((reader) => (
                <button
                  key={reader.id}
                  onClick={() => handleLend(book.id, reader.id)}
                >
                  Выдать: {reader.name}
                </button>
              ))}
            </div>
          </li>
        ))}
      </ul>

      <h3>Выданные книги</h3>
      <ul>
        {borrowedBooks.map((book) => (
          <li key={book.id}>
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
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BooksList;