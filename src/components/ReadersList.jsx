import { useSelector } from "react-redux";

function ReadersList() {
  const readers = useSelector((state) => state.readers);
  const books = useSelector((state) => state.books);

  return (
    <div>
      <h2>Читатели</h2>

      <ul>
        {readers.map((reader) => (
          <li key={reader.id}>
            <strong>{reader.name}</strong> — {reader.email}
            <div>
              Книги:
              <ul>
                {reader.borrowedBooks.length === 0 ? (
                  <li>Нет книг</li>
                ) : (
                  reader.borrowedBooks.map((bookId) => {
                    const book = books.find((b) => b.id === bookId);
                    return <li key={bookId}>{book?.title}</li>;
                  })
                )}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ReadersList;