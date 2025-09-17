"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function FloatingCTA() {
    const [show, setShow] = useState(false);
    useEffect(() => {
        const onScroll = () => setShow(window.scrollY > 320);
        onScroll();
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);
    if (!show) return null;
    return (
        <Link
            href="/contact"
            className="fixed right-4 md:right-8 top-4 md:top-8 z-40 rounded-full bg-black text-white px-4 py-2 text-sm shadow-md hover:bg-black/90"
        >
            Get In Touch
        </Link>
    );
}
