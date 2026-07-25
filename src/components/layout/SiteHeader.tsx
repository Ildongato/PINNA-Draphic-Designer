"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/data/site";
import styles from "./SiteHeader.module.css";

function getFocusable(container: HTMLElement) {
  return Array.from(
    container.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )
  ).filter((element) => !element.hasAttribute("disabled"));
}

export function SiteHeader() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let frame = 0;

    function readTheme() {
      const probeY = Math.max(72, window.innerHeight * 0.08);
      const themedSections = Array.from(document.querySelectorAll<HTMLElement>("[data-header-theme]"));
      const active = themedSections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= probeY && rect.bottom >= probeY;
      });

      setTheme(active?.dataset.headerTheme === "dark" ? "dark" : "light");
    }

    function scheduleRead() {
      window.cancelAnimationFrame(frame);
      frame = window.requestAnimationFrame(readTheme);
    }

    readTheme();
    window.addEventListener("scroll", scheduleRead, { passive: true });
    window.addEventListener("resize", scheduleRead);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", scheduleRead);
      window.removeEventListener("resize", scheduleRead);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const menu = menuRef.current;
    const firstLink = menu?.querySelector<HTMLElement>("a[href]");
    firstLink?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
        return;
      }

      if (event.key !== "Tab" || !menu) {
        return;
      }

      const focusable = getFocusable(menu);
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  function closeMenu() {
    setOpen(false);
    triggerRef.current?.focus();
  }

  return (
    <header className={styles.header} data-theme={theme} data-open={open}>
      {open ? (
        <div id="mobile-menu" className={styles.mobileMenu} data-open={open} ref={menuRef}>
          <nav aria-label="Mobile navigation">
            {site.navigation.map((item) => (
              <Link key={item.href} href={item.href} onClick={closeMenu}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className={styles.mobileMeta}>
            <span>{site.availability}</span>
            <span>{site.location}</span>
          </div>
        </div>
      ) : null}
      <div className={styles.bar}>
        <Link className={styles.wordmark} href="/" aria-label="PINNA. home">
          {site.name}
        </Link>
        <nav className={styles.nav} aria-label="Primary navigation">
          {site.navigation.map((item) => (
            <Link key={item.href} href={item.href}>
              {item.label}
            </Link>
          ))}
        </nav>
        <button
          ref={triggerRef}
          className={styles.menuButton}
          type="button"
          aria-controls="mobile-menu"
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((current) => !current)}
        >
          <span className={styles.menuIcon} aria-hidden="true" />
        </button>
      </div>
    </header>
  );
}
