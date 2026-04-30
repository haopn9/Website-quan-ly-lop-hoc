using Backend.Models;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class NhiemVuController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public NhiemVuController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _db.NhiemVus.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(await _db.NhiemVus.ToListAsync());
            }

            var searchKeyword = id.ToLower().Trim();

            if (int.TryParse(id, out int maNhiemVu))
            {
                var nhiemVu = await _db.NhiemVus.FindAsync(maNhiemVu);
                if (nhiemVu != null)
                {
                    return Ok(new[] { nhiemVu });
                }
            }

            var results = await _db.NhiemVus
                .Where(n => n.TenNhiemVu.ToLower().Contains(searchKeyword))
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(NhiemVuCreateUpdateDto dto)
    {
        try
        {
            if (dto.MaNhom <= 0 || string.IsNullOrWhiteSpace(dto.TenNhiemVu))
            {
                return BadRequest(new { message = "MaNhom và TenNhiemVu là bắt buộc" });
            }

            var nhom = await _db.Nhoms.FindAsync(dto.MaNhom);
            if (nhom == null)
            {
                return BadRequest(new { message = "Nhóm không tồn tại" });
            }

            if (dto.MaDeTai.HasValue)
            {
                var deTai = await _db.DeTais.FindAsync(dto.MaDeTai.Value);
                if (deTai == null)
                {
                    return BadRequest(new { message = "Đề tài tham chiếu không tồn tại" });
                }
            }

            var nhiemVu = new NhiemVu
            {
                MaNhom = dto.MaNhom,
                MaDeTai = dto.MaDeTai,
                TenNhiemVu = dto.TenNhiemVu.Trim(),
                MoTa = dto.MoTa?.Trim(),
                NgayBatDau = dto.NgayBatDau,
                HanHoanThanh = dto.HanHoanThanh,
                MucDoUuTien = dto.MucDoUuTien?.Trim(),
                TrangThai = dto.TrangThai?.Trim(),
                PhanTramHoanThanh = dto.PhanTramHoanThanh,
                NgayTao = DateTime.Now
            };

            _db.NhiemVus.Add(nhiemVu);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = nhiemVu.MaNhiemVu.ToString() }, nhiemVu);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm nhiệm vụ: " + ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, NhiemVuCreateUpdateDto dto)
    {
        try
        {
            var nhiemVu = await _db.NhiemVus.FindAsync(id);
            if (nhiemVu == null)
            {
                return NotFound(new { message = "Nhiệm vụ không tồn tại" });
            }

            if (dto.MaNhom <= 0 || string.IsNullOrWhiteSpace(dto.TenNhiemVu))
            {
                return BadRequest(new { message = "MaNhom và TenNhiemVu là bắt buộc" });
            }

            var nhom = await _db.Nhoms.FindAsync(dto.MaNhom);
            if (nhom == null)
            {
                return BadRequest(new { message = "Nhóm không tồn tại" });
            }

            if (dto.MaDeTai.HasValue)
            {
                var deTai = await _db.DeTais.FindAsync(dto.MaDeTai.Value);
                if (deTai == null)
                {
                    return BadRequest(new { message = "Đề tài tham chiếu không tồn tại" });
                }
            }

            nhiemVu.MaNhom = dto.MaNhom;
            nhiemVu.MaDeTai = dto.MaDeTai;
            nhiemVu.TenNhiemVu = dto.TenNhiemVu.Trim();
            nhiemVu.MoTa = dto.MoTa?.Trim() ?? nhiemVu.MoTa;
            nhiemVu.NgayBatDau = dto.NgayBatDau ?? nhiemVu.NgayBatDau;
            nhiemVu.HanHoanThanh = dto.HanHoanThanh ?? nhiemVu.HanHoanThanh;
            nhiemVu.MucDoUuTien = dto.MucDoUuTien?.Trim() ?? nhiemVu.MucDoUuTien;
            nhiemVu.TrangThai = dto.TrangThai?.Trim() ?? nhiemVu.TrangThai;
            nhiemVu.PhanTramHoanThanh = dto.PhanTramHoanThanh ?? nhiemVu.PhanTramHoanThanh;

            _db.NhiemVus.Update(nhiemVu);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cập nhật nhiệm vụ thành công", data = nhiemVu });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật nhiệm vụ: " + ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var nhiemVu = await _db.NhiemVus.FindAsync(id);
            if (nhiemVu == null)
            {
                return NotFound(new { message = "Nhiệm vụ không tồn tại" });
            }

            _db.NhiemVus.Remove(nhiemVu);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Xóa nhiệm vụ thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa nhiệm vụ: " + ex.Message });
        }
    }
}
