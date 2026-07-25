import { projects } from "@/data/projects";
import { ProjectCard } from "./ProjectCard";
import styles from "./WorkGrid.module.css";

export function WorkGrid() {
  return (
    <section id="work" className={styles.section} data-header-theme="dark">
      <div className={styles.intro}>
        <p className={`${styles.label} mono`}>Selected work</p>
        <h2 className={styles.statement}>Case studies as visual systems.</h2>
        <p className={`${styles.meta} mono`}>
          2024-2026 / {projects.length.toString().padStart(2, "0")} studies
        </p>
      </div>
      <div className={styles.grid}>
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} featured={index === 0} />
        ))}
      </div>
    </section>
  );
}
