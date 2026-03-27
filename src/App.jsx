import { useEffect } from "react";
import { useDispatch } from "react-redux";

import AddBookForm from "./components/AddBookForm";
import AddReaderForm from "./components/AddReaderForm";
import BooksList from "./components/BooksList";
import ReadersList from "./components/ReadersList";
import Statistics from "./components/Statistics";
import "./App.css";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Добавляем книги
    const books = [
      { title: "1984", author: "George Orwell", year: 1949 },
      { title: "Animal Farm", author: "George Orwell", year: 1945 },
      { title: "Dune", author: "Frank Herbert", year: 1965 },
      { title: "Foundation", author: "Isaac Asimov", year: 1951 },
      { title: "It", author: "Stephen King", year: 1986 },
      { title: "The Shining", author: "Stephen King", year: 1977 },
      { title: "Harry Potter", author: "J.K. Rowling", year: 1997 },
      { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 },
      { title: "Lord of the Rings", author: "J.R.R. Tolkien", year: 1954 },
    ];

    books.forEach((book) => {
      dispatch({ type: "BOOK_ADD", payload: book });
    });

    // Добавляем читателей
    const readers = [
      { name: "Иван Петров", email: "ivan@mail.com" },
      { name: "Анна Смирнова", email: "anna@mail.com" },
      { name: "Петр Иванов", email: "petr@mail.com" },
      { name: "Мария Сидорова", email: "maria@mail.com" },
      { name: "Алексей Кузнецов", email: "alex@mail.com" },
    ];

    readers.forEach((reader) => {
      dispatch({ type: "READER_ADD", payload: reader });
    });
  }, [dispatch]);

  return (
    <div className="container">
      <h1 className="title">Book Store</h1>

      <div className="forms">
        <div className="card">
          <AddBookForm />
        </div>

        <div className="card">
          <AddReaderForm />
        </div>
      </div>

      <div className="lists">
        <div className="card">
          <BooksList />
        </div>

        <div className="card">
          <ReadersList />
        </div>
      </div>

      <div className="card" style={{ marginTop: "24px" }}>
        <Statistics />
      </div>
    </div>
  );
}

export default App;