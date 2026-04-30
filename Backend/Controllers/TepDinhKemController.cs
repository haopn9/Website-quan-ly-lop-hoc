using Backend.Models;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TepDinhKemController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public TepDinhKemController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _db.TepDinhKems.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(await _db.TepDinhKems.ToListAsync());
            }

            var searchKeyword = id.ToLower().Trim();

            if (int.TryParse(id, out int maTep))
            {
                var tep = await _db.TepDinhKems.FindAsync(maTep);
                if (tep != null)
                {
                    return Ok(new[] { tep });
                }
            }

            var results = await _db.TepDinhKems
                .Where(t => t.TenTep.ToLower().Contains(searchKeyword))
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(TepDinhKemCreateUpdateDto dto)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(dto.TenTep) || string.IsNullOrWhiteSpace(dto.DuongDanTep))
            {
                return BadRequest(new { message = "TenTep và DuongDanTep là bắt buộc" });
            }

            if (dto.MaTinNhan.HasValue)
            {
                var tinNhan = await _db.TinNhans.FindAsync(dto.MaTinNhan.Value);
                if (tinNhan == null)
                {
                    return BadRequest(new { message = "Tin nhắn tham chiếu không tồn tại" });
                }
            }

            if (dto.MaNhiemVu.HasValue)
            {
                var nhiemVu = await _db.NhiemVus.FindAsync(dto.MaNhiemVu.Value);
                if (nhiemVu == null)
                {
                    return BadRequest(new { message = "Nhiệm vụ tham chiếu không tồn tại" });
                }
            }

            if (dto.MaDeTai.HasValue)
            {
                var deTai = await _db.DeTais.FindAsync(dto.MaDeTai.Value);
                if (deTai == null)
                {
                    return BadRequest(new { message = "Đề tài tham chiếu không tồn tại" });
                }
            }

            if (dto.MaNguoiUpload.HasValue)
            {
                var nguoiDung = await _db.NguoiDungs.FindAsync(dto.MaNguoiUpload.Value);
                if (nguoiDung == null)
                {
                    return BadRequest(new { message = "Người upload tham chiếu không tồn tại" });
                }
            }

            var tep = new TepDinhKem
            {
                MaTinNhan = dto.MaTinNhan,
                MaNhiemVu = dto.MaNhiemVu,
                MaDeTai = dto.MaDeTai,
                TenTep = dto.TenTep.Trim(),
                DuongDanTep = dto.DuongDanTep.Trim(),
                DungLuong = dto.DungLuong,
                MaNguoiUpload = dto.MaNguoiUpload,
                NgayUpload = dto.NgayUpload ?? DateTime.Now
            };

            _db.TepDinhKems.Add(tep);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = tep.MaTep.ToString() }, tep);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm tệp đính kèm: " + ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, TepDinhKemCreateUpdateDto dto)
    {
        try
        {
            var tep = await _db.TepDinhKems.FindAsync(id);
            if (tep == null)
            {
                return NotFound(new { message = "Tệp đính kèm không tồn tại" });
            }

            if (string.IsNullOrWhiteSpace(dto.TenTep) || string.IsNullOrWhiteSpace(dto.DuongDanTep))
            {
                return BadRequest(new { message = "TenTep và DuongDanTep là bắt buộc" });
            }

            if (dto.MaTinNhan.HasValue)
            {
                var tinNhan = await _db.TinNhans.FindAsync(dto.MaTinNhan.Value);
                if (tinNhan == null)
                {
                    return BadRequest(new { message = "Tin nhắn tham chiếu không tồn tại" });
                }
            }

            if (dto.MaNhiemVu.HasValue)
            {
                var nhiemVu = await _db.NhiemVus.FindAsync(dto.MaNhiemVu.Value);
                if (nhiemVu == null)
                {
                    return BadRequest(new { message = "Nhiệm vụ tham chiếu không tồn tại" });
                }
            }

            if (dto.MaDeTai.HasValue)
            {
                var deTai = await _db.DeTais.FindAsync(dto.MaDeTai.Value);
                if (deTai == null)
                {
                    return BadRequest(new { message = "Đề tài tham chiếu không tồn tại" });
                }
            }

            if (dto.MaNguoiUpload.HasValue)
            {
                var nguoiDung = await _db.NguoiDungs.FindAsync(dto.MaNguoiUpload.Value);
                if (nguoiDung == null)
                {
                    return BadRequest(new { message = "Người upload tham chiếu không tồn tại" });
                }
            }

            tep.MaTinNhan = dto.MaTinNhan;
            tep.MaNhiemVu = dto.MaNhiemVu;
            tep.MaDeTai = dto.MaDeTai;
            tep.TenTep = dto.TenTep.Trim();
            tep.DuongDanTep = dto.DuongDanTep.Trim();
            tep.DungLuong = dto.DungLuong ?? tep.DungLuong;
            tep.MaNguoiUpload = dto.MaNguoiUpload;
            tep.NgayUpload = dto.NgayUpload ?? tep.NgayUpload;

            _db.TepDinhKems.Update(tep);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cập nhật tệp đính kèm thành công", data = tep });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật tệp đính kèm: " + ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var tep = await _db.TepDinhKems.FindAsync(id);
            if (tep == null)
            {
                return NotFound(new { message = "Tệp đính kèm không tồn tại" });
            }

            _db.TepDinhKems.Remove(tep);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Xóa tệp đính kèm thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa tệp đính kèm: " + ex.Message });
        }
    }
}
