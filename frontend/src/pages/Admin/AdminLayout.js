import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaUsers, FaBookOpen, FaUsersCog, FaSignOutAlt, FaUserEdit } from 'react-icons/fa';
import './styles/AdminLayout.css';  // Import từ thư mục styles

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="admin-layout">
      {/* Sidebar */}
      <aside className="admin-sidebar">
        <div className="sidebar-profile">
          <div className="avatar-circle">
            <img src="https://i.pravatar.cc/150?img=8" alt="Admin" />
          </div>
          <h3 className="user-name">Nguyễn Việt Anh</h3>
          <p className="user-role">Quản trị viên</p>
          <p className="user-class">Hệ thống quản lý nhóm</p>
        </div>

        <ul className="sidebar-menu">
          {/* QUẢN TRỊ HỆ THỐNG */}
          <li className="menu-section">QUẢN TRỊ HỆ THỐNG</li>
          <li>
            <Link to="/admin/dashboard" className={`menu-item ${location.pathname === '/admin/dashboard' || location.pathname === '/admin' ? 'active' : ''}`}>
              <FaTachometerAlt /> <span>Tổng quan</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/users" className={`menu-item ${location.pathname === '/admin/users' ? 'active' : ''}`}>
              <FaUsers /> <span>Quản lý người dùng</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/classes" className={`menu-item ${location.pathname === '/admin/classes' ? 'active' : ''}`}>
              <FaBookOpen /> <span>Quản lý lớp học</span>
            </Link>
          </li>
          <li>
            <Link to="/admin/groups" className={`menu-item ${location.pathname === '/admin/groups' ? 'active' : ''}`}>
              <FaUsersCog /> <span>Quản lý nhóm</span>
            </Link>
          </li>

          {/* CÁ NHÂN */}
          <li className="menu-section">CÁ NHÂN</li>
          <li>
            <Link to="/admin/profile" className="menu-item">
              <FaUserEdit /> <span>Hồ sơ cá nhân</span>
            </Link>
          </li>
          <li>
            <Link to="/login" className="menu-item">
              <FaSignOutAlt /> <span>Đăng xuất</span>
            </Link>
          </li>
        </ul>
      </aside>

      {/* Nội dung chính */}
      <main className="admin-main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;