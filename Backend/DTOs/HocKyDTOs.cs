using System;

namespace Backend.DTOs;

public class HocKyCreateUpdateDto
{
    public string TenHocKy { get; set; } = null!;
    public DateOnly? NgayBatDau { get; set; }
    public DateOnly? NgayKetThuc { get; set; }
    public bool? LaHienTai { get; set; }
}
