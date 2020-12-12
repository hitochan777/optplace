import { DirectionFindService } from "./direction_find_service";
import { DirectionInfo } from "./direction_info";

export class GoogleDirectionFinder implements DirectionFindService {
  private directionResponse2DirectionInfo(destination: string, directions: any): DirectionInfo {
    const totalCost = directions.routes.reduce(
      (total, route) => (route.fare ? route.fare.value : 0) + total,
      0
    );
    const durations = directions.routes.flatMap((route) =>
      route.legs.map((leg) => (leg.duration ? leg.duration.value : 0))
    );
    const totalDuration = durations.reduce(
      (total, duration) => duration + total,
      0
    );
    return {
      destination,
      duration: totalDuration,
      cost: totalCost,
    };
  }
  public FindDirections(
    origin: string,
    destinations: string[]
  ): DirectionInfo[] {
    const directionInfoList = destinations.map((destination) => {
      const directions = Maps.newDirectionFinder()
        .setOrigin(origin)
        .setDestination(destination)
        .setMode(Maps.DirectionFinder.Mode.TRANSIT)
        .getDirections();
      return this.directionResponse2DirectionInfo(destination, directions);
    });
    return directionInfoList;
  }
}
