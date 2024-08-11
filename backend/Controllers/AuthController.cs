using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Data;

[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly LibraryContext _context;
    private readonly IConfiguration _configuration;

    public AuthController(LibraryContext context, IConfiguration configuration)
    {
        _context = context;
        _configuration = configuration;
    }

    [HttpPost("signup")]
    public async Task<IActionResult> SignUp(User user)
    {
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);
        _context.Set<User>().Add(user);
        await _context.SaveChangesAsync();
        return Ok(new { message = "User registered successfully" });
    }

    [HttpPost("signin")]
    public async Task<IActionResult> SignIn(User user)
    {
        var dbUser = await _context.Set<User>().FirstOrDefaultAsync(u => u.Username == user.Username);
        if (dbUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, dbUser.Password))
        {
            return Unauthorized();
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JwtConfig:Secret"]);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, dbUser.Username)
            }),
            Expires = DateTime.UtcNow.AddDays(7),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return Ok(new { token = tokenHandler.WriteToken(token) });
    }
}