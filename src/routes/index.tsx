import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

// ─── All images served directly from the GitHub public folder ─────────────────
const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (f: string) => `${BASE}/${encodeURIComponent(f)}`

const HERO_IMG    = img('Screenshot 2026-03-21 175630.png')
const SECOND_IMG  = img('Modern-Dream-House-McClean-Design-09-1-Kindesign')
const THIRD_IMG   = img('Screenshot 2026-05-14 202045.png')
const STAIRCASE   = img('Screenshot 2026-05-11 171922.png')

const GALLERY = [
  { src: img('Screenshot 2026-05-14 201935.png'), label: 'Living',  title: 'Open-Plan Living',  sub: 'Floor-to-ceiling glass dissolving interior and ocean into one' },
  { src: img('Screenshot 2026-05-14 201944.png'), label: 'Horizon', title: 'The Horizon',       sub: 'Unobstructed panorama across the northern lagoon at every hour' },
  { src: img('Screenshot 2026-05-14 202001.png'), label: 'Pool',    title: 'Infinity Edge',     sub: 'A pool that merges seamlessly with the Indian Ocean beyond' },
  { src: img('Screenshot 2026-05-14 202012.png'), label: 'Dining',  title: 'Al Fresco Dining',  sub: 'Covered pavilion for twelve — salt air and candlelight included' },
  { src: img('Screenshot 2026-05-14 202036.png'), label: 'Master',  title: 'Master Suite',      sub: 'Five en-suite bedrooms, each a sanctuary of reclaimed teak' },
  { src: img('Screenshot 2026-05-14 202054.png'), label: 'Garden',  title: 'Tropical Gardens',  sub: '2,400m² of curated botanical landscape and private pathways' },
]

const SPA = [
  { src: img('Screenshot 2026-05-14 202025.png'), label: 'Concierge',   title: 'Personal Concierge',  sub: 'Your dedicated wellness curator — on call, always present' },
  { src: img('Screenshot 2026-05-15 220411.png'), label: 'Treatment',   title: 'Treatment Sanctuary', sub: 'Bespoke rituals drawn from ancient Mauritian healing traditions' },
  { src: img('Image.jpg'),                        label: 'Restoration', title: 'Deep Restoration',    sub: 'Total silence. Total surrender. Total renewal.' },
]

const FEATURES = ['Infinity Pool', 'Private Beach Access', 'Smart Home', 'Wine Cellar', 'Spa Suite', 'Concierge']

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ─── Global styles ────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=EB+Garamond:ital,wght@0,400;1,400&family=Montserrat:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --obsidian:   #07070a;
        --void:       #050508;
        --surface:    #0e0e13;
        --spa-dark:   #03030a;
        --gold:       #c9a460;
        --gold-light: #e8cfa0;
        --gold-dim:   rgba(201,164,96,0.18);
        --border:     rgba(201,164,96,0.12);
        --border-hi:  rgba(201,164,96,0.28);
        --text-1:     #f0ece4;
        --text-2:     #9b9488;
        --text-3:     #5a5650;
        --fd:         'Cormorant Garamond', Georgia, serif;
        --fb:         'Montserrat', sans-serif;
        --fa:         'EB Garamond', Georgia, serif;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--obsidian);
        color: var(--text-1);
        font-family: var(--fb);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* Grain texture */
      body::before {
        content: '';
        position: fixed; inset: 0;
        pointer-events: none; z-index: 9999; opacity: 0.025;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 200px;
      }

      .disp { font-family: var(--fd); }
      .acc  { font-family: var(--fa); }

      .gold-grad {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 50%, #a07830 100%);
        -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
      }

      .eyebrow {
        font-family: var(--fb); font-size: 9px; font-weight: 400;
        letter-spacing: 0.35em; text-transform: uppercase; color: var(--gold);
      }

      .nav-a {
        font-family: var(--fb); font-size: 10px; letter-spacing: 0.22em;
        text-transform: uppercase; color: var(--text-2); text-decoration: none;
        transition: color 0.3s;
      }
      .nav-a:hover { color: var(--gold-light); }

      .btn {
        display: inline-flex; align-items: center; gap: 10px;
        padding: 14px 32px; font-family: var(--fb); font-size: 9px;
        font-weight: 400; letter-spacing: 0.3em; text-transform: uppercase;
        text-decoration: none; cursor: pointer; transition: all 0.4s ease;
        border: none; outline: none;
      }
      .btn-o {
        background: transparent; border: 1px solid var(--border-hi); color: var(--text-1);
      }
      .btn-o:hover { background: var(--gold-dim); border-color: var(--gold); color: var(--gold-light); }
      .btn-s {
        background: linear-gradient(135deg, var(--gold) 0%, #a07830 100%); color: var(--obsidian);
      }
      .btn-s:hover {
        background: linear-gradient(135deg, var(--gold-light) 0%, var(--gold) 100%);
        transform: translateY(-1px); box-shadow: 0 8px 40px rgba(201,164,96,0.25);
      }

      .stat-grid { display: grid; grid-template-columns: repeat(4,1fr); }

      @media (max-width: 900px) {
        .stat-grid   { grid-template-columns: repeat(2,1fr); }
        .duo         { grid-template-columns: 1fr !important; }
        .duo .pimg   { min-height: 55vw !important; }
        .hero-btns   { flex-direction: column !important; }
        .nav-links   { display: none !important; }
        .inv-grid    { grid-template-columns: 1fr !important; }
      }

      input, textarea {
        background: transparent; border: 1px solid var(--border);
        color: var(--text-1); font-family: var(--fb); font-size: 12px;
        font-weight: 300; letter-spacing: 0.08em; padding: 16px 20px;
        width: 100%; outline: none; transition: border-color 0.3s;
      }
      input::placeholder, textarea::placeholder { color: var(--text-3); }
      input:focus, textarea:focus { border-color: var(--gold); }

      @keyframes fadeUp    { from { opacity:0; transform:translateY(32px); } to { opacity:1; transform:translateY(0); } }
      @keyframes spulse    { 0%,100% { opacity:0.4; transform:scaleY(0.6); } 50% { opacity:1; transform:scaleY(1); } }
    `}</style>
  )
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      height: '76px', padding: '0 56px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background 0.6s, border-color 0.6s',
      background: scrolled ? 'rgba(5,5,8,0.93)' : 'transparent',
      backdropFilter: scrolled ? 'blur(24px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(201,164,96,0.1)' : 'transparent'}`,
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div className="disp" style={{ fontSize: '19px', fontWeight: 300, letterSpacing: '0.18em', color: 'var(--text-1)', lineHeight: 1 }}>ÉDEN ESTATES</div>
        <div className="eyebrow" style={{ marginTop: '3px', fontSize: '7.5px', letterSpacing: '0.32em' }}>Mauritius · Est. 2018</div>
      </a>
      <div className="nav-links" style={{ display: 'flex', alignItems: 'center', gap: '44px' }}>
        {[['The Estate','#estate'],['Investment','#investment'],['Wellness','#wellness'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nav-a">{l}</a>
        ))}
        <a href="#contact" className="btn btn-o" style={{ padding: '9px 22px', fontSize: '8.5px' }}>Private Viewing</a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ minHeight: '100dvh', position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <img src={HERO_IMG} alt="Villa Azur" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 35%' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,8,0.72) 40%, rgba(5,5,8,0.1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--obsidian) 0%, transparent 55%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,8vw,110px)', paddingBottom: 'clamp(70px,10vw,130px)', maxWidth: '860px' }}>
        <p className="eyebrow" style={{ marginBottom: '28px', animation: 'fadeUp 1s ease 0.2s both' }}>Grand Baie · North Coast · Mauritius</p>
        <h1 className="disp" style={{ fontSize: 'clamp(48px,7.5vw,110px)', fontWeight: 300, lineHeight: 1.04, margin: '0 0 8px', fontStyle: 'italic', color: 'var(--text-1)', animation: 'fadeUp 1s ease 0.4s both' }}>
          Villa Azur
        </h1>
        <div className="disp gold-grad" style={{ fontSize: 'clamp(22px,3vw,42px)', fontWeight: 300, marginBottom: '36px', animation: 'fadeUp 1s ease 0.55s both', letterSpacing: '0.04em' }}>
          $3,750,000
        </div>
        <p className="acc" style={{ fontSize: 'clamp(13px,1.4vw,16px)', lineHeight: 1.85, color: 'var(--text-2)', maxWidth: '460px', marginBottom: '52px', animation: 'fadeUp 1s ease 0.7s both' }}>
          Suspended above the Indian Ocean, Villa Azur commands panoramic views across the northern lagoon — a masterwork of glass, stone, and tropical modernism.
        </p>
        <div className="hero-btns" style={{ display: 'flex', gap: '14px', animation: 'fadeUp 1s ease 0.85s both' }}>
          <a href="#estate" className="btn btn-s">Explore the Estate</a>
          <a href="#contact" className="btn btn-o">Arrange a Viewing</a>
        </div>
      </div>

      {/* Scroll cue */}
      <div style={{ position: 'absolute', bottom: '40px', right: '56px', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <span className="eyebrow" style={{ writingMode: 'vertical-rl', fontSize: '8px', letterSpacing: '0.28em' }}>Scroll</span>
        <div style={{ width: '1px', height: '70px', background: 'linear-gradient(to bottom, var(--gold) 0%, transparent 100%)', animation: 'spulse 2.2s ease infinite' }} />
      </div>

      {/* Yield badge */}
      <div style={{ position: 'absolute', top: '100px', right: '56px', zIndex: 2, border: '1px solid var(--border-hi)', padding: '20px 28px', textAlign: 'center', background: 'rgba(5,5,8,0.5)', backdropFilter: 'blur(12px)' }}>
        <div className="eyebrow" style={{ marginBottom: '8px' }}>Est. Annual Yield</div>
        <div className="disp gold-grad" style={{ fontSize: '34px', fontWeight: 300 }}>9%</div>
        <div style={{ fontSize: '9px', color: 'var(--text-3)', letterSpacing: '0.12em', marginTop: '4px' }}>Short-term rental</div>
      </div>
    </section>
  )
}

// ─── Cinematic panel ──────────────────────────────────────────────────────────
function Panel({ src, label, title, sub, index, id }: { src: string; label: string; title: string; sub: string; index: number; id?: string }) {
  const { ref, inView } = useInView(0.15)
  const even = index % 2 === 0
  return (
    <div id={id} ref={ref} className="duo" style={{ minHeight: '100dvh', display: 'grid', gridTemplateColumns: even ? '58% 42%' : '42% 58%', background: 'var(--obsidian)' }}>
      <div className="pimg" style={{ gridColumn: even ? 1 : 2, gridRow: 1, position: 'relative', overflow: 'hidden', minHeight: '65vh' }}>
        <img src={src} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: inView ? 'scale(1)' : 'scale(1.07)', transition: 'transform 1.6s cubic-bezier(0.16,1,0.3,1)' }} />
        <div style={{ position: 'absolute', inset: 0, background: even ? 'linear-gradient(to right, transparent 55%, var(--obsidian) 100%)' : 'linear-gradient(to left, transparent 55%, var(--obsidian) 100%)' }} />
        <div className="eyebrow" style={{ position: 'absolute', top: '36px', [even ? 'left' : 'right']: '36px', fontSize: '8px', color: 'rgba(201,164,96,0.4)' }}>
          {String(index + 1).padStart(2,'0')}
        </div>
      </div>
      <div style={{ gridColumn: even ? 2 : 1, gridRow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,6vw,100px) clamp(40px,5vw,80px)', background: 'var(--obsidian)' }}>
        <div style={{ width: inView ? '48px' : '0', height: '1px', background: 'var(--gold)', marginBottom: '32px', transition: 'width 0.9s cubic-bezier(0.16,1,0.3,1) 0.25s' }} />
        <p className="eyebrow" style={{ marginBottom: '18px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'all 0.8s ease 0.3s' }}>{label}</p>
        <h2 className="disp" style={{ fontSize: 'clamp(30px,3.5vw,58px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '22px', color: 'var(--text-1)', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)', transition: 'all 0.9s ease 0.4s' }}>{title}</h2>
        <p className="acc" style={{ fontSize: '15px', lineHeight: 1.85, color: 'var(--text-2)', maxWidth: '300px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(14px)', transition: 'all 0.9s ease 0.52s' }}>{sub}</p>
      </div>
    </div>
  )
}

// ─── Specs bar ────────────────────────────────────────────────────────────────
function SpecsBar() {
  const { ref, inView } = useInView()
  const specs = [{ v:'5', l:'Bedrooms' }, { v:'6', l:'Bathrooms' }, { v:'820m²', l:'Interior' }, { v:'2,400m²', l:'Land' }]
  return (
    <div ref={ref} className="stat-grid" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      {specs.map(({ v, l }, i) => (
        <div key={l} style={{ padding: 'clamp(36px,5vw,72px) clamp(24px,4vw,56px)', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `all 0.8s ease ${i*0.1}s` }}>
          <div className="disp gold-grad" style={{ fontSize: 'clamp(36px,4vw,64px)', fontWeight: 300, lineHeight: 1, marginBottom: '10px' }}>{v}</div>
          <div className="eyebrow" style={{ color: 'var(--text-3)' }}>{l}</div>
        </div>
      ))}
    </div>
  )
}

// ─── Features strip ───────────────────────────────────────────────────────────
function FeaturesStrip() {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ padding: '48px clamp(24px,6vw,80px)', background: 'var(--surface)', display: 'flex', flexWrap: 'wrap', gap: '12px', justifyContent: 'center' }}>
      {FEATURES.map((f, i) => (
        <div key={f} style={{ padding: '10px 22px', border: '1px solid var(--border)', fontSize: '9.5px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--text-2)', opacity: inView ? 1 : 0, transition: `opacity 0.6s ease ${0.05*i}s` }}>{f}</div>
      ))}
    </div>
  )
}

// ─── Staircase → wellness transition ─────────────────────────────────────────
function StaircaseTransition() {
  const ref = useRef<HTMLDivElement>(null)
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      setProgress(Math.min(1, Math.max(0, (vh - rect.top) / (el.offsetHeight + vh))))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div ref={ref} style={{ minHeight: '100dvh', position: 'relative', overflow: 'hidden' }}>
      <img src={STAIRCASE} alt="Descending into the wellness sanctuary" style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />
      {/* scroll-driven darkness */}
      <div style={{ position: 'absolute', inset: 0, background: `rgba(2,2,6,${Math.min(1, progress * 2.2)})`, transition: 'background 0.05s linear' }} />
      {/* text fades in mid-scroll */}
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '40px', opacity: progress < 0.3 ? 0 : Math.min(1, (progress - 0.3) * 3), transition: 'opacity 0.3s' }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.4em' }}>Descend · Restore · Transcend</div>
        <h2 className="disp" style={{ fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--text-1)', lineHeight: 1.1 }}>
          Enter the<br /><span className="gold-grad">Wellness Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Spa panel ────────────────────────────────────────────────────────────────
function SpaPanel({ src, label, title, sub, index }: { src: string; label: string; title: string; sub: string; index: number }) {
  const { ref, inView } = useInView(0.15)
  const even = index % 2 === 0
  return (
    <div ref={ref} className="duo" style={{ minHeight: '90vh', display: 'grid', gridTemplateColumns: even ? '55% 45%' : '45% 55%', background: 'var(--spa-dark)', borderTop: '1px solid rgba(201,164,96,0.05)' }}>
      <div className="pimg" style={{ gridColumn: even ? 1 : 2, gridRow: 1, position: 'relative', overflow: 'hidden', minHeight: '60vh' }}>
        <img src={src} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transform: inView ? 'scale(1)' : 'scale(1.06)', transition: 'transform 1.8s cubic-bezier(0.16,1,0.3,1)', filter: 'brightness(0.85)' }} />
        <div style={{ position: 'absolute', inset: 0, background: even ? 'linear-gradient(to right, transparent 50%, var(--spa-dark) 100%)' : 'linear-gradient(to left, transparent 50%, var(--spa-dark) 100%)' }} />
      </div>
      <div style={{ gridColumn: even ? 2 : 1, gridRow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 'clamp(48px,6vw,100px) clamp(40px,5vw,80px)', background: 'var(--spa-dark)' }}>
        <div style={{ width: inView ? '32px' : '0', height: '1px', background: 'var(--gold)', marginBottom: '28px', transition: 'width 1s ease 0.3s' }} />
        <p className="eyebrow" style={{ marginBottom: '16px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'all 0.8s ease 0.35s' }}>{label}</p>
        <h3 className="disp" style={{ fontSize: 'clamp(26px,3vw,50px)', fontWeight: 400, fontStyle: 'italic', lineHeight: 1.15, marginBottom: '20px', color: 'var(--text-1)', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'all 0.9s ease 0.45s' }}>{title}</h3>
        <p className="acc" style={{ fontSize: '15px', lineHeight: 1.9, color: 'var(--text-2)', maxWidth: '290px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(12px)', transition: 'all 0.9s ease 0.55s' }}>{sub}</p>
      </div>
    </div>
  )
}

// ─── Wellness section ─────────────────────────────────────────────────────────
function WellnessSection() {
  const { ref, inView } = useInView()
  const offerings = [
    { icon: '◎', title: 'Hydrotherapy',    desc: 'Heated jet pool, cold plunge, and mineral steam room' },
    { icon: '◈', title: 'Body Rituals',    desc: 'Volcanic stone massage · Coconut exfoliation · Ayurvedic treatments' },
    { icon: '◇', title: 'Yoga Pavilion',   desc: 'Sunrise and sunset sessions with a resident instructor' },
    { icon: '◉', title: 'Nutrition & Detox', desc: 'In-villa chef specialising in Ayurvedic and plant-based cuisine' },
  ]
  return (
    <section id="wellness" style={{ background: 'var(--spa-dark)' }}>
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px)', textAlign: 'center', borderBottom: '1px solid rgba(201,164,96,0.06)' }}>
        <div className="eyebrow" style={{ marginBottom: '24px', letterSpacing: '0.45em' }}>In-Residence Wellness</div>
        <h2 className="disp" style={{ fontSize: 'clamp(36px,5.5vw,80px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '28px' }}>The Spa Sanctuary</h2>
        <div style={{ width: '1px', height: '80px', background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto 32px' }} />
        <p className="acc" style={{ fontSize: 'clamp(14px,1.5vw,17px)', lineHeight: 1.9, color: 'var(--text-2)', maxWidth: '560px', margin: '0 auto' }}>
          Concealed beneath the villa, a private world of restoration awaits. Ancient Mauritian healing traditions, reborn in obsidian and candlelight.
        </p>
      </div>

      {SPA.map(({ src, label, title, sub }, i) => (
        <SpaPanel key={i} src={src} label={label} title={title} sub={sub} index={i} />
      ))}

      <div ref={ref} style={{ padding: 'clamp(64px,8vw,120px) clamp(24px,8vw,120px)', background: 'var(--spa-dark)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(220px,1fr))', gap: '1px', background: 'rgba(201,164,96,0.07)' }}>
          {offerings.map(({ icon, title, desc }, i) => (
            <div key={title} style={{ background: 'var(--spa-dark)', padding: '48px 36px', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: `all 0.8s ease ${i*0.12}s` }}>
              <div style={{ fontSize: '22px', color: 'var(--gold)', marginBottom: '20px', opacity: 0.7 }}>{icon}</div>
              <h4 className="disp" style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', marginBottom: '12px', color: 'var(--text-1)' }}>{title}</h4>
              <p style={{ fontSize: '12px', lineHeight: 1.8, color: 'var(--text-3)', letterSpacing: '0.03em' }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Investment section ───────────────────────────────────────────────────────
function InvestBlock({ eyebrow, title, body, tag, borderR, borderT }: { eyebrow: string; title: string; body: string; tag: string; borderR?: boolean; borderT?: boolean }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{ padding: 'clamp(48px,5vw,80px) clamp(24px,5vw,72px)', borderRight: borderR ? '1px solid var(--border)' : 'none', borderTop: borderT ? '1px solid var(--border)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 0.9s ease' }}>
      <div className="eyebrow" style={{ marginBottom: '16px' }}>{eyebrow}</div>
      <h3 className="disp" style={{ fontSize: 'clamp(22px,2.5vw,38px)', fontWeight: 400, fontStyle: 'italic', marginBottom: '18px', lineHeight: 1.2 }}>{title}</h3>
      <p style={{ fontSize: '13px', lineHeight: 1.9, color: 'var(--text-2)', marginBottom: '24px' }}>{body}</p>
      <div style={{ display: 'inline-block', padding: '7px 16px', border: '1px solid var(--border-hi)', fontSize: '9px', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)' }}>{tag}</div>
    </div>
  )
}

function InvestmentSection() {
  const { ref, inView } = useInView()
  const stats = [
    { v: '+13.89%', l: 'RPPI Growth Q3 2025',    note: 'Statistics Mauritius' },
    { v: '+140%',   l: 'Cumulative since 2019',   note: 'More than doubled' },
    { v: '1.436M',  l: 'Tourist arrivals 2025',   note: '+3.9% year-on-year' },
    { v: '₨21.39B', l: 'FDI in real estate 2025', note: 'Luxury schemes dominant' },
  ]
  return (
    <section id="investment" style={{ background: 'var(--void)' }}>
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(24px,8vw,120px) 0', textAlign: 'center' }}>
        <div className="eyebrow" style={{ marginBottom: '20px' }}>Market Intelligence · 2025–2026</div>
        <h2 className="disp" style={{ fontSize: 'clamp(34px,5vw,76px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: '24px' }}>
          The Case for<br /><span className="gold-grad">Mauritian Property</span>
        </h2>
        <p className="acc" style={{ fontSize: 'clamp(13px,1.4vw,16px)', lineHeight: 1.9, color: 'var(--text-2)', maxWidth: '580px', margin: '0 auto 72px' }}>
          Capital appreciation. Rental income. Permanent residency. Tax optimisation. Lifestyle. Five compelling reasons, one exceptional investment.
        </p>
      </div>

      <div ref={ref} className="stat-grid" style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {stats.map(({ v, l, note }, i) => (
          <div key={l} style={{ padding: 'clamp(40px,5vw,72px) clamp(24px,4vw,56px)', borderLeft: i > 0 ? '1px solid var(--border)' : 'none', opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)', transition: `all 0.85s ease ${i*0.1}s` }}>
            <div className="disp gold-grad" style={{ fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, lineHeight: 1, marginBottom: '10px' }}>{v}</div>
            <div style={{ fontSize: '11px', color: 'var(--text-2)', letterSpacing: '0.08em', marginBottom: '6px' }}>{l}</div>
            <div className="eyebrow" style={{ fontSize: '8px', color: 'var(--text-3)' }}>{note}</div>
          </div>
        ))}
      </div>

      <div className="inv-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        <InvestBlock eyebrow="Price Appreciation" title="Un
