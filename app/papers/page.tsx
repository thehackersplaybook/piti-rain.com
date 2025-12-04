import { papers } from "@/lib/papers";
import PaperCard from "@/components/PaperCard";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research Papers | Piti Rain",
  description:
    "Explore comprehensive research papers on yoga, philosophy, consciousness studies, and the intersection of ancient wisdom with modern science.",
  keywords: [
    "research papers",
    "yoga research",
    "consciousness studies",
    "philosophy",
    "contemplative science",
    "mind-body medicine",
  ],
};

export default function PapersPage() {
  return (
    <div className="min-h-screen bg-black text-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="py-20 md:py-32 px-6 text-center border-b border-gray-800">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-light text-cyan-400 mb-6 tracking-tight">
            Research Papers.
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-light max-w-2xl mx-auto leading-relaxed">
            Comprehensive research exploring the intersection of ancient wisdom
            traditions and contemporary scientific understanding.
          </p>
        </div>
      </section>

      {/* Papers Grid */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          {papers.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">
                No papers published yet. Check back soon.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {papers.map((paper) => (
                <PaperCard key={paper.id} paper={paper} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-6 border-t border-gray-800 bg-gray-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-light text-gray-200 mb-4">
            Contribute to Our Research.
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto mb-6">
            We welcome collaboration with researchers, practitioners, and
            scholars interested in bridging ancient wisdom with modern science.
          </p>
          <a
            href="mailto:contact.adityapatange@gmail.com"
            className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Get in touch.
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
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
