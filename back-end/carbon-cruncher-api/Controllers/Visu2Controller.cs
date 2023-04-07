using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu2")]
    [ApiController]
    public class Visu2Controller : ControllerBase
    {
        private readonly CarbonCruncherContext _context;

        public Visu2Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get a collection of annual atmospheric co2 concentrations from Mauna Loa measurements, starting from 1959
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Annual
        /// </remarks>
        /// <response code="200">Returns annual data </response>
        [ProducesResponseType(StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("annual")]
        public IEnumerable<Visu2Annual> Annual()
        {
            return _context.Visu2Annual.ToList();
        }

        /// <summary>
        /// Get a collection of monthly atmospheric co2 concentrations from Mauna Loa measurements, starting from 03/1958
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Monthly
        /// </remarks>
        /// <response code="200">Returns monthly data </response>
        [ProducesResponseType(typeof(IEnumerable<Visu2Monthly>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("monthly")]
        public IEnumerable<Visu2Monthly> Monthly()
        {
            return _context.Visu2Monthly.ToList();
        }

        /// <summary>
        /// Get a collection of Antarctic ice core records of atmospheric co2 ratios
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu2/Icecore
        /// </remarks>
        /// <response code="200">Returns atmospheric co2 ratios data </response>
        [ProducesResponseType(typeof(IEnumerable<Visu2Icecore>), StatusCodes.Status200OK)]
        [Produces("application/json")]
        [HttpGet]
        [Route("icecore")]
        public IEnumerable<Visu2Icecore> IceCore()
        {
            return _context.Visu2Icecore.ToList();
        }
    }
}
