import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import './styles/UserManagement.css';  // Import từ thư mục styles

const UserManagement = () => {
  const [users, setUsers] = useState([
    { id: 1, username: 'admin01', fullName: 'Nguyễn Việt Anh', email: 'vietanh@edu.vn', role: 'admin', password: '******' },
    { id: 2, username: 'teacher01', fullName: 'Trần Thị B', email: 'b.tran@edu.vn', role: 'teacher', password: '******' },
    { id: 3, username: 'teacher02', fullName: 'Lê Văn C', email: 'c.le@edu.vn', role: 'teacher', password: '******' },
    { id: 4, username: 'student01', fullName: 'Nguyễn Văn A', email: 'a.nguyen@student.edu.vn', role: 'student', password: '******' },
    { id: 5, username: 'student02', fullName: 'Phạm Thị D', email: 'd.pham@student.edu.vn', role: 'student', password: '******' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    username: '',
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'student'
  });

  // Lọc người dùng
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  const deleteUser = (userId) => {
    if (window.confirm('Bạn có chắc muốn xóa người dùng này?')) {
      setUsers(users.filter(user => user.id !== userId));
    }
  };

  const handleAddUser = () => {
    if (!newUser.username || !newUser.fullName || !newUser.email || !newUser.password) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    if (newUser.password !== newUser.confirmPassword) {
      alert('Mật khẩu xác nhận không khớp!');
      return;
    }
    if (newUser.password.length < 6) {
      alert('Mật khẩu phải có ít nhất 6 ký tự!');
      return;
    }
    const newId = Math.max(...users.map(u => u.id), 0) + 1;
    setUsers([...users, { 
      id: newId, 
      username: newUser.username, 
      fullName: newUser.fullName, 
      email: newUser.email, 
      role: newUser.role,
      password: '******'
    }]);
    setNewUser({ username: '', fullName: '', email: '', password: '', confirmPassword: '', role: 'student' });
    setShowAddModal(false);
    alert('Thêm người dùng thành công!');
  };

  return (
    <div className="management-tab">
      {/* Header với gradient */}
      <div className="page-header-modern">
        <div className="header-content">
          <h2>Quản lý người dùng</h2>
          <p>Quản lý tài khoản, phân quyền người dùng trong hệ thống</p>
        </div>
      </div>

      {/* Thanh công cụ đẹp */}
      <div className="toolbar-modern">
        <button className="btn-add-modern" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Thêm người dùng
        </button>
        
        <div className="search-filter-group">
          <div className="search-box-modern">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên, email, tài khoản..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            {searchTerm && (
              <button className="clear-search" onClick={() => setSearchTerm('')}>
                <FaTimes />
              </button>
            )}
          </div>
          
          <select 
            className="filter-select-modern" 
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <option value="all">Tất cả vai trò</option>
            <option value="admin">Quản trị viên</option>
            <option value="teacher">Giảng viên</option>
            <option value="student">Sinh viên</option>
          </select>
        </div>
      </div>

      {/* Bảng dữ liệu */}
      <div className="card-modern">
        <div className="table-wrapper">
          <table className="data-table-modern">
            <thead>
              <tr>
                <th>ID</th>
                <th>Tên đăng nhập</th>
                <th>Họ tên</th>
                <th>Email</th>
                <th>Vai trò</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map(user => (
                <tr key={user.id}>
                  <td><span className="id-badge">#{user.id}</span></td>
                  <td>{user.username}</td>
                  <td>{user.fullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <span className={`role-badge-modern ${user.role}`}>
                      {user.role === 'admin' ? 'Quản trị' : user.role === 'teacher' ? 'Giảng viên' : 'Sinh viên'}
                    </span>
                  </td>
                  <td className="action-cells">
                    <button className="action-btn edit" title="Sửa">
                      <FaEdit />
                    </button>
                    <button className="action-btn delete" title="Xóa" onClick={() => deleteUser(user.id)}>
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredUsers.length === 0 && (
            <div className="empty-state">
              <p>Không tìm thấy người dùng nào</p>
            </div>
          )}
        </div>
        
        <div className="table-footer">
          <span>Hiển thị {filteredUsers.length} / {users.length} người dùng</span>
        </div>
      </div>

      {/* Modal thêm người dùng */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Thêm người dùng mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tên đăng nhập <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập tên đăng nhập"
                  value={newUser.username}
                  onChange={(e) => setNewUser({...newUser, username: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Họ và tên <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập họ và tên"
                  value={newUser.fullName}
                  onChange={(e) => setNewUser({...newUser, fullName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Email <span className="required">*</span></label>
                <input 
                  type="email" 
                  placeholder="example@edu.vn"
                  value={newUser.email}
                  onChange={(e) => setNewUser({...newUser, email: e.target.value})}
                />
              </div>
              
                {/* Password field  */}
                <div className="form-group">
                <label>Mật khẩu <span className="required">*</span></label>
                <input 
                    type="password" 
                    placeholder="Nhập mật khẩu (ít nhất 6 ký tự)"
                    value={newUser.password}
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})}
                />
                </div>

                {/* Confirm Password field */}
                <div className="form-group">
                <label>Xác nhận mật khẩu <span className="required">*</span></label>
                <input 
                    type="password" 
                    placeholder="Nhập lại mật khẩu"
                    value={newUser.confirmPassword}
                    onChange={(e) => setNewUser({...newUser, confirmPassword: e.target.value})}
                />
                {newUser.confirmPassword && newUser.password !== newUser.confirmPassword && (
                    <span className="error-message">Mật khẩu xác nhận không khớp</span>
                )}
                </div>
              
              <div className="form-group">
                <label>Vai trò <span className="required">*</span></label>
                <select 
                  value={newUser.role}
                  onChange={(e) => setNewUser({...newUser, role: e.target.value})}
                >
                  <option value="student">Sinh viên</option>
                  <option value="teacher">Giảng viên</option>
                  <option value="admin">Quản trị viên</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowAddModal(false);
                setNewUser({ username: '', fullName: '', email: '', password: '', confirmPassword: '', role: 'student' });
              }}>Hủy</button>
              <button className="btn-save" onClick={handleAddUser}>Thêm người dùng</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;