using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GoogleApi;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Maps.Directions.Response;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DirectionController: ControllerBase
    {
        private readonly ILogger<DirectionController> _logger;

        public DirectionController(ILogger<DirectionController> logger)
        {
            _logger = logger;
        }

        [HttpGet]
        public IEnumerable<WeatherForecast> Get(string[] locations, string condition) {
        {
            GoogleMaps.Directions.QueryAsync(new DirectionsRequest { });
        }
    }
}
