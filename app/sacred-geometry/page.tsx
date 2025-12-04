'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import SGICard from '@/components/SGICard';
import { sacredGeometryItems, searchSGI, SGI } from '@/lib/sacred-geometry-items';

const ITEMS_PER_PAGE = 6;

export default function SacredGeometryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [displayedItems, setDisplayedItems] = useState<SGI[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observerRef = useRef<HTMLDivElement>(null);

  // Get filtered items based on search
  const filteredItems = searchSGI(searchQuery);

  // Reset pagination when search changes
  useEffect(() => {
    setPage(1);
    const initialItems = filteredItems.slice(0, ITEMS_PER_PAGE);
    setDisplayedItems(initialItems);
    setHasMore(filteredItems.length > ITEMS_PER_PAGE);
  }, [searchQuery]);

  // Load more items
  const loadMore = useCallback(() => {
    if (isLoading || !hasMore) return;

    setIsLoading(true);

    // Simulate a small delay for smooth UX
    setTimeout(() => {
      const start = page * ITEMS_PER_PAGE;
      const end = start + ITEMS_PER_PAGE;
      const newItems = filteredItems.slice(start, end);

      if (newItems.length > 0) {
        setDisplayedItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setHasMore(end < filteredItems.length);
      } else {
        setHasMore(false);
      }
      setIsLoading(false);
    }, 200);
  }, [page, filteredItems, isLoading, hasMore]);

  // Intersection Observer for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoading) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => observer.disconnect();
  }, [loadMore, hasMore, isLoading]);

  // Initial load
  useEffect(() => {
    const initialItems = sacredGeometryItems.slice(0, ITEMS_PER_PAGE);
    setDisplayedItems(initialItems);
    setHasMore(sacredGeometryItems.length > ITEMS_PER_PAGE);
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-6 py-12 md:py-20">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-6xl font-light tracking-tight text-cyan-400">
              Sacred Geometry
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed text-gray-300 max-w-3xl">
              Explore the visual language of the cosmos. These geometric patterns represent
              the fundamental structures of reality, from the microcosm of atoms to the
              macrocosm of galaxies.
            </p>
          </div>
        </section>

        {/* Search Section */}
        <section className="mx-auto max-w-4xl px-6 pb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search diagrams... (e.g., chakra, element, yantra)"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pl-12 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-cyan-600 transition-colors"
            />
            <svg
              className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-gray-500">
            {searchQuery ? (
              <span>
                Found {filteredItems.length} diagram{filteredItems.length !== 1 ? 's' : ''} matching "{searchQuery}"
              </span>
            ) : (
              <span>{sacredGeometryItems.length} sacred geometry items</span>
            )}
          </div>
        </section>

        {/* Diagrams Grid */}
        <section className="mx-auto max-w-4xl px-6 pb-16">
          <div className="space-y-6">
            {displayedItems.map((item) => (
              <SGICard key={item.id} item={item} />
            ))}
          </div>

          {/* Loading indicator / Observer target */}
          <div ref={observerRef} className="py-8 flex justify-center">
            {isLoading && (
              <div className="flex items-center gap-2 text-gray-500">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                <span>Loading more...</span>
              </div>
            )}
            {!hasMore && displayedItems.length > 0 && (
              <p className="text-gray-600 text-sm">All diagrams loaded</p>
            )}
            {displayedItems.length === 0 && !isLoading && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No diagrams found matching your search.</p>
                <button
                  onClick={() => setSearchQuery('')}
                  className="mt-4 text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
