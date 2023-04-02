using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class Visu2Controller : ControllerBase
    {
        private readonly CarbonCruncherContext _context;

        public Visu2Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        // GET: api/visu2/Annual
        /// <summary>
        /// Get a collection of annual atmospheric co2 concentrations from Mauna Loa measurements, starting from 1959
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Annual
        /// </remarks>
        /// <response code="200">Returns annual data </response>
        [HttpGet]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("Annual")]
        public IEnumerable<Visu2Annual> Annual()
        {
            return _context.Visu2Annual.ToList();
        }

        // GET: api/visu2/Monthly
        /// <summary>
        /// Get a collection of monthly atmospheric co2 concentrations from Mauna Loa measurements, starting from 03/1958
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Monthly
        /// </remarks>
        /// <response code="200">Returns monthly data </response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu2Monthly>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("Monthly")]
        public IEnumerable<Visu2Monthly> Monthly()
        {
            return _context.Visu2Monthly.ToList();
        }

        // GET: api/visu2/IceCore
        /// <summary>
        /// Get a collection of Antarctic ice core records of atmospheric co2 ratios
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Icecore
        /// </remarks>
        /// <response code="200">Returns atmospheric co2 ratios data </response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu2Icecore>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("Icecore")]
        public IEnumerable<Visu2Icecore> IceCore()
        {
            return _context.Visu2Icecore.ToList();
        }
    }
}
