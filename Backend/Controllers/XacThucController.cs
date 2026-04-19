using Backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _db;
    private readonly IConfiguration _config;

    public AuthController(QuanLyLopHocDbContext db, IConfiguration config)
    {
        _db = db;
        _config = config;
    }

    // POST api/auth/login
    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginDto dto)
    {
        var user = await _db.NguoiDungs
            .Include(u => u.MaVaiTroNavigation)
            .FirstOrDefaultAsync(u => u.TenDangNhap == dto.TenDangNhap
                                   && u.DangHoatDong == true);

        if (user == null || user.MatKhauHash != dto.MatKhau)
            return Unauthorized(new { message = "Sai tài khoản hoặc mật khẩu" });

        var token = TaoToken(user);

        return Ok(new
        {
            token,
            maNguoiDung = user.MaNguoiDung,
            hoTen = user.HoTen,
            vaiTro = user.MaVaiTroNavigation?.TenVaiTro,
            maVaiTro = user.MaVaiTro
        });
    }

    private string TaoToken(NguoiDung user)
    {
        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_config["AppSettings:Token"]!));

        var claims = new[]
        {
            new Claim("maNguoiDung", user.MaNguoiDung.ToString()),
            new Claim("vaiTro",      user.MaVaiTro.ToString()),
            new Claim(ClaimTypes.Name, user.TenDangNhap)
        };

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddHours(24),
            signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256));

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}

// DTO đặt luôn ở đây cho tiện
public class LoginDto
{
    public string TenDangNhap { get; set; } = "";
    public string MatKhau { get; set; } = "";
}