import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { getBookById } from "../features/books/bookSlice"
import { useNavigate, useParams } from "react-router-dom"

export default function ShowBook() {
    const { selectedBook, isSuccess, isError, isLoading } = useSelector(state => state.books)
    // const dispatch = useDispatch()
    // const { _id } = useParams()

    // useEffect(() => {
    //     dispatch(getBookById(_id))
    // }, [dispatch, _id])
    const dispatch = useDispatch();
    const { _id } = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
      dispatch(getBookById(_id)).unwrap().catch((error) => {
        if (error === "Unauthorized") {
          navigate('/login');
        }
      });
    }, [dispatch, _id, navigate]);

    return(
        <div className="container mt-4">
            {isLoading && <p>Loading book details...</p>}
            {isError && <p>Error fetching book details.</p>}
            {selectedBook && (
                <div className="card">
                    <img
                        src={selectedBook.volumeInfo?.imageLinks?.photo || "https://via.placeholder.com/150"}
                        alt={selectedBook.volumeInfo?.title || "Book Image"}
                        className="card-img-top"
                        style={{ width: "200px", height: "300px", objectFit: "cover" }}
                    />
                    <div className="card-body">
                        <h5 className="card-title">{selectedBook.volumeInfo?.title || "No Title Available"}</h5>
                        <p className="card-text">{selectedBook.volumeInfo?.description || "No description available."}</p>
                        <a href={selectedBook.volumeInfo?.infoLink || "#"} 
                           className="btn btn-primary" 
                           target="_blank" 
                           rel="noopener noreferrer">
                            View Book
                        </a>
                    </div>
                </div>
            )}
        </div>
    )
}