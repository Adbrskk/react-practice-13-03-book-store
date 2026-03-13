import store from "./redux/store";

function App() {
  console.log("Начальное состояние:", store.getState());

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

  console.log("После добавления книг:", store.getState());

  const harryBookId = store.getState().books[0].id;
  const book1984Id = store.getState().books[1].id;

  store.dispatch({
    type: "BOOK_REMOVE",
    payload: harryBookId,
  });

  console.log("После удаления Гарри Поттера:", store.getState());

  store.dispatch({
    type: "BOOK_UPDATE_INFO",
    payload: {
      id: book1984Id,
      year: 1948,
    },
  });

  console.log("После обновления года у 1984:", store.getState());

  store.dispatch({
    type: "BOOK_TOGGLE_AVAILABILITY",
    payload: book1984Id,
  });

  console.log("После переключения доступности:", store.getState());

  store.dispatch({
    type: "BOOK_TOGGLE_AVAILABILITY",
    payload: book1984Id,
  });

  console.log("Вернули доступность обратно:", store.getState());

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

  const ivanId = store.getState().readers[0].id;
  const annaId = store.getState().readers[1].id;

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984Id,
      readerId: ivanId,
    },
  });

  console.log("После выдачи книги Ивану:", store.getState());

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984Id,
      readerId: annaId,
    },
  });

  console.log("Попытка выдать ту же книгу Анне:", store.getState());

  store.dispatch({
    type: "BOOK_RETURN_FROM_READER",
    payload: {
      bookId: book1984Id,
      readerId: ivanId,
    },
  });

  console.log("После возврата книги от Ивана:", store.getState());

  store.dispatch({
    type: "BOOK_LEND_TO_READER",
    payload: {
      bookId: book1984Id,
      readerId: annaId,
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