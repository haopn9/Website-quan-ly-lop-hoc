using System;

namespace Backend.DTOs;

public class DiemSoCreateUpdateDto
{
    public int MaSinhVien { get; set; }
    public int MaNhom { get; set; }
    public int MaLop { get; set; }
    public decimal? DiemNhom { get; set; }
    public decimal? DiemCaNhan { get; set; }
    public string? NhanXet { get; set; }
    public int MaGiangVien { get; set; }
    public DateTime? NgayCham { get; set; }
}
