import React, { useState } from 'react';
import { FaPlus, FaSearch, FaEdit, FaTrash, FaTimes, FaUsers, FaTasks, FaComments, FaUserPlus, FaCheckCircle, FaClock, FaUserCog, FaEye } from 'react-icons/fa';
import './styles/GroupManagement.css';  // Import từ thư mục styles

const GroupManagement = () => {
  const [groups, setGroups] = useState([
    { id: 1, groupName: 'Nhóm 1 - Lập trình Web', classId: 1, className: 'Lập trình Web', memberCount: 5, leader: 'Nguyễn Văn A', status: 'active', taskCount: 4, completedTasks: 3, messageCount: 45 },
    { id: 2, groupName: 'Nhóm 2 - Lập trình Web', classId: 1, className: 'Lập trình Web', memberCount: 5, leader: 'Phạm Thị D', status: 'active', taskCount: 3, completedTasks: 1, messageCount: 28 },
    { id: 3, groupName: 'Nhóm 1 - CSDL', classId: 2, className: 'Cơ sở dữ liệu', memberCount: 4, leader: 'Hoàng Văn E', status: 'active', taskCount: 2, completedTasks: 0, messageCount: 12 },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [showGroupDetail, setShowGroupDetail] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGroup, setNewGroup] = useState({
    groupName: '',
    className: '',
    leader: '',
    status: 'active'
  });

  // Lọc nhóm
  const filteredGroups = groups.filter(group => {
    const matchesSearch = group.groupName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          group.leader.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesClass = selectedClass === 'all' || group.className === selectedClass;
    const matchesStatus = selectedStatus === 'all' || group.status === selectedStatus;
    return matchesSearch && matchesClass && matchesStatus;
  });

  const deleteGroup = (id) => {
    if (window.confirm('Bạn có chắc muốn xóa nhóm này?')) {
      setGroups(groups.filter(g => g.id !== id));
    }
  };

  const viewGroupDetail = (group) => {
    setSelectedGroup(group);
    setShowGroupDetail(true);
  };

  const handleAddGroup = () => {
    if (!newGroup.groupName || !newGroup.className || !newGroup.leader) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    const newId = Math.max(...groups.map(g => g.id), 0) + 1;
    setGroups([...groups, {
      id: newId,
      ...newGroup,
      memberCount: 0,
      taskCount: 0,
      completedTasks: 0,
      messageCount: 0
    }]);
    setNewGroup({ groupName: '', className: '', leader: '', status: 'active' });
    setShowAddModal(false);
    alert('Thêm nhóm thành công!');
  };

  return (
    <div className="management-tab">
      {/* Header với gradient */}
      <div className="page-header-modern">
        <div className="header-content">
          <h2>Quản lý nhóm học tập</h2>
          <p>Quản lý danh sách nhóm, phân công nhóm trưởng và theo dõi hoạt động</p>
        </div>
      </div>

      {/* Thanh công cụ */}
      <div className="toolbar-modern">
        <button className="btn-add-modern" onClick={() => setShowAddModal(true)}>
          <FaPlus /> Tạo nhóm mới
        </button>
        
        <div className="search-filter-group">
          <div className="search-box-modern">
            <FaSearch className="search-icon" />
            <input 
              type="text" 
              placeholder="Tìm kiếm theo tên nhóm, nhóm trưởng..." 
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
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          >
            <option value="all">Tất cả lớp học</option>
            <option value="Lập trình Web">Lập trình Web</option>
            <option value="Cơ sở dữ liệu">Cơ sở dữ liệu</option>
          </select>
          
          <select 
            className="filter-select-modern" 
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="active">Đang hoạt động</option>
            <option value="inactive">Đã kết thúc</option>
          </select>
        </div>
      </div>

      {/* Danh sách nhóm dạng card */}
      <div className="groups-grid-modern">
        {filteredGroups.map(group => (
          <div key={group.id} className="group-card-modern">
            <div className="group-card-header">
              <div className="group-title">
                <h3>{group.groupName}</h3>
                <span className="group-class">{group.className}</span>
              </div>
              <span className={`status-badge-modern ${group.status}`}>
                {group.status === 'active' ? 'Đang hoạt động' : 'Kết thúc'}
              </span>
            </div>
            
            <div className="group-card-body">
              <div className="group-info-row">
                <FaUserCog className="info-icon" />
                <span><strong>Nhóm trưởng:</strong> {group.leader}</span>
              </div>
              
              <div className="group-stats-modern">
                <div className="stat-item">
                  <FaUsers className="stat-icon" />
                  <span>{group.memberCount} thành viên</span>
                </div>
                <div className="stat-item">
                  <FaTasks className="stat-icon" />
                  <span>{group.completedTasks}/{group.taskCount} công việc</span>
                </div>
                <div className="stat-item">
                  <FaComments className="stat-icon" />
                  <span>{group.messageCount} tin nhắn</span>
                </div>
              </div>
              
              <div className="progress-label">Tiến độ nhóm</div>
              <div className="progress-bar-modern">
                <div 
                  className="progress-fill-modern" 
                  style={{ width: `${group.taskCount ? (group.completedTasks / group.taskCount) * 100 : 0}%` }}
                >
                  {Math.round((group.completedTasks / group.taskCount) * 100)}%
                </div>
              </div>
            </div>
            
            <div className="group-card-footer">
              <button className="action-btn view" onClick={() => viewGroupDetail(group)}>
                <FaEye /> Xem chi tiết
              </button>
              <button className="action-btn edit" title="Thêm thành viên">
                <FaUserPlus />
              </button>
              <button className="action-btn edit" title="Chỉnh sửa">
                <FaEdit />
              </button>
              <button className="action-btn delete" title="Xóa" onClick={() => deleteGroup(group.id)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredGroups.length === 0 && (
        <div className="empty-state">
          <p>Không tìm thấy nhóm nào</p>
        </div>
      )}

      {/* Modal thêm nhóm */}
      {showAddModal && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Tạo nhóm mới</h3>
              <button className="modal-close" onClick={() => setShowAddModal(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Tên nhóm <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập tên nhóm"
                  value={newGroup.groupName}
                  onChange={(e) => setNewGroup({...newGroup, groupName: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Lớp học <span className="required">*</span></label>
                <select 
                  value={newGroup.className}
                  onChange={(e) => setNewGroup({...newGroup, className: e.target.value})}
                >
                  <option value="">Chọn lớp học</option>
                  <option value="Lập trình Web">Lập trình Web</option>
                  <option value="Cơ sở dữ liệu">Cơ sở dữ liệu</option>
                </select>
              </div>
              <div className="form-group">
                <label>Nhóm trưởng <span className="required">*</span></label>
                <input 
                  type="text" 
                  placeholder="Nhập tên nhóm trưởng"
                  value={newGroup.leader}
                  onChange={(e) => setNewGroup({...newGroup, leader: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Trạng thái</label>
                <select 
                  value={newGroup.status}
                  onChange={(e) => setNewGroup({...newGroup, status: e.target.value})}
                >
                  <option value="active">Đang hoạt động</option>
                  <option value="inactive">Đã kết thúc</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn-cancel" onClick={() => {
                setShowAddModal(false);
                setNewGroup({ groupName: '', className: '', leader: '', status: 'active' });
              }}>Hủy</button>
              <button className="btn-save" onClick={handleAddGroup}>Tạo nhóm</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal chi tiết nhóm */}
      {showGroupDetail && selectedGroup && (
        <div className="modal-overlay" onClick={() => setShowGroupDetail(false)}>
          <div className="modal-container large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>{selectedGroup.groupName}</h3>
              <button className="modal-close" onClick={() => setShowGroupDetail(false)}>
                <FaTimes />
              </button>
            </div>
            <div className="modal-body">
              {/* Thông tin nhóm */}
              <div className="detail-section">
                <h4>Thông tin nhóm</h4>
                <div className="info-grid">
                  <div className="info-item"><label>Lớp học:</label><span>{selectedGroup.className}</span></div>
                  <div className="info-item"><label>Nhóm trưởng:</label><span>{selectedGroup.leader}</span></div>
                  <div className="info-item"><label>Trạng thái:</label><span className={`status-badge-modern ${selectedGroup.status}`}>{selectedGroup.status === 'active' ? 'Đang hoạt động' : 'Kết thúc'}</span></div>
                </div>
              </div>

              {/* Danh sách thành viên */}
              <div className="detail-section">
                <h4>Thành viên nhóm</h4>
                <table className="data-table-modern small">
                  <thead>
                    <tr><th>MSSV</th><th>Họ tên</th><th>Vai trò</th><th>Công việc</th><th>Tiến độ</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>SV001</td><td>Nguyễn Văn A</td><td>Nhóm trưởng</td><td>3</td><td><div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '80%' }}></div></div></td></tr>
                    <tr><td>SV002</td><td>Trần Thị B</td><td>Thành viên</td><td>2</td><td><div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '60%' }}></div></div></td></tr>
                    <tr><td>SV003</td><td>Lê Văn C</td><td>Thành viên</td><td>2</td><td><div className="progress-bar-small"><div className="progress-fill-small" style={{ width: '40%' }}></div></div></td></tr>
                  </tbody>
                </table>
              </div>

              {/* Danh sách công việc */}
              <div className="detail-section">
                <h4>Công việc được giao</h4>
                <div className="tasks-list">
                  <div className="task-item"><div className="task-info"><FaCheckCircle className="task-icon done" /><div><strong>Thiết kế giao diện</strong><p>Nguyễn Văn A</p></div></div><span className="task-status completed">Hoàn thành</span></div>
                  <div className="task-item"><div className="task-info"><FaClock className="task-icon pending" /><div><strong>Xây dựng CSDL</strong><p>Trần Thị B</p></div></div><span className="task-status inprogress">Đang thực hiện</span></div>
                  <div className="task-item"><div className="task-info"><FaClock className="task-icon pending" /><div><strong>Lập trình chức năng</strong><p>Lê Văn C</p></div></div><span className="task-status pending">Chưa bắt đầu</span></div>
                </div>
              </div>

              {/* Hoạt động gần đây */}
              <div className="detail-section">
                <h4>Hoạt động gần đây</h4>
                <div className="activities-list">
                  <div className="activity-item"><FaComments /><span>Nguyễn Văn A đã gửi tin nhắn: "Mọi người cập nhật tiến độ giúp mình"</span><small>10 phút trước</small></div>
                  <div className="activity-item"><FaCheckCircle /><span>Nguyễn Văn A đã hoàn thành công việc "Thiết kế giao diện"</span><small>2 giờ trước</small></div>
                  <div className="activity-item"><FaUserPlus /><span>Trần Thị B đã tham gia nhóm</span><small>1 ngày trước</small></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupManagement;