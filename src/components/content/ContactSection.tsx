import { CopyEmail } from "@/components/interaction/CopyEmail";
import { site } from "@/data/site";
import styles from "./Sections.module.css";

export function ContactSection() {
  return (
    <section id="contact" className={styles.contact} data-header-theme="light">
      <div className={styles.contactInner}>
        <div className={styles.contactCopy}>
          <p className={`${styles.sectionLabel} mono`}>Contact</p>
          <h2>Available for visual systems, identities and art direction.</h2>
        </div>
        <div className={styles.contactDetails}>
          <a className={styles.email} href={`mailto:${site.email}`}>
            {site.email}
          </a>
          <CopyEmail email={site.email} />
          <p className={`${styles.contactMeta} mono`}>
            {site.availability} / {site.location}
          </p>
          <div className={styles.socials} aria-label="Social links">
            {site.socials.map((social) =>
              social.href === "#" ? (
                <span key={social.label} aria-disabled="true">
                  {social.label}
                </span>
              ) : (
                <a key={social.label} href={social.href}>
                  {social.label}
                </a>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
