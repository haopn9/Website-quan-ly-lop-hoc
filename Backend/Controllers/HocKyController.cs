using Backend.Models;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HocKyController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public HocKyController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _db.HocKies.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(await _db.HocKies.ToListAsync());
            }

            var searchKeyword = id.ToLower().Trim();

            if (int.TryParse(id, out int maHocKy))
            {
                var hocKy = await _db.HocKies.FindAsync(maHocKy);
                if (hocKy != null)
                {
                    return Ok(new[] { hocKy });
                }
            }

            var results = await _db.HocKies
                .Where(h => h.TenHocKy.ToLower().Contains(searchKeyword))
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(HocKyCreateUpdateDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.TenHocKy))
            {
                return BadRequest(new { message = "Tên học kỳ không được để trống" });
            }

            var hocKy = new HocKy
            {
                TenHocKy = dto.TenHocKy.Trim(),
                NgayBatDau = dto.NgayBatDau,
                NgayKetThuc = dto.NgayKetThuc,
                LaHienTai = dto.LaHienTai
            };

            _db.HocKies.Add(hocKy);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = hocKy.MaHocKy.ToString() }, hocKy);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm học kỳ: " + ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, HocKyCreateUpdateDto dto)
    {
        try
        {
            var hocKy = await _db.HocKies.FindAsync(id);
            if (hocKy == null)
            {
                return NotFound(new { message = "Học kỳ không tồn tại" });
            }

            if (string.IsNullOrWhiteSpace(dto.TenHocKy))
            {
                return BadRequest(new { message = "Tên học kỳ không được để trống" });
            }

            hocKy.TenHocKy = dto.TenHocKy.Trim();
            hocKy.NgayBatDau = dto.NgayBatDau ?? hocKy.NgayBatDau;
            hocKy.NgayKetThuc = dto.NgayKetThuc ?? hocKy.NgayKetThuc;
            hocKy.LaHienTai = dto.LaHienTai ?? hocKy.LaHienTai;

            _db.HocKies.Update(hocKy);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cập nhật học kỳ thành công", data = hocKy });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật học kỳ: " + ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var hocKy = await _db.HocKies.FindAsync(id);
            if (hocKy == null)
            {
                return NotFound(new { message = "Học kỳ không tồn tại" });
            }

            _db.HocKies.Remove(hocKy);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Xóa học kỳ thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa học kỳ: " + ex.Message });
        }
    }
}
