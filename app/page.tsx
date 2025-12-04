import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-black text-white">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="mx-auto max-w-4xl px-6 py-20 md:py-32">
          <div className="space-y-8">
            <h1 className="text-5xl md:text-7xl font-light tracking-tight text-cyan-400">
              Piti Rain
            </h1>
            <p className="text-xl md:text-2xl font-light leading-relaxed text-gray-300 max-w-3xl">
              A customized meditation practice designed by Arhat and Zen Master Aditya Patange
              to help people access bliss states in daily life through simple movements and
              actions arising from situation practice and metta (loving-kindness).
            </p>
          </div>
        </section>

        {/* About Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-12">
            {/* Origins Section */}
            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                Origins
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  The name "Piti Rain" is derived from the Pali word पīति (pīti), which refers to
                  rapture, joy, or blissful interest. This foundational concept from Buddhist
                  meditation traditions forms the core of this practice.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                What is Piti Rain?
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  Piti Rain is a contemplative practice that integrates traditional Buddhist
                  meditation techniques with everyday life experiences. The practice focuses
                  on cultivating pīti—a Pali term referring to rapture, joy, or blissful
                  interest—through mindful awareness and loving-kindness.
                </p>
                <p>
                  By engaging with simple movements and actions that naturally arise from
                  our daily situations, practitioners learn to recognize and nurture states
                  of joy and contentment that are always available in the present moment.
                </p>
                <p>
                  Piti Rain is inspired by the presence of the water element and its fluidity.
                  Taking inspiration from Bruce Lee, Piti Rain helps you unlock the mercurial
                  grounding of Earth and the flow of water. Keeping the fire alive is your
                  responsibility, and the air element symbolizes the "Zen Bounce" or flow states
                  in modern neuroscience.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                The Practice
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-light text-cyan-300">Step 1: The Foundation</h3>
                  <p className="text-xl">
                    Simply say "Buddho" and do everything.
                  </p>
                </div>
                <div className="bg-cyan-950/30 border border-cyan-900/50 rounded-lg p-6 space-y-4">
                  <h3 className="text-2xl font-light text-cyan-300">Step 2: The Alternative</h3>
                  <p className="text-xl">
                    If Step 1 does not yield the desired results, do the same as Step 1 but chant "Shambo" instead.
                  </p>
                  <p className="text-gray-400 italic">
                    You may either do Step 1 and Step 2 in sequence, or simply do Step 1 OR Step 2 (exclusive or).
                  </p>
                </div>
                <p>
                  The foundation of Piti Rain lies in situation practice—the art of working
                  with whatever circumstances present themselves. Rather than seeking special
                  conditions or elaborate techniques, this approach teaches us to find depth
                  and joy in the ordinary.
                </p>
                <p>
                  Combined with metta (loving-kindness) meditation, Piti Rain cultivates a
                  warm, open-hearted attention to our experience. This integration allows
                  practitioners to access deeper states of ease and well-being throughout
                  their daily activities.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                Scientific Backing
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  Piti Rain is completely backed and approved by both Western and Eastern
                  science frameworks. More details will be provided as the practice evolves.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                Research Papers
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p className="italic text-gray-400">
                  Research papers will be added later.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                About the Teacher
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  Arhat and Zen Master Aditya Patange has developed this practice through
                  years of dedicated meditation and teaching. Drawing from both Theravada
                  and Zen Buddhist traditions, Master Patange offers a contemporary approach
                  to ancient wisdom, making profound states of consciousness accessible to
                  modern practitioners.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Disclaimer and Terms Section */}
        <section className="mx-auto max-w-4xl px-6 py-16">
          <div className="space-y-8">
            <div className="bg-yellow-950/20 border border-yellow-900/50 rounded-lg p-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-yellow-400">
                Important Notice
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p className="text-yellow-300 font-medium text-xl">
                  Do it at your own risk.
                </p>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-700 rounded-lg p-8 space-y-6">
              <h2 className="text-3xl md:text-4xl font-light text-cyan-400">
                Terms and Conditions
              </h2>
              <div className="space-y-4 text-lg leading-relaxed text-gray-300">
                <p>
                  You are here on your own will, and the choice to practice Piti Rain and
                  handle the challenges and difficulties is your responsibility. Aditya Patange
                  is not responsible for any loss if a person mishandles Piti Rain.
                </p>
                <p>
                  This practice is made public because it is a safe practice. However, individual
                  experiences may vary, and practitioners should approach the practice with
                  appropriate awareness and self-care.
                </p>
                <p className="text-gray-400 text-base italic">
                  This practice is legally, ethically, personally, scientifically, and
                  energetically protected.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
