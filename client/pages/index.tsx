import Head from "next/head";
import styles from "../styles/Home.module.css";

import { SearchForm } from "../components/SearchForm";
import { useSearchDirections } from "../hooks/use_search_directions";
import { useMemo, useState } from "react";

enum SortBy {
	Cost,
	Duration
}

export default function Home() {
	const [sortBy, setSortBy] = useState(SortBy.Cost);
	const [directions, searchDirections, isLoading] = useSearchDirections();
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
							<th>目的地</th>
							<th
								className="clickable"
								onClick={() => {
									setSortBy(SortBy.Cost);
								}}
							>
								費用 {sortBy === SortBy.Cost && "^"}
							</th>
							<th
								className="clickable"
								onClick={() => {
									setSortBy(SortBy.Duration);
								}}
							>
								所要時間 (分) {sortBy === SortBy.Duration && "^"}
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
			</main>

			<footer className={styles.footer}>Made by hitochan777 with love</footer>
		</div>
	);
}
