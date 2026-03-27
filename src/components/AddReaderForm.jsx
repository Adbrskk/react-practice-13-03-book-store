import { useState } from "react";
import { useDispatch } from "react-redux";

function AddReaderForm() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({
      type: "READER_ADD",
      payload: { name, email },
    });

    setName("");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Добавить читателя</h2>
      <input
        placeholder="Имя"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">Добавить</button>
    </form>
  );
}

export default AddReaderForm;