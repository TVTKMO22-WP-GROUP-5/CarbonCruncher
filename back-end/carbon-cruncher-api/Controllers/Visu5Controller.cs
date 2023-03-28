using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu5")]
    [ApiController]
    public class Visu5Controller : ControllerBase
    {
        private readonly CarbonCruncherContext _context;

        public Visu5Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        // GET: api/visu5/co2sector
        [HttpGet("co2sector")]
        public IEnumerable<Visu5Co2sector> CO2Sector()
        {
            var sectorsList = _context.Visu5Co2sectors
                .Include(s => s.Visu5Co2subs)
                .ToList();
            return sectorsList;
        }
    }
}
