"use client";

import { useState } from "react";
import Link from "next/link";
import { blogPosts, blogCategories, type BlogPost } from "@/content/blog";

/**
 * Blog-Feed mit Kategorie-Filter (Client-Component).
 * Karten zeigen Titel, Direct-Answer-Auszug, Kategorie-Badge und Prüfdatum —
 * derselbe Trust-Standard wie auf den Artikeln selbst.
 */

function formatDate(iso: string) {
  return new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <Link
      href={`/${post.slug}`}
      className="group flex flex-col rounded-3xl border border-line-soft bg-white p-7 transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-700 hover:shadow-lg hover:shadow-brand-950/5"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-brand-100 px-3 py-1 text-xs font-semibold text-brand-800">
          {post.category.label}
        </span>
        <time dateTime={post.date} className="text-xs text-ink-soft">
          {formatDate(post.date)}
        </time>
      </div>
      <h2 className="font-display mt-4 text-lg font-bold leading-snug text-ink group-hover:text-brand-800">
        {post.title}
      </h2>
      <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-ink-soft">{post.excerpt}</p>
      <span className="mt-4 text-sm font-semibold text-brand-700 group-hover:underline">
        Weiterlesen →
      </span>
    </Link>
  );
}

export function BlogFeed() {
  const [active, setActive] = useState<string>("alle");
  const filtered =
    active === "alle" ? blogPosts : blogPosts.filter((p) => p.category.id === active);

  return (
    <div>
      {/* Filter-Chips */}
      <div className="flex flex-wrap gap-2" role="tablist" aria-label="Blog-Kategorien">
        <FilterChip
          label="Alle Artikel"
          active={active === "alle"}
          onClick={() => setActive("alle")}
        />
        {blogCategories.map((c) => (
          <FilterChip
            key={c.id}
            label={c.label}
            active={active === c.id}
            onClick={() => setActive(c.id)}
          />
        ))}
      </div>

      {/* Feed */}
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}

function FilterChip({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
        active
          ? "bg-brand-600 text-white"
          : "border border-line bg-white text-ink-soft hover:border-brand-600 hover:text-brand-700"
      }`}
    >
      {label}
    </button>
  );
}
