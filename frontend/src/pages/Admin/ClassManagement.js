import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaUsers, FaChalkboardTeacher, FaCalendarAlt } from 'react-icons/fa';
import './styles/ClassManagement.css';  // Import từ thư mục styles

const ClassManagement = () => {
  const [classes, setClasses] = useState([
    { id: 1, className: 'Lập trình Web', code: 'WEB101', teacher: 'Trần Thị B', semester: 'HK1-2024', studentCount: 45, groupCount: 9, status: 'active' },
    { id: 2, className: 'Cơ sở dữ liệu', code: 'CSDL202', teacher: 'Lê Văn C', semester: 'HK1-2024', studentCount: 38, groupCount: 8, status: 'active' },
    { id: 3, className: 'Lập trình Java', code: 'JAVA303', teacher: 'Trần Thị B', semester: 'HK1-2024', studentCount: 42, groupCount: 9, status: 'inactive' },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSemester, setSelectedSemester] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newClass, setNewClass] = useState({
    className: '',
    code: '',
    teacher: '',
    semester: 'HK1-2024',
    status: 'active'
  });

  // Lọc lớp học
  const filteredClasses = classes.filter(classItem => {
    const matchesSearch = classItem.className.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          classItem.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          classItem.teacher.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSemester = selectedSemester === 'all' || classItem.semester === selectedSemester;
    const matchesStatus = selectedStatus === 'all' || classItem.status === selectedStatus;
    return matchesSearch && matchesSemester && matchesStatus;
  });

  const deleteClass = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa lớp học này?')) {
      setClasses(classes.filter(c => c.id !== id));
    }
  };

  const handleAddClass = () => {
    if (!newClass.className || !newClass.code || !newClass.teacher) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const newId = Math.max(...classes.map(c => c.id), 0) + 1;
    setClasses([...classes, {
      id: newId,
      ...newClass,
      studentCount: 0,
      groupCount: 0
    }]);
    setNewClass({ className: '', code: '', teacher: '', semester: 'HK1-2024', status: 'active' });
    setShowAddModal(false);
    alert('Thêm lớp học thành công!');
  };

  return (
    <div className="management-tab">
      {/* Header với gradient */}
      <div className="page-header-modern">
        <div className="header-content">
          <h2>Quản lý lớp học</h2>
          <p>Quản lý danh sách lớp học, giảng viên phụ trách và học kỳ</p>
        </div>
      </div>

      {/* Thanh công cụ */}
      <div className="toolbar-modern">
        <button className="btn-add-modern" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Tạo lớp học mới
        </button>
        
        <div className="search-filter-group">
          <div className="search-box-modern">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên lớp, mã lớp, giảng viên..." 
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
            value={selectedSemester}
            onChange={(e) => setSelectedSemester(e.target.value)}
          >
            <option value="all">Tất cả học kỳ</option>
            <option value="HK1-2024">HK1-2024</option>
            <option value="HK2-2024">HK2-2024</option>
          </select>
          
          <select 
            className="filter-select-modern" 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Tạm dừng</option>
          </select>
        </div>
      </div>

      {/* Danh sách lớp học dạng card */}
      <div className="classes-grid-modern">
        {filteredClasses.map(classItem => (
          <div key={classItem.id} className="class-card-modern">
            <div className="class-card-header">
              <div className="class-title">
                <h3>{classItem.className}</h3>
                <span className="class-code">{classItem.code}</span>
              </div>
              <span className={`status-badge-modern ${classItem.status}`}>
                {classItem.status === 'active' ? 'Đang hoạt động' : 'Tạm dừng'}
              </span>
            </div>
            
            <div className="class-card-body">
              <div className="class-info-row">
                <FaChalkboardTeacher className="info-icon" />
                <span>{classItem.teacher}</span>
              </div>
              <div className="class-info-row">
                <FaCalendarAlt className="info-icon" />
                <span>{classItem.semester}</span>
              </div>
              <div className="class-stats-modern">
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <span>{classItem.studentCount} Sinh viên</span>
                </div>
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <span>{classItem.groupCount} Nhóm</span>
                </div>
              </div>
            </div>
            
            <div className="class-card-footer">
              <button className="action-btn edit" title="Chỉnh sửa">
                <FaEdit />
              </button>
              <button className="action-btn delete" title="Xóa" onClick={() => deleteClass(classItem.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredClasses.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy lớp học nào</p>
        </div>
      )}

      {/* Modal thêm lớp học */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tạo lớp học mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tên lớp học <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập tên lớp học"
                  value={newClass.className}
                  onChange={(e) => setNewClass({...newClass, className: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Mã lớp <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập mã lớp (VD: WEB101)"
                  value={newClass.code}
                  onChange={(e) => setNewClass({...newClass, code: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Giảng viên phụ trách <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập tên giảng viên"
                  value={newClass.teacher}
                  onChange={(e) => setNewClass({...newClass, teacher: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Học kỳ</label>
                <select 
                  value={newClass.semester}
                  onChange={(e) => setNewClass({...newClass, semester: e.target.value})}
                >
                  <option value="HK1-2024">HK1-2024</option>
                  <option value="HK2-2024">HK2-2024</option>
                </select>
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select 
                  value={newClass.status}
                  onChange={(e) => setNewClass({...newClass, status: e.target.value})}
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Tạm dừng</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowAddModal(false);
                setNewClass({ className: '', code: '', teacher: '', semester: 'HK1-2024', status: 'active' });
              }}>Hủy</button>
              <button className="btn-save" onClick={handleAddClass}>Tạo lớp học</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ClassManagement;