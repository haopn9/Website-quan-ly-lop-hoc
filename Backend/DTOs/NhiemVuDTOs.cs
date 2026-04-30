using System;

namespace Backend.DTOs;

public class NhiemVuCreateUpdateDto
{
    public int MaNhom { get; set; }
    public int? MaDeTai { get; set; }
    public string TenNhiemVu { get; set; } = null!;
    public string? MoTa { get; set; }
    public DateTime? NgayBatDau { get; set; }
    public DateTime? HanHoanThanh { get; set; }
    public string? MucDoUuTien { get; set; }
    public string? TrangThai { get; set; }
    public int? PhanTramHoanThanh { get; set; }
}
