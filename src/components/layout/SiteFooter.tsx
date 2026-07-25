import { site } from "@/data/site";
import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <p className={styles.wordmark}>{site.name}</p>
      <p className={`${styles.meta} mono`}>© {year} / {site.availability}</p>
      <div className={styles.links} aria-label="Social links">
        {site.socials.map((social) =>
          social.href === "#" ? (
            <span key={social.label} className={styles.disabled} aria-disabled="true">
              {social.label}
            </span>
          ) : (
            <a key={social.label} href={social.href}>
              {social.label}
            </a>
          )
        )}
      </div>
      <p className={styles.disclaimer}>
        Current project imagery is temporary concept artwork from the Pinna build kit and is not presented as commissioned client work.
      </p>
    </footer>
  );
}
