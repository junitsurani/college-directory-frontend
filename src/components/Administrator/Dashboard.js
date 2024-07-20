// src/components/Administrator/Dashboard.js
import React, { useEffect, useState } from 'react';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const Dashboard = () => {
    const [studentEnrollmentData, setStudentEnrollmentData] = useState([]);
    const [facultyCourseLoadData, setFacultyCourseLoadData] = useState([]);

    useEffect(() => {
        const fetchDashboardData = async () => {
            try {
                const response = await axios.get('/api/admin/dashboard');
                setStudentEnrollmentData(response.data.studentEnrollment);
                setFacultyCourseLoadData(response.data.facultyCourseLoad);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };

        fetchDashboardData();
    }, []);

    const studentEnrollmentChartData = {
        labels: studentEnrollmentData.map(data => data.month),
        datasets: [
            {
                label: 'Student Enrollment',
                data: studentEnrollmentData.map(data => data.count),
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                fill: true,
            }
        ],
    };

    const facultyCourseLoadChartData = {
        labels: facultyCourseLoadData.map(data => data.facultyName),
        datasets: [
            {
                label: 'Faculty Course Load',
                data: facultyCourseLoadData.map(data => data.courseCount),
                backgroundColor: 'rgba(153, 102, 255, 0.2)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            }
        ],
    };

    return (
        <div className="flex flex-col items-center p-6 bg-gray-100 min-h-screen">
            <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl">
                <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold mb-4">Student Enrollment Trends</h3>
                        <Line data={studentEnrollmentChartData} options={{ responsive: true }} />
                    </div>
                    <div className="bg-white shadow-md rounded-lg p-4">
                        <h3 className="text-xl font-bold mb-4">Faculty Course Load</h3>
                        <Bar data={facultyCourseLoadChartData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
