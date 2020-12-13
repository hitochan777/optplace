import Head from "next/head";
import styles from "../styles/Home.module.css";

import { SearchForm } from "../components/SearchForm";
import { useSearchDirections } from "../hooks/use_search_directions";

export default function Home() {
  const [directions, searchDirections, isLoading] = useSearchDirections();

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Directions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <SearchForm onSubmit={searchDirections} isLoading={isLoading} />
        <table>
          <thead>
            <tr>
              <th>Destination</th>
              <th>Cost</th>
              <th>Duration (min)</th>
            </tr>
          </thead>
          <tbody>
            {directions.map((direction) => (
              <tr>
                <td>{direction.destination}</td>
                <td>{direction.cost}</td>
                <td>{Math.round(direction.duration / 60)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>

      <footer className={styles.footer}>Made by hitochan777 with love</footer>
    </div>
  );
}
