using System.Collections.Generic;

namespace api.Dto
{
	public class DirectionResponse
	{
		public List<DirectionInfo> DirectionInfoList { get; set; }
	}

	public class DirectionInfo
	{
		public string Location { get; set; }
		public int Cost { get; set; }
		public int Distance { get; set; }
	}
}
