using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class LopHocController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public LopHocController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    // Lấy danh sách tất cả lớp
    [HttpGet]
    public async Task<IActionResult> DanhSachLop()
    {
        var danhSach = await _db.LopHocs
            .Include(l => l.MaGiangVienNavigation)
            .Select(l => new
            {
                l.MaLop,
                l.TenLop,
                l.MaLopHoc,
                giangVien = l.MaGiangVienNavigation.HoTen
            })
            .ToListAsync();

        return Ok(danhSach);
    }

    // Tạo lớp mới
    [HttpPost]
    public async Task<IActionResult> TaoLop([FromBody] TaoLopDto dto)
    {
        var lopMoi = new LopHoc
        {
            TenLop = dto.TenLop,
            MaLopHoc = dto.MaLopHoc,
            MaGiangVien = dto.MaGiangVien,
            MaHocKy = dto.MaHocKy
        };

        _db.LopHocs.Add(lopMoi);
        await _db.SaveChangesAsync();

        return Ok(new { thongBao = "Tạo lớp thành công", maLop = lopMoi.MaLop });
    }
}

public class TaoLopDto
{
    public string TenLop { get; set; } = "";
    public string MaLopHoc { get; set; } = "";
    public int MaGiangVien { get; set; }
    public int MaHocKy { get; set; }
}