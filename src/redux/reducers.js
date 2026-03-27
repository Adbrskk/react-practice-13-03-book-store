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
  const borrowedBooks = totalBooks - availableBooks;

  const booksByDecade = {};

  books.forEach((book) => {
    const decade = Math.floor(Number(book.year) / 10) * 10;
    booksByDecade[decade] = (booksByDecade[decade] || 0) + 1;
  });

  const activeReadersCount = readers.filter(
    (reader) => reader.borrowedBooks.length > 0
  ).length;

  const authorsMap = {};

  books.forEach((book) => {
    authorsMap[book.author] = (authorsMap[book.author] || 0) + 1;
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

  const borrowedBooksByReaders = readers.reduce((sum, reader) => {
    return sum + reader.borrowedBooks.length;
  }, 0);

  const consistencyCheck =
    availableBooks + borrowedBooks === totalBooks &&
    borrowedBooksByReaders === borrowedBooks;

  if (!consistencyCheck) {
    console.warn("Ошибка консистентности данных!");
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

      return {
        ...state,
        books: newBooks,
        statistics: calculateStatistics(newBooks, state.readers),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_REMOVE": {
      const book = state.books.find((b) => b.id === action.payload);

      if (!book || book.isAvailable === false) {
        console.log("Нельзя удалить книгу");
        return state;
      }

      const newBooks = state.books.filter((b) => b.id !== action.payload);

      return {
        ...state,
        books: newBooks,
        statistics: calculateStatistics(newBooks, state.readers),
        lastUpdated: new Date().toISOString(),
      };
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

      return {
        ...state,
        books: newBooks,
        statistics: calculateStatistics(newBooks, state.readers),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "BOOK_TOGGLE_AVAILABILITY": {
      const newBooks = state.books.map((book) =>
        book.id === action.payload
          ? { ...book, isAvailable: !book.isAvailable }
          : book
      );

      return {
        ...state,
        books: newBooks,
        statistics: calculateStatistics(newBooks, state.readers),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "READER_ADD": {
      const newReader = {
        id: Date.now() + Math.random(),
        name: action.payload.name,
        email: action.payload.email,
        borrowedBooks: [],
      };

      const newReaders = [...state.readers, newReader];

      return {
        ...state,
        readers: newReaders,
        statistics: calculateStatistics(state.books, newReaders),
        lastUpdated: new Date().toISOString(),
      };
    }

    case "READER_REMOVE": {
      const reader = state.readers.find((r) => r.id === action.payload);

      if (!reader || reader.borrowedBooks.length > 0) {
        console.log("Нельзя удалить читателя с книгами");
        return state;
      }

      const newReaders = state.readers.filter((r) => r.id !== action.payload);

      return {
        ...state,
        readers: newReaders,
        statistics: calculateStatistics(state.books, newReaders),
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

      const newBooks = state.books.map((b) =>
        b.id === bookId ? { ...b, isAvailable: false } : b
      );

      const newReaders = state.readers.map((r) =>
        r.id === readerId
          ? {
              ...r,
              borrowedBooks: [...r.borrowedBooks, bookId],
            }
          : r
      );

      return {
        ...state,
        books: newBooks,
        readers: newReaders,
        statistics: calculateStatistics(newBooks, newReaders),
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

      return {
        ...state,
        books: newBooks,
        readers: newReaders,
        statistics: calculateStatistics(newBooks, newReaders),
        lastUpdated: new Date().toISOString(),
      };
    }

    default:
      return state;
  }
}

export default reducer;