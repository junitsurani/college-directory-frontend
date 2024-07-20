// src/components/Administrator/FacultyManagement.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacultyManagement = () => {
    const [faculties, setFaculties] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [departmentId, setDepartmentId] = useState('');
    const [officeHours, setOfficeHours] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchFaculties = async () => {
            try {
                const { data } = await axios.get('/api/admin/faculties');
                setFaculties(data);
            } catch (err) {
                setError('Failed to load faculties.');
            }
        };

        fetchFaculties();
    }, []);

    const handleAddFaculty = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/faculties', { name, email, phone, departmentId, officeHours });
            setName('');
            setEmail('');
            setPhone('');
            setDepartmentId('');
            setOfficeHours('');
            alert('Faculty added successfully.');
            const { data } = await axios.get('/api/admin/faculties');
            setFaculties(data);
        } catch (err) {
            setError('Failed to add faculty.');
        }
    };

    const handleDeleteFaculty = async (id) => {
        try {
            await axios.delete(`/api/admin/faculties/${id}`);
            alert('Faculty deleted successfully.');
            const { data } = await axios.get('/api/admin/faculties');
            setFaculties(data);
        } catch (err) {
            setError('Failed to delete faculty.');
        }
    };

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl font-bold mb-4">Manage Faculties</h2>
                {error && <div className="text-red-500 mb-4">{error}</div>}
                <form onSubmit={handleAddFaculty} className="mb-4">
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
                    <div className="mb-4">
                        <label className="block text-gray-700">Office Hours</label>
                        <input
                            type="text"
                            value={officeHours}
                            onChange={(e) => setOfficeHours(e.target.value)}
                            className="border-gray-300 rounded-md shadow-sm p-2 w-full"
                            required
                        />
                    </div>
                    <button type="submit" className="bg-blue-500 text-white p-2 rounded-md">
                        Add Faculty
                    </button>
                </form>
                <ul>
                    {faculties.map((faculty) => (
                        <li key={faculty.id} className="mb-4 p-4 bg-gray-100 rounded-md shadow-md flex items-center">
                            <div>
                                <p className="font-semibold">{faculty.name}</p>
                                <p>Email: {faculty.email}</p>
                                <p>Phone: {faculty.phone}</p>
                                <p>Department ID: {faculty.departmentId}</p>
                                <p>Office Hours: {faculty.officeHours}</p>
                            </div>
                            <button
                                onClick={() => handleDeleteFaculty(faculty.id)}
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

export default FacultyManagement;
