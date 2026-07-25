import { site } from "@/data/site";
import styles from "./Sections.module.css";

const descriptors = [
  "Identity logic",
  "Image direction",
  "Publications",
  "Material systems",
  "Campaign worlds",
  "Digital expression"
];

export function ServicesIndex() {
  return (
    <section className={styles.services} data-header-theme="dark" aria-labelledby="services-title">
      <div className={styles.servicesInner}>
        <p className={`${styles.sectionLabel} mono`}>Services</p>
        <ol className={styles.serviceList} id="services-title">
          {site.services.map((service, index) => (
            <li key={service} data-reveal>
              <span className="mono">{(index + 1).toString().padStart(2, "0")}</span>
              <span className={styles.serviceName}>{service}</span>
              <span className={`${styles.descriptor} mono`}>{descriptors[index]}</span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
