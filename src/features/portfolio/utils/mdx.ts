import fs from "fs";
import path from "path";

import matter from "gray-matter";

const projectsDirectory = path.join(
    process.cwd(),
    "src/features/portfolio/content/projects",
);

export async function getProjectContent(slug: string) {
    const fullPath = path.join(projectsDirectory, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { content, data } = matter(fileContents);

    return {
        slug,
        content,
        frontmatter: data,
    };
}
