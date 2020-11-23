import Head from "next/head";
import styles from "../styles/Home.module.css";

import { SearchForm } from "../components/SearchForm";
import { useSearchDirections } from "../hooks/use_search_directions";

export default function Home() {
  const [directions, searchDirections] = useSearchDirections();

  return (
    <div className={styles.container}>
      <Head>
        <title>Search Directions</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <ul>
          {directions.map((direction) => (
            <li>
              cost: {direction.cost}, duration: {direction.duration}
            </li>
          ))}
        </ul>
        <SearchForm onSubmit={searchDirections}/>
      </main>

      <footer className={styles.footer}>Made by hitochan777 with love</footer>
    </div>
  );
}
