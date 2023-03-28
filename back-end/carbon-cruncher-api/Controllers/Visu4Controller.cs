using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu4")]
    [ApiController]
    public class Visu4Controller : ControllerBase
    {
        private readonly CarbonCruncherContext _context;

        public Visu4Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        // GET: api/visu4/co2country
        [HttpGet("co2country")]
        public IEnumerable<Visu4Co2> CO2()
        {
            return _context.Visu4Co2.ToList();
        }
    }
}
