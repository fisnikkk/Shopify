// src/lib/normalizeCaseStudy.ts
export type RawKPI = { label?: string; title?: string; value?: unknown };
export type RawCover = string | { poster?: string; img?: string; video?: string };

export type RawCaseStudy = {
    slug: string;
    title: string;
    subtitle?: string;
    eyebrow?: string;

    // media
    cover: RawCover;
    gallery?: string[];
    images?: string[];

    // overview
    summary?: string;
    brief?: string | string[];

    // lists
    highlights?: string[];
    shipped?: string[];
    deliverables?: string[];

    // sections
    sections?: { heading: string; body: string }[] | string[];

    // outcomes / metrics
    outcomes?: RawKPI[];
    results?: RawKPI[];
    metrics?: RawKPI[];

    // misc optional fields used by some cards
    client?: string;
    category?: string;
    industry?: string;
    meta?: {
        industry?: string;
        project?: string;
        role?: string;
        url?: string | string[];
    };

    // allow extra keys without tripping TS
    [key: string]: unknown;
};

export type CaseStudy = {
    slug: string;
    title: string;
    subtitle?: string;
    eyebrow?: string;

    coverPoster?: string;
    coverImg?: string;
    coverVideo?: string;

    gallery: string[];
    overview: string;
    highlights: string[];
    sections: { heading: string; body: string }[];
    outcomes: { label: string; value: string }[];
    stack: string[]; // if you later want this, wire it in like others

    client?: string;
    category?: string;
    industry?: string;
    meta: {
        industry?: string;
        project?: string;
        role?: string;
        url?: string;
    };
};

export function normalizeCaseStudy(raw: RawCaseStudy): CaseStudy {
    // cover (string or object)
    const coverObj = typeof raw.cover === "string" ? {} : (raw.cover ?? {});
    const coverPoster =
        typeof raw.cover === "string" ? raw.cover : coverObj.poster ?? coverObj.img;
    const coverImg =
        typeof raw.cover === "string" ? raw.cover : coverObj.img ?? coverObj.poster;
    const coverVideo = typeof raw.cover === "string" ? undefined : coverObj.video;

    // gallery
    const gallery = raw.gallery ?? raw.images ?? [];

    // overview/summary
    const overview =
        raw.summary ??
        (Array.isArray(raw.brief) ? raw.brief.join("\n\n") : raw.brief ?? "");

    // highlights
    const highlights = raw.highlights ?? raw.shipped ?? raw.deliverables ?? [];

    // sections
    const sections = Array.isArray(raw.sections)
        ? raw.sections.map((s) =>
            typeof s === "string" ? { heading: "", body: s } : s
        )
        : [];

    // outcomes/results/metrics → normalized
    const kpis = raw.outcomes ?? raw.results ?? raw.metrics ?? [];
    const outcomes = kpis
        .map((k) => {
            const label = String(k.label ?? k.title ?? "");
            const v = k.value;
            const value = Array.isArray(v)
                ? v.filter(Boolean).map(String).join(" · ")
                : v == null
                    ? ""
                    : String(v);
            return { label, value };
        })
        .filter((x) => x.label || x.value);

    // meta
    const metaUrl = Array.isArray(raw.meta?.url)
        ? raw.meta?.url[0]
        : raw.meta?.url;

    return {
        slug: raw.slug,
        title: raw.title,
        subtitle: raw.subtitle,
        eyebrow: raw.eyebrow,

        coverPoster,
        coverImg,
        coverVideo,

        gallery,
        overview,
        highlights,
        sections,
        outcomes,
        stack: [], // optional: wire in if you have stack/tech later

        client: raw.client,
        category: raw.category,
        industry: raw.meta?.industry ?? raw.industry,
        meta: {
            industry: raw.meta?.industry ?? raw.industry,
            project: raw.meta?.project as string | undefined,
            role: raw.meta?.role as string | undefined,
            url: metaUrl,
        },
    };
}
