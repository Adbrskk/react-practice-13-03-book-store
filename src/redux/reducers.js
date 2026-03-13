const initialState = {
  books: [],
  readers: [],
  statistics: {
    totalBooks: 0,
    availableBooks: 0,
    borrowedBooks: 0,
    booksByDecade: {},
    activeReadersCount: 0,
    mostPopularAuthor: {
      name: "",
      booksCount: 0,
    },
    consistencyCheck: true,
  },
  lastUpdated: null,
};

function calculateStatistics(books, readers) {
  const totalBooks = books.length;
  const availableBooks = books.filter((book) => book.isAvailable).length;
  const borrowedBooks = books.filter((book) => !book.isAvailable).length;

  const booksByDecade = {};
  const authorsMap = {};

  books.forEach((book) => {
    const decade = Math.floor(book.year / 10) * 10;
    const decadeKey = String(decade);

    if (!booksByDecade[decadeKey]) {
      booksByDecade[decadeKey] = 0;
    }
    booksByDecade[decadeKey] += 1;

    if (!authorsMap[book.author]) {
      authorsMap[book.author] = 0;
    }
    authorsMap[book.author] += 1;
  });

  let mostPopularAuthor = {
    name: "",
    booksCount: 0,
  };

  for (const author in authorsMap) {
    if (authorsMap[author] > mostPopularAuthor.booksCount) {
      mostPopularAuthor = {
        name: author,
        booksCount: authorsMap[author],
      };
    }
  }

  const activeReadersCount = readers.filter(
    (reader) => reader.borrowedBooks.length > 0
  ).length;

  const totalBorrowedByReaders = readers.reduce((sum, reader) => {
    return sum + reader.borrowedBooks.length;
  }, 0);

  const consistencyCheck =
    availableBooks + borrowedBooks === totalBooks &&
    totalBorrowedByReaders === borrowedBooks;

  if (!consistencyCheck) {
    console.warn("Ошибка согласованности данных в библиотеке");
  }

  return {
    totalBooks,
    availableBooks,
    borrowedBooks,
    booksByDecade,
    activeReadersCount,
    mostPopularAuthor,
    consistencyCheck,
  };
}

function updateState(state, newBooks, newReaders) {
  return {
    ...state,
    books: newBooks,
    readers: newReaders,
    statistics: calculateStatistics(newBooks, newReaders),
    lastUpdated: new Date().toISOString(),
  };
}

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

      const newBooks = [...state.books, newBook];
      return updateState(state, newBooks, state.readers);
    }

    case "BOOK_REMOVE": {
      const book = state.books.find((b) => b.id === action.payload);

      if (!book || book.isAvailable === false) {
        console.log("Нельзя удалить книгу");
        return state;
      }

      const newBooks = state.books.filter((b) => b.id !== action.payload);
      return updateState(state, newBooks, state.readers);
    }

    case "BOOK_UPDATE_INFO": {
      const newBooks = state.books.map((book) =>
        book.id === action.payload.id
          ? {
              ...book,
              title: action.payload.title ?? book.title,
              author: action.payload.author ?? book.author,
              year: action.payload.year ?? book.year,
            }
          : book
      );

      return updateState(state, newBooks, state.readers);
    }

    case "BOOK_TOGGLE_AVAILABILITY": {
      const newBooks = state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isAvailable: !book.isAvailable }
          : book
      );

      return updateState(state, newBooks, state.readers);
    }

    case "READER_ADD": {
      const newReader = {
        id: Date.now() + Math.floor(Math.random() * 1000),
        name: action.payload.name,
        email: action.payload.email,
        borrowedBooks: [],
      };

      const newReaders = [...state.readers, newReader];
      return updateState(state, state.books, newReaders);
    }

    case "READER_REMOVE": {
      const reader = state.readers.find((r) => r.id === action.payload);

      if (!reader || reader.borrowedBooks.length > 0) {
        console.log("Нельзя удалить читателя, у него есть книги");
        return state;
      }

      const newReaders = state.readers.filter((r) => r.id !== action.payload);
      return updateState(state, state.books, newReaders);
    }

    case "BOOK_LEND_TO_READER": {
      const { bookId, readerId } = action.payload;

      const book = state.books.find((b) => b.id === bookId);
      const reader = state.readers.find((r) => r.id === readerId);

      if (!book) {
        console.log("Книга не найдена");
        return state;
      }

      if (!reader) {
        console.log("Читатель не найден");
        return state;
      }

      if (!book.isAvailable) {
        console.log("Книга уже выдана");
        return state;
      }

      const newBooks = state.books.map((b) =>
        b.id === bookId ? { ...b, isAvailable: false } : b
      );

      const newReaders = state.readers.map((r) =>
        r.id === readerId
          ? { ...r, borrowedBooks: [...r.borrowedBooks, bookId] }
          : r
      );

      return updateState(state, newBooks, newReaders);
    }

    case "BOOK_RETURN_FROM_READER": {
      const { bookId, readerId } = action.payload;

      const reader = state.readers.find((r) => r.id === readerId);

      if (!reader || !reader.borrowedBooks.includes(bookId)) {
        console.log("У этого читателя нет такой книги");
        return state;
      }

      const newBooks = state.books.map((b) =>
        b.id === bookId ? { ...b, isAvailable: true } : b
      );

      const newReaders = state.readers.map((r) =>
        r.id === readerId
          ? {
              ...r,
              borrowedBooks: r.borrowedBooks.filter((id) => id !== bookId),
            }
          : r
      );

      return updateState(state, newBooks, newReaders);
    }

    default:
      return state;
  }
}

export default reducer;