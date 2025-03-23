import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { deleteBook, getBookById } from "../features/books/bookSlice"
import { Link, useNavigate, useParams } from "react-router-dom"

export default function ShowBook() {
    const { selectedBook, isSuccess, isError, isLoading } = useSelector(state => state.books)
    const dispatch = useDispatch();
    const { _id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getBookById(_id)).unwrap()
    }, [dispatch, _id, navigate]);

    return (
        <div className="container mt-5">
            {isLoading && (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" style={{ width: '3rem', height: '3rem' }} role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                    <p className="mt-3 text-muted">Loading book details...</p>
                </div>
            )}

            {isError && (
                <div className="alert alert-danger mx-auto" style={{ maxWidth: '600px' }}>
                    <h4 className="alert-heading">⚠️ Error</h4>
                    <p>Failed to load book details. Please try again later.</p>
                </div>
            )}

            {selectedBook && (
                <div className="row g-5">
                    {/* Book Cover Column */}
                    <div className="col-md-4">
                        <div className="card border-0 shadow-lg hover-scale">
                            <img
                                src={selectedBook.volumeInfo?.imageLinks?.photo || "https://via.placeholder.com/300x450?text=No+Cover"}
                                alt={selectedBook.volumeInfo?.title}
                                className="img-fluid rounded-start"
                                style={{
                                    width: '100%',
                                    height: '60vh',
                                    objectFit: 'cover',
                                    objectPosition: 'top'
                                }}
                            />
                        </div>
                    </div>


                    <div className="col-md-8">
                        <div className="card border-0">
                            <div className="card-body p-4">
                                <h1 className="display-5 fw-bold mb-4">
                                    {selectedBook.volumeInfo?.title || "Untitled Book"}
                                </h1>

                                <div className="d-flex gap-4 mb-4 text-muted">
                                    {selectedBook.volumeInfo?.authors && (
                                        <div>
                                            <i className="bi bi-person me-2"></i>
                                            {selectedBook.volumeInfo.authors.join(', ')}
                                        </div>
                                    )}

                                    {selectedBook.volumeInfo?.publishedDate && (
                                        <div>
                                            <i className="bi bi-calendar me-2"></i>
                                            {new Date(selectedBook.volumeInfo.publishedDate).getFullYear()}
                                        </div>
                                    )}

                                    {selectedBook.volumeInfo?.pageCount && (
                                        <div>
                                            <i className="bi bi-file-text me-2"></i>
                                            {selectedBook.volumeInfo.pageCount} pages
                                        </div>
                                    )}
                                </div>

                                {/* Categories */}
                                {selectedBook.volumeInfo?.categories && (
                                    <div className="mb-4">
                                        {selectedBook.volumeInfo.categories.map((category, index) => (
                                            <span
                                                key={index}
                                                className="badge bg-primary me-2 mb-2"
                                            >
                                                {category}
                                            </span>
                                        ))}
                                    </div>
                                )}


                                <div className="mb-5">
                                    <h4 className="mb-3">Description</h4>
                                    <p className="lead" style={{ lineHeight: '1.8' }}>
                                        {selectedBook.volumeInfo?.description || "No description available."}
                                    </p>
                                </div>


                                <div className="row row-cols-2 row-cols-md-3 g-4 mb-5">
                                    <div className="col">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-uppercase text-muted small">Language</h6>
                                                <div className="h4">
                                                    {selectedBook.volumeInfo?.language?.toUpperCase() || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-uppercase text-muted small">Authors</h6>
                                                <div className="h4">
                                                    {selectedBook.volumeInfo?.authors || 'Unknown'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col">
                                        <div className="card h-100 border-0 shadow-sm">
                                            <div className="card-body">
                                                <h6 className="text-uppercase text-muted small">ISBN</h6>
                                                <div className="h4">
                                                    {selectedBook.volumeInfo?.industryIdentifiers?.[0]?.identifier || 'N/A'}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Button */}
                                <Link to={`/admin/update-book/${selectedBook._id}`}>
                                    UpdateBook
                                </Link>
                                <button onClick={() => {
                                    dispatch(deleteBook(_id))
                                    navigate("/")

                                }}>delete</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}