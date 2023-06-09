﻿// Import necessary namespaces

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
        
        /// <summary>
        /// Get a collection of annual global historical surface temperature anomalies from January 1850 onwards
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu1/Annual
        /// </remarks>
        /// <response code="200">Returns annual data </response>
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
        
        /// <summary>
        /// Get a collection of monthly global historical surface temperature anomalies from January 1850 onwards
        /// </summary>
        /// <remarks>
        /// Sample request: Get /api/visu1/Monthly
        /// </remarks>
        /// <response code="200">Returns monthly data </response>
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