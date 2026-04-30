using System;

namespace Backend.DTOs;

public class TepDinhKemCreateUpdateDto
{
    public int? MaTinNhan { get; set; }
    public int? MaNhiemVu { get; set; }
    public int? MaDeTai { get; set; }
    public string TenTep { get; set; } = null!;
    public string DuongDanTep { get; set; } = null!;
    public int? DungLuong { get; set; }
    public int? MaNguoiUpload { get; set; }
    public DateTime? NgayUpload { get; set; }
}
