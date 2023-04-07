using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visuutils")]
    [ApiController]
    public class VisuUtilsController : ControllerBase
    {
        // Database context
        private readonly CarbonCruncherContext _context;

        // Database context set with dependency injection
        public VisuUtilsController(CarbonCruncherContext context)
        {
            _context = context;
        }

        /// <summary>
        /// Get a collection of information about visualization(s)
        /// </summary>
        /// <param name="visuNumber">Optional visualization screen number to get info from</param>
        /// <remarks>
        /// Sample request:
        ///
        ///     Get /api/visuUtils/info
        ///
        /// </remarks>
        /// <response code="200">Returns a collection of CO2 data from different sectors</response>
        /// <response code="404">Not found with any visualization information</response>
        [ProducesResponseType(typeof(IEnumerable<VisuInfo>), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [Produces("application/json")]
        [HttpGet]
        [Route("info")]
        public ActionResult<IEnumerable<VisuInfo>> CO2Sector(int? visuNumber)
        {
            var resultInfo = _context.VisuInfos.Where(v => visuNumber == null || v.VisuNumber == visuNumber).ToList();
            return resultInfo.Count > 0 ? Ok(resultInfo) : NotFound();
        }
    }
}
