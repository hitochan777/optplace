import { useSession } from "next-auth/client";
import React, { useMemo, useState } from "react";

import { useSearchDirections } from "../hooks/use_search_directions";
import { SearchForm } from "./SearchForm";

enum SortBy {
  Cost,
  Duration,
}

const SearchWidget: React.FC = () => {
  const [session] = useSession();
  const [searched, setSearched] = useState(false);
  const [sortBy, setSortBy] = useState(SortBy.Cost);
  const [directions, searchDirections, isLoading] = useSearchDirections(
    session?.accessToken
  );
  const sortedDirections = useMemo(() => {
    const copiedDirections = [...directions];
    copiedDirections.sort((a, b) => {
      if (sortBy === SortBy.Cost) {
        return a.cost - b.cost;
      } else if (sortBy === SortBy.Duration) {
        return a.duration - b.duration;
      }
    });
    return copiedDirections;
  }, [directions]);
  return (
    <>
      <SearchForm
        onSubmit={async (origin: string, destinations: string[]) => {
          await searchDirections(origin, destinations);
          setSearched(true);
        }}
        isLoading={isLoading}
      />
      {searched && (
        <table className="search_result">
          <thead>
            <tr>
              <th>目的地</th>
              <th
                className="clickable"
                onClick={() => {
                  setSortBy(SortBy.Cost);
                }}
              >
                費用 {sortBy === SortBy.Cost && "↑"}
              </th>
              <th
                className="clickable"
                onClick={() => {
                  setSortBy(SortBy.Duration);
                }}
              >
                所要時間 (分) {sortBy === SortBy.Duration && "↑"}
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedDirections.map((direction, i) => (
              <tr key={i}>
                <td align="center">{direction.destination}</td>
                <td align="center">{direction.cost ? direction.cost + "円" : "見つかりませんでした"}</td>
                <td align="center">
                  {direction.duration
                    ? Math.round(direction.duration / 60)
                    : "見つかりませんでした"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </>
  );
};

export default SearchWidget;