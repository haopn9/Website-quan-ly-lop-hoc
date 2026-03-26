using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Backend.Models;
using Backend.DTOs.Auth;

namespace Backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly QuanLyLopHocDbContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(QuanLyLopHocDbContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register(RegisterDto request)
    {
        if (await _context.Users.AnyAsync(u => u.Username == request.Username))
        {
            return BadRequest("Tên ??ng nh?p ?ã t?n t?i.");
        }

        var passwordHash = HashPassword(request.Password);

        var newUser = new User
        {
            Username = request.Username,
            PasswordHash = passwordHash,
            FullName = request.FullName,
            Email = request.Email,
            UserCode = request.UserCode,
            RoleId = request.RoleId > 0 ? request.RoleId : 3 // Ensure positive role
        };

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        return Ok("??ng ký thành công!");
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login(LoginDto request)
    {
        var user = await _context.Users
            .Include(u => u.Role)
            .FirstOrDefaultAsync(u => u.Username == request.Username);

        if (user == null || !VerifyPassword(request.Password, user.PasswordHash))
        {
            return Unauthorized("Tên ??ng nh?p ho?c m?t kh?u không chính xác.");
        }

        string token = CreateToken(user);

        return Ok(new
        {
            Token = token,
            User = new
            {
                user.UserId,
                user.Username,
                user.FullName,
                RoleName = user.Role?.RoleName
            }
        });
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.Role?.RoleName ?? "Student")
        };

        var secretKey = _configuration["AppSettings:Token"] ?? "my-super-secret-key-that-is-very-long-and-secure!";
        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256Signature);

        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.Now.AddDays(1),
            SigningCredentials = creds
        };

        var tokenHandler = new JwtSecurityTokenHandler();
        var token = tokenHandler.CreateToken(tokenDescriptor);
        
        return tokenHandler.WriteToken(token);
    }

    // Mã hóa m?t kh?u (??n gi?n hóa cho ?? án)
    private string HashPassword(string password)
    {
        using var sha256 = SHA256.Create();
        var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
        return Convert.ToBase64String(bytes);
    }

    // Ki?m tra m?t kh?u
    private bool VerifyPassword(string enteredPassword, string storedHash)
    {
        return HashPassword(enteredPassword) == storedHash;
    }
}
