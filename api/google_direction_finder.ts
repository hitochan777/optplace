import { DirectionFindService } from "./direction_find_service";
import { DirectionInfo } from "./direction_info";

export class GoogleDirectionFinder implements DirectionFindService {
  public async FindDirections(
    origin: string,
    destinations: string[]
  ): Promise<DirectionInfo> {
    const directions = destinations.map((destination) =>
      Maps.newDirectionFinder()
        .setOrigin(origin)
        .setDestination(destination)
        .setMode(GoogleAppsScript.Maps.Mode.TRANSIT)
        .getDirections()
    );
    throw new Error("not implemented");
  }
}
