import Link from 'next/link';

export default function Header() {
  return (
    <header className="border-b border-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link
            href="/"
            className="text-xl font-light text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            Piti Rain
          </Link>

          <div className="flex items-center gap-6">
            <Link
              href="/live-havan"
              className="text-gray-300 hover:text-orange-400 transition-colors"
            >
              Live Havan
            </Link>
            <Link
              href="/papers"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Papers
            </Link>
            <Link
              href="/sacred-geometry"
              className="text-gray-300 hover:text-cyan-400 transition-colors"
            >
              Sacred Geometry
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
