import {Book} from "../types/Book";


export const BookItem = ({ book }: { book: Book })=>{

    return(
        <div className="book-item-container">
            <h4 className="book-item-title">{book.bookTitle}</h4>
            <h5 className="book-item-author">{book.authorName}</h5>
            <p className="book-item-category">{book.category}</p>
            <p className="book-item-isbn">{book.ISBN}</p>
        </div>
    )
}