import AddBookForm from "./components/AddBookForm";
import AddReaderForm from "./components/AddReaderForm";
import BooksList from "./components/BooksList";
import ReadersList from "./components/ReadersList";
import "./App.css";

function App() {
  return (
    <div className="container">
      <h1 className="title">Book Store</h1>

      <div className="forms">
        <div className="card">
          <AddBookForm />
        </div>

        <div className="card">
          <AddReaderForm />
        </div>
      </div>

      <div className="lists">
        <div className="card">
          <BooksList />
        </div>

        <div className="card">
          <ReadersList />
        </div>
      </div>
    </div>
  );
}

export default App;