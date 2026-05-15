"use client";

import { model } from "@/data/model-profile";

export function Footer() {
  return (
    <footer className="relative border-t border-[var(--line)] bg-[var(--paper)] py-12 text-[var(--ink)] sm:py-16">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-6 px-5 sm:flex-row sm:items-end sm:justify-between sm:px-8">
        <div>
          <div className="font-display text-3xl sm:text-4xl">{model.fullName}</div>
          <div className="tracking-meta mt-2 text-[var(--ink)]/55">
            Portfolio · {new Date().getFullYear()} · All images © {model.fullName}
          </div>
        </div>
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm tracking-[0.18em] uppercase">
          <a href={`mailto:${model.contact.email}`} className="hover:underline underline-offset-4">
            {model.contact.email}
          </a>
          <a
            href={model.contact.instagramUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="hover:underline underline-offset-4"
          >
            {model.contact.instagram}
          </a>
          <a href="#top" className="hover:underline underline-offset-4">
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
