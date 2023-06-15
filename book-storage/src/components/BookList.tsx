import {Book} from "../types/Book";
import {BookItem} from "./BookItem";

export const BookList = ({bookList, deleteBook}: { bookList: Book[], deleteBook: (ISBN: number) => void }) => {

    return (
        <div className="Book-List">
            {bookList.map((book) => (
                <BookItem deleteBook={deleteBook} key={book.ISBN} book={book}></BookItem>
            ))}
        </div>
    )
}