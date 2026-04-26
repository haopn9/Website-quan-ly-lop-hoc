import React, { useState, useRef } from 'react';
import { FaTimes } from 'react-icons/fa';
import './StudentTasks.css';

// ============================================================
// DỮ LIỆU MẪU — Tab "Của tôi"
// ============================================================
const myTasks = [
  { id: 1, maNhom: 1, name: 'Thiết kế giao diện trang Login', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'late', statusLabel: 'Trễ hạn', badgeBg: '#fcebeb', badgeColor: '#a32d2d',
    deadline: '17/04/2026', startDate: '10/04/2026', lateText: '⚠️ Đã trễ 1 ngày',
    priority: '🔥 Ưu tiên cao', moTa: 'Thiết kế giao diện login responsive, hỗ trợ cả desktop và mobile.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5' }], canSubmit: true,
    nhacNho: 'Nhóm trưởng nhắc nhở: Task đã trễ hạn, vui lòng hoàn thành sớm!' },
  { id: 2, maNhom: 1, name: 'Xây dựng API đăng nhập & phân quyền', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'wait', statusLabel: 'Chờ duyệt', badgeBg: '#faeeda', badgeColor: '#854f0b',
    deadline: '20/04/2026', startDate: '12/04/2026',
    priority: '📈 Ưu tiên cao', moTa: 'Xây dựng REST API cho login, register, JWT token.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5' }, { ky: 'TB', bg: '#faeeda', color: '#854f0b' }],
    canSubmit: false, waitText: 'Đang chờ nhóm trưởng duyệt...' },
  { id: 3, maNhom: 3, name: 'Viết báo cáo chương 2 — Phân tích hệ thống', group: 'Nhóm 3', class: 'Cơ sở dữ liệu',
    status: 'redo', statusLabel: 'Làm lại task', badgeBg: '#fbeaf0', badgeColor: '#993556',
    deadline: '22/04/2026', startDate: '15/04/2026',
    priority: '📋 Ưu tiên trung bình', moTa: 'Viết phân tích use case, activity diagram cho hệ thống.',
    redoNote: '⚠️ Nhóm trưởng yêu cầu làm lại: "Phần phân tích use case chưa đầy đủ, cần bổ sung thêm 3 use case còn thiếu."',
    redoDeadline: 'Deadline mới: 22/04/2026',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5' }], canSubmit: true },
  { id: 4, maNhom: 1, name: 'Thiết kế ERD & schema database', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'doing', statusLabel: 'Đang thực hiện', badgeBg: '#e6f1fb', badgeColor: '#185fa5',
    deadline: '25/04/2026', startDate: '18/04/2026',
    priority: '📋 Ưu tiên trung bình', moTa: 'Thiết kế ERD đầy đủ và viết SQL script tạo bảng.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5' }, { ky: 'LC', bg: '#e1f5ee', color: '#0f6e56' }],
    canSubmit: true },
  { id: 5, maNhom: 1, name: 'Phân tích yêu cầu & lập tài liệu đặc tả', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'done', statusLabel: 'Đã hoàn thành', badgeBg: '#eaf3de', badgeColor: '#3b6d11',
    deadline: '10/03/2026', startDate: '01/03/2026',
    moTa: 'Phân tích yêu cầu phần mềm và viết tài liệu SRS.',
    doneText: '✔ Nhóm trưởng đã duyệt', doneTime: 'Hoàn thành lúc 14:32 — 10/03',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5' }, { ky: 'TB', bg: '#faeeda', color: '#854f0b' }, { ky: 'PD', bg: '#fbeaf0', color: '#993556' }],
    canSubmit: false },
];

// ============================================================
// DỮ LIỆU MẪU — Tab "Của nhóm"
// ============================================================
const groups = [
  { maNhom: 1, tenNhom: 'Nhóm 1', tenLop: 'Lập trình Web' },
  { maNhom: 3, tenNhom: 'Nhóm 3', tenLop: 'Cơ sở dữ liệu' },
];

const groupTasks = [
  { id: 101, maNhom: 1, name: 'Thiết kế giao diện trang Login', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'late', statusLabel: 'Trễ hạn', badgeBg: '#fcebeb', badgeColor: '#a32d2d',
    deadline: '17/04/2026', startDate: '10/04/2026', priority: '🔥 Ưu tiên cao',
    moTa: 'Thiết kế giao diện login responsive.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5', name: 'Nguyễn Văn A' }] },
  { id: 102, maNhom: 1, name: 'Xây dựng API đăng nhập & phân quyền', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'wait', statusLabel: 'Chờ duyệt', badgeBg: '#faeeda', badgeColor: '#854f0b',
    deadline: '20/04/2026', startDate: '12/04/2026', priority: '📈 Ưu tiên cao',
    moTa: 'Xây dựng REST API cho login.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5', name: 'Nguyễn Văn A' }, { ky: 'TB', bg: '#faeeda', color: '#854f0b', name: 'Trần Thị B' }] },
  { id: 103, maNhom: 1, name: 'Thiết kế ERD & schema database', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'doing', statusLabel: 'Đang thực hiện', badgeBg: '#e6f1fb', badgeColor: '#185fa5',
    deadline: '25/04/2026', startDate: '18/04/2026', priority: '📋 Ưu tiên trung bình',
    moTa: 'Thiết kế ERD và viết SQL script.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5', name: 'Nguyễn Văn A' }, { ky: 'LC', bg: '#e1f5ee', color: '#0f6e56', name: 'Lê Văn C' }] },
  { id: 104, maNhom: 1, name: 'Viết tài liệu hướng dẫn sử dụng', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'doing', statusLabel: 'Đang thực hiện', badgeBg: '#e6f1fb', badgeColor: '#185fa5',
    deadline: '28/04/2026', startDate: '20/04/2026', priority: '📋 Ưu tiên thấp',
    moTa: 'Viết hướng dẫn sử dụng cho người dùng cuối.',
    assignees: [{ ky: 'TB', bg: '#faeeda', color: '#854f0b', name: 'Trần Thị B' }] },
  { id: 105, maNhom: 1, name: 'Phân tích yêu cầu & lập tài liệu đặc tả', group: 'Nhóm 1', class: 'Lập trình Web',
    status: 'done', statusLabel: 'Đã hoàn thành', badgeBg: '#eaf3de', badgeColor: '#3b6d11',
    deadline: '10/03/2026', startDate: '01/03/2026',
    moTa: 'Phân tích yêu cầu và viết SRS.', doneText: '✔ Nhóm trưởng đã duyệt',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5', name: 'Nguyễn Văn A' }, { ky: 'TB', bg: '#faeeda', color: '#854f0b', name: 'Trần Thị B' }, { ky: 'PD', bg: '#fbeaf0', color: '#993556', name: 'Phạm Thị D' }] },
  { id: 201, maNhom: 3, name: 'Viết báo cáo chương 2 — Phân tích hệ thống', group: 'Nhóm 3', class: 'Cơ sở dữ liệu',
    status: 'redo', statusLabel: 'Làm lại task', badgeBg: '#fbeaf0', badgeColor: '#993556',
    deadline: '22/04/2026', startDate: '15/04/2026', priority: '📋 Ưu tiên trung bình',
    moTa: 'Viết phân tích use case cho hệ thống thư viện.',
    assignees: [{ ky: 'VA', bg: '#e6f1fb', color: '#185fa5', name: 'Nguyễn Văn A' }] },
  { id: 202, maNhom: 3, name: 'Thiết kế sơ đồ ERD cho hệ thống thư viện', group: 'Nhóm 3', class: 'Cơ sở dữ liệu',
    status: 'done', statusLabel: 'Đã hoàn thành', badgeBg: '#eaf3de', badgeColor: '#3b6d11',
    deadline: '15/03/2026', startDate: '05/03/2026',
    moTa: 'Vẽ ERD cho module quản lý sách.', doneText: '✔ Nhóm trưởng đã duyệt',
    assignees: [{ ky: 'HT', bg: '#e1f5ee', color: '#0f6e56', name: 'Võ Văn Hoài' }, { ky: 'NQ', bg: '#fbeaf0', color: '#993556', name: 'Đỗ Minh Huy' }] },
];

// ============================================================
// MODAL CHI TIẾT TASK (read-only)
// ============================================================
function TaskDetailModal({ task, onClose }) {
  return (
    <div className="st-modal-overlay" onClick={onClose}>
      <div className="st-modal-content" onClick={e => e.stopPropagation()}>
        <div className="st-modal-header">
          <h3>Chi tiết nhiệm vụ</h3>
          <button className="st-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <div className="st-modal-body">
          <div className="st-task-info-box">
            <div className="st-info-title">{task.name}</div>
            <div className="st-info-sub">{task.group} &nbsp;·&nbsp; {task.class}</div>
            <span className="st-detail-badge" style={{ background: task.badgeBg, color: task.badgeColor }}>{task.statusLabel}</span>
          </div>
          <div className="st-detail-grid">
            <div className="st-detail-item"><span className="st-detail-label">📅 Ngày được giao</span><span>{task.startDate || '—'}</span></div>
            <div className="st-detail-item"><span className="st-detail-label">⏰ Hạn nộp</span><span>{task.deadline}</span></div>
            <div className="st-detail-item"><span className="st-detail-label">🎯 Mức độ ưu tiên</span><span>{task.priority || '—'}</span></div>
          </div>
          {task.moTa && (
            <div className="st-form-group">
              <label>📝 Mô tả chi tiết từ nhóm trưởng</label>
              <div className="st-detail-desc">{task.moTa}</div>
            </div>
          )}
          {task.redoNote && <div className="redo-note">{task.redoNote}</div>}
          {task.nhacNho && <div className="st-remind-box">🔔 {task.nhacNho}</div>}
        </div>
        <div className="st-modal-footer">
          <button type="button" className="st-btn-cancel" onClick={onClose}>Đóng</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODAL NỘP TASK
// Flow: Sinh viên ghi chú + đính kèm file → nộp
//   -> Backend: INSERT TepDinhKem, LichSuNhiemVu
//   -> Backend: UPDATE NhiemVu SET TrangThai = 'Chờ duyệt'
// ============================================================
function SubmitTaskModal({ task, onClose }) {
  const [ghiChu, setGhiChu] = useState('');
  const [files, setFiles] = useState([]);
  const [dragover, setDragover] = useState(false);
  const fileInputRef = useRef(null);

  const handleFiles = (newFiles) => setFiles(prev => [...prev, ...Array.from(newFiles)]);
  const removeFile = (idx) => setFiles(prev => prev.filter((_, i) => i !== idx));
  const formatSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1048576) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / 1048576).toFixed(1) + ' MB';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: API call
    // 1. Upload files -> INSERT TepDinhKem
    // 2. INSERT LichSuNhiemVu (TrangThaiMoi = 'Chờ duyệt')
    // 3. UPDATE NhiemVu SET TrangThai = 'Chờ duyệt'
    alert(`✅ Nộp task "${task.name}" thành công!\n\n• Trạng thái: Đang thực hiện → Chờ duyệt\n• Ghi chú: ${ghiChu || '(không có)'}\n• File đính kèm: ${files.length} tệp`);
    onClose();
  };

  return (
    <div className="st-modal-overlay" onClick={onClose}>
      <div className="st-modal-content" onClick={e => e.stopPropagation()}>
        <div className="st-modal-header">
          <h3>Nộp task<span className="st-task-badge" style={{ background: task.badgeBg, color: task.badgeColor }}>{task.statusLabel}</span></h3>
          <button className="st-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="st-modal-body">
            <div className="st-task-info-box">
              <div className="st-info-title">{task.name}</div>
              <div className="st-info-sub">{task.group} &nbsp;·&nbsp; {task.class}</div>
              <div className="st-info-row">
                <span>📅 Hạn nộp: {task.deadline}</span>
                {task.priority && <span>{task.priority}</span>}
              </div>
            </div>
            <div className="st-submit-note">
              ℹ️ Sau khi nộp, task sẽ chuyển sang trạng thái <strong>"Chờ duyệt"</strong> và chờ nhóm trưởng xem xét.
            </div>
            <div className="st-form-group">
              <label>Ghi chú <span className="st-label-hint">(Tùy chọn)</span></label>
              <textarea className="st-textarea" rows="3" placeholder="Mô tả kết quả, vấn đề gặp phải..." value={ghiChu} onChange={e => setGhiChu(e.target.value)} />
            </div>
            <div className="st-form-group">
              <label>Tệp đính kèm <span className="st-label-hint">(Tối đa 20MB mỗi tệp)</span></label>
              <div className={`st-upload-zone ${dragover ? 'dragover' : ''}`}
                onClick={() => fileInputRef.current?.click()}
                onDragOver={e => { e.preventDefault(); setDragover(true); }}
                onDragLeave={() => setDragover(false)}
                onDrop={e => { e.preventDefault(); setDragover(false); handleFiles(e.dataTransfer.files); }}>
                <div className="st-upload-icon">📎</div>
                <div className="st-upload-text">Kéo thả file vào đây hoặc <strong>click để chọn file</strong><br/>Cho phép: .pdf, .docx, .zip, .jpg, .png</div>
                <input type="file" ref={fileInputRef} multiple accept=".pdf,.docx,.zip,.jpg,.png" onChange={e => { handleFiles(e.target.files); e.target.value = ''; }} />
              </div>
              {files.length > 0 && (
                <div className="st-file-list">
                  {files.map((f, i) => (
                    <div className="st-file-item" key={i}>
                      <span className="st-file-name">📄 {f.name}</span>
                      <span className="st-file-size">{formatSize(f.size)}</span>
                      <button type="button" className="st-file-remove" onClick={() => removeFile(i)}><FaTimes /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="st-modal-footer">
            <button type="button" className="st-btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="st-btn-submit">Nộp task</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// TASK CARD — dùng chung cho cả 2 tab (không có thanh %)
// ============================================================
function TaskCard({ task, showAssigneeName, onOpenSubmit, onOpenDetail }) {
  return (
    <div className={`tc ${task.status}`}>
      <div className="tc-top" onClick={() => onOpenDetail(task)} style={{ cursor: 'pointer' }}>
        <div>
          <div className="tc-name">{task.name}</div>
          <div className="tc-group">{task.group} &nbsp;·&nbsp; {task.class}</div>
        </div>
        <span className="badge" style={{ background: task.badgeBg, color: task.badgeColor }}>{task.statusLabel}</span>
      </div>
      {task.redoNote && <div className="redo-note">{task.redoNote} &nbsp;·&nbsp; <strong>{task.redoDeadline}</strong></div>}
      {task.nhacNho && <div className="st-remind-box-inline">🔔 {task.nhacNho}</div>}
      <div className="tc-mid">
        <span className="tc-info">📅 {task.status === 'done' ? `Hoàn thành: ${task.deadline}` : task.status === 'redo' ? `Deadline mới: ${task.deadline}` : `Hết hạn: ${task.deadline}`}</span>
        {task.lateText && <span className="tc-info" style={{ color: '#e24b4a' }}>{task.lateText}</span>}
        {task.doneText && <span className="tc-info" style={{ color: '#639922' }}>{task.doneText}</span>}
        {task.priority && <span className="tc-info">{task.priority}</span>}
      </div>
      <div className="tc-bot">
        <div className="assignees">
          {task.assignees.map((a, i) => (
            <React.Fragment key={i}>
              <div className="avs" style={{ background: a.bg, color: a.color }}>{a.ky}</div>
              {showAssigneeName && a.name && <span className="assignee-name">{a.name}</span>}
            </React.Fragment>
          ))}
        </div>
        {task.canSubmit && (
          <button className="act-btn" style={{ background: '#152259', color: '#fff' }} onClick={() => onOpenSubmit(task)}>Nộp task</button>
        )}
        {task.waitText && <span style={{ fontSize: '11px', color: '#ef9f27', fontWeight: '600' }}>{task.waitText}</span>}
        {task.doneTime && <span style={{ fontSize: '11px', color: '#639922', fontWeight: '600' }}>{task.doneTime}</span>}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const StudentTasks = () => {
  const [activeTab, setActiveTab] = useState('mine');
  const [selectedGroup, setSelectedGroup] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPriority, setFilterPriority] = useState('all');
  const [filterMyGroup, setFilterMyGroup] = useState('all');
  const [modalTask, setModalTask] = useState(null);
  const [detailTask, setDetailTask] = useState(null);

  const filteredMyTasks = myTasks.filter(t => {
    if (filterMyGroup !== 'all' && t.maNhom !== Number(filterMyGroup)) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    if (filterPriority !== 'all') {
      const p = t.priority || '';
      if (filterPriority === 'high' && !p.includes('cao')) return false;
      if (filterPriority === 'medium' && !p.includes('trung bình')) return false;
      if (filterPriority === 'low' && !p.includes('thấp')) return false;
    }
    return true;
  });

  const filteredGroupTasks = groupTasks.filter(t => {
    if (selectedGroup !== 'all' && t.maNhom !== Number(selectedGroup)) return false;
    if (filterStatus !== 'all' && t.status !== filterStatus) return false;
    return true;
  });

  return (
    <div className="st-container">
      <div className="top"><h1>Nhiệm vụ & tiến độ</h1></div>
      <div className="tab-bar">
        <button className={`tab ${activeTab === 'mine' ? 'active' : ''}`} onClick={() => setActiveTab('mine')}>Của tôi</button>
        <button className={`tab ${activeTab === 'group' ? 'active' : ''}`} onClick={() => setActiveTab('group')}>Của nhóm</button>
      </div>
      <div className="filters">
        {activeTab === 'mine' && (
          <select className="fsel" value={filterMyGroup} onChange={e => setFilterMyGroup(e.target.value)}>
            <option value="all">Tất cả nhóm</option>
            {groups.map(g => <option key={g.maNhom} value={g.maNhom}>{g.tenNhom} — {g.tenLop}</option>)}
          </select>
        )}
        {activeTab === 'group' && (
          <select className="fsel" value={selectedGroup} onChange={e => setSelectedGroup(e.target.value)}>
            <option value="all">Tất cả nhóm</option>
            {groups.map(g => <option key={g.maNhom} value={g.maNhom}>{g.tenNhom} — {g.tenLop}</option>)}
          </select>
        )}
        <select className="fsel" value={filterStatus} onChange={e => setFilterStatus(e.target.value)}>
          <option value="all">Tất cả trạng thái</option>
          <option value="doing">Đang thực hiện</option>
          <option value="wait">Chờ duyệt</option>
          <option value="late">Trễ hạn</option>
          <option value="redo">Làm lại task</option>
          <option value="done">Đã hoàn thành</option>
        </select>
        {activeTab === 'mine' && (
          <select className="fsel" value={filterPriority} onChange={e => setFilterPriority(e.target.value)}>
            <option value="all">Ưu tiên</option>
            <option value="high">Cao</option>
            <option value="medium">Trung bình</option>
            <option value="low">Thấp</option>
          </select>
        )}
      </div>

      {activeTab === 'mine' && (
        <div className="task-list">
          {filteredMyTasks.length === 0
            ? <div className="empty-state"><span>📋</span>Không có nhiệm vụ nào phù hợp bộ lọc.</div>
            : filteredMyTasks.map(t => <TaskCard key={t.id} task={t} showAssigneeName={false} onOpenSubmit={setModalTask} onOpenDetail={setDetailTask} />)}
        </div>
      )}

      {activeTab === 'group' && (
        <div className="task-list">
          {filteredGroupTasks.length === 0
            ? <div className="empty-state"><span>👥</span>Không có nhiệm vụ nào trong nhóm được chọn.</div>
            : filteredGroupTasks.map(t => <TaskCard key={t.id} task={t} showAssigneeName={true} onOpenSubmit={setModalTask} onOpenDetail={setDetailTask} />)}
        </div>
      )}

      {modalTask && <SubmitTaskModal task={modalTask} onClose={() => setModalTask(null)} />}
      {detailTask && <TaskDetailModal task={detailTask} onClose={() => setDetailTask(null)} />}
    </div>
  );
};

export default StudentTasks;