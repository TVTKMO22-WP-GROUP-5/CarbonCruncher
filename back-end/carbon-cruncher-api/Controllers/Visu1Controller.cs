// Import necessary namespaces

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using carbon_cruncher_api.Models;
using Microsoft.EntityFrameworkCore;
namespace carbon_cruncher_api.Controllers


// Set the base URL for this controller to /api/visu1/Annual
{

 // Use ApiController attribute to indicate that this controller should follow conventions of an API controller

    [Route("api/visu1")]
    [ApiController]
    public class Visu1Controller : ControllerBase
    {
        // Declare private variable to store database context

        private readonly CarbonCruncherContext _context;

        // Initialize the controller with the CarbonCruncherContext object through dependency injection
        public Visu1Controller(CarbonCruncherContext context)
        {
            _context = context;
        }
        // GET endpoint to retrieve annual data from the database

        [HttpGet("annual")]
        public async Task<ActionResult> GetAnnualData()
        {
            try
            {
                // Retrieve annual data from the database

                var data = await _context.Visu1Annual.ToListAsync();
                // If there is no data, return a 404 Not Found response

                if (data == null || !data.Any())
                {
                    return NotFound();
                } 
                // If data is retrieved successfully, return an HTTP 200 OK response with the data

                return Ok(data);
            }
            catch (Exception ex)
            {
                // If there is an exception, log the error and return a 500 Internal Server Error response with the error message

                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        // GET endpoint to retrieve monthly data from the database
        [HttpGet("monthly")]
        public async Task<IActionResult> GetMonthlyData()
        {
            try
            {
                // Retrieve monthly data from the database

                var data = await _context.Visu1Monthly.ToListAsync();

                // If there is no data, return a 404 Not Found response

                if (data == null || !data.Any())
                {
                    return NotFound();
                }
                // If data is retrieved successfully, return an HTTP 200 OK response with the data

                return Ok(data);
            }
            catch (Exception ex)
            {
                // If there is an exception, log the error and return a 500 Internal Server Error response with the error message
                return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
            }
        }
        
        
    }
}