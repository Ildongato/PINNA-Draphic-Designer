import { site } from "@/data/site";
import styles from "./Sections.module.css";

export function PracticeSection() {
  return (
    <section id="practice" className={styles.practice} data-header-theme="light">
      <div className={styles.practiceInner}>
        <p className={`${styles.sectionLabel} mono`}>{site.about.label}</p>
        <div className={styles.practiceCopy} data-reveal>
          <h2>{site.about.headline}</h2>
          <p>{site.about.body}</p>
          <div className={`${styles.availability} mono`}>
            <span>{site.availability}</span>
            <span>{site.location}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
