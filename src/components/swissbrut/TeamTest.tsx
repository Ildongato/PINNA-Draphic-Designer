import Image from "next/image";
import type { CSSProperties } from "react";
import styles from "./TeamTest.module.css";

const personName = "Giosi Pinna";
const personNameLines = personName.split(" ");

type MotionVars = CSSProperties & {
  "--flip-delay"?: string;
};

export function TeamTest() {
  return (
    <div className={styles.page} data-header-theme="light">
      <section className={styles.hero} aria-labelledby="test-title">
        <p className={`${styles.label} mono`}>Test</p>
        <h1 id="test-title">Giosi Pinna</h1>
        <div className={styles.person}>
          <div className={styles.image} aria-hidden="true">
            <Image
              src="/images/team/giosi.jpg"
              alt=""
              width={1542}
              height={1035}
              sizes="(max-width: 900px) 86vw, 42vw"
              priority
            />
          </div>
          <p className={styles.name}>
            <span className={styles.readableName}>{personName}</span>
            {personNameLines.map((line, index) => (
              <span
                key={line}
                className={styles.nameLine}
                data-person-name-line
                aria-hidden="true"
                style={{ "--flip-delay": `${index * 140}ms` } as MotionVars}
              >
                {line}
              </span>
            ))}
          </p>
        </div>
      </section>
    </div>
  );
}
