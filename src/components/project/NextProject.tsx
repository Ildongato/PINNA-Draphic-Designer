import type { Project } from "@/data/types";
import { ProjectTransitionLink } from "@/components/interaction/ProjectTransitionLink";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./NextProject.module.css";

export function NextProject({ project }: { project: Project }) {
  return (
    <section className={styles.section} data-header-theme="dark">
      <ProjectTransitionLink
        href={`/work/${project.slug}`}
        mediaSrc={project.cover}
        mediaAlt={project.coverAlt}
        className={styles.link}
        ariaLabel={`Next project: ${project.title}`}
      >
        <p className={`${styles.label} mono`}>Next project</p>
        <h2 className={styles.title}>{project.title}</h2>
        <ProjectMedia
          className={styles.media}
          src={project.cover}
          alt={project.coverAlt}
          width={project.width}
          height={project.height}
          backgroundColor={project.dominantColor}
          ratio="16 / 9"
          sizes="(max-width: 760px) 92vw, 40vw"
        />
      </ProjectTransitionLink>
    </section>
  );
}
