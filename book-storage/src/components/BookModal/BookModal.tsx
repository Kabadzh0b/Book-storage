import React, {useEffect, useState} from "react";
import "./BookModal.css";
import {Book} from "../../types/Book";

const BookModal = ({active, setActive, bookList, setBookList, editBook = null, setEditBook}: {
    active: boolean,
    setActive: (status: boolean) => void,
    bookList: Book[],
    setBookList: (bookList: Book[]) => void,
    editBook: Book | null,
    setEditBook: (book: Book | null) => void
}) => {
    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [category, setCategory] = useState("");
    const [ISBN, setISBN] = useState("");

    const clearAll = ()=>{
        setBookTitle("");
        setAuthorName("");
        setCategory("");
        setISBN("");
    }

    useEffect(() => {
        if (editBook) {
            setBookTitle(editBook.bookTitle);
            setAuthorName(editBook.authorName);
            setCategory(editBook.category);
            setISBN(String(editBook.ISBN));
        }
    }, [editBook]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (bookTitle.trim() === "") {

        } else if (authorName.trim() === "" || !isNaN(Number(authorName))) {

        } else if (category === "") {

        } else if (ISBN === "") {

        } else if (!editBook) {
            const newBook: Book = {
                bookTitle,
                authorName,
                category,
                ISBN: parseInt(ISBN),
            };
            const newBookList = [...bookList];
            newBookList.push(newBook);
            setBookList(newBookList);
            setActive(false);
        } else {
            const newBook: Book = {
                bookTitle,
                authorName,
                category,
                ISBN: parseInt(ISBN),
            };
            const newBookList = [...bookList];
            setBookList(newBookList.map((book) => {
                if (book.ISBN === editBook.ISBN) return newBook;
                return book;
            }))
            setEditBook(null);
            clearAll();
            setActive(false);
        }
    };


    return (
        <div className={active ? "modal active" : "modal"} onClick={() => {
            setEditBook(null);
            clearAll();
            setActive(false);
        }}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <h2>Add a book</h2>
                <form onSubmit={handleSubmit}>
                    <div className="modal-column">
                        <label htmlFor="bookTitle">Book Title:</label>
                        <input
                            type="text"
                            id="bookTitle"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                    </div>
                    <div className="modal-column">
                        <label htmlFor="authorName">Author Name:</label>
                        <input
                            type="text"
                            id="authorName"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </div>
                    <div className="modal-column">
                        <label htmlFor="category">Category:</label>
                        <select
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Mystery">Mystery</option>
                        </select>
                    </div>
                    <div className="modal-column">
                        <label htmlFor="ISBN">ISBN:</label>
                        <input
                            type="number"
                            id="ISBN"
                            value={ISBN}
                            onChange={(e) => setISBN(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => setActive(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default BookModal;