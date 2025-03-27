import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createUser } from "../../features/users/userSlice";

export default function CreateUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("");

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newUser = {
            username,
            email,
            password,
            role
        };

        try {
            await dispatch(createUser(newUser)).unwrap();
            navigate("/admin"); 
        } catch (error) {
            console.error("Error creating user:", error);
        }
    };

    return (
        <>
            <div className="container-fluid px-4 py-5">
                <header className="d-flex justify-content-center align-items-center mb-5 flex-wrap gap-3">
                    <h1 className="display-5 fw-bold text-primary m-0">Create user</h1>
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
                        <button className="btn btn-primary mt-3 w-100" type="submit">Add user</button>
                    </div>
                </form>
            </div>
        </>
    );
}
