using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu4/co2country")]
    [ApiController]
    public class Visu4Controller : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;

        // Database context set with dependency injection
        public Visu4Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get a collection of CO2 data from different countries
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///
        ///     Get /api/visu4/co2country
        ///
        /// </remarks>
        /// <response code="200">Returns a collection of CO2 data from different countries</response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu4Co2>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        public IEnumerable<Visu4Co2> CO2()
        {
            return _context.Visu4Co2.ToList();
        }
    }
}
