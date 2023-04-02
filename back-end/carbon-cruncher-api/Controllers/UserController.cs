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
        ///     Post /api/user
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
        ///     Post /api/login
        ///     {
        ///        "usernick":"testguy",
        ///        "userpassword":"R4nd0mP4ssw0rd!"
        ///     }
        ///
        /// </remarks>
        /// <response code="200">User logged in succesfully</response>
        /// <response code="400">Error while user login</response>
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
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

        // DELETE api/user/:id
        [HttpDelete]
        [Route("{id}")]
        public void Delete(int id)
        {
        }

        // GET: api/user/visualization
        [HttpGet]
        [Route("visualization")]
        public IEnumerable<string> GetVisualization()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/user/visualization/:stringId
        [HttpGet]
        [Route("visualization/{stringId}")]
        public IEnumerable<string> GetSingleVisualization(string stringId)
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/user/visualization
        [HttpPost]
        [Route("visualization")]
        public IEnumerable<string> PostVisualization([FromBody] string value)
        {
            return new string[] { "value1", "value2" };
        }

        // DELETE api/visualization/:id
        [HttpDelete]
        [Route("visualization/{id}")]
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
            List<Claim> claims = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserNick)
            };
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
