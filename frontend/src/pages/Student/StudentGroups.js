import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';
import './StudentGroups.css';

// ============================================================
// DỮ LIỆU MẪU
// ============================================================
const mockGroups = [
  {
    maNhom: 1, tenNhom: 'Nhóm 1',
    maLop: 1, maLopHoc: 'LT_WEB_01', tenLop: 'Lập trình Web', tenGV: 'Nguyễn Văn A',
    laNhomTruong: true,
    deTai: 'Website quản lý lớp học — Module làm việc nhóm',
    soThanhVien: 4, soToiDa: 5, ngayLap: '02/03/2026', capNhat: 'Hôm nay', tienDo: 62,
    taskTong: 12, taskHoanThanh: 5, taskTreHan: 1, taskDangLam: 4, taskChoDuyet: 2,
    thanhVien: [
      { maSo: 'DH52300086', hoTen: 'Nguyễn Văn A', isMe: true, laNhomTruong: true, pct: 75, taskLabel: '3/4', bg: '#e6f1fb', color: '#185fa5', ky: 'VA', barColor: '#378add' },
      { maSo: 'DH52300141', hoTen: 'Trần Thị B', isMe: false, laNhomTruong: false, pct: 100, taskLabel: '4/4', bg: '#faeeda', color: '#854f0b', ky: 'TB', barColor: '#639922' },
      { maSo: 'DH52300204', hoTen: 'Lê Văn C', isMe: false, laNhomTruong: false, pct: 33, taskLabel: '1/3', bg: '#e1f5ee', color: '#0f6e56', ky: 'LC', barColor: '#e24b4a' },
      { maSo: 'DH52300249', hoTen: 'Phạm Thị D', isMe: false, laNhomTruong: false, pct: 67, taskLabel: '2/3', bg: '#fbeaf0', color: '#993556', ky: 'PD', barColor: '#ef9f27' },
    ],
  },
  {
    maNhom: 3, tenNhom: 'Nhóm 3',
    maLop: 2, maLopHoc: 'CSDL_02', tenLop: 'Cơ sở dữ liệu', tenGV: 'Trần Thị B',
    laNhomTruong: false,
    deTai: 'Xây dựng hệ thống quản lý thư viện trường đại học',
    soThanhVien: 5, soToiDa: 5, ngayLap: '04/03/2026', capNhat: '16/04/2026', tienDo: 80,
    taskTong: 10, taskHoanThanh: 8, taskTreHan: 0, taskDangLam: 2, taskChoDuyet: 0,
    thanhVien: [
      { maSo: 'DH52300591', hoTen: 'Võ Văn Hoài', isMe: false, laNhomTruong: true, pct: 100, taskLabel: '3/3', bg: '#e1f5ee', color: '#0f6e56', ky: 'HT', barColor: '#639922' },
      { maSo: 'DH52300086', hoTen: 'Nguyễn Văn A', isMe: true, laNhomTruong: false, pct: 80, taskLabel: '4/5', bg: '#e6f1fb', color: '#185fa5', ky: 'VA', barColor: '#378add' },
      { maSo: 'DH52300654', hoTen: 'Đỗ Minh Huy', isMe: false, laNhomTruong: false, pct: 75, taskLabel: '3/4', bg: '#fbeaf0', color: '#993556', ky: 'NQ', barColor: '#ef9f27' },
    ],
  },
  {
    maNhom: 5, tenNhom: 'Nhóm 5',
    maLop: 3, maLopHoc: 'MMT_03', tenLop: 'Mạng máy tính', tenGV: 'Lê Hồng C',
    laNhomTruong: false,
    deTai: 'Phân tích và thiết kế mạng LAN cho doanh nghiệp vừa và nhỏ',
    soThanhVien: 3, soToiDa: 5, ngayLap: '07/03/2026', capNhat: '14/04/2026', tienDo: 40,
    taskTong: 6, taskHoanThanh: 2, taskTreHan: 1, taskDangLam: 3, taskChoDuyet: 0,
    thanhVien: [
      { maSo: 'DH52301884', hoTen: 'Tô Duy Phúc Thịnh', isMe: false, laNhomTruong: true, pct: 50, taskLabel: '1/2', bg: '#fbeaf0', color: '#993556', ky: 'MT', barColor: '#ef9f27' },
      { maSo: 'DH52300086', hoTen: 'Nguyễn Văn A', isMe: true, laNhomTruong: false, pct: 33, taskLabel: '1/3', bg: '#e6f1fb', color: '#185fa5', ky: 'VA', barColor: '#e24b4a' },
      { maSo: 'DH52300935', hoTen: 'Phạm Trần Trung Kiên', isMe: false, laNhomTruong: false, pct: 50, taskLabel: '1/2', bg: '#e1f5ee', color: '#0f6e56', ky: 'KD', barColor: '#ef9f27' },
    ],
  },
];

const mockHistory = [
  {
    id: 1, hocKy: 'HK2 2025-2026',
    tieuDe: 'Yêu cầu chuyển sang Nhóm 3 — CSDL',
    ngayGui: '10/03/2026',
    lyDo: 'Bạn bè thân quen ở nhóm 3, muốn làm cùng để phối hợp tốt hơn.',
    trangThai: 'Từ chối',
    ghiChuGV: 'Nhóm 3 đã đủ thành viên, không thể tiếp nhận thêm.',
    badgeBg: '#fcebeb', badgeColor: '#a32d2d',
  },
];

const semesters = ['HK2 2025-2026', 'HK1 2025-2026', 'HK2 2024-2025'];

// ============================================================
// MODAL YÊU CẦU CHUYỂN NHÓM
// ============================================================
function TransferModal({ groups, onClose }) {
  const [fromGroup, setFromGroup] = useState(groups[0]?.maNhom || '');
  const [toGroupName, setToGroupName] = useState('');
  const [lyDo, setLyDo] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!toGroupName.trim() || !lyDo.trim()) return;
    // TODO: axios.post('/api/yeucauchuyennhom', { maNhomHienTai: fromGroup, tenNhomMuon: toGroupName, lyDo })
    alert('Đã gửi yêu cầu chuyển nhóm thành công!');
    onClose();
  };

  const selectedGroup = groups.find(g => g.maNhom === Number(fromGroup));

  return (
    <div className="sg-modal-overlay" onClick={onClose}>
      <div className="sg-modal-content" onClick={e => e.stopPropagation()}>
        <div className="sg-modal-header">
          <h3>Yêu cầu chuyển nhóm</h3>
          <button className="sg-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <form className="sg-modal-form" onSubmit={handleSend}>
          <div className="sg-form-group">
            <label>Nhóm hiện tại</label>
            <select className="sg-input" value={fromGroup} onChange={e => setFromGroup(Number(e.target.value))}>
              {groups.map(g => (
                <option key={g.maNhom} value={g.maNhom}>
                  {g.tenNhom} — {g.tenLop} ({g.laNhomTruong ? 'Nhóm trưởng' : 'Thành viên'})
                </option>
              ))}
            </select>
          </div>
          <div className="sg-form-group">
            <label>Lớp học</label>
            <input className="sg-input" value={selectedGroup ? `${selectedGroup.tenLop} (${selectedGroup.maLopHoc})` : ''} disabled />
          </div>
          <div className="sg-form-group">
            <label>Nhóm muốn chuyển sang *</label>
            <input className="sg-input" placeholder="VD: Nhóm 2" value={toGroupName} onChange={e => setToGroupName(e.target.value)} required />
          </div>
          <div className="sg-form-group">
            <label>Lý do chuyển nhóm *</label>
            <textarea className="sg-input" rows="3" placeholder="Trình bày lý do..." value={lyDo} onChange={e => setLyDo(e.target.value)} required style={{ resize: 'vertical' }} />
          </div>
          <div className="sg-modal-footer">
            <button type="button" className="sg-btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="sg-btn-save">Gửi yêu cầu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// MODAL YÊU CẦU VÀO NHÓM
// ============================================================
function JoinModal({ groups, onClose }) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0]?.maNhom || '');
  const [loiNhan, setLoiNhan] = useState('');

  const handleSend = (e) => {
    e.preventDefault();
    if (!loiNhan.trim()) return;
    alert('Đã gửi yêu cầu xin vào nhóm thành công! Đang chờ nhóm trưởng duyệt.');
    onClose();
  };

  return (
    <div className="sg-modal-overlay" onClick={onClose}>
      <div className="sg-modal-content" onClick={e => e.stopPropagation()}>
        <div className="sg-modal-header">
          <h3>Yêu cầu vào nhóm</h3>
          <button className="sg-close-btn" onClick={onClose}><FaTimes /></button>
        </div>
        <form className="sg-modal-form" onSubmit={handleSend}>
          <div className="sg-form-group">
            <label>Chọn nhóm muốn tham gia *</label>
            <select className="sg-input" value={selectedGroup} onChange={e => setSelectedGroup(Number(e.target.value))}>
              {groups.map(g => (
                <option key={g.maNhom} value={g.maNhom} disabled={g.soThanhVien >= g.soToiDa}>
                  {g.tenNhom} — {g.tenLop} ({g.soThanhVien}/{g.soToiDa} thành viên) {g.soThanhVien >= g.soToiDa ? '- Đã đầy' : ''}
                </option>
              ))}
            </select>
          </div>
          <div className="sg-form-group">
            <label>Lời nhắn cho nhóm trưởng *</label>
            <textarea className="sg-input" rows="3" placeholder="Xin chào, cho mình vào nhóm với..." value={loiNhan} onChange={e => setLoiNhan(e.target.value)} required style={{ resize: 'vertical' }} />
          </div>
          <div className="sg-modal-footer">
            <button type="button" className="sg-btn-cancel" onClick={onClose}>Hủy</button>
            <button type="submit" className="sg-btn-save" style={{ background: '#378add', color: '#fff' }}>Gửi yêu cầu</button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const StudentGroups = () => {
  const location = useLocation();
  const incomingMaNhom = location.state?.maNhom || null;

  const [activeTab, setActiveTab] = useState('nhomCuaToi');
  const [selectedMaNhom, setSelectedMaNhom] = useState(incomingMaNhom || mockGroups[0]?.maNhom);
  const [showTransfer, setShowTransfer] = useState(false);
  const [showJoin, setShowJoin] = useState(false);
  const [selectedHocKy, setSelectedHocKy] = useState(semesters[0]);

  useEffect(() => {
    if (incomingMaNhom) {
      setSelectedMaNhom(incomingMaNhom);
      setActiveTab('nhomCuaToi');
    }
  }, [incomingMaNhom]);

  const selectedGroup = mockGroups.find(g => g.maNhom === selectedMaNhom) || mockGroups[0];
  const filteredHistory = mockHistory.filter(h => h.hocKy === selectedHocKy);

  return (
    <div className="sg-container">
      <div className="sg-top">
        <h1>Nhóm học tập</h1>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="sg-btn-outline" style={{ background: '#378add', color: '#fff', borderColor: '#378add' }} onClick={() => setShowJoin(true)}>
            Yêu cầu vào nhóm
          </button>
          <button className="sg-btn-outline" onClick={() => setShowTransfer(true)}>
            Yêu cầu chuyển nhóm
          </button>
        </div>
      </div>

      <div className="sg-tab-bar">
        <button className={`sg-tab ${activeTab === 'nhomCuaToi' ? 'active' : ''}`} onClick={() => setActiveTab('nhomCuaToi')}>Nhóm của tôi</button>
        <button className={`sg-tab ${activeTab === 'lichSu' ? 'active' : ''}`} onClick={() => setActiveTab('lichSu')}>Lịch sử yêu cầu</button>
      </div>

      {/* TAB NHÓM CỦA TÔI */}
      {activeTab === 'nhomCuaToi' && (
        <>
          <div className="group-selector-wrapper">
            <span className="group-selector-label">Xem thông tin của:</span>
            <select className="group-select" value={selectedMaNhom} onChange={e => setSelectedMaNhom(Number(e.target.value))}>
              {mockGroups.map(g => (
                <option key={g.maNhom} value={g.maNhom}>
                  {g.tenNhom} — {g.tenLop} ({g.laNhomTruong ? 'Nhóm trưởng' : 'Thành viên'})
                </option>
              ))}
            </select>
          </div>

          <div className="sg-two-col">
            {/* Thông tin nhóm */}
            <div className="sg-card">
              <div className="sg-card-title">Thông tin nhóm</div>
              <div className="sg-card-sub">Cập nhật lần cuối: {selectedGroup.capNhat}</div>
              <div className="sg-info-row"><span>Lớp</span><span>{selectedGroup.tenLop} ({selectedGroup.maLopHoc})</span></div>
              <div className="sg-info-row"><span>Giảng viên</span><span>{selectedGroup.tenGV}</span></div>
              <div className="sg-info-row"><span>Đề tài</span><span>{selectedGroup.deTai}</span></div>
              <div className="sg-info-row"><span>Thành viên</span><span>{selectedGroup.soThanhVien} / {selectedGroup.soToiDa} người</span></div>
              <div className="sg-info-row"><span>Ngày lập nhóm</span><span>{selectedGroup.ngayLap}</span></div>
              <div className="sg-progress-wrap">
                <div className="sg-progress-label"><span>Tiến độ tổng thể</span><strong>{selectedGroup.tienDo}%</strong></div>
                <div className="sg-pbar"><div className="sg-pfill" style={{ width: `${selectedGroup.tienDo}%` }} /></div>
              </div>
            </div>

            {/* Thống kê nhiệm vụ */}
            <div className="sg-card">
              <div className="sg-card-title">Thống kê nhiệm vụ</div>
              <div className="sg-card-sub">Tính đến hôm nay</div>
              <div className="sg-stat-mini">
                <div className="sg-smc"><div className="sg-smc-val" style={{ color: '#378add' }}>{selectedGroup.taskTong}</div><div className="sg-smc-lbl">Tổng task</div></div>
                <div className="sg-smc"><div className="sg-smc-val" style={{ color: '#639922' }}>{selectedGroup.taskHoanThanh}</div><div className="sg-smc-lbl">Hoàn thành</div></div>
                <div className="sg-smc"><div className="sg-smc-val" style={{ color: '#e24b4a' }}>{selectedGroup.taskTreHan}</div><div className="sg-smc-lbl">Trễ hạn</div></div>
              </div>
              {[
                { label: 'Đang thực hiện', val: selectedGroup.taskDangLam, color: '#378add' },
                { label: 'Chờ duyệt', val: selectedGroup.taskChoDuyet, color: '#ef9f27' },
                { label: 'Hoàn thành', val: selectedGroup.taskHoanThanh, color: '#639922' },
              ].map((item, i) => (
                <div className="sg-task-bar-row" key={i}>
                  <div className="sg-task-bar-label"><span>{item.label}</span><span>{item.val} task</span></div>
                  <div className="sg-pbar">
                    <div className="sg-pfill" style={{ width: `${selectedGroup.taskTong ? (item.val / selectedGroup.taskTong) * 100 : 0}%`, background: item.color }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="sg-section-label">Thành viên nhóm</div>
          <div className="sg-card">
            {selectedGroup.thanhVien.map((tv, i) => (
              <div key={i} className="sg-member-row">
                <div className="sg-av" style={{ background: tv.bg, color: tv.color }}>{tv.ky}</div>
                <div style={{ flex: 1 }}>
                  <div className="sg-mname">
                    {tv.hoTen}
                    {tv.isMe && <span className="sg-badge-me">Tôi</span>}
                    {tv.laNhomTruong && <span className="sg-badge" style={{ background: '#faeeda', color: '#854f0b' }}>Nhóm trưởng</span>}
                  </div>
                  <div className="sg-msub">{tv.maSo}</div>
                </div>
                <div className="sg-mini-bar-wrap">
                  <div className="sg-mini-bar-label">Hoàn thành {tv.taskLabel}</div>
                  <div className="sg-mini-pbar">
                    <div className="sg-mini-pfill" style={{ width: `${tv.pct}%`, background: tv.barColor }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* TAB LỊCH SỬ */}
      {activeTab === 'lichSu' && (
        <>
          <div className="sg-semester-select-wrap">
            <label>Xem theo học kỳ:</label>
            <select className="sg-semester-select" value={selectedHocKy} onChange={e => setSelectedHocKy(e.target.value)}>
              {semesters.map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          {filteredHistory.length === 0
            ? <div style={{ textAlign: 'center', color: '#aaa', fontSize: 13, padding: '40px 0' }}>Không có yêu cầu nào trong học kỳ này.</div>
            : filteredHistory.map(h => (
              <div key={h.id} className="sg-req-card">
                <div className="sg-req-top">
                  <div>
                    <div className="sg-req-name">{h.tieuDe}</div>
                    <div className="sg-req-meta">Gửi ngày {h.ngayGui}</div>
                  </div>
                  <span className="sg-badge" style={{ background: h.badgeBg, color: h.badgeColor }}>{h.trangThai}</span>
                </div>
                <div className="sg-req-reason">
                  Lý do: {h.lyDo}
                  {h.ghiChuGV && <span className="sg-gv-reply">GV phản hồi: {h.ghiChuGV}</span>}
                </div>
              </div>
            ))
          }
        </>
      )}

      {showTransfer && <TransferModal groups={mockGroups} onClose={() => setShowTransfer(false)} />}
      {showJoin && <JoinModal groups={mockGroups} onClose={() => setShowJoin(false)} />}
    </div>
  );
};

export default StudentGroups;