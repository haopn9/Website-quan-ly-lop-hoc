import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FaUsers, FaChalkboardTeacher, FaUserGraduate, FaBookOpen, 
  FaUsersCog, FaTasks, FaComments, FaArrowUp, FaEye 
} from 'react-icons/fa';
import './styles/Dashboard.css';

const Dashboard = () => {
  const stats = {
    totalUsers: 156,
    totalTeachers: 12,
    totalStudents: 140,
    totalClasses: 8,
    totalGroups: 24,
    activeGroups: 20,
    pendingTasks: 45,
    overdueTasks: 8,
    totalMessages: 1240,
  };

  const recentClasses = [
    { id: 1, name: 'Lập trình Web', code: 'WEB101', teacher: 'Trần Thị B', students: 45, groups: 9, status: 'active' },
    { id: 2, name: 'Cơ sở dữ liệu', code: 'CSDL202', teacher: 'Lê Văn C', students: 38, groups: 8, status: 'active' },
    { id: 3, name: 'Lập trình Java', code: 'JAVA303', teacher: 'Trần Thị B', students: 42, groups: 9, status: 'active' },
  ];

  return (
    <div className="dashboard-container">
      {/* Header với gradient */}
      <div className="page-header-modern">
        <div className="header-content">
          <h2>Tổng quan hệ thống</h2>
          <p>Chào mừng! Đây là tổng quan về hệ thống quản lý lớp học.</p>
        </div>
      </div>

      {/* Thống kê */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue"><FaUsers /></div>
          <div className="stat-info">
            <h3>Tổng người dùng</h3>
            <p className="stat-number">{stats.totalUsers}</p>
            <span className="stat-change positive"><FaArrowUp /> 12%</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon green"><FaChalkboardTeacher /></div>
          <div className="stat-info">
            <h3>Giảng viên</h3>
            <p className="stat-number">{stats.totalTeachers}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon orange"><FaUserGraduate /></div>
          <div className="stat-info">
            <h3>Sinh viên</h3>
            <p className="stat-number">{stats.totalStudents}</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon purple"><FaBookOpen /></div>
          <div className="stat-info">
            <h3>Lớp học</h3>
            <p className="stat-number">{stats.totalClasses}</p>
          </div>
        </div>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon info"><FaUsersCog /></div>
          <div className="stat-info">
            <h3>Nhóm học tập</h3>
            <p className="stat-number">{stats.totalGroups}</p>
            <span className="stat-change">{stats.activeGroups} nhóm hoạt động</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon warning"><FaTasks /></div>
          <div className="stat-info">
            <h3>Công việc</h3>
            <p className="stat-number">{stats.pendingTasks}</p>
            <span className="stat-change negative">{stats.overdueTasks} trễ hạn</span>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon danger"><FaComments /></div>
          <div className="stat-info">
            <h3>Tin nhắn</h3>
            <p className="stat-number">{stats.totalMessages.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Danh sách lớp học dạng card */}
      <div className="classes-grid-modern">
        {recentClasses.map(classItem => (
          <div key={classItem.id} className="class-card-modern">
            <div className="class-card-header">
              <div className="class-title">
                <h3>{classItem.name}</h3>
                <span className="class-code">{classItem.code}</span>
              </div>
              <span className="status-badge-modern active">
                Đang hoạt động
              </span>
            </div>
            
            <div className="class-card-body">
              <div className="class-info-row">
                <FaChalkboardTeacher className="info-icon" />
                <span>{classItem.teacher}</span>
              </div>
              <div className="class-stats-modern">
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <span>{classItem.students} Sinh viên</span>
                </div>
                <div className="stat-item">
                  <FaUsersCog className="stat-icon" />
                  <span>{classItem.groups} Nhóm</span>
                </div>
              </div>
            </div>
            
            <div className="class-card-footer">
              <Link to={`/admin/classes/${classItem.id}`} className="action-btn view">
                <FaEye /> Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
      
      {/* Nút xem tất cả */}
      <div className="view-all-container">
        <Link to="/admin/classes" className="btn-view-all">
          Xem tất cả lớp học
        </Link>
      </div>
    </div>
  );
};

export default Dashboard;