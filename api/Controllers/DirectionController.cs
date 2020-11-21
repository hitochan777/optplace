using System.Linq;
using Microsoft.Extensions.Configuration;
using System.Collections.Generic;
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
		private readonly IConfiguration configuration;
		private readonly ILogger<DirectionController> logger;
		private readonly string apiKey;

		public DirectionController(ILogger<DirectionController> logger, IConfiguration configuration)
		{
			this.logger = logger;
			this.configuration = configuration;
			apiKey = configuration["GOOGLE_MAP_API_KEY"];
			if (string.IsNullOrEmpty(apiKey))
			{
				throw new System.Exception("api key is empty");
			}
		}

		[HttpGet]
		public async Task<ActionResult<DirectionsResponse[]>> Get(string origin, [FromQuery(Name = "destinations")] string destStr, string sort = "", int travelMode = 1)
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

			var directionResponses = await Task.WhenAll(tasks);

			return directionResponses;


			// TODO: convert Google Map API response
			// return new DirectionResponse { 
			//     DirectionInfoList = directionResponses.Select(directionResponses => new DirectionInfo {                        
			//         Locato 
			//     })

		}

		private async Task<DirectionsResponse> FetchDirectionsAsync(string origin, string destination, TravelMode travelMode)
		{
			logger.LogInformation(apiKey);
			var req = new DirectionsRequest
			{
				Key = apiKey,
				Origin = new Location(origin),
				Destination = new Location(destination),
				TravelMode = travelMode,
			};
			return await GoogleApi.GoogleMaps.Directions.QueryAsync(req);
		}
	}
}
