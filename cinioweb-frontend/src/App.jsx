import { useEffect, useState } from "react";
//import heroImg from './assets/hero.png'
//import reactLogo from './assets/react.svg'
//import viteLogo from './assets/vite.svg'
import "./App.css";
import CinematicScene from "./pages/CinematicScene";

function App() {
  //const [books, setBooks] = useState([]);

  //useEffect(() => {
  //  fetch("http://localhost:8080/api/books")
  //    .then((response) => response.json())
  //    .then((data) => {
  //      setBooks(data);
  //    })
  //    .catch((error) => {
  //      console.error("Error Fetching books", error);
  //    });
  //}, []);

  //return (
  //  <div>
  //    <h1>Cinioweb</h1>
  //    <h2>Books</h2>

  //    {books.map((book) => (
  //      <div key={book.id}>
  //        <h3>{book.title}</h3>
  //        <p>{book.descr}</p>
  //        <p>{book.author}</p>
  //      </div>
  //    ))}
  //  </div>
    //);

    return <CinematicScene />;
}

export default App;
