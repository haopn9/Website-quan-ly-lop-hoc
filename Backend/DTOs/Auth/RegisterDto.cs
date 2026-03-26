namespace Backend.DTOs.Auth;

public class RegisterDto
{
    public string Username { get; set; } = null!;
    public string Password { get; set; } = null!;
    public string FullName { get; set; } = null!;
    public string? Email { get; set; }
    public string? UserCode { get; set; }
    public int RoleId { get; set; } = 3; // Role student là mặc đinh (3)
}
