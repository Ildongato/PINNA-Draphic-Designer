import type { Project } from "@/data/types";
import styles from "./ProjectDetails.module.css";

export function ProjectDetails({ project }: { project: Project }) {
  return (
    <section className={styles.section} data-header-theme="light">
      <div className={styles.inner}>
        <div className={styles.summary}>
          <p className={`${styles.label} mono`}>Overview</p>
          <h2>{project.summary}</h2>
          <p>{project.description}</p>
        </div>
        <aside className={`${styles.rail} mono`} aria-label={`${project.title} project metadata`}>
          <p>
            <span>Year</span>
            <span>{project.year}</span>
          </p>
          <p>
            <span>Discipline</span>
            <span>{project.discipline}</span>
          </p>
          <p>
            <span>Sector</span>
            <span>{project.sector}</span>
          </p>
        </aside>
        <div className={styles.deliverables}>
          <h2 className="mono">Deliverables</h2>
          <ul>
            {project.deliverables.map((deliverable) => (
              <li key={deliverable}>{deliverable}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
