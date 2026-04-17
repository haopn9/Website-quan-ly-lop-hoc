import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// Cập nhật import các Icon chính xác
import { FaHome, FaUserEdit, FaBook, FaUsers, FaTasks, FaComments, FaSitemap, FaSignOutAlt } from 'react-icons/fa';
import './StudentLayout.css';

const StudentLayout = () => {
  return (
    <div className="student-layout-container">
      
      {/* KHUNG XANH: SIDEBAR BÊN TRÁI */}
      <aside className="sidebar">
        
        {/* Phần Avatar, Tên và Mã số User */}
        <div className="sidebar-profile">
          <div className="avatar-circle">
            <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
          </div>
          <h3 className="user-name">User</h3>
          {/* Thêm dòng mã số User */}
          <p className="user-code">SV001234</p>
        </div>

        {/* Danh sách Menu đã cập nhật Icon */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/student/dashboard" className="menu-item">
              <FaHome className="menu-icon" /> <span>Trang chính</span>
            </Link>
          </li>
          <li>
            <Link to="/student/settings" className="menu-item">
              <FaUserEdit className="menu-icon" /> <span>Hồ sơ cá nhân</span>
            </Link>
          </li>
          <li>
            <Link to="/student/classes" className="menu-item">
              <FaBook className="menu-icon" /> <span>Lớp học của tôi</span>
            </Link>
          </li>
          <li>
            <Link to="/student/groups" className="menu-item">
              <FaUsers className="menu-icon" /> <span>Nhóm học tập</span>
            </Link>
          </li>
          <li>
            <Link to="/student/tasks" className="menu-item">
              <FaTasks className="menu-icon" /> <span>Nhiệm vụ & tiến độ</span>
            </Link>
          </li>
          <li>
            <Link to="/student/chat" className="menu-item">
              <FaComments className="menu-icon" /> <span>Không gian thảo luận</span>
            </Link>
          </li>
          <li>
            <Link to="/student/manage-group" className="menu-item">
              <FaSitemap className="menu-icon" /> <span>Điều phối nhóm</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="menu-item">
              <FaSignOutAlt className="menu-icon" /> <span>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* KHUNG TRẮNG: MAIN CONTENT BÊN PHẢI */}
      <main className="main-content">
        <Outlet /> 
      </main>
      
    </div>
  );
};

export default StudentLayout;