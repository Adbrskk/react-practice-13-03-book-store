import { useSelector } from "react-redux";

function ReadersList() {
  const readers = useSelector((state) => state.readers);
  const books = useSelector((state) => state.books);

  return (
    <div>
      <h2>Читатели</h2>

      {readers.map((reader) => (
        <div key={reader.id} className="item">
          <h3>{reader.name}</h3>
          <p>{reader.email}</p>

          <p><strong>Книги:</strong></p>
          <ul>
            {reader.borrowedBooks.map((bookId) => {
              const book = books.find((b) => b.id === bookId);
              return <li key={bookId}>{book?.title}</li>;
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default ReadersList;