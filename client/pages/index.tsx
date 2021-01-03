import Layout from "../components/Layout";

import { SearchForm } from "../components/SearchForm";
import { useSearchDirections } from "../hooks/use_search_directions";
import { useMemo, useState } from "react";
import { GetServerSideProps, NextPage } from "next";
import { getSession, useSession } from "next-auth/client";

enum SortBy {
  Cost,
  Duration,
}

const Home: NextPage = () => {
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
    <Layout>
      <div className="well">
        出発地から複数の目的地への費用、距離を出して比較することができます。
      </div>
      <SearchForm
        onSubmit={async (origin: string, destinations: string[]) => {
          await searchDirections(origin, destinations);
          setSearched(true);
        }}
        isLoading={isLoading}
      />
      {searched && (
        <table>
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
                <td>{direction.destination}</td>
                <td>{direction.cost ?? "見つかりませんでした"}</td>
                <td>
                  {direction.duration
                    ? Math.round(direction.duration / 60)
                    : "見つかりませんでした"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </Layout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      props: {},
      redirect: {
        destination: "/auth/signin",
        permanent: false,
      },
    };
  }
  return {
    props: { session },
  };
};

export default Home;
