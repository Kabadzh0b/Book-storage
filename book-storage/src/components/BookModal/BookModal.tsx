import React, {useState} from "react";
import "./BookModal.css";
import {Book} from "../../types/Book";

const BookModal = ({active,setActive}: {active:boolean, setActive:(status:boolean)=>void})=>{
    const [bookTitle, setBookTitle] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [category, setCategory] = useState("");
    const [ISBN, setISBN] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(bookTitle.trim() === ""){

        }
        else if(authorName.trim() === "" || !isNaN(Number(authorName))){

        }
        else if(category === ""){

        }
        else if(ISBN === ""){

        }
        else{
            const newBook: Book = {
                bookTitle,
                authorName,
                category,
                ISBN: parseInt(ISBN),
            };
            console.log(newBook);
            setActive(false);
        }
    };


    return(
        <div className={active ? "modal active" : "modal"} onClick={()=>setActive(false)}>
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
                        <button type="button" onClick={()=>setActive(false)}>
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default BookModal;