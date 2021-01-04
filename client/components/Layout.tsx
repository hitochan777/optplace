import Head from "next/head";

import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ title = "", children }) => (
  <>
    <Head>
      <title>{title || "Optplace | 近くて安い目的地を探そう"}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta
        name="description"
        content="目的地の候補がたくさんあってどれがいいかわからない...Optplaceなら安くて近い目的地を簡単に見つけられます！"
      />
      <meta name="google-site-verification" content="PRfrFELJZN8wnHVlWLo8WtGQs6iLOUfuxrg9Vq7VyX8" />
    </Head>
    <header>
      <Navbar />
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Made by hitochan777 with love</footer>
  </>
);

export default Layout;
