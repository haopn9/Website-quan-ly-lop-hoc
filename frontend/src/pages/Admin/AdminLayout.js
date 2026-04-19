import React from 'react';
import { Outlet, Link } from 'react-router-dom';
// Import icon riêng cho Admin
import { FaHome, FaUserShield, FaCogs, FaUserEdit, FaSignOutAlt } from 'react-icons/fa';
import '../Student/StudentLayout.css'; // Tái sử dụng CSS của Student

const AdminLayout = () => {
  return (
    <div className="student-layout-container">
      <aside className="sidebar">
        
        {/* Avatar Admin */}
        <div className="sidebar-profile">
          <div className="avatar-circle">
            <img src="https://i.pravatar.cc/150?img=8" alt="Admin Avatar" />
          </div>
          <h3 className="user-name">Admin Quản trị</h3>
          <p className="user-code">AD000001</p>
        </div>

        {/* Menu Admin */}
        <ul className="sidebar-menu">
          <li>
            <Link to="/admin/dashboard" className="menu-item">
              <FaHome className="menu-icon" /> <span>Trang chính</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/manage-users" className="menu-item">
              <FaUserShield className="menu-icon" /> <span>Quản lý Tài khoản User</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/system-config" className="menu-item">
              <FaCogs className="menu-icon" /> <span>Cấu hình Hệ thống</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/profile" className="menu-item">
              <FaUserEdit className="menu-icon" /> <span>Hồ sơ cá nhân</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="menu-item">
              <FaSignOutAlt className="menu-icon" /> <span>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </aside>

      <main className="main-content">
        <Outlet /> 
      </main>
    </div>
  );
};

export default AdminLayout;