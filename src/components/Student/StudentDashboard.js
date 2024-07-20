// src/components/Student/StudentDashboard.js
import React from 'react';
import NavBar from '../Navbar';
import Profile from './ViewProfile';
import SearchStudents from './SearchStudents';
import ContactAdvisors from './ContactFacultyAdvisors';

const StudentDashboard = () => {
    return (
        <div>
            <NavBar />
            <div className="container mx-auto p-4">
                <Profile />
                <SearchStudents />
                <ContactAdvisors />
            </div>
        </div>
    );
};

export default StudentDashboard;
