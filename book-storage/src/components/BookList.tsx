import {Book} from "../types/Book";
import {BookItem} from "./BookItem";

export const BookList = ({filteredList, setModalActive, setEditBook, updateList}: {
    filteredList: Book[],
    setModalActive: (status: boolean) => void
    setEditBook: (book:Book) => void
    updateList: () => void
}) => {

    return (
        <div className="Book-List">
            {filteredList.map((book) => (
                <BookItem key={book.id} book={book} setModalActive={setModalActive} setEditBook={setEditBook} updateList={updateList}></BookItem>
            ))}
        </div>
    )
}