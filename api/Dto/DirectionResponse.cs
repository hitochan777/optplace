namespace api.Dto
{
	public class DirectionResponse
	{
		DirectionInfo[] DirectionInfoList;
	}

	public class DirectionInfo
	{
		string Location { get; set; }
		int Cost { get; set; }
		int Distance { get; set; }
	}
}
