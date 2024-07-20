// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import Login from './components/Login';
// import ViewProfile from './components/Student/ViewProfile';
// import SearchStudents from './components/Student/SearchStudents';
// import ContactFacultyAdvisors from './components/Student/ContactFacultyAdvisors';
// import ManageClassList from './components/Faculty/ManageClassList';
// import UpdateProfile from './components/Faculty/UpdateProfile';
// import ManageRecords from './components/Administrator/ManageRecords';
// import Dashboard from './components/Administrator/Dashboard';

// const PrivateRoute = ({ element, ...rest }) => {
//     const token = localStorage.getItem('token');
//     const role = localStorage.getItem('role');

//     if (!token) {
//         return <Navigate to="/" />;
//     }

//     if (rest.requiredRole && rest.requiredRole !== role) {
//         return <Navigate to="/" />;
//     }

//     return element;
// };

// const App = () => {
//     return (
//         <Router>
//             <Routes>
//                 <Route path="/" element={<Login />} />
//                 <Route path="/student-dashboard" element={<PrivateRoute element={<ViewProfile />} requiredRole="STUDENT" />} />
//                 <Route path="/search-students" element={<PrivateRoute element={<SearchStudents />} requiredRole="STUDENT" />} />
//                 <Route path="/contact-faculty" element={<PrivateRoute element={<ContactFacultyAdvisors />} requiredRole="STUDENT" />} />
//                 <Route path="/manage-class-list" element={<PrivateRoute element={<ManageClassList />} requiredRole="FACULTY_MEMBER" />} />
//                 <Route path="/update-profile" element={<PrivateRoute element={<UpdateProfile />} requiredRole="FACULTY_MEMBER" />} />
//                 <Route path="/manage-records" element={<PrivateRoute element={<ManageRecords />} requiredRole="ADMINISTRATOR" />} />
//                 <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} requiredRole="ADMINISTRATOR" />} />
//                 {/* Add routes for other pages */}
//             </Routes>
//         </Router>
//     );
// };

// export default App;

// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import StudentDashboard from './components/Student/StudentDashboard';
import FacultyDashboard from './components/Faculty/FacultyDashboard';
import AdministratorDashboard from './components/Administrator/Dashboard';
import StudentManagement from './components/Administrator/StudentManagement';
import FacultyManagement from './components/Administrator/FacultyManagement';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/student-dashboard" element={<StudentDashboard />} />
                <Route path="/faculty-dashboard" element={<FacultyDashboard />} />
                <Route path="/admin-dashboard" element={<AdministratorDashboard />} />
                <Route path="/admin/students" element={<StudentManagement />} />
                <Route path="/admin/faculties" element={<FacultyManagement />} />
            </Routes>
        </Router>
    );
};

export default App;
