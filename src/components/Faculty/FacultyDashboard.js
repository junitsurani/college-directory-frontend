// src/components/Faculty/FacultyDashboard.js
import React from 'react';
import NavBar from '../Navbar';
import ManageClasses from './ManageClassList';
import UpdateProfile from './UpdateProfile';

const FacultyDashboard = () => {
    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-4">
                <ManageClasses />
                <UpdateProfile />
            </div>
        </div>
    );
};

export default FacultyDashboard;
