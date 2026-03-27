const initialState = {
  books: [],
  readers: [],
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
        isAvailable: true,
      };

      return {
        ...state,
        books: [...state.books, newBook],
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_REMOVE": {
      const book = state.books.find((b) => b.id === action.payload);

      if (!book || book.isAvailable === false) {
        console.log("Нельзя удалить книгу");
        return state;
      }

      return {
        ...state,
        books: state.books.filter((b) => b.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_UPDATE_INFO":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload.id
            ? {
                ...book,
                title: action.payload.title ?? book.title,
                author: action.payload.author ?? book.author,
                year: action.payload.year ?? book.year,
              }
            : book
        ),
        lastUpdated: new Date().toISOString(),
      };

    case "BOOK_TOGGLE_AVAILABILITY":
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === action.payload
            ? { ...book, isAvailable: !book.isAvailable }
            : book
        ),
        lastUpdated: new Date().toISOString(),
      };

    case "READER_ADD": {
      const newReader = {
        id: Date.now() + Math.random(),
        name: action.payload.name,
        email: action.payload.email,
        borrowedBooks: [],
      };

      return {
        ...state,
        readers: [...state.readers, newReader],
        lastUpdated: new Date().toISOString(),
      };
    }

    case "READER_REMOVE": {
      const reader = state.readers.find((r) => r.id === action.payload);

      if (!reader || reader.borrowedBooks.length > 0) {
        console.log("Нельзя удалить читателя с книгами");
        return state;
      }

      return {
        ...state,
        readers: state.readers.filter((r) => r.id !== action.payload),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_LEND_TO_READER": {
      const { bookId, readerId } = action.payload;

      const book = state.books.find((b) => b.id === bookId);
      const reader = state.readers.find((r) => r.id === readerId);

      if (!book || !reader) {
        console.log("Книга или читатель не найдены");
        return state;
      }

      if (!book.isAvailable) {
        console.log("Книга уже выдана");
        return state;
      }

      return {
        ...state,
        books: state.books.map((b) =>
          b.id === bookId ? { ...b, isAvailable: false } : b
        ),
        readers: state.readers.map((r) =>
          r.id === readerId
            ? { ...r, borrowedBooks: [...r.borrowedBooks, bookId] }
            : r
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_RETURN_FROM_READER": {
      const { bookId, readerId } = action.payload;

      const reader = state.readers.find((r) => r.id === readerId);

      if (!reader || !reader.borrowedBooks.includes(bookId)) {
        console.log("Эта книга не у этого читателя");
        return state;
      }

      return {
        ...state,
        books: state.books.map((b) =>
          b.id === bookId ? { ...b, isAvailable: true } : b
        ),
        readers: state.readers.map((r) =>
          r.id === readerId
            ? {
                ...r,
                borrowedBooks: r.borrowedBooks.filter((id) => id !== bookId),
              }
            : r
        ),
        lastUpdated: new Date().toISOString(),
      };
    }

    default:
      return state;
  }
}

export default reducer;