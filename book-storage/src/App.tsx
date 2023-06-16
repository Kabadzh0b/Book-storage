import React, {useEffect, useState} from 'react';
import './App.css';
import {BookList} from "./components/BookList";
import BookModal from "./components/BookModal/BookModal";
import {Book} from "./types/Book";


function App() {

    const updateList = () => {
        const BookListURL = 'http://localhost:3001/booksStorage';
        fetch(BookListURL)
            .then(response => response.json())
            .then(data =>
                setBookList([...data])
            )
    }

    useEffect(() => {
        updateList();
    }, [])

    const [modalActive, setModalActive] = useState(false);
    const [bookList, setBookList] = useState<Book[]>([]);
    const [editBook, setEditBook] = useState<Book | null>(null);

    return (
        <div className="App">
            <button onClick={() => {
                setModalActive(true)
            }}>Add a book
            </button>
            <BookList bookList={bookList} setModalActive={setModalActive}
                      setEditBook={setEditBook} updateList={updateList}></BookList>
            <BookModal active={modalActive} setActive={setModalActive} bookList={bookList}
                       setBookList={setBookList} editBook={editBook} setEditBook={setEditBook}
                       updateList={updateList}></BookModal>
        </div>
    );
}

export default App;
