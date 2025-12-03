import { PROJECTS } from "@/features/portfolio/data/projects";

interface SimpleProjectPageProps {
  params: {
    slug: string;
  };
}

export default function SimpleProjectPage({ params }: SimpleProjectPageProps) {
  const project = PROJECTS.find((p) => p.id === params.slug);

  if (!project) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">Project Not Found</h1>
        <p>Slug: {params.slug}</p>
        <p>Available projects: {PROJECTS.map(p => p.id).join(", ")}</p>
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">{project.title}</h1>
      <p>Project ID: {project.id}</p>
      <p>Description: {project.description}</p>
      <p>Skills: {project.skills.join(", ")}</p>
    </div>
  );
}
