import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCalendarAlt, FaUserFriends } from 'react-icons/fa';
import './StudentClasses.css';

// ============================================================
// DỮ LIỆU MẪU — đồng bộ bảng LopHoc & Nhom (DB v2)
// Sau này thay bằng: axios.get('/api/lophoc/cua-toi')
// ============================================================
const mockClasses = [
  {
    maLop      : 1,
    maLopHoc   : 'LT_WEB_01',
    tenLop     : 'Lập trình Web',
    tenGV      : 'Nguyễn Văn A',
    thoiGianHoc: 'Thứ 2, 4, 6 · 18:00 – 20:00',
    soSinhVien : 32,
    soNhom     : 8,
    tienDo     : 62,
    mauSac     : '#378add',
    badgeBg    : '#e6f1fb',
    badgeColor : '#185fa5',
    gvBg       : '#e6f1fb',
    gvColor    : '#185fa5',
  },
  {
    maLop      : 2,
    maLopHoc   : 'CSDL_02',
    tenLop     : 'Cơ sở dữ liệu',
    tenGV      : 'Trần Thị B',
    thoiGianHoc: 'Thứ 3, 5 · 13:00 – 15:00',
    soSinhVien : 28,
    soNhom     : 7,
    tienDo     : 80,
    mauSac     : '#1d9e75',
    badgeBg    : '#e1f5ee',
    badgeColor : '#0f6e56',
    gvBg       : '#e1f5ee',
    gvColor    : '#0f6e56',
  },
  {
    maLop      : 3,
    maLopHoc   : 'MMT_03',
    tenLop     : 'Mạng máy tính',
    tenGV      : 'Lê Hồng C',
    thoiGianHoc: 'Thứ 7 · 07:30 – 11:30',
    soSinhVien : 35,
    soNhom     : 9,
    tienDo     : 40,
    mauSac     : '#ef9f27',
    badgeBg    : '#faeeda',
    badgeColor : '#854f0b',
    gvBg       : '#faeeda',
    gvColor    : '#854f0b',
  },
];

// Nhóm của user — maLop dùng để điều hướng sang trang nhóm học tập
const mockMyGroups = [
  {
    maNhom   : 1,
    tenNhom  : 'Nhóm 1',
    maLop    : 1,
    tenLop   : 'Lập trình Web',
    tenGV    : 'Nguyễn Văn A',
    laNhomTruong: true,
    deTai    : 'Đề tài: Website quản lý lớp học — Module làm việc nhóm',
    thanhVien: [
      { kyHieu: 'VA', bg: '#e6f1fb', color: '#185fa5' },
      { kyHieu: 'TB', bg: '#faeeda', color: '#854f0b' },
      { kyHieu: 'LC', bg: '#e1f5ee', color: '#0f6e56' },
      { kyHieu: 'PD', bg: '#fbeaf0', color: '#993556' },
    ],
  },
  {
    maNhom   : 3,
    tenNhom  : 'Nhóm 3',
    maLop    : 2,
    tenLop   : 'Cơ sở dữ liệu',
    tenGV    : 'Trần Thị B',
    laNhomTruong: false,
    deTai    : 'Đề tài: Xây dựng hệ thống quản lý thư viện trường đại học',
    thanhVien: [
      { kyHieu: 'HT', bg: '#e1f5ee', color: '#0f6e56' },
      { kyHieu: 'VA', bg: '#e6f1fb', color: '#185fa5' },
      { kyHieu: 'NQ', bg: '#fbeaf0', color: '#993556' },
      { kyHieu: 'BL', bg: '#faeeda', color: '#854f0b' },
      { kyHieu: '+1', bg: '#f1efe8', color: '#5f5e5a' },
    ],
  },
  {
    maNhom   : 5,
    tenNhom  : 'Nhóm 5',
    maLop    : 3,
    tenLop   : 'Mạng máy tính',
    tenGV    : 'Lê Hồng C',
    laNhomTruong: false,
    deTai    : 'Đề tài: Phân tích và thiết kế mạng LAN cho doanh nghiệp vừa và nhỏ',
    thanhVien: [
      { kyHieu: 'MT', bg: '#fbeaf0', color: '#993556' },
      { kyHieu: 'VA', bg: '#e6f1fb', color: '#185fa5' },
      { kyHieu: 'KD', bg: '#e1f5ee', color: '#0f6e56' },
    ],
  },
];

// ============================================================
// MODAL THAM GIA LỚP
// ============================================================
function JoinModal({ onClose }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');

  const handleJoin = () => {
    if (!code.trim()) { setError('Vui lòng nhập mã lớp.'); return; }
    // TODO: axios.post('/api/lophoc/tham-gia', { maLopHoc: code })
    //   .catch(() => setError('Mã lớp không tồn tại hoặc đã đầy.'))
    alert(`Đã gửi yêu cầu tham gia lớp: ${code}`);
    onClose();
  };

  return (
    <div className="sc-modal-overlay" onClick={onClose}>
      <div className="sc-modal-box" onClick={e => e.stopPropagation()}>
        <div className="sc-modal-header">
          <span>Tham gia lớp học</span>
          <button onClick={onClose} className="sc-modal-close">✕</button>
        </div>
        <p className="sc-modal-desc">Nhập mã lớp (Class Code) do giảng viên cung cấp.</p>
        <input
          className={`sc-modal-input ${error ? 'input-error' : ''}`}
          placeholder="VD: LT_WEB_01"
          value={code}
          onChange={e => { setCode(e.target.value.toUpperCase()); setError(''); }}
          onKeyDown={e => e.key === 'Enter' && handleJoin()}
          autoFocus
        />
        {error && <span className="sc-field-error">{error}</span>}
        <div className="sc-modal-footer">
          <button className="sc-btn-cancel" onClick={onClose}>Hủy</button>
          <button className="sc-btn-primary" onClick={handleJoin}>Tham gia</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CARD LỚP HỌC
// ============================================================
function ClassCard({ cls, onClick }) {
  return (
    <div className="cls-card" onClick={onClick}>
      <div className="cls-banner" style={{ background: cls.mauSac }} />
      <div className="cls-body">
        <div className="cls-name">{cls.tenLop}</div>
        <div className="cls-code">Mã lớp: {cls.maLopHoc}</div>
        <div className="cls-meta">
          <div className="meta-row">
            <div className="meta-icon" style={{ background: cls.gvBg, color: cls.gvColor }}>GV</div>
            {cls.tenGV}
          </div>
          <div className="meta-row">
            <div className="meta-icon" style={{ background: '#eaf3de', color: '#3b6d11' }}>
              <FaCalendarAlt />
            </div>
            {cls.thoiGianHoc}
          </div>
          <div className="meta-row">
            <div className="meta-icon" style={{ background: '#faeeda', color: '#854f0b' }}>
              <FaUserFriends />
            </div>
            {cls.soSinhVien} sinh viên &nbsp;·&nbsp; {cls.soNhom} nhóm
          </div>
        </div>
        <div className="cls-footer">
          <div className="progress-wrap">
            <div className="progress-label">Tiến độ môn học</div>
            <div className="pbar">
              <div className="pfill" style={{ width: `${cls.tienDo}%`, background: cls.mauSac }} />
            </div>
          </div>
          <span className="cls-badge" style={{ background: cls.badgeBg, color: cls.badgeColor }}>
            Đang học
          </span>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CARD NHÓM
// ============================================================
function GroupCard({ group, onClick }) {
  return (
    <div className="nhom-card" onClick={onClick} style={{ cursor: 'pointer' }}>
      <div className="nhom-header">
        <div>
          <div className="nhom-name">{group.tenNhom} — {group.tenLop}</div>
          <div className="nhom-class">GV: {group.tenGV}</div>
        </div>
        <span
          className="cls-badge"
          style={group.laNhomTruong
            ? { background: '#faeeda', color: '#854f0b' }
            : { background: '#e6f1fb', color: '#185fa5' }
          }
        >
          {group.laNhomTruong ? 'Nhóm trưởng' : 'Thành viên'}
        </span>
      </div>
      <div className="avatars">
        {group.thanhVien.map((tv, i) => (
          <div key={i} className="av" style={{ background: tv.bg, color: tv.color }}>
            {tv.kyHieu}
          </div>
        ))}
      </div>
      <div className="nhom-topic">{group.deTai}</div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const StudentClasses = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  // Click card lớp → vào trang chi tiết lớp (truyền maLop qua URL)
  const handleClickClass = (maLop) => {
    navigate(`/student/classes/${maLop}`);
  };

  // Click card nhóm → sang trang nhóm học tập, truyền maNhom qua state
  // StudentGroups sẽ đọc location.state.maNhom để highlight đúng nhóm
  const handleClickGroup = (group) => {
    navigate('/student/groups', {
      state: {
        maNhom : group.maNhom,
        tenNhom: group.tenNhom,
        tenLop : group.tenLop,
      },
    });
  };

  return (
    <div className="sc-container">
      {/* HEADER */}
      <div className="top">
        <h1>Lớp học của tôi</h1>
        <button className="join-btn" onClick={() => setShowModal(true)}>
          + Tham gia lớp
        </button>
      </div>

      {/* DANH SÁCH LỚP */}
      <div className="section-label">Đang học — Học kỳ 2 2025-2026</div>
      <div className="grid">
        {mockClasses.map(cls => (
          <ClassCard
            key={cls.maLop}
            cls={cls}
            onClick={() => handleClickClass(cls.maLop)}
          />
        ))}
      </div>

      {/* DANH SÁCH NHÓM */}
      <div className="section-label">Nhóm của tôi trong các lớp</div>
      <div className="nhom-grid">
        {mockMyGroups.map(g => (
          <GroupCard
            key={g.maNhom}
            group={g}
            onClick={() => handleClickGroup(g)}
          />
        ))}

        {/* Card tham gia lớp mới */}
        <div className="nhom-card nhom-card--add" onClick={() => setShowModal(true)}>
          <div className="add-icon">+</div>
          <div className="add-label">Tham gia lớp mới</div>
        </div>
      </div>

      {/* MODAL THAM GIA LỚP */}
      {showModal && <JoinModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default StudentClasses;