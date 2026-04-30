using Backend.Models;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class KhoaController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public KhoaController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _db.Khoas.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(await _db.Khoas.ToListAsync());
            }

            var searchKeyword = id.ToLower().Trim();

            if (int.TryParse(id, out int maKhoa))
            {
                var khoa = await _db.Khoas.FindAsync(maKhoa);
                if (khoa != null)
                {
                    return Ok(new[] { khoa });
                }
            }

            var results = await _db.Khoas
                .Where(k => k.TenKhoa.ToLower().Contains(searchKeyword))
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(KhoaCreateUpdateDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.TenKhoa))
            {
                return BadRequest(new { message = "Tên khoa không được để trống" });
            }

            var khoa = new Khoa
            {
                TenKhoa = dto.TenKhoa.Trim(),
                KyHieuKhoa = dto.KyHieuKhoa?.Trim()
            };

            _db.Khoas.Add(khoa);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = khoa.MaKhoa.ToString() }, khoa);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm khoa: " + ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, KhoaCreateUpdateDto dto)
    {
        try
        {
            var khoa = await _db.Khoas.FindAsync(id);
            if (khoa == null)
            {
                return NotFound(new { message = "Khoa không tồn tại" });
            }

            if (string.IsNullOrWhiteSpace(dto.TenKhoa))
            {
                return BadRequest(new { message = "Tên khoa không được để trống" });
            }

            khoa.TenKhoa = dto.TenKhoa.Trim();
            khoa.KyHieuKhoa = dto.KyHieuKhoa?.Trim() ?? khoa.KyHieuKhoa;

            _db.Khoas.Update(khoa);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cập nhật khoa thành công", data = khoa });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật khoa: " + ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var khoa = await _db.Khoas.FindAsync(id);
            if (khoa == null)
            {
                return NotFound(new { message = "Khoa không tồn tại" });
            }

            _db.Khoas.Remove(khoa);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Xóa khoa thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa khoa: " + ex.Message });
        }
    }
}
