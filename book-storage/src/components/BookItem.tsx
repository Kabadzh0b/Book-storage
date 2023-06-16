import {Book} from "../types/Book";

export const BookItem = ({book, setModalActive, setEditBook, updateList}: {
    book: Book,
    setModalActive: (status: boolean) => void
    setEditBook: (book: Book) => void
    updateList: () => void
}) => {
    const deleteBook = () => {
        fetch(`http://localhost:3001/booksStorage/${book.id}`, {
            method: 'DELETE',
        })
            .then(() => updateList());
    }

    const updateActivation = () => {
        const updatedBook = {...book, activate: !book.activate}
        fetch(`http://localhost:3001/booksStorage/${book.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedBook),
        })
            .then(() => updateList())
    }

    return (
        <div className="book-item-container">
            <h4 className="book-item-title">{book.bookTitle}</h4>
            <h5 className="book-item-author">{book.authorName}</h5>
            <p className="book-item-category">{book.category}</p>
            <p className="book-item-isbn">{book.ISBN}</p>
            <div className="btns-container">
                <button className="delete-btn" onClick={() => {
                    deleteBook();
                }}>Delete book
                </button>
                <button className="edit-btn" onClick={() => {
                    setEditBook(book)
                    setModalActive(true)
                }}>Edit
                </button>
                <button className={book.activate ? "deactivate-btn" : "re-activate-btn"} onClick={() => {
                    updateActivation();
                }}>{book.activate ? "Deactivate" : "Re-activate"}
                </button>
            </div>
        </div>
    )
}