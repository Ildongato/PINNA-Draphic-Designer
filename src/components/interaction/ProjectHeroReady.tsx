"use client";

import { useEffect } from "react";

export function ProjectHeroReady({ slug }: { slug: string }) {
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("pinna:project-hero-ready", { detail: { slug } }));
  }, [slug]);

  return null;
}
