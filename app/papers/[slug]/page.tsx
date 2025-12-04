import { notFound } from "next/navigation";
import { getPaperBySlug, getAllPaperSlugs, papers } from "@/lib/papers";
import PaperPage from "@/components/PaperPage";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Generate static params for all papers
export async function generateStaticParams() {
  return getAllPaperSlugs().map((slug) => ({
    slug,
  }));
}

// Generate metadata for each paper
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    return {
      title: "Paper Not Found | Piti Rain",
    };
  }

  return {
    title: `${paper.title} | Piti Rain`,
    description: paper.abstract,
    keywords: paper.keywords,
    authors: [{ name: paper.author }],
    openGraph: {
      title: paper.title,
      description: paper.abstract,
      type: "article",
      publishedTime: paper.date,
      authors: [paper.author],
      tags: paper.keywords,
    },
  };
}

export default async function PaperPageRoute({ params }: PageProps) {
  const { slug } = await params;
  const paper = getPaperBySlug(slug);

  if (!paper) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />
      <PaperPage paper={paper} />
      <Footer />
    </div>
  );
}
