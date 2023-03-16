using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu1")]
    [ApiController]
    public class Visu1Controller : ControllerBase
    {
        // GET: api/visu1/Annual
        [HttpGet("annual")]
        public IEnumerable<string> Annual()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu1/Monthly
        [HttpGet("monthly")]
        public IEnumerable<string> Monthly()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/visu1/TempReconstruction
        [HttpGet("temprec")]
        public IEnumerable<string> TempReconstruction()
        {
            return new string[] { "value1", "value2" };
        }
    }
}
