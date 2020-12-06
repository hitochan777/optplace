using System.Linq;
using System.Collections.Generic;
using GoogleApi.Entities.Maps.Directions.Response;

using api.Dto;

namespace api.Extensions
{
	public static class DirectionsResponseExtension
	{
		public static List<DirectionInfo> GetDirectionInfoList(this DirectionsResponse directionsResponse, string destinationName)
		{
			return directionsResponse.Routes.Select(route =>
				new DirectionInfo
				{
					DestinationName = destinationName,
					DestinationAddress = route.Legs.LastOrDefault().EndLocation.Address,
					Cost = route.Fare?.Value ?? 0,
					Duration = route.Legs.Select(leg => leg.Duration.Value).Sum(),
				}
			 ).ToList();
		}
	}
}
