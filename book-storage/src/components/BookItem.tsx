import {Book} from "../types/Book";

export const BookItem = ({book, deleteBook}: { book: Book, deleteBook: (ISBN: number) => void }) => {

    return (
        <div className="book-item-container">
            <h4 className="book-item-title">{book.bookTitle}</h4>
            <h5 className="book-item-author">{book.authorName}</h5>
            <p className="book-item-category">{book.category}</p>
            <p className="book-item-isbn">{book.ISBN}</p>
            <div>
                <button onClick={() => deleteBook(book.ISBN)}>Delete book</button>
                <button>Edit</button>
            </div>

        </div>
    )
}