import type { Project } from "@/data/types";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./ProjectGallery.module.css";

const captions = ["System study", "Application", "Detail crop", "Editorial spread"];
const ratios = ["16 / 9", "16 / 9", "16 / 9", "16 / 9"];

export function ProjectGallery({ project }: { project: Project }) {
  return (
    <section className={styles.gallery} data-header-theme="light" aria-label={`${project.title} gallery`}>
      <div className={styles.grid}>
        {project.gallery.map((image, index) => (
          <div className={styles.item} key={image.src}>
            <ProjectMedia
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              backgroundColor={project.dominantColor}
              ratio={ratios[index]}
              sizes={index === 0 ? "100vw" : "(max-width: 760px) 92vw, 48vw"}
            />
            <p className={`${styles.caption} mono`}>
              {(index + 1).toString().padStart(2, "0")} / {captions[index]}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
