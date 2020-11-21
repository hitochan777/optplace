using System.Collections.Generic;

namespace api.Dto
{
	public class DirectionResponse
	{
		public List<DirectionInfo> DirectionInfoList { get; set; }
	}

	public class DirectionInfo
	{
		public string DestinationName { get; set; }
		public string DestinationAddress { get; set; }
		public double Cost { get; set; }
		public int Duration { get; set; }
	}
}
