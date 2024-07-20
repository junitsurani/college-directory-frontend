// src/components/Student/ContactFacultyAdvisors.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContactFacultyAdvisors = () => {
    const [advisors, setAdvisors] = useState([]);

    useEffect(() => {
        // Fetch faculty advisors for the student
        const fetchAdvisors = async () => {
            try {
                const response = await axios.get('/api/student/advisors');
                setAdvisors(response.data);
            } catch (error) {
                console.error('Error fetching faculty advisors:', error);
            }
        };

        fetchAdvisors();
    }, []);

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Contact Faculty Advisors</h2>
                <ul className="list-disc pl-5">
                    {advisors.map((advisor) => (
                        <li key={advisor.userId} className="mb-4">
                            <div className="flex items-center space-x-4">
                                <img src={advisor.photo} alt={advisor.name} className="w-12 h-12 rounded-full" />
                                <div>
                                    <p className="font-medium">{advisor.name}</p>
                                    <p className="text-gray-600">{advisor.email}</p>
                                    <p className="text-gray-600">{advisor.phone}</p>
                                    <div className="mt-2">
                                        <a href={`mailto:${advisor.email}`} className="text-blue-500 hover:underline">Email</a>
                                        <span className="mx-2">|</span>
                                        <a href={`tel:${advisor.phone}`} className="text-blue-500 hover:underline">Call</a>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ContactFacultyAdvisors;
