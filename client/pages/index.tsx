import Head from "next/head";
import styles from "../styles/Home.module.css";
import { useState } from "react";

interface SearchDirectionRequest {
  origin: string;
  destinations: string[];
}

interface Direction {
  cost: number;
  duration: number;
}

const useSearchDirections = ({
  origin,
  destinations,
}: SearchDirectionRequest) => {
  const [directions, setDirections] = useState<Direction[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const searchDirections = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `${process.env.API_ENDPOINT}/Directions?origin=${origin}&destinations=${destinations}`
      );
      const jsonResponse = await response.json();
      setDirections(jsonResponse);
    } catch {
      setIsLoading(false);
    }
  };

  return [directions, searchDirections, isLoading] as const;
};

export default function Home() {
  const [form, setForm] = useState({ origin: "", destinations: "" });
  const [directions, searchDirections, isLoading] = useSearchDirections({
    origin: form.origin,
    destinations: form.destinations.split("\n"),
  });

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
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
        <input
          value={form.origin}
          onChange={(e) => {
            setForm({ ...form, origin: e.target.value });
          }}
        />
        <textarea
          cols={40}
          rows={5}
          value={form.destinations}
          onChange={(e) => {
            setForm({ ...form, destinations: e.target.value });
          }}
        />
        <button
          onClick={() => {
            searchDirections();
          }}
          disabled={isLoading}
        >
          Search
        </button>
      </main>

      <footer className={styles.footer}>Made by hitochan777 with love</footer>
    </div>
  );
}
