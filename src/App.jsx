import store from "./redux/store";

function App() {
  console.log("Начальное состояние:", store.getState());


  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "Гарри Поттер",
      author: "Дж. Ролинг",
      year: 1997,
    },
  });

  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "1984",
      author: "Джордж Оруэлл",
      year: 1949,
    },
  });

  console.log("После добавления книг:", store.getState());


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

  console.log("После добавления читателей:", store.getState());

  const currentState = store.getState();

  const book1984 = currentState.books.find((book) => book.title === "1984");
  const ivan = currentState.readers.find(
    (reader) => reader.name === "Иван Петров"
  );
  const anna = currentState.readers.find(
    (reader) => reader.name === "Анна Смирнова"
  );

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984.id,
      readerId: ivan.id,
    },
  });

  console.log("После выдачи книги Ивану:", store.getState());

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984.id,
      readerId: anna.id,
    },
  });

  console.log("После попытки выдать ту же книгу Анне:", store.getState());

  store.dispatch({
    type: "BOOK_RETURN_FROM_READER",
    payload: {
      bookId: book1984.id,
      readerId: ivan.id,
    },
  });

  console.log("После возврата книги от Ивана:", store.getState());

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984.id,
      readerId: anna.id,
    },
  });

  console.log("После выдачи книги Анне:", store.getState());

  return (
    <div>
      <h1>Book Catalog</h1>
      <p>Открой консоль браузера</p>
    </div>
  );
}

export default App;