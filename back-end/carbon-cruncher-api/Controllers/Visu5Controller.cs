using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu5")]
    [ApiController]
    public class Visu5Controller : ControllerBase
    {
        // GET: api/visu5/CO2Sectors
        [HttpGet("co2sectors")]
        public IEnumerable<string> CO2Sectors()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
