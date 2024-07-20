// src/components/Administrator/ManageRecords.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ManageRecords = () => {
    const [students, setStudents] = useState([]);
    const [faculties, setFaculties] = useState([]);
    const [newRecord, setNewRecord] = useState({
        type: 'student', // or 'faculty'
        name: '',
        email: '',
        phone: '',
        department: '',
        role: '', // Only for faculty
    });
    const [editingRecord, setEditingRecord] = useState(null);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const studentResponse = await axios.get('/api/admin/students');
                const facultyResponse = await axios.get('/api/admin/faculties');
                setStudents(studentResponse.data);
                setFaculties(facultyResponse.data);
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRecord({ ...newRecord, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingRecord) {
                await axios.put(`/api/admin/${newRecord.type}/${editingRecord.id}`, newRecord);
            } else {
                await axios.post(`/api/admin/${newRecord.type}`, newRecord);
            }
            alert('Record saved successfully!');
            setNewRecord({ type: 'student', name: '', email: '', phone: '', department: '', role: '' });
            setEditingRecord(null);
            // Refetch records
            const studentResponse = await axios.get('/api/admin/students');
            const facultyResponse = await axios.get('/api/admin/faculties');
            setStudents(studentResponse.data);
            setFaculties(facultyResponse.data);
        } catch (error) {
            console.error('Error saving record:', error);
        }
    };

    const handleEdit = (record) => {
        setEditingRecord(record);
        setNewRecord({
            type: record.role ? 'faculty' : 'student',
            name: record.name,
            email: record.email,
            phone: record.phone,
            department: record.department,
            role: record.role || '',
        });
    };

    const handleDelete = async (id, type) => {
        try {
            await axios.delete(`/api/admin/${type}/${id}`);
            alert('Record deleted successfully!');
            // Refetch records
            const studentResponse = await axios.get('/api/admin/students');
            const facultyResponse = await axios.get('/api/admin/faculties');
            setStudents(studentResponse.data);
            setFaculties(facultyResponse.data);
        } catch (error) {
            console.error('Error deleting record:', error);
        }
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-3xl">
                <h2 className="text-2xl font-bold mb-4">Manage Records</h2>
                <form onSubmit={handleSubmit} className="space-y-4 mb-6">
                    <div>
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                            Record Type
                        </label>
                        <select
                            name="type"
                            id="type"
                            value={newRecord.type}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        >
                            <option value="student">Student</option>
                            <option value="faculty">Faculty</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            value={newRecord.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            value={newRecord.email}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                            Phone Number
                        </label>
                        <input
                            type="tel"
                            name="phone"
                            id="phone"
                            value={newRecord.phone}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    <div>
                        <label htmlFor="department" className="block text-sm font-medium text-gray-700">
                            Department
                        </label>
                        <input
                            type="text"
                            name="department"
                            id="department"
                            value={newRecord.department}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                    </div>
                    {newRecord.type === 'faculty' && (
                        <div>
                            <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                                Role
                            </label>
                            <input
                                type="text"
                                name="role"
                                id="role"
                                value={newRecord.role}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                            />
                        </div>
                    )}
                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-indigo-600 text-white font-medium rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        {editingRecord ? 'Update Record' : 'Add Record'}
                    </button>
                </form>
                <h3 className="text-xl font-bold mb-4">Student Records</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {students.map((student) => (
                                <tr key={student.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{student.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{student.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEdit(student)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDelete(student.id, 'students')} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <h3 className="text-xl font-bold mt-8 mb-4">Faculty Records</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Department</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {faculties.map((faculty) => (
                                <tr key={faculty.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{faculty.name}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.phone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.department}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{faculty.role}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button onClick={() => handleEdit(faculty)} className="text-indigo-600 hover:text-indigo-900">Edit</button>
                                        <button onClick={() => handleDelete(faculty.id, 'faculties')} className="text-red-600 hover:text-red-900 ml-4">Delete</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ManageRecords;
