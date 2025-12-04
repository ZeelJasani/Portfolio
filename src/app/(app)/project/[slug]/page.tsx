import { ArrowLeftIcon } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";

import { Prose } from "@/components/ui/typography";
import { getProjectContent } from "@/features/portfolio/utils/mdx";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectContent(slug);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.frontmatter.title,
    description: project.frontmatter.description,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectContent(slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-3xl py-10">
      <Link
        href="/#projects"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
      >
        <ArrowLeftIcon className="size-4" />
        Back to Projects
      </Link>

      <header className="mb-10 border-b border-edge pb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {project.frontmatter.title}
        </h1>
        {project.frontmatter.description && (
          <p className="mt-4 text-xl text-muted-foreground">
            {project.frontmatter.description}
          </p>
        )}
      </header>

      <Prose>
        <MDXRemote source={project.content} />
      </Prose>
    </div>
  );
}
