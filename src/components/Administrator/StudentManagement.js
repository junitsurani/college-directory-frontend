// src/components/Administrator/StudentManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const StudentManagement = () => {
    const [students, setStudents] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const { data } = await axios.get('/api/admin/students');
                setStudents(data);
            } catch (err) {
                setError('Failed to load students.');
            }
        };

        fetchStudents();
    }, []);

    const handleAddStudent = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/students', { name, email, phone, departmentId });
            setName('');
            setEmail('');
            setPhone('');
            setDepartmentId('');
            alert('Student added successfully.');
            const { data } = await axios.get('/api/admin/students');
            setStudents(data);
        } catch (err) {
            setError('Failed to add student.');
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await axios.delete(`/api/admin/students/${id}`);
            alert('Student deleted successfully.');
            const { data } = await axios.get('/api/admin/students');
            setStudents(data);
        } catch (err) {
            setError('Failed to delete student.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Students</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleAddStudent} className="mb-4">
                    <div className="mb-4">
                        <label className="block text-gray-700">Name</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Phone</label>
                        <input
                            type="text"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Department ID</label>
                        <input
                            type="text"
                            value={departmentId}
                            onChange={(e) => setDepartmentId(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Add Student
                    </button>
                </form>
                <ul>
                    {students.map((student) => (
                        <li key={student.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow-md flex items-center">
                            <div>
                                <p className="font-semibold">{student.name}</p>
                                <p>Email: {student.email}</p>
                                <p>Phone: {student.phone}</p>
                                <p>Department ID: {student.departmentId}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteStudent(student.id)}
                                className="ml-auto bg-red-500 text-white p-2 rounded-md"
                            >
                                Delete
                            </button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default StudentManagement;
