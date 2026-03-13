import store from "./redux/store";

function App() {
  console.log("Начало:", store.getState());

  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "Гарри Поттер",
      author: "Дж. Ролинг",
      year: 1967,
    },
  });

  console.log("После добавления Гарри Поттера:", store.getState());

  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "1984",
      author: "Оруэлл",
      year: 1949,
    },
  });

  console.log("После добавления 1984:", store.getState());

  const firstBookId = store.getState().books[0].id;

  store.dispatch({
    type: "BOOK_REMOVE",
    payload: firstBookId,
  });

  console.log("После удаления первой книги:", store.getState());

  const secondBook = store.getState().books[0];

  store.dispatch({
    type: "BOOK_UPDATE_INFO",
    payload: {
      id: secondBook.id,
      year: 1948,
    },
  });

  console.log("После обновления года:", store.getState());

  store.dispatch({
    type: "BOOK_TOGGLE_AVAILABILITY",
    payload: secondBook.id,
  });

  console.log("После переключения доступности:", store.getState());

  return (
    <div>
      <h1>Book Catalog</h1>
      <p>Открой консоль браузера</p>
    </div>
  );
}

export default App;