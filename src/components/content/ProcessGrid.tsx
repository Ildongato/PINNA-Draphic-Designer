import { processImages } from "@/data/process";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import styles from "./Sections.module.css";

const visibleProcessImages = processImages.slice(0, 4);

export function ProcessGrid() {
  return (
    <section className={styles.process} data-header-theme="light" aria-labelledby="process-title">
      <div className={styles.processIntro}>
        <p className={`${styles.sectionLabel} mono`}>Studio notes</p>
        <h2 id="process-title">Grid. Type. Colour. Proof.</h2>
      </div>
      <div className={styles.processGrid}>
        {visibleProcessImages.map((image, index) => (
          <div className={styles.processItem} key={image.src}>
            <ProjectMedia
              src={image.src}
              alt={image.alt}
              width={image.width}
              height={image.height}
              ratio="4 / 5"
              sizes="(max-width: 640px) 92vw, (max-width: 900px) 45vw, 23vw"
            />
            <p className={`${styles.caption} mono`}>
              {(index + 1).toString().padStart(2, "0")} / {image.alt.replace(" process artwork", "")}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
