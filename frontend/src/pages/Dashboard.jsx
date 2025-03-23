import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import { Link } from "react-router-dom";

export default function Dashboard() {
    const { books, isSuccess, isError, isLoading } = useSelector(state => state.books)
    const dispatch = useDispatch()

    const categories = []
    const [getLanguage, setLanguage] = useState(null)
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [count , setCount] = useState(null)
    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;

        setSelectedCategories((prev) =>
            checked ? [...prev, value] : prev.filter((category) => category !== value)
        );
    };


    useEffect(() => {
        dispatch(getBooks({ language: getLanguage, categories: selectedCategories , pageCount : count }));
    }, [dispatch, getLanguage, selectedCategories , count]);


    const bookList = books?.books || [];
    bookList.forEach(element => {
        if (!categories.includes(element.volumeInfo.categories[0])) {
            categories.push(element.volumeInfo.categories[0])
        }
    });
    // pagination : 
    const [currentPage, setCurrentPage] = useState(1)
    const BooksPerPage = 12
    const totalPages = Math.ceil(bookList.length / BooksPerPage)

    const startIndex = (currentPage - 1) * BooksPerPage
    const currentBooks = bookList.slice(startIndex, startIndex + BooksPerPage)



    return (
        <>
            <section className="heading bg-danger p-2 w-25 border rounded-2">
                <p className="text-center">Books Dashboard</p>
            </section>
            <div>
                fr <input type="radio" name="ln" value={"fr"} onChange={(e) => setLanguage(e.target.value)} />
                en <input type="radio" name="ln" value={"en"} onChange={(e) => setLanguage(e.target.value)} />
            </div>
            <div>
                {categories.map((item,index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            value={item}
                            onChange={handleCategoryChange}
                            checked={selectedCategories.includes(item)}
                        />
                        {item}
                    </label>
                ))}
            </div>
            <div>
                <input type="number" onChange={(e) => setCount(e.target.value) } />
            </div>

            <section className="content">
                {isLoading && <p>Loading books...</p>}
                {isError && <p>Failed to load books. Please try again.</p>}

                {!isLoading && !isError && bookList.length > 0 ? (
                    <div className="books row ">
                        {currentBooks.map((book, index) => (
                            <div className="card col-4 col-sm-2 m-2" style={{ width: "18rem", marginBottom: "10px" }} key={index}>
                                <img
                                    src={book.volumeInfo.imageLinks?.photo || "https://via.placeholder.com/150"}
                                    className="card-img-top"
                                    alt={book.volumeInfo.title || "Book Image"}
                                    style={{ height: "300px", objectFit: "cover" }}
                                />
                                <div className="card-body ">
                                    <h5 className="card-title"
                                        style={{ height: "100px" }}
                                    >
                                        {book.volumeInfo.title ?
                                            book.volumeInfo.title.slice(0, 75) + "..."
                                            : "No Title Available"}</h5>
                                    <p className="card-text"
                                        style={{ height: "100px" }}>
                                        {book.volumeInfo.description
                                            ? book.volumeInfo.description.slice(0, 100) + "..."
                                            : "No description available."}
                                    </p>
                                    <Link to={`/book/${book._id}`} className="btn btn-primary">

                                        View Book
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    !isLoading && !isError && <h3>You have not set any Books</h3>
                )}

                {bookList.length > BooksPerPage && (
                    <div className="pagination d-flex justify-content-center mt-4">
                        <button
                            className="btn btn-outline-primary mx-2"
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage((prev) => prev - 1)}
                        >
                            Previous
                        </button>

                        <span className="align-self-center"> Page {currentPage} of {totalPages} </span>

                        <button
                            className="btn btn-outline-primary mx-2"
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage((prev) => prev + 1)}
                        >
                            Next
                        </button>
                    </div>
                )}
            </section>
        </>
    )
}