import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBooks } from "../features/books/bookSlice";
import { Link } from "react-router-dom";
import CreateBook from "./CreateBook";

export default function Dashboard() {
    const { books, isSuccess, isError, isLoading } = useSelector(state => state.books);
    const dispatch = useDispatch();

    const [getLanguage, setLanguage] = useState(null);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [count, setCount] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    
    const BooksPerPage = 12;
    const bookList = books?.books || [];
    
  
    const categories = [...new Set(bookList
        .map(book => book.volumeInfo?.categories?.[0]) // Add optional chaining
        .filter(Boolean))];
    const totalPages = Math.ceil(bookList.length / BooksPerPage);
    const startIndex = (currentPage - 1) * BooksPerPage;
    const currentBooks = bookList.slice(startIndex, startIndex + BooksPerPage);

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setSelectedCategories(prev => checked ? [...prev, value] : prev.filter(c => c !== value));
    };

    useEffect(() => {
        dispatch(getBooks({ 
            language: getLanguage, 
            categories: selectedCategories, 
            pageCount: count 
        }));
    }, [dispatch, getLanguage, selectedCategories, count]);

    return (
        <div className="container-fluid px-4 py-5">
            {/* Header Section */}
            <header className="d-flex justify-content-between align-items-center mb-5 flex-wrap gap-3">
                <h1 className="display-5 fw-bold text-primary m-0">📚 Book Explorer</h1>
            </header>
            <div className="d-flex justify-content-between align-content-center">

                    <Link to="/admin/create-book" className="btn btn-primary btn-lg px-4 py-2">
                        <i className="bi bi-plus-circle me-2"></i>
                        Create Book
                    </Link>
            </div>

            <div className="row mb-4 g-4">
                {/* Filters Sidebar */}
                <div className="col-lg-3">
                    <div className="card shadow-sm">
                        <div className="card-body">
                            <h5 className="mb-3">Filters</h5>

                            {/* Language Filter */}
                            <div className="mb-4">
                                <h6 className="text-muted mb-3">Language</h6>
                                <div className="btn-group" role="group">
                                    <input 
                                        type="radio" 
                                        className="btn-check" 
                                        name="ln" 
                                        id="en" 
                                        value="en"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="en">English</label>

                                    <input 
                                        type="radio" 
                                        className="btn-check" 
                                        name="ln" 
                                        id="fr" 
                                        value="fr"
                                        onChange={(e) => setLanguage(e.target.value)}
                                    />
                                    <label className="btn btn-outline-primary" htmlFor="fr">French</label>
                                </div>
                            </div>

                            {/* Category Filter */}
                            <div className="mb-4">
                                <h6 className="text-muted mb-3">Categories</h6>
                                <div className="dropdown">
                                    <button 
                                        className="btn btn-secondary dropdown-toggle w-100" 
                                        type="button" 
                                        data-bs-toggle="dropdown" 
                                        aria-expanded="false"
                                    >
                                        {selectedCategories.length > 0 
                                            ? `${selectedCategories.length} Selected`
                                            : "Select Categories"}
                                    </button>
                                    <ul className="dropdown-menu p-3" style={{ maxHeight: '300px', overflowY: 'auto' }}>
                                        {categories.map((item) => (
                                            <li key={item} className="mb-2">
                                                <div className="form-check">
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        id={item}
                                                        value={item}
                                                        checked={selectedCategories.includes(item)}
                                                        onChange={handleCategoryChange}
                                                    />
                                                    <label className="form-check-label" htmlFor={item}>
                                                        {item}
                                                    </label>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Books Grid */}
                <div className="col-lg-9">
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4">
                        {currentBooks.map((book, index) => (
                            <div className="col" key={index}>
                                <div className="card h-100 shadow-sm hover-scale">
                                    <img
                                        src={book.volumeInfo.imageLinks?.photo || "https://via.placeholder.com/300x450"}
                                        className="card-img-top img-fluid"
                                        alt={book.volumeInfo.title}
                                        style={{ 
                                            height: "450px", 
                                            objectFit: "cover",
                                            objectPosition: "top"
                                        }}
                                    />
                                    <div className="card-body d-flex flex-column">
                                        <h5 className="card-title clamp-2-lines mb-3">
                                            {book.volumeInfo.title?
                                                book.volumeInfo.title.slice(0,75) + "..." 
                                            : "No Title Available"}
                                        </h5>
                                        <div className="d-flex justify-content-between text-muted small mb-2">
                                            <span>Pages: {book.volumeInfo.pageCount || 'N/A'}</span>
                                            <span>{book.volumeInfo.language?.toUpperCase()}</span>
                                        </div>
                                        <p className="card-text text-muted clamp-3-lines mb-3">
                                            {book.volumeInfo.title ?
                                                book.volumeInfo.title.slice(0, 75) + "..."
                                                : "No Title Available"}
                                        </p>
                                        <div className="mt-auto">
                                            <Link 
                                                to={`/book/${book._id}`} 
                                                className="btn btn-primary w-100 stretched-link"
                                            >
                                                View Details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    {bookList.length > BooksPerPage && (
                        <nav className="mt-5 d-flex justify-content-center">
                            <ul className="pagination">
                                <li className={`page-item ${currentPage === 1 && 'disabled'}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => setCurrentPage(prev => prev - 1)}
                                    >
                                        Previous
                                    </button>
                                </li>
                                
                                {[...Array(totalPages).keys()].map(num => (
                                    <li 
                                        key={num} 
                                        className={`page-item ${currentPage === num + 1 && 'active'}`}
                                    >
                                        <button 
                                            className="page-link"
                                            onClick={() => setCurrentPage(num + 1)}
                                        >
                                            {num + 1}
                                        </button>
                                    </li>
                                ))}
                                
                                <li className={`page-item ${currentPage === totalPages && 'disabled'}`}>
                                    <button 
                                        className="page-link" 
                                        onClick={() => setCurrentPage(prev => prev + 1)}
                                    >
                                        Next
                                    </button>
                                </li>
                            </ul>
                        </nav>
                    )}
                </div>
            </div>

            {/* Loading Overlay */}
            {isLoading && (
                <div className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center bg-dark bg-opacity-50" 
                     style={{ zIndex: 9999 }}>
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            )}

            {/* Error Message */}
            {isError && (
                <div className="alert alert-danger position-fixed top-0 start-50 translate-middle-x mt-3" 
                     style={{ zIndex: 9999 }}>
                    Failed to load books. Please try again.
                </div>
            )}
        </div>
    );
}