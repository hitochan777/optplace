import Head from "next/head";

import styles from "../styles/Home.module.css";
import Navbar from "./Navbar";

interface Props {
  title?: string;
}

const Layout: React.FC<Props> = ({ title = "", children }) => (
  <>
    <Head>
      <title>Optplace {title}</title>
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
    </Head>
    <header>
      <Navbar />
    </header>

    <main className={styles.main}>{children}</main>

    <footer className={styles.footer}>Made by hitochan777 with love</footer>
  </>
);

export default Layout;
