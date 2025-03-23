import React, { use } from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../features/auth/authSlice";

const Header = () => {
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container">
                <a className="navbar-brand" href="/">BookStore</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link active" href="/">Home</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Categories</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Best Sellers</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        {user ? (
                            <li className="nav-item">
                                <a className="nav-link btn btn-danger text-white px-3 ms-2" onClick={() => dispatch(logout())}>Logout</a>
                            </li>
                        ) : (
                            <>
                                < li className="nav-item">
                                    <a className="nav-link btn btn-primary text-white px-3 ms-2" href="/login">Login</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link btn btn-primary text-white px-3 ms-2" href="/register">Register</a>
                                </li>
                            </>)}
                    </ul>
                </div>
            </div>
        </nav >
    );
};

export default Header;
