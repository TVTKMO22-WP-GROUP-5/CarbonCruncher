using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu3")]
    [ApiController]
    public class Visu3Controller : ControllerBase
    {
        // GET: api/visu3/Global
        [HttpGet("global")]
        public IEnumerable<string> Global()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu3/CO2
        [HttpGet("co2")]
        public IEnumerable<string> CO2()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu3/Events
        [HttpGet("events")]
        public IEnumerable<string> Events()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
