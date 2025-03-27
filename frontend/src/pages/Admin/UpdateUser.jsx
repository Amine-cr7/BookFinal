import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "../../features/users/userSlice";
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateUser() {
    const { user, isError, isLoading } = useSelector(state => state.users);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        if (user) {
            setUsername(user.username || "");
            setEmail(user.email || "");
            setPassword(user.password || "");
            setRole(user.role || "");

        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updateUsers = {
            username,
            email,
            password,
            role
        };

        dispatch(updateUser({ _id: id, UpdateUser: updateUsers })).unwrap();
        navigate(-1)
    };

    return (
        <>
            <div className="container-fluid px-4 py-5">
                <header className="d-flex justify-content-center align-items-center mb-5 flex-wrap gap-3">
                    <h1 className="display-5 fw-bold text-primary m-0">Update user</h1>
                </header>
            </div>
            <div className="d-flex justify-content-center align-items-center">
                <form onSubmit={handleSubmit} className="w-50 p-4 border rounded">
                    <div className="form-group">
                        <label className="form-label">User name</label>
                        <input type="text" className="form-control" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Email</label>
                        <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Password</label>
                        <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label className="form-label">Role</label>
                        <select className="form-control" value={role} onChange={(e) => setRole(e.target.value)} required>
                            <option value="">Select Role</option>
                            <option value="publisher">Publisher</option>
                            <option value="user">User</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary mt-3 w-100" type="submit">Update user</button>
                    </div>
                </form>
            </div>
        </>
    );
}
