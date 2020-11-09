using System;
using System.Collections.Generic;

using System.Globalization;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
namespace google_map.response
{
  public partial class Response
  {
    [JsonProperty("status")]
    public string Status { get; set; }

    [JsonProperty("geocoded_waypoints")]
    public GeocodedWaypoint[] GeocodedWaypoints { get; set; }

    [JsonProperty("routes")]
    public Route[] Routes { get; set; }
  }

  public partial class GeocodedWaypoint
  {
    [JsonProperty("geocoder_status")]
    public string GeocoderStatus { get; set; }

    [JsonProperty("place_id")]
    public string PlaceId { get; set; }

    [JsonProperty("types")]
    public string[] Types { get; set; }
  }

  public partial class Route
  {
    [JsonProperty("summary")]
    public string Summary { get; set; }

    [JsonProperty("legs")]
    public Leg[] Legs { get; set; }

    [JsonProperty("copyrights")]
    public string Copyrights { get; set; }

    [JsonProperty("overview_polyline")]
    public Polyline OverviewPolyline { get; set; }

    [JsonProperty("waypoint_order")]
    public long[] WaypointOrder { get; set; }

    [JsonProperty("bounds")]
    public Bounds Bounds { get; set; }
  }

  public partial class Bounds
  {
    [JsonProperty("southwest")]
    public Coordinate Southwest { get; set; }

    [JsonProperty("northeast")]
    public Coordinate Northeast { get; set; }
  }

  public partial class Coordinate
  {
    [JsonProperty("lat")]
    public double Lat { get; set; }

    [JsonProperty("lng")]
    public double Lng { get; set; }
  }

  public partial class Leg
  {
    [JsonProperty("steps")]
    public Step[] Steps { get; set; }
  }

  public partial class Step
  {
    [JsonProperty("travel_mode")]
    public string TravelMode { get; set; }

    [JsonProperty("start_location")]
    public CoordinateStartLocat ion { get; set; }

    [JsonProperty("end_location")]
    public Coordinate EndLocation { get; set; }

    [JsonProperty("polyline")]
    public Polyline Polyline { get; set; }

    [JsonProperty("duration")]
    public Distance Duration { get; set; }

    [JsonProperty("html_instructions")]
    public string HtmlInstructions { get; set; }

    [JsonProperty("distance")]
    public Distance Distance { get; set; }

    [JsonProperty("start_address")]
    public string StartAddress { get; set; }

    [JsonProperty("end_address")]
    public string EndAddress { get; set; }
  }

  public partial class Distance
  {
    [JsonProperty("value")]
    public long Value { get; set; }

    [JsonProperty("text")]
    public string Text { get; set; }
  }

  public partial class Polyline
  {
    [JsonProperty("points")]
    public string Points { get; set; }
  }

  public partial class Response
  {
    public static Response FromJson(string json) => JsonConvert.DeserializeObject<Response>(json, Response.Converter.Settings);
  }

  public static class Serialize
  {
    public static string ToJson(this Response self) => JsonConvert.SerializeObject(self, Response.Converter.Settings);
  }

  internal static class Converter
  {
    public static readonly JsonSerializerSettings Settings = new JsonSerializerSettings
    {
      MetadataPropertyHandling = MetadataPropertyHandling.Ignore,
                               DateParseHandling = DateParseHandling.None,
                               Converters =
                               {
                                 new IsoDateTimeConverter { DateTimeStyles = DateTimeStyles.AssumeUniversal }
                               },
    };
  }
}
