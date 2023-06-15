import React, {useState} from 'react';
import './App.css';
import {BookList} from "./components/BookList";
import BookModal from "./components/BookModal/BookModal";

function App() {
    const [modalActive,setModalActive] = useState(false);

  return (
    <div className="App">
        <button onClick={() => setModalActive(true)}>Add a book</button>
        <BookList></BookList>
        <BookModal active={modalActive} setActive={setModalActive}></BookModal>
    </div>
  );
}

export default App;
