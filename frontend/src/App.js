import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Pages
import MainPage from './pages/Main/MainPage';
import LoginPage from './pages/Login/LoginPage';

// Import Layouts
import StudentLayout from './pages/Student/StudentLayout';
import AdminLayout from './pages/Admin/AdminLayout';
import TeacherLayout from './pages/Teacher/TeacherLayout';

// Import Profile 
import UserProfile from './pages/Profiles/UserProfile';

// Import các trang quản lý của ADMIN
import Dashboard from './pages/Admin/Dashboard';
import UserManagement from './pages/Admin/UserManagement';
import ClassManagement from './pages/Admin/ClassManagement';
import GroupManagement from './pages/Admin/GroupManagement';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/login" element={<LoginPage />} />
        
        {/* Tuyến đường Sinh viên */}
        <Route path="/student" element={<StudentLayout />}>
          <Route path="profile" element={<UserProfile role="student" />} />
          {/* Các trang khác của SV... */}
        </Route>

           {/* Tuyến đường Admin */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UserManagement />} />
          <Route path="classes" element={<ClassManagement />} />
          <Route path="groups" element={<GroupManagement />} />
          <Route path="profile" element={<UserProfile role="admin" />} />
        </Route>

        {/* Tuyến đường Giảng viên */}
        <Route path="/teacher" element={<TeacherLayout />}>
           {/* Gọi  Profile ở đây */}
          <Route path="profile" element={<UserProfile role="teacher" />} />
          {/* Các trang khác của GV... */}
        </Route>

      </Routes>
    </Router>
  );
}

export default App;