// src/components/Student/ViewProfile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewProfile = () => {
    const [profile, setProfile] = useState(null);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        // Fetch profile details
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get('/api/student/profile', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                setProfile(response.data.profile);
                setCourses(response.data.courses);
            } catch (error) {
                console.error('Error fetching profile:', error);
            }
        };

        fetchProfile();
    }, []);

    if (!profile) return <div>Loading...</div>;

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4">Personal Profile</h2>
                <div className="mb-4">
                    <img src={profile.photo} alt="Profile" className="w-32 h-32 rounded-full mx-auto mb-4" />
                    <p className="text-lg font-semibold">{profile.name}</p>
                    <p className="text-gray-700">{profile.email}</p>
                    <p className="text-gray-700">{profile.phone}</p>
                </div>
                <h3 className="text-xl font-semibold mt-6 mb-4">Academic Information</h3>
                <ul className="list-disc pl-5">
                    {courses.map((course) => (
                        <li key={course.id} className="mb-2">
                            <p className="font-medium">{course.title}</p>
                            <p className="text-gray-600">{course.description}</p>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ViewProfile;
