import type { Project } from "@/data/types";
import { ProjectTransitionLink } from "@/components/interaction/ProjectTransitionLink";
import { ProjectMedia } from "./ProjectMedia";
import styles from "./ProjectCard.module.css";

type ProjectCardProps = {
  project: Project;
  index: number;
  featured?: boolean;
};

export function ProjectCard({ project, index, featured = false }: ProjectCardProps) {
  return (
    <ProjectTransitionLink
      href={`/work/${project.slug}`}
      mediaSrc={project.cover}
      mediaAlt={project.coverAlt}
      className={`${styles.card} ${featured ? styles.featuredCard : ""}`}
      ariaLabel={`${project.title}, ${project.discipline}, ${project.year}`}
    >
      <article className={styles.article} data-featured={featured}>
        <ProjectMedia
          src={project.cover}
          alt={project.coverAlt}
          width={project.width}
          height={project.height}
          backgroundColor={project.dominantColor}
          ratio="16 / 10"
          sizes={featured ? "(max-width: 900px) 92vw, 62vw" : "(max-width: 900px) 92vw, 46vw"}
        />
        <div className={styles.meta} data-reveal>
          <span className={`${styles.index} mono`}>{(index + 1).toString().padStart(2, "0")}</span>
          <h2 className={styles.title}>{project.title}</h2>
          <p className={`${styles.details} mono`}>
            {project.discipline} / {project.year}
          </p>
        </div>
      </article>
    </ProjectTransitionLink>
  );
}
