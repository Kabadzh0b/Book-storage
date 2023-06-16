import React, {useEffect, useState} from "react";
import "./BookModal.css";
import {Book} from "../../types/Book";


const BookModal = ({active, setActive, bookList, setBookList, editBook = null, setEditBook, updateList}: {
    active: boolean,
    setActive: (status: boolean) => void,
    bookList: Book[],
    setBookList: (bookList: Book[]) => void,
    editBook: Book | null,
    setEditBook: (book: Book | null) => void,
    updateList: () => void,
}) => {
    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [category, setCategory] = useState("");
    const [ISBN, setISBN] = useState("");

    const [bookTitleCorrect, setBookTitleCorrect] = useState(true);
    const [authorNameCorrect, setAuthorNameCorrect] = useState(true);
    const [categoryCorrect, setCategoryCorrect] = useState(true);
    const [ISBNCorrect, setISBNCorrect] = useState(true);

    const ISBNs: number[] = [];

    for (let book of bookList) {
        ISBNs.push(book.ISBN);
    }

    const clearAll = () => {
        setBookTitle("");
        setAuthorName("");
        setCategory("");
        setISBN("");
        setBookTitleCorrect(true);
        setAuthorNameCorrect(true);
        setCategoryCorrect(true);
        setISBNCorrect(true);
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
            setBookTitleCorrect(false);
        } else if (authorName.trim() === "" || !isNaN(Number(authorName))) {
            if (!bookTitleCorrect) setBookTitleCorrect(true);
            setAuthorNameCorrect(false);
        } else if (category === "") {
            if (!authorNameCorrect) setAuthorNameCorrect(true);
            setCategoryCorrect(false);
        } else if (ISBN === "" || ISBNs.includes(Number(ISBN))) {
            if (!categoryCorrect) setCategoryCorrect(true);
            setISBNCorrect(false);
        } else if (!editBook) {
            const newBook: Book = {
                bookTitle,
                authorName,
                category,
                ISBN: parseInt(ISBN),
                activate: true
            };
            const newBookList = [...bookList];
            newBookList.push(newBook);
            setBookList(newBookList);
            setActive(false);
            fetch('http://localhost:3001/booksStorage', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
                .then(()=> updateList())
                .catch(error => {
                    console.error('Error:', error);
                });
        } else {
            const newBook: Book = {
                bookTitle,
                authorName,
                category,
                ISBN: parseInt(ISBN),
                activate: true,
                id: editBook.id,
            };
            fetch(`http://localhost:3001/booksStorage/${editBook.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            })
                .then(() => {
                    updateList();
                    setEditBook(null);
                    clearAll();
                    setActive(false);
                })
                .catch(error => {
                    console.error('Error:', error);
                });
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
                            className={bookTitleCorrect ? "" : "incorrect"}
                            type="text"
                            id="bookTitle"
                            value={bookTitle}
                            onChange={(e) => setBookTitle(e.target.value)}
                        />
                    </div>
                    <div className="modal-column">
                        <label htmlFor="authorName">Author Name:</label>
                        <input
                            className={authorNameCorrect ? "" : "incorrect"}
                            type="text"
                            id="authorName"
                            value={authorName}
                            onChange={(e) => setAuthorName(e.target.value)}
                        />
                    </div>
                    <div className="modal-column">
                        <label htmlFor="category">Category:</label>
                        <select
                            className={categoryCorrect ? "" : "incorrect"}
                            id="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="">{editBook ? editBook.category : "Select Category"}</option>
                            <option value="Fiction">Fiction</option>
                            <option value="Non-Fiction">Non-Fiction</option>
                            <option value="Mystery">Mystery</option>
                        </select>
                    </div>
                    <div className="modal-column">
                        <label htmlFor="ISBN">ISBN:</label>
                        <input
                            className={ISBNCorrect ? "" : "incorrect"}
                            type="number"
                            id="ISBN"
                            value={ISBN}
                            onChange={(e) => setISBN(e.target.value)}
                        />
                    </div>
                    <div className="modal-actions">
                        <button type="submit">Add</button>
                        <button type="button" onClick={() => {
                            setEditBook(null);
                            setActive(false)
                            clearAll();
                        }}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default BookModal;