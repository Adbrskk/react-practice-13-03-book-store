import { useSelector, useDispatch } from "react-redux";

function BooksList() {
  const books = useSelector((state) => state.books);
  const readers = useSelector((state) => state.readers);
  const dispatch = useDispatch();

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

      {books.map((book) => (
        <div key={book.id} className="item">
          <h3>{book.title}</h3>
          <p>{book.author} ({book.year})</p>
          <p className="status">
            Статус: {book.isAvailable ? "Доступна" : "Выдана"}
          </p>

          {book.isAvailable ? (
            readers.map((reader) => (
              <button
                key={reader.id}
                onClick={() => handleLend(book.id, reader.id)}
              >
                Выдать: {reader.name}
              </button>
            ))
          ) : (
            readers.map((reader) =>
              reader.borrowedBooks.includes(book.id) ? (
                <button
                  key={reader.id}
                  onClick={() => handleReturn(book.id, reader.id)}
                >
                  Вернуть от {reader.name}
                </button>
              ) : null
            )
          )}
        </div>
      ))}
    </div>
  );
}

export default BooksList;