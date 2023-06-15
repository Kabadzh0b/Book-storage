import React, {useState} from 'react';
import './App.css';
import {BookList} from "./components/BookList";
import BookModal from "./components/BookModal/BookModal";
import {Book} from "./types/Book";

function App() {
    const BaseBookList: Book[] = [{
        bookTitle: "1984",
        authorName: "George Orwell",
        category: "anti-utopia",
        ISBN: 1,
    },
        {
            bookTitle: "Animal Farm",
            authorName: "George Orwell",
            category: "anti-utopia",
            ISBN: 2,
        }
    ];

    const [modalActive, setModalActive] = useState(false);
    const [bookList, setBookList] = useState(BaseBookList);

    const deleteBook = (ISBN: number) => {
        setBookList(bookList.filter(book => book.ISBN !== ISBN));
    }

    return (
        <div className="App">
            <button onClick={() => setModalActive(true)}>Add a book</button>
            <BookList bookList={bookList} deleteBook={deleteBook}></BookList>
            <BookModal active={modalActive} setActive={setModalActive} bookList={bookList}
                       setBookList={setBookList}></BookModal>
        </div>
    );
}

export default App;
