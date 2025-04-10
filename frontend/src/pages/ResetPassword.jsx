import React, { useState, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPass, reset } from '../features/auth/authSlice';

export default function ResetPassword() {
    const [password, setPassword] = useState('');
    const {token} = useParams()

    const dispatch = useDispatch();
    const { isLoading, isError, isSuccess, message } = useSelector(state => state.auth);

    useEffect(() => {
        if (isError && message) {
            alert(message);
        }
        if (isSuccess) {
            alert("Password has been reset successfully.");
        }
        dispatch(reset());
    }, [isError, isSuccess, message, dispatch]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!password) return alert("Enter new password.");
        dispatch(resetPass({ resetToken: token, newPassword: password }));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Reset Password</h2>
            <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
            />
            <button type="submit" disabled={isLoading}>Reset</button>
        </form>
    );
}
