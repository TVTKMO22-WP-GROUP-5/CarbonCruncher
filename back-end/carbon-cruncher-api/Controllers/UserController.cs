using carbon_cruncher_api.Models;
using carbon_cruncher_api.Validators;
using FluentValidation;
using FluentValidation.Results;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using BC = BCrypt.Net.BCrypt;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;
        private readonly IConfiguration _configuration;
        private readonly IValidator<VisuRegLoginUser> _userValidator;
        private readonly IValidator<VisuUserVisual> _visuValidator;

        // Database context set with dependency injection
        public UserController(CarbonCruncherContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
            _userValidator = new UserValidator();
            _visuValidator = new VisuUserVisualValidator();
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
        [ProducesResponseType(typeof(VisuUser), StatusCodes.Status200OK)]
        [ProducesResponseType(typeof(string), StatusCodes.Status400BadRequest)]
        [Consumes("application/json")]
        [Produces("application/json")]
        [HttpPost]
        [Route("register")]
        public ActionResult<VisuUser> Register([FromBody] VisuRegLoginUser user)
        {
            try
            {
                // Validate user object
                ValidationResult result = _userValidator.Validate(user);
                if (!result.IsValid)
                {
                    return BadRequest();
                }

                // Check if there is already a user with given usernick
                VisuUser? existingUser = _context.VisuUsers.SingleOrDefault(u => u.UserNick.ToLower() == user.UserNick.ToLower());
                if (existingUser != null)
                {
                    return Conflict();
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
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
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
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [Route("{usernick}")]
        public ActionResult Delete(string usernick)
        {
            // Get user identity from controllerbase User
            var currentUser = User?.Identity?.Name;
            if (currentUser != null && !currentUser.ToLower().Equals(usernick.ToLower())) return Unauthorized();

            // Remove currentuser and save changes
            var removeUser = _context.VisuUsers
                .Where(u => u.UserNick.ToLower().Equals(usernick.ToLower())).FirstOrDefault();
            if (removeUser is null) return BadRequest();
            _context.VisuUsers.Remove(removeUser);
            _context.SaveChanges();
            return NoContent();
        }

        /// <summary>
        /// Get all visualizations from the user
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     Get /api/user/visualization
        ///
        /// </remarks>
        /// <response code="200">Visualizations retrieved succesfully</response>
        /// <response code="401">Unauthorized get attempt</response>
        /// <response code="404">Visualizations not found</response>
        [ProducesResponseType(typeof(IEnumerable<VisuUserVisual>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet, Authorize]
        [Route("visualization")]
        public ActionResult<IEnumerable<string>> GetVisualization()
        {
            var currentUser = User?.Identity?.Name;
            var userVisus = _context.VisuUsers.Where(u => u.UserNick.ToLower().Equals(currentUser!.ToLower())).Select(u => u.VisuUserVisuals).ToList();
            return userVisus.Count != 0 ? Ok(userVisus) : NotFound();
        }

        /// <summary>
        /// Get a visualization
        /// </summary>
        /// <param name="stringId">Visualization string id</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Post /api/user/visualization/hwGwfFAh4g
        ///
        /// </remarks>
        /// <response code="200">Visualization retrieved succesfully</response>
        /// <response code="404">Visualization not found</response>
        [ProducesResponseType(typeof(VisuUserVisual), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpGet, AllowAnonymous]
        [Route("visualization/{stringId}")]
        public ActionResult<VisuUserVisual> GetSingleVisualization(string stringId)
        {
            var visu = _context.VisuUserVisuals.Where(v => v.UrlHeader.Equals(stringId)).FirstOrDefault();
            return visu != null ? Ok(visu) : NotFound();
        }

        /// <summary>
        /// Post a visualization for the user
        /// </summary>
        /// <param name="visuconfig">String that holds the visualization config</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Post /api/user/register
        ///     {
        ///        "somthingToConfigureVisu
        ///     }
        ///
        /// </remarks>
        /// <response code="200">Visualization posted succesfully</response>
        /// <response code="400">Error while posting visualization</response>
        /// <response code="401">Unauthorized delete attempt</response>
        [ProducesResponseType(typeof(string), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [HttpPost, Authorize]
        [Route("visualization")]
        public ActionResult<string> PostVisualization([FromBody] string visuconfig)
        {
            // Validate config string // TODO: add condition for bad request
            if (false)
            {
                return BadRequest();
            }

            // Get user object from db
            var currentUser = User?.Identity?.Name;
            VisuUser currentUserObject = _context.VisuUsers.Where(u => u.UserNick.ToLower().Equals(currentUser!.ToLower())).FirstOrDefault()!;

            // Check random string uniqueness and make a new one if same string exists
            string generatedUrl = "";
            do
            {
                generatedUrl = CreateRandomString(10, true, false);
            }
            while (_context.VisuUserVisuals.Where(v => v.UrlHeader == generatedUrl).ToList().Count != 0);

            VisuUserVisual visu = new VisuUserVisual() { UserId = currentUserObject!.Id, UrlHeader = generatedUrl, ColumnView = false };
            currentUserObject.VisuUserVisuals.Add(visu);
            _context.SaveChanges();
            return Ok(generatedUrl);
        }

        /// <summary>
        /// Delete a visualization of the user
        /// </summary>
        /// <param name="stringId">Visualization string id</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Delete /api/user/visualization/hwGwfFAh4g
        ///
        /// </remarks>
        /// <response code="204">Visualization deleted succesfully</response>
        /// <response code="401">Unauthorized delete attempt</response>
        /// <response code="404">Visualization not found</response>
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [HttpDelete, Authorize]
        [Route("visualization/{stringId}")]
        public ActionResult DeleteVisualization(string stringId)
        {
            // Get user identity from controllerbase User
            var currentUser = User?.Identity?.Name;
            var removeVisu = _context.VisuUserVisuals.Where(v => v.UrlHeader.Equals(stringId)).Include(v => v.User).FirstOrDefault();

            if (removeVisu is null) return NotFound();
            if (!removeVisu.User.UserNick.Equals(currentUser)) return Unauthorized();

            _context.VisuUserVisuals.Remove(removeVisu);
            _context.SaveChanges();
            return NoContent();
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

        private string CreateRandomString(int length, bool useLowerCharacters, bool useSpecialCharacters)
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            if (useLowerCharacters) chars += "abcdefghijklmnopqrstuvwxyz";
            if (useSpecialCharacters) chars += "!@#$%^&*()_+|}{:?><";

            var stringChars = new char[length];
            var random = new Random();

            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }

            return new string(stringChars);
        }
    }
}