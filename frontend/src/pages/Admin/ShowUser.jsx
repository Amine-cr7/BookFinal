import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, useParams } from "react-router-dom"
import { getUser } from "../../features/users/userSlice";

export default function ShowUser() {
    const { user, isError, isLoading } = useSelector(state => state.users);
    const dispatch = useDispatch();
    const { _id } = useParams();

    useEffect(() => {
        dispatch(getUser(_id))
            .unwrap()

    }, [dispatch, _id]);

    return (
        <div className="container mt-5">
            {isLoading && (
                <div className="text-center py-5">
                    
                </div>
            )}

            {isError && (
                <div className="alert alert-danger mx-auto" style={{ maxWidth: '600px' }}>
                    
                </div>
            )}

            {user && (
                <div className="card shadow-lg mx-auto" style={{ maxWidth: '500px' }}>
                    <div className="card-body">
                        <h3 className="card-title text-center">{user.username}</h3>
                        <p className="card-text"><strong>Email:</strong> {user.email}</p>
                        <p className="card-text"><strong>Role:</strong> {user.role}</p>
                        <Link to="/admin" className="btn btn-primary w-100 mt-3">Back to Admin Panel</Link>
                    </div>
                </div>
            )}
        </div>
    );
}