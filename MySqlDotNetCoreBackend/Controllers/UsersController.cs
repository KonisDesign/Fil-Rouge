using BCrypt.Net;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using MySqlDotNetCoreBackend.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace MySqlDotNetCoreBackend.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;
        private readonly IConfiguration _configuration;

        public UsersController(UserContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        // GET: api/Users
        [HttpGet]
        public ActionResult<IEnumerable<User>> GetUsers()
        {
            return _context.Users.ToList();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public ActionResult<User> GetUser(int id)
        {
            var user = _context.Users.Find(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users/register
        [HttpPost("register")]
        public ActionResult<User> PostUser(User user)
        {
            try
            {
                // Hash the password
                user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

                _context.Users.Add(user);
                _context.SaveChanges();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return CreatedAtAction("GetUser", new { id = user.Id }, user);
        }

        [HttpPost("login")]
public ActionResult<User> Login(User user)
{
    try
    {
        var foundUser = _context.Users.SingleOrDefault(x => x.Email == user.Email);

        if (foundUser == null || !BCrypt.Net.BCrypt.Verify(user.Password, foundUser.Password))
        {
            return Unauthorized();
        }

        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.ASCII.GetBytes(_configuration["JwtConfig:JwtKey"]);  
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, foundUser.Firstname), // use the found user's name instead
                new Claim(ClaimTypes.Email, foundUser.Email), // include the email as wel
                new Claim(ClaimTypes.Role, foundUser.Role)
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
        };
        var token = tokenHandler.CreateToken(tokenDescriptor);

        return Ok(new
        {
            token = tokenHandler.WriteToken(token)
        });
    }
    catch (Exception ex)
    {
        return BadRequest(ex.Message);
    }
}





        // PUT: api/Users/5
        [HttpPut("{id}")]
        public IActionResult PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            // Hash the new password before saving it
            user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password);

            _context.Entry(user).State = EntityState.Modified;
            _context.SaveChanges();

            return NoContent();
        }

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            _context.SaveChanges();

            return NoContent();
        }
    }

}
