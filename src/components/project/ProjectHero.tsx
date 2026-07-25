import type { Project } from "@/data/types";
import { ProjectHeroReady } from "@/components/interaction/ProjectHeroReady";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./ProjectHero.module.css";

export function ProjectHero({ project }: { project: Project }) {
  return (
    <section className={styles.hero} data-header-theme={project.theme} data-project-hero>
      <ProjectHeroReady slug={project.slug} />
      <ProjectMedia
        className={styles.media}
        src={project.cover}
        alt={project.coverAlt}
        width={project.width}
        height={project.height}
        backgroundColor={project.dominantColor}
        ratio="21 / 9"
        sizes="100vw"
        eager
      />
      <div className={styles.titleBand}>
        <p className={`${styles.label} mono`}>Case study</p>
        <h1 className={styles.title}>{project.title}</h1>
        <p className={`${styles.meta} mono`}>
          <span>{project.discipline}</span>
          <span>{project.sector}</span>
          <span>{project.year}</span>
        </p>
      </div>
    </section>
  );
}
