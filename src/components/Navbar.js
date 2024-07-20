// src/components/NavBar.js
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar = () => {
    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-xl font-bold">College Directory</Link>
                <div>
                    <Link to="/student-dashboard" className="px-4 py-2 hover:bg-gray-700 rounded">Student Dashboard</Link>
                    <Link to="/faculty-dashboard" className="px-4 py-2 hover:bg-gray-700 rounded">Faculty Dashboard</Link>
                    <Link to="/admin-dashboard" className="px-4 py-2 hover:bg-gray-700 rounded">Admin Dashboard</Link>
                </div>
            </div>
        </nav>
    );
};

export default NavBar;
