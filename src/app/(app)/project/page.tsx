import type { ProfilePage as PageSchema, WithContext } from "schema-dts";

import { Projects } from "@/features/portfolio/components/projects";
import { USER } from "@/features/portfolio/data/user";

export default function ProjectsPage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(getPageJsonLd()).replace(/</g, "\\u003c"),
                }}
            />

            <div className="mx-auto md:max-w-3xl py-12">
                <header className="mb-8 px-4">
                    <h1 className="text-3xl font-bold tracking-tight">All Projects</h1>
                    <p className="mt-2 text-muted-foreground">
                        A collection of tools, applications, and experiments I&apos;ve built.
                    </p>
                </header>
                <Projects />
            </div>
        </>
    );
}

function getPageJsonLd(): WithContext<PageSchema> {
    return {
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        dateCreated: new Date(USER.dateCreated).toISOString(),
        dateModified: new Date().toISOString(),
        mainEntity: {
            "@type": "Person",
            name: USER.displayName,
            identifier: USER.username,
            image: USER.avatar,
        },
    };
}
