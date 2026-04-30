using Backend.Models;
using Backend.DTOs;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class DiemSoController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;

    public DiemSoController(QuanLyLopHocDbContext db)
    {
        _db = db;
    }

    [HttpGet]
    public async Task<IActionResult> Get()
    {
        return Ok(await _db.DiemSos.ToListAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(string id)
    {
        try
        {
            if (string.IsNullOrWhiteSpace(id))
            {
                return Ok(await _db.DiemSos.ToListAsync());
            }

            var searchKeyword = id.ToLower().Trim();

            if (int.TryParse(id, out int maDiem))
            {
                var diem = await _db.DiemSos.FindAsync(maDiem);
                if (diem != null)
                {
                    return Ok(new[] { diem });
                }
            }

            var results = await _db.DiemSos
                .Where(d => d.NhanXet != null && d.NhanXet.ToLower().Contains(searchKeyword))
                .ToListAsync();

            return Ok(results);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
        }
    }

    [HttpPost]
    public async Task<IActionResult> Create(DiemSoCreateUpdateDto dto)
    {
        try
        {
            if (dto.MaSinhVien <= 0 || dto.MaNhom <= 0 || dto.MaLop <= 0 || dto.MaGiangVien <= 0)
            {
                return BadRequest(new { message = "MaSinhVien, MaNhom, MaLop và MaGiangVien phải lớn hơn 0" });
            }

            var sinhVien = await _db.NguoiDungs.FindAsync(dto.MaSinhVien);
            var giangVien = await _db.NguoiDungs.FindAsync(dto.MaGiangVien);
            var lopHoc = await _db.LopHocs.FindAsync(dto.MaLop);
            var nhom = await _db.Nhoms.FindAsync(dto.MaNhom);

            if (sinhVien == null || giangVien == null || lopHoc == null || nhom == null)
            {
                return BadRequest(new { message = "Thông tin tham chiếu không hợp lệ" });
            }

            var diemSo = new DiemSo
            {
                MaSinhVien = dto.MaSinhVien,
                MaNhom = dto.MaNhom,
                MaLop = dto.MaLop,
                DiemNhom = dto.DiemNhom,
                DiemCaNhan = dto.DiemCaNhan,
                NhanXet = dto.NhanXet?.Trim(),
                MaGiangVien = dto.MaGiangVien,
                NgayCham = dto.NgayCham
            };

            _db.DiemSos.Add(diemSo);
            await _db.SaveChangesAsync();

            return CreatedAtAction(nameof(GetById), new { id = diemSo.MaDiem.ToString() }, diemSo);
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi thêm điểm số: " + ex.Message });
        }
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, DiemSoCreateUpdateDto dto)
    {
        try
        {
            var diemSo = await _db.DiemSos.FindAsync(id);
            if (diemSo == null)
            {
                return NotFound(new { message = "Điểm số không tồn tại" });
            }

            if (dto.MaSinhVien <= 0 || dto.MaNhom <= 0 || dto.MaLop <= 0 || dto.MaGiangVien <= 0)
            {
                return BadRequest(new { message = "MaSinhVien, MaNhom, MaLop và MaGiangVien phải lớn hơn 0" });
            }

            var sinhVien = await _db.NguoiDungs.FindAsync(dto.MaSinhVien);
            var giangVien = await _db.NguoiDungs.FindAsync(dto.MaGiangVien);
            var lopHoc = await _db.LopHocs.FindAsync(dto.MaLop);
            var nhom = await _db.Nhoms.FindAsync(dto.MaNhom);

            if (sinhVien == null || giangVien == null || lopHoc == null || nhom == null)
            {
                return BadRequest(new { message = "Thông tin tham chiếu không hợp lệ" });
            }

            diemSo.MaSinhVien = dto.MaSinhVien;
            diemSo.MaNhom = dto.MaNhom;
            diemSo.MaLop = dto.MaLop;
            diemSo.DiemNhom = dto.DiemNhom ?? diemSo.DiemNhom;
            diemSo.DiemCaNhan = dto.DiemCaNhan ?? diemSo.DiemCaNhan;
            diemSo.NhanXet = dto.NhanXet?.Trim() ?? diemSo.NhanXet;
            diemSo.MaGiangVien = dto.MaGiangVien;
            diemSo.NgayCham = dto.NgayCham ?? diemSo.NgayCham;

            _db.DiemSos.Update(diemSo);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Cập nhật điểm số thành công", data = diemSo });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi cập nhật điểm số: " + ex.Message });
        }
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            var diemSo = await _db.DiemSos.FindAsync(id);
            if (diemSo == null)
            {
                return NotFound(new { message = "Điểm số không tồn tại" });
            }

            _db.DiemSos.Remove(diemSo);
            await _db.SaveChangesAsync();

            return Ok(new { message = "Xóa điểm số thành công" });
        }
        catch (Exception ex)
        {
            return StatusCode(500, new { message = "Lỗi khi xóa điểm số: " + ex.Message });
        }
    }
}
