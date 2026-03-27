import { useState } from "react";
import { useDispatch } from "react-redux";

function AddBookForm() {
  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [year, setYear] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "BOOK_ADD",
      payload: { title, author, year },
    });

    setTitle("");
    setAuthor("");
    setYear("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить книгу</h2>
      <input
        placeholder="Название"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input
        placeholder="Автор"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
      />
      <input
        placeholder="Год"
        value={year}
        onChange={(e) => setYear(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddBookForm;