import { DirectionFindService } from "./direction_find_service";
import { GoogleDirectionFinder } from "./google_direction_finder";

interface Response {
  body: any;
  status: number;
}

async function getDirections(
  e: GoogleAppsScript.Events.DoGet,
  directionFinder: DirectionFindService
): Promise<Response> {
  const origin = e.queryString["origin"];
  const destinationsString = e.queryString["destinations"];
  if (!origin || !destinationsString) {
    return {
      body: "Origin or destinations field are empty",
      status: 400,
    };
  }
  const destinations = destinationsString.split(",");
  if (destinations.length > 50) {
    return {
      body: "You cannot query more than 50 destinatiosn at once",
      status: 400,
    };
  }
  const directions = await directionFinder.FindDirections(origin, destinations);

  return {
    body: directions,
    status: 200,
  };
}

export async function doGet(e: GoogleAppsScript.Events.DoGet) {
  const directionFinder = new GoogleDirectionFinder();
  const result = await getDirections(e, directionFinder);
  const stringifiedResult = JSON.stringify(result);
  return ContentService.createTextOutput(stringifiedResult).setMimeType(
    ContentService.MimeType.JSON
  );
}
