namespace api.Dto
{
	public class DirectionResponse
	{
		DirectionInfo[] DirectionInfoList {get; set;}
	}

	public class DirectionInfo
	{
		string Location { get; set; }
		int Cost { get; set; }
		int Distance { get; set; }
	}
}
