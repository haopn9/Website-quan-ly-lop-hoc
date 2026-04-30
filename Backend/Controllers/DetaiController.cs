using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.DTOs;
using System.Linq;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DetaiController : ControllerBase
    {
        private readonly QuanLyLopHocDbContext _context;

        public DetaiController(QuanLyLopHocDbContext context)
        {
            _context = context;
        }

        // GET: api/Detai - Lấy tất cả đề tài
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await _context.DeTais.ToListAsync());
        }

        // GET: api/Detai/{id} - Tìm kiếm đề tài theo mã hoặc tên
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            try
            {
                // Nếu để trống thì return tất cả
                if (string.IsNullOrWhiteSpace(id))
                {
                    return Ok(await _context.DeTais.ToListAsync());
                }

                var searchKeyword = id.ToLower().Trim();

                // Kiểm tra nếu id là số thì tìm theo MaDeTai
                if (int.TryParse(id, out int maDeTai))
                {
                    var deTai = await _context.DeTais.FindAsync(maDeTai);
                    if (deTai != null)
                    {
                        return Ok(new[] { deTai });
                    }
                }

                // Tìm kiếm theo TenDeTai
                var results = await _context.DeTais
                    .Where(d => d.TenDeTai.ToLower().Contains(searchKeyword))
                    .ToListAsync();

                // Return results (empty array nếu không tìm thấy)
                return Ok(results);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi tìm kiếm: " + ex.Message });
            }
        }

        // POST: api/Detai - Thêm đề tài mới
        [HttpPost]
        public async Task<IActionResult> Create(DetaiCreateUpdateDto dto)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(dto.TenDeTai))
                {
                    return BadRequest(new { message = "Tên đề tài không được để trống" });
                }

                // Kiểm tra MaLop tồn tại
                var lopHoc = await _context.LopHocs.FindAsync(dto.MaLop);
                if (lopHoc == null)
                {
                    return BadRequest(new { message = "Lớp học không tồn tại" });
                }

                var deTai = new DeTai
                {
                    TenDeTai = dto.TenDeTai.Trim(),
                    MoTa = dto.MoTa?.Trim(),
                    SanPhamKyVong = dto.SanPhamKyVong?.Trim(),
                    MaLop = dto.MaLop,
                    NgayBatDau = dto.NgayBatDau,
                    NgayKetThuc = dto.NgayKetThuc,
                    NgayTao = DateTime.Now
                };

                _context.DeTais.Add(deTai);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetById), new { id = deTai.MaDeTai.ToString() }, deTai);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi thêm đề tài: " + ex.Message });
            }
        }

        // PUT: api/Detai/{id} - Sửa đề tài
        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, DetaiCreateUpdateDto dto)
        {
            try
            {
                // Validate input
                if (string.IsNullOrWhiteSpace(dto.TenDeTai))
                {
                    return BadRequest(new { message = "Tên đề tài không được để trống" });
                }

                var deTai = await _context.DeTais.FindAsync(id);
                if (deTai == null)
                {
                    return NotFound(new { message = "Đề tài không tồn tại" });
                }

                // Kiểm tra MaLop tồn tại
                var lopHoc = await _context.LopHocs.FindAsync(dto.MaLop);
                if (lopHoc == null)
                {
                    return BadRequest(new { message = "Lớp học không tồn tại" });
                }

                deTai.TenDeTai = dto.TenDeTai.Trim();
                deTai.MoTa = dto.MoTa?.Trim() ?? deTai.MoTa;
                deTai.SanPhamKyVong = dto.SanPhamKyVong?.Trim() ?? deTai.SanPhamKyVong;
                deTai.MaLop = dto.MaLop;
                deTai.NgayBatDau = dto.NgayBatDau ?? deTai.NgayBatDau;
                deTai.NgayKetThuc = dto.NgayKetThuc ?? deTai.NgayKetThuc;

                _context.DeTais.Update(deTai);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Cập nhật đề tài thành công", data = deTai });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi cập nhật đề tài: " + ex.Message });
            }
        }

        // DELETE: api/Detai/{id} - Xóa đề tài
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var deTai = await _context.DeTais.FindAsync(id);
                if (deTai == null)
                {
                    return NotFound(new { message = "Đề tài không tồn tại" });
                }

                _context.DeTais.Remove(deTai);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Xóa đề tài thành công" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { message = "Lỗi khi xóa đề tài: " + ex.Message });
            }
        }
    }
}