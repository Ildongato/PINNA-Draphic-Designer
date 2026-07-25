import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getNextProject, getProject, projects } from "@/data/projects";
import { site } from "@/data/site";
import { NextProject } from "@/components/project/NextProject";
import { ProjectDetails } from "@/components/project/ProjectDetails";
import { ProjectGallery } from "@/components/project/ProjectGallery";
import { ProjectHero } from "@/components/project/ProjectHero";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    return {};
  }

  return {
    title: `${project.title} - ${project.discipline}`,
    description: project.summary,
    alternates: {
      canonical: `/work/${project.slug}`
    },
    openGraph: {
      title: `${project.title} - ${site.name}`,
      description: project.summary,
      images: [
        {
          url: project.cover,
          width: project.width,
          height: project.height,
          alt: project.coverAlt
        }
      ]
    }
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProject(slug);

  if (!project) {
    notFound();
  }

  return (
    <>
      <ProjectHero project={project} />
      <ProjectDetails project={project} />
      <ProjectGallery project={project} />
      <NextProject project={getNextProject(project.slug)} />
    </>
  );
}
