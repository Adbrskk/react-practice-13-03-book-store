import store from "./redux/store";

function App() {

  console.log("Начальное состояние", store.getState());

  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "Гарри Поттер",
      author: "Дж. Ролинг",
      year: 1967
    }
  });

  store.dispatch({
    type: "BOOK_ADD",
    payload: {
      title: "1984",
      author: "Оруэлл",
      year: 1949
    }
  });

  const firstBookId = store.getState().books[0].id;

  store.dispatch({
    type: "BOOK_REMOVE",
    payload: firstBookId
  });

  const secondBook = store.getState().books[0];

  store.dispatch({
    type: "BOOK_UPDATE_INFO",
    payload: {
      id: secondBook.id,
      year: 1948
    }
  });

  store.dispatch({
    type: "BOOK_TOGGLE_AVAILABILITY",
    payload: secondBook.id
  });

  console.log("Финальное состояние", store.getState());

  return (
    <div>
      <h1>Book Catalog</h1>
      <p>Откройте консоль браузера</p>
    </div>
  );
}

export default App;