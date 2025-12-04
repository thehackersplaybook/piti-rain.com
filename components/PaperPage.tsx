"use client";

import { Paper, categoryColors } from "@/lib/papers";
import Link from "next/link";
import { useMemo } from "react";

interface PaperPageProps {
  paper: Paper;
}

// Robust markdown parser for academic papers
function parseMarkdown(content: string): string {
  const lines = content.split("\n");
  const result: string[] = [];
  let inList = false;
  let listType: "ol" | "ul" | null = null;
  let paragraphBuffer: string[] = [];

  const flushParagraph = () => {
    if (paragraphBuffer.length > 0) {
      const text = paragraphBuffer.join(" ").trim();
      if (text) {
        result.push(`<p class="text-gray-300 leading-relaxed mb-6">${processInline(text)}</p>`);
      }
      paragraphBuffer = [];
    }
  };

  const closeList = () => {
    if (inList && listType) {
      result.push(`</${listType}>`);
      inList = false;
      listType = null;
    }
  };

  // Process inline formatting (bold, italic, code, citations)
  const processInline = (text: string): string => {
    let processed = text;

    // Escape HTML entities in text content only
    processed = processed
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    // Bold and italic combined
    processed = processed.replace(
      /\*\*\*(.+?)\*\*\*/g,
      '<strong class="font-semibold text-gray-200"><em>$1</em></strong>'
    );

    // Bold
    processed = processed.replace(
      /\*\*(.+?)\*\*/g,
      '<strong class="font-semibold text-gray-200">$1</strong>'
    );

    // Italic
    processed = processed.replace(
      /\*([^*]+)\*/g,
      '<em class="italic text-gray-300">$1</em>'
    );

    // Inline code
    processed = processed.replace(
      /`([^`]+)`/g,
      '<code class="bg-gray-800 text-cyan-300 px-1.5 py-0.5 rounded text-sm font-mono">$1</code>'
    );

    // Citations [Author, Year] or [Author et al., Year]
    processed = processed.replace(
      /\[([A-Za-z\s&]+(?:et al\.)?,?\s*\d{4}[a-z]?)\]/g,
      '<span class="text-cyan-400/70 text-sm">[<span class="hover:text-cyan-300 cursor-help">$1</span>]</span>'
    );

    return processed;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Empty line
    if (trimmed === "") {
      flushParagraph();
      closeList();
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      flushParagraph();
      closeList();
      result.push('<hr class="border-gray-800 my-12" />');
      continue;
    }

    // Headers (must check before other processing)
    const h4Match = trimmed.match(/^#### (.+)$/);
    if (h4Match) {
      flushParagraph();
      closeList();
      result.push(`<h4 class="text-lg font-light text-gray-300 mt-8 mb-3">${processInline(h4Match[1])}</h4>`);
      continue;
    }

    const h3Match = trimmed.match(/^### (.+)$/);
    if (h3Match) {
      flushParagraph();
      closeList();
      result.push(`<h3 class="text-xl font-light text-gray-200 mt-10 mb-4">${processInline(h3Match[1])}</h3>`);
      continue;
    }

    const h2Match = trimmed.match(/^## (.+)$/);
    if (h2Match) {
      flushParagraph();
      closeList();
      result.push(`<h2 class="text-2xl font-light text-cyan-400 mt-14 mb-6 pb-3 border-b border-gray-800">${processInline(h2Match[1])}</h2>`);
      continue;
    }

    const h1Match = trimmed.match(/^# (.+)$/);
    if (h1Match) {
      flushParagraph();
      closeList();
      result.push(`<h1 class="text-4xl md:text-5xl font-light text-gray-100 mb-6">${processInline(h1Match[1])}</h1>`);
      continue;
    }

    // Numbered list
    const olMatch = trimmed.match(/^(\d+)\.\s+(.+)$/);
    if (olMatch) {
      flushParagraph();
      if (!inList || listType !== "ol") {
        closeList();
        result.push('<ol class="my-6 ml-6 space-y-2 list-decimal list-outside">');
        inList = true;
        listType = "ol";
      }
      result.push(`<li class="text-gray-300 pl-2">${processInline(olMatch[2])}</li>`);
      continue;
    }

    // Bullet list
    const ulMatch = trimmed.match(/^[-*]\s+(.+)$/);
    if (ulMatch) {
      flushParagraph();
      if (!inList || listType !== "ul") {
        closeList();
        result.push('<ul class="my-6 ml-6 space-y-2 list-disc list-outside">');
        inList = true;
        listType = "ul";
      }
      result.push(`<li class="text-gray-300 pl-2">${processInline(ulMatch[1])}</li>`);
      continue;
    }

    // Regular text - add to paragraph buffer
    closeList();
    paragraphBuffer.push(trimmed);
  }

  // Flush any remaining content
  flushParagraph();
  closeList();

  return result.join("\n");
}

export default function PaperPage({ paper }: PaperPageProps) {
  const colors = categoryColors[paper.category];

  const renderedContent = useMemo(() => {
    return parseMarkdown(paper.content);
  }, [paper.content]);

  return (
    <article className="min-h-screen bg-black">
      {/* Hero Header */}
      <header className="pt-24 pb-16 px-6 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          {/* Back link */}
          <Link
            href="/papers"
            className="inline-flex items-center text-gray-500 hover:text-cyan-400 transition-colors mb-8 text-sm"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Back to Papers.
          </Link>

          {/* Category Badge */}
          <div className="mb-6">
            <span
              className={`text-xs font-medium px-3 py-1 rounded ${colors.bg} ${colors.text} border ${colors.border}`}
            >
              {paper.category.charAt(0).toUpperCase() + paper.category.slice(1)}.
            </span>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-light text-gray-100 mb-4 leading-tight">
            {paper.title}.
          </h1>

          {/* Subtitle */}
          {paper.subtitle && (
            <p className="text-xl md:text-2xl text-gray-400 font-light italic mb-8">
              {paper.subtitle}.
            </p>
          )}

          {/* Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 mb-8">
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <span>{paper.author}.</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <span>
                {new Date(paper.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}.
              </span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <span>{paper.readingTime} read.</span>
            </div>
          </div>

          {/* Keywords */}
          <div className="flex flex-wrap gap-2">
            {paper.keywords.map((keyword) => (
              <span
                key={keyword}
                className="text-xs text-gray-400 bg-gray-800/50 px-3 py-1 rounded-full border border-gray-700"
              >
                {keyword}.
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Abstract Box */}
      <section className="py-12 px-6 bg-gray-900/30 border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-sm font-medium text-cyan-400 uppercase tracking-wider mb-4">
            Abstract.
          </h2>
          <p className="text-gray-300 leading-relaxed text-lg">{paper.abstract}</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div
            className="paper-content"
            dangerouslySetInnerHTML={{ __html: renderedContent }}
          />
        </div>
      </main>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-gray-800 bg-gray-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                Written by{" "}
                <span className="text-gray-300">{paper.author}.</span>
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Published{" "}
                {new Date(paper.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}.
              </p>
            </div>
            <Link
              href="/papers"
              className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm flex items-center gap-2"
            >
              View all papers.
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M14 5l7 7m0 0l-7 7m7-7H3"
                />
              </svg>
            </Link>
          </div>
        </div>
      </footer>
    </article>
  );
}
