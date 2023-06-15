import {Book} from "../types/Book";

export const BookItem = ({book, deleteBook, setModalActive, setEditBook}: {
    book: Book,
    deleteBook: (ISBN: number) => void,
    setModalActive: (status: boolean) => void
    setEditBook: (book:Book) => void
}) => {

    return (
        <div className="book-item-container">
            <h4 className="book-item-title">{book.bookTitle}</h4>
            <h5 className="book-item-author">{book.authorName}</h5>
            <p className="book-item-category">{book.category}</p>
            <p className="book-item-isbn">{book.ISBN}</p>
            <div>
                <button className="delete-btn" onClick={() => deleteBook(book.ISBN)}>Delete book</button>
                <button className="edit-btn" onClick={() => {
                    setEditBook(book)
                    setModalActive(true)
                }}>Edit
                </button>
            </div>
        </div>
    )
}