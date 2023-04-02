using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.ComponentModel.DataAnnotations;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;

        // Database context set with dependency injection
        public UserController(CarbonCruncherContext context)
        {
            _context = context;
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
        [Produces("text/plain")]
        [HttpPost]
        [Route("register")]
        public ActionResult<string> Register([FromBody] VisuRegLoginUser user)
        {
            try
            {
                VisuUser regUser = new VisuUser() { UserNick = user.UserNick, UserPassHash = "jfo93jf39" };   
                
                _context.VisuUsers.Add(regUser);
                _context.SaveChanges();  
                
                return Ok($"User {regUser.UserNick} registered succesfully with id {regUser.Id}");
            }
            catch (Exception)
            {
                return BadRequest();
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
        public string Login([FromBody] VisuRegLoginUser user)
        {
            return "token";
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
    }
}
