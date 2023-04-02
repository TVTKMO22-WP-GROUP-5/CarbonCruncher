using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu5/co2sector")]
    [ApiController]
    public class Visu5Controller : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;

        // Database context set with dependency injection
        public Visu5Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get a collection of CO2 data from different sectors, including subsector data
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     Get /api/visu5/co2sector
        ///
        /// </remarks>
        /// <response code="200">Returns a collection of CO2 data from different sectors</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu5Co2sector>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        public IEnumerable<Visu5Co2sector> CO2Sector()
        {
            var sectorsList = _context.Visu5Co2sector
                .Include(s => s.Visu5Co2subs)
                .ToList();
            return sectorsList;
        }
    }
}
