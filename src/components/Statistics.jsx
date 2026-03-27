import { useSelector } from "react-redux";

function Statistics() {
  const stats = useSelector((state) => state.statistics);

  return (
    <div>
      <h2>Статистика</h2>

      <ul>
        <li>Всего книг: {stats.totalBooks}</li>
        <li>Доступно: {stats.availableBooks}</li>
        <li>Выдано: {stats.borrowedBooks}</li>
        <li>Активные читатели: {stats.activeReadersCount}</li>
        <li>
          Популярный автор: {stats.mostPopularAuthor.name} (
          {stats.mostPopularAuthor.booksCount})
        </li>
        <li>
          Проверка: {stats.consistencyCheck ? "OK" : "Ошибка"}
        </li>
      </ul>

      <h3>По десятилетиям</h3>
      <ul>
        {Object.entries(stats.booksByDecade).map(([decade, count]) => (
          <li key={decade}>
            {decade}s — {count} книг
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Statistics;