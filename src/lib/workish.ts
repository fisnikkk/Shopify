// src/lib/workish.ts
export type CoverObj = { img?: string; poster?: string; video?: string };
export type MediaCover = string | CoverObj;

export type Workish = {
    slug: string;
    title: string;
    subtitle?: string;

    // Optional labels (pick whichever exists)
    client?: string;
    brand?: string;
    company?: string;
    eyebrow?: string;

    // Overview-like
    overview?: string;
    summary?: string;
    brief?: string | string[];

    // Media
    cover?: MediaCover; // preferred
    image?: string;     // fallback
    thumb?: string;     // fallback
};

export function isCoverObj(c: unknown): c is CoverObj {
    return typeof c === "object" && c !== null;
}

/** Always return a string image for <Image src> */
export function pickCoverImage(
    cover?: MediaCover,
    fallbacks?: { image?: string; thumb?: string }
) {
    if (isCoverObj(cover)) {
        return cover.img ?? cover.poster ?? fallbacks?.image ?? fallbacks?.thumb ?? "";
    }
    return cover ?? fallbacks?.image ?? fallbacks?.thumb ?? "";
}

/** Optional: normalize a poster/img/video trio if you need video */
export function normalizeCover(cover?: MediaCover, fb?: { image?: string; thumb?: string }) {
    const poster = isCoverObj(cover) ? (cover.poster ?? cover.img) : cover ?? fb?.image ?? fb?.thumb;
    const img = isCoverObj(cover) ? (cover.img ?? cover.poster) : cover ?? fb?.image ?? fb?.thumb;
    const video = isCoverObj(cover) ? cover.video : undefined;
    return { poster, img, video };
}
