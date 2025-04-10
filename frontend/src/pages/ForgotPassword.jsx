import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { forget, reset } from '../features/auth/authSlice';

export default function ForgotPassword() {
    const [email, setEmail] = useState('');
    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError && message) {
            alert(message);
        }
        if (isSuccess) {
            alert("Reset token sent to your email.");
        }
        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email) return alert("Please enter your email.");
        dispatch(forget({ email }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Forgot Password</h2>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
            />
            <button type="submit" disabled={isLoading}>Send Token</button>
        </form>
    );
}
