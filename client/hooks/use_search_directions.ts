import { useState } from "react";
import { UnauthorizedError } from "../errors";

interface Direction {
  destination: string;
  cost: number;
  duration: number;
}

export const useSearchDirections = (accessToken?: string) => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchDirections = async (origin: string, destinations: string[]) => {
    try {
      setIsLoading(true);
      const response = await fetch(process.env.NEXT_PUBLIC_API_ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          function: "getDirections",
          parameters: [origin, destinations.join(",")],
        }),
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status == 200) {
        setDirections(() => {
          throw new UnauthorizedError(
            "認証がきれました。再度ログインしてください。"
          );
        });
      }
      const jsonResponse = await response.json();
      setDirections(jsonResponse.response.result.body);
    } finally {
      setIsLoading(false);
    }
  };

  return [directions, searchDirections, isLoading] as const;
};
