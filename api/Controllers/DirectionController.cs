using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using GoogleApi.Entities.Common;
using GoogleApi.Entities.Maps.Common.Enums;
using GoogleApi.Entities.Maps.Directions.Request;
using GoogleApi.Entities.Maps.Directions.Response;

using api.Dto;

namespace api.Controllers
{
	[ApiController]
	[Route("[controller]")]
	public class DirectionController : ControllerBase
	{
		private readonly ILogger<DirectionController> _logger;

		public DirectionController(ILogger<DirectionController> logger)
		{
			_logger = logger;
		}

		[HttpGet]
		public async Task<ActionResult<DirectionResponse>> Get(string origin, [FromQuery(Name = "destinations")] string destStr, string sort = "", int travelMode = 1)
		{
			if (string.IsNullOrEmpty(origin) || string.IsNullOrEmpty(destStr))
			{
				return new BadRequestObjectResult("origin or destionations are empty");
			}
			var destinations = destStr.Split(",");
			if (destinations.Length > 50)
			{
				return new BadRequestObjectResult("You cannot have more than 50 destinations");
			}

			var tasks = destinations.Select(destination => FetchDirectionsAsync(origin, destination, (TravelMode)travelMode));

			await Task.WhenAll(tasks);

			foreach (var task in tasks)
			{
				var directionsResponse = await task;
			}
			// TODO: convert Google Map API response
			_logger.LogInformation("hello there!");
			return new DirectionResponse { };
		}

		private async Task<DirectionsResponse> FetchDirectionsAsync(string origin, string destination, TravelMode travelMode)
		{
			var req = new DirectionsRequest
			{
				Origin = new Location(origin),
				Destination = new Location(destination),
				TravelMode = travelMode,
			};
			return await GoogleApi.GoogleMaps.Directions.QueryAsync(req);
		}
	}
}
