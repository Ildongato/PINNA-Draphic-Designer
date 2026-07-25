"use client";

import { useEffect } from "react";

export function RevealEnhancer() {
  useEffect(() => {
    const nodes = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion || nodes.length === 0) {
      nodes.forEach((node) => node.classList.add("is-visible"));
      return;
    }

    const frames = new Map<Element, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("is-revealable");
          const frame = window.requestAnimationFrame(() => {
            entry.target.classList.add("is-visible");
            frames.delete(entry.target);
          });
          frames.set(entry.target, frame);
          observer.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 }
    );

    nodes.forEach((node) => {
      node.classList.add("is-revealable");
      observer.observe(node);
    });

    return () => {
      frames.forEach((frame) => window.cancelAnimationFrame(frame));
      observer.disconnect();
    };
  }, []);

  return null;
}
