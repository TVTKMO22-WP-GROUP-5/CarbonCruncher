using BC = BCrypt.Net.BCrypt;
using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;
        private readonly IConfiguration _configuration;

        // Database context set with dependency injection
        public UserController(CarbonCruncherContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        /// <summary>
        /// Register a user
        /// </summary>
        /// <param name="user">User object with user nick and password.</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Post /api/user/register
        ///     {
        ///        "usernick":"testguy",
        ///        "userpassword":"R4nd0mP4ssw0rd!"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">User registered succesfully</response>
        /// <response code="400">Error while registering user</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost]
        [Route("register")]
        public ActionResult<VisuUser> Register([FromBody] VisuRegLoginUser user)
        {
            try
            {
                // Check if there is already a user with given usernick
                VisuUser? existingUser = _context.VisuUsers.SingleOrDefault(u => u.UserNick.ToLower() == user.UserNick.ToLower());
                if (existingUser != null)
                {
                    return Conflict("Usernick already exists");
                }
                
                // Create registered user object with hashed password
                VisuUser regUser = new VisuUser() { UserNick = user.UserNick, UserPassHash = BC.HashPassword(user.UserPassword) };

                // Save user
                _context.VisuUsers.Add(regUser);
                _context.SaveChanges();  
                
                // Return response and user object
                return Ok(regUser);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        /// <summary>
        /// Login a user
        /// </summary>
        /// <param name="user">User object with user nick and password.</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Post /api/user/login
        ///     {
        ///        "usernick":"testguy",
        ///        "userpassword":"R4nd0mP4ssw0rd!"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">User logged in succesfully</response>
        /// <response code="401">Unauthorized login attempt</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Consumes("application/json")]
        [Produces("text/plain")]
        [HttpPost]
        [Route("login")]
        public ActionResult<string> Login([FromBody] VisuRegLoginUser user)
        {
            // Create token for user if user exists and password matches saved hash. Otherwise, return unauthorized result
            VisuUser? userDb = _context.VisuUsers.SingleOrDefault(u => u.UserNick == user.UserNick);
            if (userDb == null || !BC.Verify(user.UserPassword, userDb.UserPassHash))
            {
                return Unauthorized();
            }
            else
            {
                return Ok(CreateToken(userDb));
            }
        }

        /// <summary>
        /// Delete a user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     Delete /api/user/testguy
        ///
        /// </remarks>
        /// <response code="204">User deleted succesfully</response>
        /// <response code="401">Unauthorized delete attempt</response>
        [HttpDelete, Authorize]
        public ActionResult Delete()
        {
            // Get user identity from controllerbase User
            var currentUser = User?.Identity?.Name;
            if (currentUser is null) return BadRequest();

            // Remove currentuser and save changes
            var removeUser = _context.VisuUsers
                .Where(u => u.UserNick.ToLower().Equals(currentUser.ToLower())).FirstOrDefault();
            if (removeUser is null) return BadRequest();
            _context.VisuUsers.Remove(removeUser);
            return NoContent();
        }

        // GET: api/user/visualization
        [HttpGet, Authorize]
        [Route("visualization")]
        public IEnumerable<string> GetVisualization()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/user/visualization/:stringId
        [HttpGet, AllowAnonymous]
        [Route("visualization/{stringId}")]
        public IEnumerable<string> GetSingleVisualization(string stringId)
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/user/visualization
        [HttpPost, Authorize]
        [Route("visualization")]
        public IEnumerable<string> PostVisualization([FromBody] string value)
        {
            return new string[] { "value1", "value2" };
        }

        // DELETE api/visualization/:id
        [HttpDelete, Authorize]
        [Route("visualization/{stringId}")]
        public void DeleteVisualization(int id)
        {
        }

        /// <summary>
        /// Creates token for user
        /// </summary>
        /// <param name="user">User to generate token</param>
        /// <returns>Token string</returns>
        /// https://www.youtube.com/watch?v=UwruwHl3BlU ref video
        private string CreateToken(VisuUser user)
        {
            // Claims list holds information that we encode to token
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserNick)
            };
            
            // Secret default key token is read from secrets.json
            string defaultToken = _configuration.GetSection("Tokens:DefaultToken").Value!;
            
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(defaultToken));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                    claims: claims,
                    expires: DateTime.Now.AddDays(1),
                    signingCredentials: creds
                );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);

            return jwt;
        }
    }
}
