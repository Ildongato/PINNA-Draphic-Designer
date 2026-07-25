import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <section className={styles.shell} data-header-theme="light">
      <div className={styles.inner}>
        <p className={`${styles.label} mono`}>404</p>
        <div className={styles.content}>
          <h1>Nothing is set on this grid.</h1>
          <p>The page may have moved, or the project link may be temporary.</p>
          <Link href="/">Return to the work</Link>
        </div>
      </div>
    </section>
  );
}
