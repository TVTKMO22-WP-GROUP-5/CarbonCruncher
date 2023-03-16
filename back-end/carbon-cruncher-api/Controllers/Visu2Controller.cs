using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu2")]
    [ApiController]
    public class Visu2Controller : ControllerBase
    {
        // GET: api/visu2/Annual
        [HttpGet("annual")]
        public IEnumerable<string> Annual()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu2/Monthly
        [HttpGet("monthly")]
        public IEnumerable<string> Monthly()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu2/IceCore
        [HttpGet("icecore")]
        public IEnumerable<string> IceCore()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
