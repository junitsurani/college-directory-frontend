// src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('STUDENT');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/login', { username, password, role });
            localStorage.setItem('token', response.data.token);
            switch (role) {
                case 'STUDENT':
                    navigate('/student-dashboard');
                    break;
                case 'FACULTY_MEMBER':
                    navigate('/manage-class-list');
                    break;
                case 'ADMINISTRATOR':
                    navigate('/dashboard');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            setError('Invalid username, password, or role.');
            console.error('Login failed', error);

        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Login</h2>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <form onSubmit={handleLogin}>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-sm font-medium text-gray-700">Role</label>
                        <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            required
                        >
                            <option value="STUDENT">Student</option>
                            <option value="FACULTY_MEMBER">Faculty Member</option>
                            <option value="ADMINISTRATOR">Administrator</option>
                        </select>
                    </div>
                    <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">
                        Log In
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
