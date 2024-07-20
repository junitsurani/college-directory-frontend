// src/components/Student/SearchStudents.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchStudents = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [department, setDepartment] = useState('');
    const [year, setYear] = useState('');
    const [students, setStudents] = useState([]);
    const [departments, setDepartments] = useState([]);
    const [years] = useState(['First Year', 'Second Year', 'Third Year', 'Final Year']);

    useEffect(() => {
        // Fetch departments
        const fetchDepartments = async () => {
            try {
                const response = await axios.get('/api/department');
                setDepartments(response.data);
            } catch (error) {
                console.error('Error fetching departments:', error);
            }
        };

        fetchDepartments();
    }, []);

    useEffect(() => {
        // Fetch students based on search criteria
        const fetchStudents = async () => {
            try {
                const response = await axios.get('/api/student/search', {
                    params: { searchTerm, department, year },
                });
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
            }
        };

        fetchStudents();
    }, [searchTerm, department, year]);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Search for Students</h2>
                <div className="mb-4">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name"
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                </div>
                <div className="mb-4">
                    <select
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                            <option key={dept.id} value={dept.id}>{dept.name}</option>
                        ))}
                    </select>
                </div>
                <div className="mb-4">
                    <select
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Year</option>
                        {years.map((yr) => (
                            <option key={yr} value={yr}>{yr}</option>
                        ))}
                    </select>
                </div>
                <ul className="list-disc pl-5">
                    {students.map((student) => (
                        <li key={student.id} className="mb-2">
                            <p className="font-medium">{student.name}</p>
                            <p className="text-gray-600">{student.email}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SearchStudents;
