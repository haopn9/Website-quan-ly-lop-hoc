using System;

namespace Backend.DTOs;

public class DetaiCreateUpdateDto
{
    public string TenDeTai { get; set; } = null!;
    public string? MoTa { get; set; }
    public string? SanPhamKyVong { get; set; }
    public int MaLop { get; set; }
    public DateTime? NgayBatDau { get; set; }
    public DateTime? NgayKetThuc { get; set; }
}