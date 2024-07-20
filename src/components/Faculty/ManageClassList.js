// src/components/Faculty/ManageClassList.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageClassList = () => {
    const [classes, setClasses] = useState([]);
    const [selectedClass, setSelectedClass] = useState('');
    const [students, setStudents] = useState([]);

    useEffect(() => {
        // Fetch list of classes for the faculty member
        const fetchClasses = async () => {
            try {
                const response = await axios.get('/api/faculty/classes');
                setClasses(response.data);
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    useEffect(() => {
        // Fetch students for the selected class
        const fetchStudents = async () => {
            if (selectedClass) {
                try {
                    const response = await axios.get(`/api/faculty/classes/${selectedClass}/students`);
                    setStudents(response.data);
                } catch (error) {
                    console.error('Error fetching students:', error);
                }
            }
        };

        fetchStudents();
    }, [selectedClass]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Manage Class List</h2>
                <div className="mb-4">
                    <select
                        value={selectedClass}
                        onChange={(e) => setSelectedClass(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Class</option>
                        {classes.map((cls) => (
                            <option key={cls.id} value={cls.id}>{cls.title}</option>
                        ))}
                    </select>
                </div>
                <ul className="list-disc pl-5">
                    {students.map((student) => (
                        <li key={student.id} className="mb-2">
                            <div className="flex items-center space-x-4">
                                <img src={student.photo} alt={student.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-medium">{student.name}</p>
                                    <p className="text-gray-600">{student.email}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ManageClassList;
