"use client";
import { useRef, ReactNode } from "react";

export default function MagneticButton({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  // Use a generic HTMLDivElement for the ref since we changed the root element to a div
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        if (!ref.current) return;
        const r = ref.current.getBoundingClientRect();
        const x = e.clientX - (r.left + r.width / 2);
        const y = e.clientY - (r.top + r.height / 2);
        // Apply a subtle transform based on cursor position
        ref.current.style.transform = `translate(${x * 0.08}px, ${y * 0.08}px)`;
      }}
      onMouseLeave={() => {
        if (!ref.current) return;
        // Reset transform on mouse leave
        ref.current.style.transform = "";
      }}
      // Note the transition-transform and will-change-transform for performance
      className={`transition-transform will-change-transform ${className}`}
    >
      {children}
    </div>
  );
}
