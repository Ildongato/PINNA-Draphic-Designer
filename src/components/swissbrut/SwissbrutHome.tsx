import type { CSSProperties } from "react";
import Image from "next/image";
import { CopyEmail } from "@/components/interaction/CopyEmail";
import { ProjectTransitionLink } from "@/components/interaction/ProjectTransitionLink";
import { ProjectMedia } from "@/components/work/ProjectMedia";
import { projects } from "@/data/projects";
import { site } from "@/data/site";
import { SwissbrutMotion } from "./SwissbrutMotion";
import styles from "./SwissbrutHome.module.css";

const workProjects = projects.slice(1, 5);

type MotionVars = CSSProperties & {
  "--delay"?: string;
  "--flip-delay"?: string;
  "--i"?: number;
};

const services = [
  { label: "Branding", detail: "Identity systems" },
  { label: "Design", detail: "Digital and print" },
  { label: "Editorial", detail: "Publications" },
  { label: "Motion", detail: "Campaign rhythm" }
];

const process = [
  {
    title: "Start",
    body: "Discovery, visual audit and positioning. We define the grid before drawing the surface."
  },
  {
    title: "Ready",
    body: "Concepts become systems: type, image, motion, hierarchy and production rules lock together."
  },
  {
    title: "Takeoff",
    body: "Final assets are prepared with care so the identity can travel across formats without losing force."
  }
];

const stats = [
  {
    value: "12",
    body: "Years of design practice, visual research and identity systems across cultural and commercial work."
  },
  {
    value: "80",
    body: "Studies, campaigns, publications and brand surfaces shaped through disciplined visual direction."
  },
  {
    value: "3",
    body: "Core modes of work: strategy, art direction and execution, held together by a precise grid."
  }
];

const person = {
  name: "Giosi Pinna",
  image: "/images/team/giosi-pinna-portrait.jpg",
  alt: "Giosi Pinna"
};

export function SwissbrutHome() {
  const heroProject = projects[0];

  return (
    <div className={styles.page} data-swissbrut-page>
      <SwissbrutMotion />
      <section className={styles.hero} data-hero-motion data-header-theme="light" aria-labelledby="hero-title">
        <div className={styles.heroStage}>
          <ProjectTransitionLink
            href={`/work/${heroProject.slug}`}
            mediaSrc={heroProject.cover}
            mediaAlt={heroProject.coverAlt}
            className={styles.heroImage}
            ariaLabel={`${heroProject.title}, ${heroProject.discipline}, ${heroProject.year}`}
          >
            <ProjectMedia
              src={heroProject.cover}
              alt={heroProject.coverAlt}
              width={heroProject.width}
              height={heroProject.height}
              backgroundColor={heroProject.dominantColor}
              ratio="1 / 1"
              sizes="(max-width: 820px) 100vw, 50vw"
              eager
            />
            <div className={`${styles.heroImageMeta} mono`} aria-hidden="true">
              <span>(01)</span>
              <span>
                {heroProject.title}
                <br />
                {heroProject.discipline}
              </span>
            </div>
          </ProjectTransitionLink>
          <div className={styles.heroPanel}>
            <div className={styles.heroTop}>
              <p>Graphic<br />Design Studio</p>
              <p>Antwerp<br />Belgium</p>
            </div>
            <h1 id="hero-title" className={styles.heroTitle}>
              PINNA.
            </h1>
          </div>
        </div>
      </section>

      <section
        id="work"
        className={styles.work}
        data-work-motion
        data-header-theme="dark"
        aria-labelledby="work-title"
      >
        <h2 id="work-title" className={styles.visuallyHidden}>Selected work</h2>
        <div className={styles.workMetaLayer} aria-hidden="true">
          {workProjects.map((project, index) => (
            <div
              className={styles.workMetaRow}
              key={project.slug}
              data-work-meta
              data-state={index === 0 ? "active" : "after"}
            >
              <span className="mono">({(index + 2).toString().padStart(2, "0")})</span>
              <span>
                {project.title}
                <br />
                {project.sector}
              </span>
            </div>
          ))}
        </div>
        {workProjects.map((project, index) => (
          <ProjectTransitionLink
            key={project.slug}
            href={`/work/${project.slug}`}
            mediaSrc={project.cover}
            mediaAlt={project.coverAlt}
            className={styles.workPanel}
            data-work-panel="true"
            ariaLabel={`${project.title}, ${project.discipline}, ${project.year}`}
          >
            <ProjectMedia
              src={project.cover}
              alt={project.coverAlt}
              width={project.width}
              height={project.height}
              backgroundColor={project.dominantColor}
              ratio="16 / 10"
              sizes="100vw"
            />
            <span className={`${styles.workIndex} mono`}>({(index + 2).toString().padStart(2, "0")})</span>
            <span className={styles.workName}>
              {project.title}
              <br />
              {project.sector}
            </span>
          </ProjectTransitionLink>
        ))}
      </section>

      <section
        id="services"
        className={styles.services}
        data-service-motion
        data-header-theme="light"
        aria-labelledby="services-title"
      >
        <p className={`${styles.sectionLabel} mono`}>Services</p>
        <h2 id="services-title" className={styles.visuallyHidden}>Services</h2>
        <ul className={styles.visuallyHidden}>
          {services.map((service) => (
            <li key={service.label}>
              {service.label}: {service.detail}
            </li>
          ))}
        </ul>
        <div className={styles.serviceList} aria-hidden="true" inert>
          {services.map((service, index) => (
            <div
              className={styles.serviceRow}
              key={service.label}
              data-service-row
              data-state={index === 0 ? "active" : "after"}
              style={{ "--i": index } as MotionVars}
            >
              <h2>{service.label}</h2>
              <span className="mono">({(index + 1).toString().padStart(2, "0")})</span>
            </div>
          ))}
        </div>
      </section>

      <section id="process" className={styles.process} data-header-theme="light" aria-labelledby="process-title">
        <p className={`${styles.sectionLabel} mono`}>Process</p>
        <h2 id="process-title" className={styles.visuallyHidden}>Process</h2>
        <div className={styles.processList}>
          {process.map((step, index) => {
            const mediaProject = workProjects[index] ?? heroProject;

            return (
              <article
                className={styles.processRow}
                key={step.title}
                style={{ "--i": index } as MotionVars}
              >
                <span className={styles.processNumber}>{index + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
                <ProjectMedia
                  className={styles.processMedia}
                  src={mediaProject.cover}
                  alt={mediaProject.coverAlt}
                  width={mediaProject.width}
                  height={mediaProject.height}
                  backgroundColor={mediaProject.dominantColor}
                  ratio="16 / 10"
                  objectPosition={index === 1 ? "50% 35%" : "50% 50%"}
                  sizes="(max-width: 900px) 100vw, 28vw"
                />
              </article>
            );
          })}
        </div>
      </section>

      <section id="about" className={styles.about} data-header-theme="light" aria-labelledby="about-title">
        <p className={`${styles.sectionLabel} mono`}>About us</p>
        <h2 id="about-title">{site.about.body}</h2>
        <div className={styles.stats} data-stats-motion>
          <div className={styles.statsStage}>
            {stats.map((stat, index) => (
              <article
                className={styles.stat}
                key={stat.value}
                data-stat-item
                style={{ "--i": index } as MotionVars}
              >
                <strong>{stat.value}</strong>
                <p>{stat.body}</p>
              </article>
            ))}
          </div>
        </div>
        <div className={styles.personFeature} data-people-motion>
          <div className={styles.personStage}>
            <div className={styles.personImage} data-person-card>
              <Image
                src={person.image}
                alt={person.alt}
                width={960}
                height={1108}
                sizes="(max-width: 700px) 82vw, (max-width: 900px) 56vw, 34vw"
                loading="eager"
                unoptimized
              />
              <p className={styles.personCaption}>
                <span>{person.name}</span>
                <span>founder</span>
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="contact"
        className={styles.contact}
        data-contact-motion
        data-header-theme="light"
        aria-labelledby="contact-title"
      >
        <h2 id="contact-title" className={styles.visuallyHidden}>Contact</h2>
        <div className={styles.contactCtaTrack} data-contact-track>
          <div className={styles.contactCtaStage} data-contact-stage>
            <p className={styles.contactStatement} data-contact-statement aria-hidden="true">
              <span data-contact-word="left">Let&apos;s</span>
              <span className={styles.contactImageSlot} data-contact-image-slot aria-hidden="true" />
              <span data-contact-word="right">talk.</span>
            </p>
            <div className={styles.contactImage} data-contact-image aria-hidden="true">
              <Image
                src={person.image}
                alt=""
                width={960}
                height={1108}
                sizes="(max-width: 700px) 92vw, 99vw"
                loading="eager"
                unoptimized
              />
              <p className={styles.contactImageCaption} data-contact-image-caption>
                <span>{person.name}</span>
                <span>founder</span>
              </p>
            </div>
          </div>
        </div>
        <div className={styles.contactFooter}>
          <div>
            <p>Contact</p>
            <a href={`mailto:${site.email}`}>{site.email}</a>
            <CopyEmail email={site.email} />
          </div>
          <div>
            <p>Visit us</p>
            <span>Belgium</span>
            <span>EU</span>
            <span>Remote</span>
          </div>
          <div>
            <p>© <span className={styles.companyName}>PINNA.</span></p>
            <span>Images from Swiss Brut</span>
            <span>Built with Codex</span>
            <span>Remix for PINNA.</span>
          </div>
          <div>
            <p>Belgium</p>
            <span>{new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone: "Europe/Brussels" })}</span>
          </div>
        </div>
      </section>
    </div>
  );
}
