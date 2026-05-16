// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: HomePage,
})

function HomePage() {
  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* NAVBAR */}
      <nav className="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-screen-2xl mx-auto px-8 py-6 flex justify-between items-center">
          <div className="text-4xl tracking-[4px] font-serif text-[#D4AF77]">ÉCLAT</div>
          
          <div className="hidden md:flex gap-10 text-sm uppercase tracking-widest">
            <a href="#villas" className="hover:text-[#D4AF77] transition-colors">Villas</a>
            <a href="#wellness" className="hover:text-[#D4AF77] transition-colors">Wellness</a>
            <a href="#investment" className="hover:text-[#D4AF77] transition-colors">Investment</a>
            <a href="#experience" className="hover:text-[#D4AF77] transition-colors">Experience</a>
          </div>

          <button 
            onClick={() => document.getElementById('cta')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-[#D4AF77] hover:bg-[#D4AF77] hover:text-black transition-all text-sm tracking-widest"
          >
            BOOK PRIVATE VIEWING
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section 
        className="h-screen bg-cover bg-center relative flex items-center"
        style={{ 
          backgroundImage: "linear-gradient(rgba(10,10,10,0.55), rgba(10,10,10,0.75)), url('https://picsum.photos/id/1015/2000/1200')" 
        }}
      >
        <div className="max-w-screen-2xl mx-auto px-8 pt-20">
          <h1 className="text-7xl md:text-8xl leading-none tracking-tighter font-serif max-w-4xl">
            Timeless Luxury.<br />
            <span className="bg-gradient-to-r from-[#D4AF77] via-[#F5E8C7] to-[#D4AF77] bg-clip-text text-transparent">
              Future-Forward Living.
            </span>
          </h1>
          <p className="mt-6 text-3xl text-white/80">Signature oceanfront villas in Mauritius • from £1.25 million</p>
          
          <div className="mt-12 flex gap-6">
            <button 
              onClick={() => document.getElementById('villas')?.scrollIntoView({ behavior: 'smooth' })}
              className="px-12 py-5 bg-[#D4AF77] text-black font-medium hover:bg-white transition-all text-lg tracking-wider"
            >
              EXPLORE THE COLLECTION
            </button>
          </div>
        </div>
      </section>

      {/* SIGNATURE VILLAS */}
      <section id="villas" className="py-28 bg-black">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-6xl font-serif text-center mb-16">Signature Villas</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group">
              <img src="https://picsum.photos/id/1015/800/600" className="w-full aspect-video object-cover rounded-3xl" alt="Lumina" />
              <div className="mt-6">
                <p className="text-[#D4AF77] text-sm">GRAND BAIE</p>
                <p className="text-3xl font-serif">Lumina Residences</p>
                <p className="text-xl">From £1.85m</p>
              </div>
            </div>
            <div className="group">
              <img src="https://picsum.photos/id/133/800/600" className="w-full aspect-video object-cover rounded-3xl" alt="Aether" />
              <div className="mt-6">
                <p className="text-[#D4AF77] text-sm">LE MORNE</p>
                <p className="text-3xl font-serif">Aether Villa</p>
                <p className="text-xl">From £2.95m</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WELLNESS SANCTUARY */}
      <section id="wellness" className="py-28 bg-[#111111]">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-6xl font-serif text-center mb-16">The Sanctuary</h2>
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-2xl text-white/80 mb-10">Exclusive members-only ultra-luxury wellness sanctuary within the private estate.</p>
              <ul className="space-y-6 text-lg">
                <li>∞ Infinity-edge spa pools merging with the ocean</li>
                <li>Gold-infused treatments &amp; sound-healing domes</li>
                <li>Organic garden-to-table nutrition</li>
                <li>24/7 wellness concierge</li>
              </ul>
            </div>
            <img src="https://picsum.photos/id/1016/900/600" className="rounded-3xl" alt="Sanctuary" />
          </div>
        </div>
      </section>

      {/* INVESTMENT EXCELLENCE */}
      <section id="investment" className="py-28 bg-black">
        <div className="max-w-screen-2xl mx-auto px-8">
          <h2 className="text-6xl font-serif text-center mb-16">Investment Excellence</h2>
          <div className="grid md:grid-cols-2 gap-12 text-lg leading-relaxed">
            <div>
              <h3 className="text-[#D4AF77] text-xl mb-6">Performance &amp; Appreciation</h3>
              <ul className="space-y-4">
                <li>• +13.89% YoY RPPI growth • +140% since 2019</li>
                <li>• 8–12% forecasted growth in 2026</li>
                <li>• VEFA off-plan: Lock prices 30–60% lower</li>
              </ul>
            </div>
            <div>
              <h3 className="text-[#D4AF77] text-xl mb-6">Tax • Residency • Wealth</h3>
              <ul className="space-y-4">
                <li>• 0% Capital Gains • 0% Inheritance Tax</li>
                <li>• Permanent Residence with qualifying purchase</li>
                <li className="text-amber-400">• Secure 5% duty before July 1st 2026</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section id="cta" className="py-32 bg-gradient-to-b from-black to-[#0A0A0A] text-center">
        <h2 className="text-6xl font-serif mb-8">Secure Your Legacy in Mauritius</h2>
        <p className="text-xl text-white/70 mb-12">Begin your private journey with ÉCLAT</p>
        <button className="px-16 py-6 bg-[#D4AF77] text-black text-xl tracking-widest hover:bg-white transition-all">
          BEGIN YOUR PRIVATE JOURNEY
        </button>
      </section>
    </div>
  )
}
