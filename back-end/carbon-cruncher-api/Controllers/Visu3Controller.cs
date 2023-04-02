using carbon_cruncher_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace carbon_cruncher_api.Controllers
{
    [Route("api/visu3")]
    [ApiController]
    public class Visu3Controller : ControllerBase

    {
        // Database context 
        private readonly CarbonCruncherContext _context;

        // Database context set with dependency injection
        public Visu3Controller(CarbonCruncherContext context)
        {
            _context = context;
        }

        //GET: api/visu3/Global
        /// <summary>
        /// Get evolution of global temperature over the past two million years.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///     Get/api/visu3/global
        /// </remarks>
        /// <response code="200">
        /// Returns evolution of global temperature over the past two million years.
        /// </response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu3Global>), StatusCodes.Status200OK)]
        [Produces("application/json")]

        //[HttpGet("global")]
        [HttpGet]
        [Route("global")]
        public IEnumerable<Visu3Global> Global()
        {
            return _context.Visu3Global.ToList();
        }

        // GET: api/visu3/CO2
        /*[HttpGet("co2")]
        public IEnumerable<string> CO2()
        {
            return new string[] { "value1", "value2" };
        }
        */

        // GET: api/visu3/Event
        /// <summary>
        /// Get milestones in human evolution and culture events over the past two million years.
        /// </summary>
        /// <remarks>
        /// Sample request:
        ///     Get/api/visu3/event
        /// </remarks>
        /// <response code="200">
        /// Returns milestones in human evolution and culture events over the past two million years.
        /// </response>
        [HttpGet]
        [ProducesResponseType(typeof(IEnumerable<Visu3Event>), StatusCodes.Status200OK)]
        [Produces("application/json")]

        //[HttpGet("event")]
        [HttpGet]
        [Route("event")]
        public IEnumerable<Visu3Event> Events()
        {
            return _context.Visu3Event.ToList();
        }
    }
}
