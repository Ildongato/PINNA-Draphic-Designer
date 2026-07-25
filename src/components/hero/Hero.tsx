import { site } from "@/data/site";
import { projects } from "@/data/projects";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./Hero.module.css";

const heroProjects = projects.slice(0, 3);

export function Hero() {
  return (
    <section className={styles.hero} data-header-theme="light">
      <div className={styles.inner}>
        <div className={styles.kicker}>
          <p className={`${styles.eyebrow} mono`}>{site.hero.eyebrow}</p>
          <p className={styles.support}>{site.hero.supporting}</p>
        </div>
        <h1 className={styles.headline}>{site.hero.headline}</h1>
        <div className={styles.visualGrid} aria-label="Featured project images">
          {heroProjects.map((project, index) => (
            <div className={index === 0 ? styles.primaryVisual : styles.secondaryVisual} key={project.slug}>
              <ProjectMedia
                src={project.cover}
                alt={project.coverAlt}
                width={project.width}
                height={project.height}
                backgroundColor={project.dominantColor}
                ratio="21 / 9"
                sizes={index === 0 ? "(max-width: 900px) 100vw, 64vw" : "(max-width: 900px) 48vw, 28vw"}
                eager={index === 0}
              />
              <p className={`${styles.visualCaption} mono`}>
                <span>{project.title}</span>
                <span>{project.year}</span>
              </p>
            </div>
          ))}
        </div>
        <div className={styles.meta}>
          <p className={`${styles.disciplines} mono`}>{site.hero.disciplines}</p>
          <p className={`${styles.status} mono`}>
            {site.availability} / {site.location}
          </p>
          <span className={styles.cue} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
