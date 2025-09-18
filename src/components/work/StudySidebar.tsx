// src/components/work/StudySidebar.tsx
import Link from "next/link";

// Flexible shape just for the sidebar
type Metaish = {
    industry?: string;
    project?: string;
    technology?: string[]; // if it's a string in your data, join it before passing
    website?: { label?: string; href?: string } | string;
};

export default function StudySidebar({ cs }: { cs: Metaish }) {
    // allow website to be either object or plain string
    const websiteLabel =
        typeof cs.website === "string" ? cs.website : cs.website?.label;
    const websiteHref =
        typeof cs.website === "string" ? undefined : cs.website?.href;

    return (
        <aside className="sticky top-24 rounded-2xl bg-white/5 p-5 ring-1 ring-white/10">
            <dl className="space-y-4 text-sm">
                {cs.industry && (
                    <div>
                        <dt className="text-white/60">Industry</dt>
                        <dd className="text-white">{cs.industry}</dd>
                    </div>
                )}
                {cs.project && (
                    <div>
                        <dt className="text-white/60">Project</dt>
                        <dd className="text-white">{cs.project}</dd>
                    </div>
                )}
                {cs.technology?.length ? (
                    <div>
                        <dt className="text-white/60">Technology</dt>
                        <dd className="text-white">{cs.technology.join(", ")}</dd>
                    </div>
                ) : null}
                {websiteLabel && (
                    <div>
                        <dt className="text-white/60">Website</dt>
                        <dd className="text-white">
                            {websiteHref ? (
                                <Link
                                    href={websiteHref}
                                    className="underline decoration-white/30 hover:decoration-white"
                                >
                                    {websiteLabel}
                                </Link>
                            ) : (
                                websiteLabel
                            )}
                        </dd>
                    </div>
                )}
            </dl>
        </aside>
    );
}
