import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";

import styles from "../styles/Navbar.module.css";

const Navbar = () => {
  const [session] = useSession();

  return (
    <div className={styles.navbar__wrapper}>
    <nav className={styles.navbar}>
      <Link href="/">
        <a className={`${styles.navbar__item} ${styles.logo}`}>Optplace</a>
      </Link>{" "}
      {session && (
        <div>
          <span className={styles.navbar__item}>{session.user.email}</span>
          <Link href="/auth/signout">
            <a className={styles.navbar__item}>Signout</a>
          </Link>
        </div>
      )}
    </nav>
    </div>
  );
};

export default Navbar;
