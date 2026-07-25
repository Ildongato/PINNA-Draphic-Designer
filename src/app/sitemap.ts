import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    {
      url: site.url,
      lastModified: now
    },
    ...projects.map((project) => ({
      url: `${site.url}/work/${project.slug}`,
      lastModified: now
    }))
  ];
}
