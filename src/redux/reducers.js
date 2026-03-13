const initialState = {
  books: [],
  lastUpdated: null,
};

function reducer(state = initialState, action) {
  switch (action.type) {

    case "BOOK_ADD": {
      const newBook = {
        id: Date.now() + Math.random(),
        title: action.payload.title,
        author: action.payload.author,
        year: action.payload.year,
        isAvailable: true
      };
      
      console.log("Добавлена книга", newBook);

      return {
        ...state,
        books: [...state.books, newBook],
        lastUpdated: new Date().toISOString()
      };
    }

    case "BOOK_REMOVE": {

      const book = state.books.find(b => b.id === action.payload);

      if (!book || book.isAvailable === false) {
        console.log("Нельзя удалить книгу");
        return state;
      }

      return {
        ...state,
        books: state.books.filter(b => b.id !== action.payload),
        lastUpdated: new Date().toISOString()
      };
    }

    case "BOOK_UPDATE_INFO":

      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload.id
            ? {
                ...book,
                title: action.payload.title ?? book.title,
                author: action.payload.author ?? book.author,
                year: action.payload.year ?? book.year
              }
            : book
        ),
        lastUpdated: new Date().toISOString()
      };

    case "BOOK_TOGGLE_AVAILABILITY":

      return {
        ...state,
        books: state.books.map(book =>
          book.id === action.payload
            ? { ...book, isAvailable: !book.isAvailable }
            : book
        ),
        lastUpdated: new Date().toISOString()
      };

    default:
      return state;
  }
}

export default reducer;