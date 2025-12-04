export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-gray-800">
      <div className="mx-auto max-w-4xl px-6 py-12">
        <div className="space-y-6 text-center">
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
