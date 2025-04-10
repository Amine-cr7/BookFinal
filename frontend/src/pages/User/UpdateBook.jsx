import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateBook } from "../../features/books/bookSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateBook() {
    const { selectedBook } = useSelector(state => state.books);

    const [title, setTitle] = useState("");
    const [authors, setAuthors] = useState("");
    const [publisher, setPublisher] = useState("");
    const [publishedDate, setPublishedDate] = useState("");
    const [description, setDescription] = useState("");
    const [pageCount, setPageCount] = useState("");
    const [categories, setCategories] = useState("");
    const [photo, setPhoto] = useState("");
    const [language, setLanguage] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { _id } = useParams();

    useEffect(() => {
        if (selectedBook) {
            setTitle(selectedBook.volumeInfo?.title || "");
            setAuthors(selectedBook.volumeInfo?.authors?.join(", ") || "");
            setPublisher(selectedBook.volumeInfo?.publisher || "");
            setPublishedDate(selectedBook.volumeInfo?.publishedDate || "");
            setDescription(selectedBook.volumeInfo?.description || "");
            setPageCount(selectedBook.volumeInfo?.pageCount || "");
            setCategories(selectedBook.volumeInfo?.categories?.join(", ") || "");
            setPhoto(selectedBook.volumeInfo?.imageLinks?.thumbnail || "");
            setLanguage(selectedBook.volumeInfo?.language || "");
        }
    }, [selectedBook]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = {
            volumeInfo: {
                title,
                authors: authors.split(",").map(a => a.trim()),
                publisher,
                publishedDate,
                description,
                pageCount: parseInt(pageCount, 10) || 0,
                categories: categories.split(",").map(c => c.trim()),
                imageLinks: {
                    photo
                },
                language
            }
        };
        console.log(updatedBook)
        dispatch(updateBook({ _id: _id, Updatebook: updatedBook })).unwrap();
        navigate("/");
    };

    return (
        <>
            <div className="container-fluid px-4 py-5">
                <header className="d-flex justify-content-center align-items-center mb-5 flex-wrap gap-3">
                    <h1 className="display-5 fw-bold text-primary m-0">📚 Update Book</h1>
                </header>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className="w-50 p-4 border rounded">
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Authors (separated by commas)</label>
                        <input type="text" className="form-control" value={authors} onChange={(e) => setAuthors(e.target.value)}  />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Publisher</label>
                        <input type="text" className="form-control" value={publisher} onChange={(e) => setPublisher(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Published Date</label>
                        <input type="date" className="form-control" value={publishedDate} onChange={(e) => setPublishedDate(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea className="form-control" value={description} onChange={(e) => setDescription(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Page Count</label>
                        <input type="number" className="form-control" value={pageCount} onChange={(e) => setPageCount(e.target.value)} min="1" />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Categories (separated by commas)</label>
                        <input type="text" className="form-control" value={categories} onChange={(e) => setCategories(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Photo URL</label>
                        <input type="url" className="form-control" value={photo} onChange={(e) => setPhoto(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Language</label>
                        <input type="text" className="form-control" value={language} onChange={(e) => setLanguage(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary mt-3 w-100" type="submit">Update Book</button>
                    </div>
                </form>
            </div>
        </>
    );
}
