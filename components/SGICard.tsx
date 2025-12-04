'use client';

import { SGI } from '@/lib/sacred-geometry-items';

interface SGICardProps {
  item: SGI;
}

export default function SGICard({ item }: SGICardProps) {
  const categoryColors: Record<SGI['category'], string> = {
    yantra: 'bg-red-900/50 text-red-300 border-red-700',
    chakra: 'bg-purple-900/50 text-purple-300 border-purple-700',
    mantra: 'bg-amber-900/50 text-amber-300 border-amber-700',
    element: 'bg-green-900/50 text-green-300 border-green-700',
    cosmic: 'bg-blue-900/50 text-blue-300 border-blue-700',
  };

  return (
    <div className="bg-gray-900/50 border border-gray-700 rounded-lg overflow-hidden hover:border-cyan-700 transition-colors">
      <div className="p-4 flex flex-col md:flex-row gap-4">
        {/* SVG Diagram */}
        <div
          className="w-full md:w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden bg-black"
          dangerouslySetInnerHTML={{ __html: item.svg }}
        />

        {/* Content */}
        <div className="flex-grow space-y-3">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xl font-light text-cyan-400">{item.name}</h3>
              <span className={`text-xs px-2 py-1 rounded border ${categoryColors[item.category]}`}>
                {item.category}
              </span>
            </div>
            {item.sanskrit && (
              <p className="text-lg text-gray-400">{item.sanskrit}</p>
            )}
          </div>

          <p className="text-gray-300 leading-relaxed">{item.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {item.keywords.slice(0, 6).map((keyword) => (
              <span
                key={keyword}
                className="text-xs px-2 py-1 bg-gray-800 text-gray-400 rounded"
              >
                {keyword}
              </span>
            ))}
            {item.keywords.length > 6 && (
              <span className="text-xs px-2 py-1 text-gray-500">
                +{item.keywords.length - 6} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
