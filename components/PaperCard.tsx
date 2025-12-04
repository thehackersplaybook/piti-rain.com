"use client";

import Link from "next/link";
import { Paper, categoryColors } from "@/lib/papers";

interface PaperCardProps {
  paper: Paper;
}

export default function PaperCard({ paper }: PaperCardProps) {
  const colors = categoryColors[paper.category];

  return (
    <Link href={`/papers/${paper.slug}`}>
      <article className="group bg-gray-900/50 border border-gray-700 rounded-lg p-6 hover:border-cyan-700 transition-colors cursor-pointer">
        {/* Category Badge */}
        <div className="flex items-center justify-between mb-4">
          <span
            className={`text-xs font-medium px-2 py-1 rounded ${colors.bg} ${colors.text} border ${colors.border}`}
          >
            {paper.category.charAt(0).toUpperCase() + paper.category.slice(1)}.
          </span>
          <span className="text-gray-500 text-sm">{paper.readingTime} read.</span>
        </div>

        {/* Title */}
        <h2 className="text-xl font-light text-gray-100 group-hover:text-cyan-400 transition-colors mb-2">
          {paper.title}.
        </h2>

        {/* Subtitle */}
        {paper.subtitle && (
          <p className="text-gray-400 text-sm italic mb-3">{paper.subtitle}.</p>
        )}

        {/* Abstract Preview */}
        <p className="text-gray-400 text-sm leading-relaxed mb-4 line-clamp-3">
          {paper.abstract}
        </p>

        {/* Meta Info */}
        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-800">
          <span>{paper.author}.</span>
          <span>
            {new Date(paper.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}.
          </span>
        </div>

        {/* Keywords */}
        <div className="flex flex-wrap gap-2 mt-4">
          {paper.keywords.slice(0, 5).map((keyword) => (
            <span
              key={keyword}
              className="text-xs text-gray-500 bg-gray-800/50 px-2 py-1 rounded"
            >
              {keyword}.
            </span>
          ))}
          {paper.keywords.length > 5 && (
            <span className="text-xs text-gray-600">
              +{paper.keywords.length - 5} more.
            </span>
          )}
        </div>
      </article>
    </Link>
  );
}
