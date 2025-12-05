import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-6 text-center">
          {/* Navigation Links */}
          <div className="flex justify-center gap-8 pb-4">
            <Link
              href="/"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Home
            </Link>
            <Link
              href="/live-havan"
              className="text-gray-400 hover:text-orange-400 transition-colors"
            >
              Live Havan
            </Link>
            <Link
              href="/papers"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Papers
            </Link>
            <Link
              href="/sacred-geometry"
              className="text-gray-400 hover:text-cyan-400 transition-colors"
            >
              Sacred Geometry
            </Link>
            <Link
              href="/divya-tantra"
              className="text-gray-400 hover:text-red-400 transition-colors"
            >
              Divya Tantra
            </Link>
          </div>
          <div className="space-y-2">
            <p className="text-lg font-light text-cyan-400">
              Aditya Patange Productions™
            </p>
            <p className="text-sm text-gray-400">
              © {currentYear} Aditya Patange Productions. All rights reserved.
            </p>
          </div>

          <div className="pt-4">
            <p className="text-xs text-gray-500 leading-relaxed max-w-2xl mx-auto">
              Piti Rain is a meditation practice developed by Arhat and Zen Master Aditya Patange.
              The teachings and methods are intended for personal practice and spiritual development.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
