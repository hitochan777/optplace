import { DirectionFindService } from "./direction_find_service";
import { GoogleDirectionFinder } from "./google_direction_finder";

interface Response {
	body: any;
	status: number;
}

function _getDirections(
	origin: string,
	destinationsString: string,
	directionFinder: DirectionFindService
): Response {
	if (!origin || !destinationsString) {
		return {
			body: `Origin or destinations field are empty: ${JSON.stringify(
				e.parameter
			)}`,
			status: 400
		};
	}
	const destinations = destinationsString.split(",");
	if (destinations.length > 50) {
		return {
			body: "You cannot query more than 50 destinatiosn at once",
			status: 400
		};
	}
	const directions = directionFinder.FindDirections(origin, destinations);
	if (directions instanceof Promise) {
		throw new Error("promise is not returnable from doGet");
	}

	return {
		body: directions,
		status: 200
	};
}

function getDirections(origin: string, destinations: string) {
	const directionFinder = new GoogleDirectionFinder();
	return _getDirections(origin, destinations, directionFinder);
}
