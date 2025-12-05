import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function DivyaTantraPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Header />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="py-16 md:py-24 px-6 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-wide mb-4 text-red-500">
              Divine Tantra.
            </h1>
            <p className="text-xl md:text-2xl text-red-400 tracking-widest font-light">
              The Divine Saint Algorithm.
            </p>
            <p
              className="text-lg text-gray-400 mt-2"
              style={{ fontFamily: "serif", fontStyle: "italic" }}
            >
              दिव्य यंत्रो नी विधि.
            </p>
            <p className="text-sm text-gray-500 mt-1">
              (Divya Yantro Ni Vidhi).
            </p>
          </div>
        </section>

        {/* The Algorithm Section */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-red-950/20 rounded-2xl border border-red-500/30 p-8 md:p-12">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-8 text-center">
                The Algorithm.
              </h2>

              <div className="space-y-6">
                {/* Step 1 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-400">1</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg md:text-xl text-gray-200">
                      Set the intention to do the task as{" "}
                      <span className="text-red-400 font-semibold">
                        The High Priest.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 2 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-400">2</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg md:text-xl text-gray-200">
                      <span className="text-red-400 font-semibold">
                        Do The Task.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 3 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-400">3</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg md:text-xl text-gray-200">
                      Perform{" "}
                      <span className="text-red-400 font-semibold">
                        Bhairav Salute.
                      </span>
                    </p>
                  </div>
                </div>

                {/* Step 4 */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                    <span className="text-xl font-bold text-red-400">4</span>
                  </div>
                  <div className="pt-2">
                    <p className="text-lg md:text-xl text-gray-200">
                      <span className="text-red-400 font-semibold">
                        Practise, Repeat, Practise.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* The Truth Section */}
        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="bg-gray-950/50 rounded-2xl border border-red-500/20 p-8 md:p-12 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-6">
                The Truth About Tantra.
              </h2>
              <p
                className="text-xl md:text-2xl text-gray-200 leading-relaxed"
                style={{ fontFamily: "serif" }}
              >
                &ldquo;The Truth About Tantra is that there&apos;s{" "}
                <span className="text-red-400 font-bold">NO RULE</span> if you
                understand that{" "}
                <span className="text-red-400 font-bold">Sanatan Dharma</span>{" "}
                is{" "}
                <span className="text-red-400 font-bold">
                  ABOVE THE LAW.&rdquo;
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Mindfulness Section - CC&E */}
        <section className="py-16 px-6 border-t border-red-900/30">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-red-500 mb-4 text-center">
              Mindfulness Nuggets.
            </h2>
            <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
              The goal is to simply boost the threshold level of CC&E.
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Concentration */}
              <div className="bg-red-950/20 rounded-xl border border-red-500/30 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-400">C</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Concentration.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The ability to focus the mind on a single object, thought, or
                  activity. One-pointed awareness that cuts through distraction
                  and brings clarity to the present moment.
                </p>
              </div>

              {/* Clarity */}
              <div className="bg-red-950/20 rounded-xl border border-red-500/30 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-400">C</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Clarity.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  The precision and vividness with which you perceive
                  experience. Seeing things as they truly are, without the fog
                  of assumptions, projections, or mental clutter.
                </p>
              </div>

              {/* Equanimity */}
              <div className="bg-red-950/20 rounded-xl border border-red-500/30 p-6 text-center">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-900/30 border border-red-500 flex items-center justify-center">
                  <span className="text-3xl font-bold text-red-400">E</span>
                </div>
                <h3 className="text-xl font-bold text-red-400 mb-3">
                  Equanimity.
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  A balanced state of mind that remains stable regardless of
                  circumstances. Neither clinging to pleasure nor pushing away
                  pain — a profound acceptance of what is. Only the application
                  of "bare attention" continuously like Sariputta can achieve
                  this state.
                </p>
              </div>
            </div>

            {/* CC&E Summary */}
            <div className="mt-12 text-center">
              <div className="inline-block bg-black rounded-full px-8 py-4 border border-red-500/30">
                <span className="text-red-400 font-bold">C</span>
                <span className="text-gray-500 mx-1">+</span>
                <span className="text-red-400 font-bold">C</span>
                <span className="text-gray-500 mx-1">+</span>
                <span className="text-red-400 font-bold">E</span>
                <span className="text-gray-500 mx-3">=</span>
                <span className="text-white font-semibold">
                  Awakened Awareness (Energy), Upgraded Vehicle (Body) and
                  Elevated Citta (Mind).
                </span>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
