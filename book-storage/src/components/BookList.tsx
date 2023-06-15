import {Book} from "../types/Book";
import {BookItem} from "./BookItem";

export const BookList = ({bookList, deleteBook, setModalActive, setEditBook}: {
    bookList: Book[],
    deleteBook: (ISBN: number) => void,
    setModalActive: (status: boolean) => void
    setEditBook: (book:Book) => void
}) => {

    return (
        <div className="Book-List">
            {bookList.map((book) => (
                <BookItem deleteBook={deleteBook} key={book.ISBN} book={book} setModalActive={setModalActive} setEditBook={setEditBook}></BookItem>
            ))}
        </div>
    )
}