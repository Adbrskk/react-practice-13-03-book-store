import { useSelector } from "react-redux";

function Statistics() {
  const statistics = useSelector((state) => state.statistics);

  return (
    <div>
      <h2>Статистика</h2>
      <p>Всего книг: {statistics.totalBooks}</p>
      <p>Доступно книг: {statistics.availableBooks}</p>
      <p>Выдано книг: {statistics.borrowedBooks}</p>
      <p>Активных читателей: {statistics.activeReadersCount}</p>

      <p>
        Самый популярный автор:{" "}
        {statistics.mostPopularAuthor.name || "Нет данных"} (
        {statistics.mostPopularAuthor.booksCount})
      </p>

      <h3>Книги по десятилетиям</h3>
      <ul>
        {Object.entries(statistics.booksByDecade).map(([decade, count]) => (
          <li key={decade}>
            {decade}-е: {count}
          </li>
        ))}
      </ul>

      <p>
        Проверка консистентности:{" "}
        {statistics.consistencyCheck ? "OK" : "Ошибка"}
      </p>
    </div>
  );
}

export default Statistics;