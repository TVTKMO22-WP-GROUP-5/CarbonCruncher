using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // POST: api/user/register
        [HttpPost("register")]
        public IEnumerable<string> Register([FromBody] string value)
        {
            return new string[] { "value1", "value2" };
        }

        // POST: api/user/login
        [HttpPost("login")]
        public IEnumerable<string> Login([FromBody] string value)
        {
            return new string[] { "value1", "value2" };
        }

        // DELETE api/user/:id
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }

        // GET: api/user/visualization
        [HttpGet("visualization")]
        public IEnumerable<string> GetVisualization()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/user/visualization
        [HttpPost("visualization")]
        public IEnumerable<string> PostVisualization([FromBody] string value)
        {
            return new string[] { "value1", "value2" };
        }

        // DELETE api/visualization/:id
        [HttpDelete("visualization/{id}")]
        public void DeleteVisualization(int id)
        {
        }
    }
}
