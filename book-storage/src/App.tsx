import React, {ChangeEvent, useEffect, useState} from 'react';
import './App.css';
import {BookList} from "./components/BookList";
import BookModal from "./components/BookModal/BookModal";
import {Book} from "./types/Book";
import {MySelect} from "./components/MySelect/MySelect";


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
    const [filtered, setFiltered] = useState<Book[]>([]);
    const [editBook, setEditBook] = useState<Book | null>(null);
    const [selectedOption, setSelectedOption] = useState("activated");

    const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
        const selectedValue = event.target.value;
        setSelectedOption(selectedValue);
    }
    useEffect(() => {
        if (selectedOption === "activated") {
            setFiltered(bookList.filter(book => book.activate));
        } else if (selectedOption === "deactivated") {
            setFiltered(bookList.filter(book => !book.activate));
        } else {
            setFiltered(bookList);
        }
    }, [bookList, selectedOption])


    return (
        <div className="App">
            <button className="add-book-btn" onClick={() => {
                setModalActive(true)
            }}>Add a book
            </button>
            <MySelect handleSelectChange={handleSelectChange}/>
            <BookList filteredList={filtered} setModalActive={setModalActive}
                      setEditBook={setEditBook} updateList={updateList}
            ></BookList>
            <BookModal active={modalActive} setActive={setModalActive} bookList={bookList} editBook={editBook}
                       setEditBook={setEditBook}
                       updateList={updateList}></BookModal>
        </div>
    );
}

export default App;
