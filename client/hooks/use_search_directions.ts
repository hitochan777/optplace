import { useState } from "react";

interface Direction {
  cost: number;
  duration: number;
}

export const useSearchDirections = () => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchDirections = async (origin: string, destinations: string[]) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${
          process.env.API_ENDPOINT
        }/?origin=${origin}&destinations=${destinations.join(",")}`
      );
      const jsonResponse = await response.json();
      setDirections(jsonResponse);
    } catch {
      setIsLoading(false);
    }
  };

  return [directions, searchDirections, isLoading] as const;
};
