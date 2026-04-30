import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaBullhorn, FaUsers, FaChevronDown, FaChevronUp } from 'react-icons/fa';
import './StudentClassDetail.css';

// ============================================================
// DỮ LIỆU MẪU — đồng bộ DB v2
// Sau này: axios.get(`/api/lophoc/${maLop}`)
// ============================================================
const mockClassData = {
  1: {
    maLop      : 1,
    maLopHoc   : 'LT_WEB_01',
    tenLop     : 'Lập trình Web',
    tenGV      : 'Nguyễn Văn A',
    emailGV    : 'gv001@stu.edu.vn',
    thoiGianHoc: 'Thứ 2, 4, 6 · 18:00 – 20:00',
    ngayBatDau : '03/03/2026',
    ngayKetThuc: '20/06/2026',
    tenHocKy   : 'Học kỳ 2 2025-2026',
    soSinhVien : 32,
    soNhom     : 8,
    tienDo     : 62,
    mauSac     : '#378add',
    // Bảng tin thông báo của GV (giống Google Classroom)
    thongBao: [
      {
        id: 3,
        tieuDe : 'Lịch nộp bài cuối kỳ',
        noiDung: 'Nhắc nhở: Deadline nộp báo cáo cuối kỳ là 15/06/2026. Các nhóm chuẩn bị file PDF + source code nén .zip gửi qua hệ thống.',
        thoiGian: '18/04/2026 · 09:00',
        ghimLai : true,
        fileDinhKem: [],
      },
      {
        id: 2,
        tieuDe : 'Buổi học tuần tới dời sang thứ 3',
        noiDung: 'Do lịch thi giữa kỳ, buổi học thứ 2 tuần 20/04 sẽ dời sang thứ 3 21/04 cùng giờ. Mọi người chú ý điều chỉnh lịch.',
        thoiGian: '15/04/2026 · 14:30',
        ghimLai : false,
        fileDinhKem: [],
      },
      {
        id: 1,
        tieuDe : 'Tài liệu tham khảo môn học',
        noiDung: 'Mình đã upload tài liệu slides tuần 1-5 lên hệ thống. Các bạn tải về ôn tập trước buổi kiểm tra giữa kỳ.',
        thoiGian: '02/03/2026 · 08:00',
        ghimLai : false,
        fileDinhKem: [
          { tenFile: 'Slides_tuan1-5.pdf', dungLuong: '4.2 MB' },
        ],
      },
    ],
    // Danh sách sinh viên trong lớp (từ bảng SinhVienLop join NguoiDung)
    danhSachSV: [
      { maSo: 'DH52200320', hoTen: 'Đặng Võ Phương Anh', nhom: 'Nhóm 1', laNhomTruong: true,  bg: '#e6f1fb', color: '#185fa5', kyHieu: 'PA' },
      { maSo: 'DH52300086', hoTen: 'Trần Quốc Anh',      nhom: 'Nhóm 1', laNhomTruong: false, bg: '#faeeda', color: '#854f0b', kyHieu: 'QA' },
      { maSo: 'DH52300141', hoTen: 'Hồ Gia Bảo',         nhom: 'Nhóm 1', laNhomTruong: false, bg: '#e1f5ee', color: '#0f6e56', kyHieu: 'GB' },
      { maSo: 'DH52200362', hoTen: 'Mông Quyền Gia Bảo', nhom: 'Nhóm 1', laNhomTruong: false, bg: '#fbeaf0', color: '#993556', kyHieu: 'MB' },
      { maSo: 'DH52300129', hoTen: 'Bùi Công Bằng',      nhom: 'Nhóm 2', laNhomTruong: true,  bg: '#f1efe8', color: '#5f5e5a', kyHieu: 'CB' },
      { maSo: 'DH52300204', hoTen: 'Huỳnh Tuấn Cảnh',    nhom: 'Nhóm 2', laNhomTruong: false, bg: '#e6f1fb', color: '#185fa5', kyHieu: 'TC' },
      { maSo: 'DH52200422', hoTen: 'Lâm Đoàn Việt Cường',nhom: 'Nhóm 2', laNhomTruong: false, bg: '#faeeda', color: '#854f0b', kyHieu: 'VC' },
      { maSo: 'DH52300249', hoTen: 'Đặng Chí Dũng',      nhom: 'Nhóm 3', laNhomTruong: true,  bg: '#e1f5ee', color: '#0f6e56', kyHieu: 'CD' },
    ],
  },
  2: {
    maLop: 2, maLopHoc: 'CSDL_02', tenLop: 'Cơ sở dữ liệu',
    tenGV: 'Trần Thị B', emailGV: 'gv002@stu.edu.vn',
    thoiGianHoc: 'Thứ 3, 5 · 13:00 – 15:00',
    ngayBatDau: '04/03/2026', ngayKetThuc: '18/06/2026',
    tenHocKy: 'Học kỳ 2 2025-2026', soSinhVien: 28, soNhom: 7, tienDo: 80,
    mauSac: '#1d9e75',
    thongBao: [
      { id: 1, tieuDe: 'Kế hoạch học tập học kỳ 2', noiDung: 'Các bạn xem kế hoạch chi tiết môn CSDL đính kèm bên dưới.', thoiGian: '05/03/2026 · 07:30', ghimLai: true, fileDinhKem: [{ tenFile: 'KeHoach_CSDL_HK2.pdf', dungLuong: '1.1 MB' }] },
    ],
    danhSachSV: [
      { maSo: 'DH52300086', hoTen: 'Trần Quốc Anh',  nhom: 'Nhóm 3', laNhomTruong: false, bg: '#e6f1fb', color: '#185fa5', kyHieu: 'QA' },
      { maSo: 'DH52300591', hoTen: 'Võ Văn Hoài',    nhom: 'Nhóm 3', laNhomTruong: true,  bg: '#faeeda', color: '#854f0b', kyHieu: 'VH' },
    ],
  },
  3: {
    maLop: 3, maLopHoc: 'MMT_03', tenLop: 'Mạng máy tính',
    tenGV: 'Lê Hồng C', emailGV: 'gv003@stu.edu.vn',
    thoiGianHoc: 'Thứ 7 · 07:30 – 11:30',
    ngayBatDau: '07/03/2026', ngayKetThuc: '27/06/2026',
    tenHocKy: 'Học kỳ 2 2025-2026', soSinhVien: 35, soNhom: 9, tienDo: 40,
    mauSac: '#ef9f27',
    thongBao: [
      { id: 1, tieuDe: 'Phân công nhóm môn MMT', noiDung: 'Danh sách nhóm đã được chốt. Các bạn kiểm tra và phản hồi nếu có sai sót trước 10/03.', thoiGian: '07/03/2026 · 08:00', ghimLai: false, fileDinhKem: [] },
    ],
    danhSachSV: [
      { maSo: 'DH52300086', hoTen: 'Trần Quốc Anh', nhom: 'Nhóm 5', laNhomTruong: false, bg: '#e6f1fb', color: '#185fa5', kyHieu: 'QA' },
    ],
  },
};

// ============================================================
// COMPONENT: Thông báo (bảng tin)
// ============================================================
function ThongBaoCard({ tb }) {
  const [expanded, setExpanded] = useState(tb.ghimLai);

  return (
    <div className={`tb-card ${tb.ghimLai ? 'tb-pinned' : ''}`}>
      <div className="tb-header" onClick={() => setExpanded(v => !v)}>
        <div className="tb-left">
          <div className="tb-icon">
            <FaBullhorn />
          </div>
          <div>
            <div className="tb-title">
              {tb.ghimLai && <span className="pin-badge">📌 Ghim</span>}
              {tb.tieuDe}
            </div>
            <div className="tb-time">{tb.thoiGian}</div>
          </div>
        </div>
        <button className="tb-toggle">
          {expanded ? <FaChevronUp /> : <FaChevronDown />}
        </button>
      </div>

      {expanded && (
        <div className="tb-body">
          <p className="tb-content">{tb.noiDung}</p>
          {tb.fileDinhKem.length > 0 && (
            <div className="tb-files">
              {tb.fileDinhKem.map((f, i) => (
                <div key={i} className="tb-file">
                  📄 {f.tenFile} &nbsp;·&nbsp; {f.dungLuong}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ============================================================
// COMPONENT: Hàng sinh viên
// ============================================================
function SinhVienRow({ sv }) {
  return (
    <div className="sv-row">
      <div className="sv-av" style={{ background: sv.bg, color: sv.color }}>
        {sv.kyHieu}
      </div>
      <div className="sv-info">
        <div className="sv-name">{sv.hoTen}</div>
        <div className="sv-code">{sv.maSo}</div>
      </div>
      <div className="sv-right">
        <span className="sv-nhom">{sv.nhom}</span>
        {sv.laNhomTruong && (
          <span className="sv-leader-badge">Nhóm trưởng</span>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MAIN COMPONENT
// ============================================================
const StudentClassDetail = () => {
  const { maLop } = useParams();          // Lấy từ URL: /student/classes/:maLop
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState('bangtIn'); // 'bangTin' | 'thanhVien'

  // Tìm dữ liệu lớp theo maLop từ URL
  const lopHoc = mockClassData[parseInt(maLop)];

  // Trường hợp maLop không hợp lệ
  if (!lopHoc) {
    return (
      <div className="cd-wrap">
        <div className="cd-not-found">
          <p>Không tìm thấy lớp học.</p>
          <button className="cd-back-btn" onClick={() => navigate('/student/classes')}>
            ← Quay lại
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="cd-wrap">
      {/* BANNER ĐẦU TRANG */}
      <div className="cd-banner" style={{ background: `linear-gradient(135deg, ${lopHoc.mauSac}dd, ${lopHoc.mauSac}88)` }}>
        <button className="cd-back-btn" onClick={() => navigate('/student/classes')}>
          <FaArrowLeft /> Quay lại
        </button>
        <div className="cd-banner-content">
          <div className="cd-class-name">{lopHoc.tenLop}</div>
          <div className="cd-class-code">Mã lớp: {lopHoc.maLopHoc} &nbsp;·&nbsp; {lopHoc.tenHocKy}</div>
          <div className="cd-class-meta">
            <span>👨‍🏫 {lopHoc.tenGV}</span>
            <span>📅 {lopHoc.thoiGianHoc}</span>
            <span>👥 {lopHoc.soSinhVien} sinh viên &nbsp;·&nbsp; {lopHoc.soNhom} nhóm</span>
          </div>
        </div>

        {/* Thanh tiến độ */}
        <div className="cd-progress-wrap">
          <div className="cd-progress-label">
            Tiến độ môn học &nbsp;
            <strong>{lopHoc.tienDo}%</strong>
          </div>
          <div className="cd-pbar">
            <div className="cd-pfill" style={{ width: `${lopHoc.tienDo}%` }} />
          </div>
        </div>
      </div>

      {/* TAB BAR */}
      <div className="cd-tab-bar">
        <button
          className={`cd-tab ${activeTab === 'bangTin' ? 'active' : ''}`}
          onClick={() => setActiveTab('bangTin')}
        >
          <FaBullhorn style={{ marginRight: 6 }} /> Bảng tin
        </button>
        <button
          className={`cd-tab ${activeTab === 'thanhVien' ? 'active' : ''}`}
          onClick={() => setActiveTab('thanhVien')}
        >
          <FaUsers style={{ marginRight: 6 }} /> Thành viên ({lopHoc.soSinhVien})
        </button>
      </div>

      <div className="cd-body">
        {/* ── TAB BẢNG TIN ── */}
        {activeTab === 'bangTin' && (
          <div className="cd-feed">
            {/* Thông tin giảng viên nhỏ bên cạnh */}
            <div className="cd-sidebar">
              <div className="cd-info-card">
                <div className="cd-info-title">Thông tin lớp</div>
                <div className="cd-info-row"><span>Giảng viên</span><span>{lopHoc.tenGV}</span></div>
                <div className="cd-info-row"><span>Email GV</span><span>{lopHoc.emailGV}</span></div>
                <div className="cd-info-row"><span>Lịch học</span><span>{lopHoc.thoiGianHoc}</span></div>
                <div className="cd-info-row"><span>Bắt đầu</span><span>{lopHoc.ngayBatDau}</span></div>
                <div className="cd-info-row"><span>Kết thúc</span><span>{lopHoc.ngayKetThuc}</span></div>
              </div>
            </div>

            {/* Danh sách thông báo */}
            <div className="cd-main-feed">
              {lopHoc.thongBao.length === 0 ? (
                <div className="cd-empty">Chưa có thông báo nào từ giảng viên.</div>
              ) : (
                lopHoc.thongBao.map(tb => <ThongBaoCard key={tb.id} tb={tb} />)
              )}
            </div>
          </div>
        )}

        {/* ── TAB THÀNH VIÊN ── */}
        {activeTab === 'thanhVien' && (
          <div className="cd-members">
            <div className="cd-members-header">
              <span className="cd-members-title">Danh sách sinh viên</span>
              <span className="cd-members-count">{lopHoc.danhSachSV.length} / {lopHoc.soSinhVien} hiển thị</span>
            </div>
            <div className="cd-members-list">
              {lopHoc.danhSachSV.map((sv, i) => (
                <SinhVienRow key={i} sv={sv} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentClassDetail;