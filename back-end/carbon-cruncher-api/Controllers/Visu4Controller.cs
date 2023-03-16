using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu4")]
    [ApiController]
    public class Visu4Controller : ControllerBase
    {
        // GET: api/visu4/CO2
        [HttpGet("co2")]
        public IEnumerable<string> CO2()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
