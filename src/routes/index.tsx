import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (f: string) => `${BASE}/${encodeURIComponent(f)}`

const IMGS = {
  hero:     img('Screenshot 2026-05-16 002716.png'),
  ext1:     img('Screenshot 2026-03-21 175630.png'),
  ext2:     img('Screenshot 2026-05-14 202045.png'),
  living:   img('Screenshot 2026-05-14 201935.png'),
  horizon:  img('Screenshot 2026-05-14 201944.png'),
  pool:     img('Screenshot 2026-05-14 202001.png'),
  dining:   img('Screenshot 2026-05-14 202012.png'),
  garden:   img('Screenshot 2026-05-14 202025.png'),
  master:   img('Screenshot 2026-05-14 202036.png'),
  detail:   img('Screenshot 2026-05-14 202054.png'),
  stairs:   img('Screenshot 2026-05-11 171922.png'),
  spa1:     img('Screenshot 2026-05-14 202025.png'),
  spa2:     img('Screenshot 2026-05-15 220411.png'),
  island:   img('grok-image-86070f82-2171-4501-8fe6-d6f72d7d1dcb.png'),
  poolHero: img('205032606_4198387713573399_8106792087768550505_n.jpg'),
}

// ─── Hooks ────────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true) }, { threshold })
    obs.observe(el); return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

function useScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = ref.current; if (!el) return
      const r = el.getBoundingClientRect()
      setP(Math.min(1, Math.max(0, (window.innerHeight - r.top) / (el.offsetHeight + window.innerHeight))))
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return { ref, p }
}

function useCountUp(target: number, active: boolean, duration = 2000, decimals = 0) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const start = performance.now()
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((ease * target).toFixed(decimals)))
      if (t < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [active, target, duration, decimals])
  return val
}

// ─── Styles ───────────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&family=Jost:wght@200;300;400&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --cream:   #f5f0e8;
        --linen:   #ede7db;
        --sand:    #d6cfc4;
        --stone:   #9e9890;
        --ink:     #1a1814;
        --deep:    #0d0c0a;
        --gold:    #b8965a;
        --gold2:   #d4b07a;
        --spa:     #0a0a0f;
        --border:  rgba(26,24,20,0.1);
        --borderl: rgba(184,150,90,0.2);
        --F:       'Cormorant Garamond', Georgia, serif;
        --G:       'Jost', sans-serif;
      }

      html { scroll-behavior: smooth; }
      body {
        background: var(--cream);
        color: var(--ink);
        font-family: var(--G);
        font-weight: 300;
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* Grain — very subtle on light bg */
      body::after {
        content: ''; position: fixed; inset: 0;
        pointer-events: none; z-index: 9999; opacity: 0.018;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 180px;
      }

      .track { font-family: var(--G); font-size: 9px; font-weight: 300; letter-spacing: 0.32em; text-transform: uppercase; color: var(--gold); }
      .serif { font-family: var(--F); }

      /* Scroll progress bar */
      #progress-bar {
        position: fixed; top: 0; left: 0; height: 1px;
        background: var(--gold); z-index: 500;
        transition: width 0.1s linear;
      }

      /* Nav */
      .nav-a {
        font-family: var(--G); font-size: 10px; letter-spacing: 0.22em;
        text-transform: uppercase; color: var(--ink); text-decoration: none;
        font-weight: 300; opacity: 0.6; transition: opacity 0.3s;
      }
      .nav-a:hover { opacity: 1; }
      .nav-a.light { color: var(--cream); }
      .nav-a.light:hover { opacity: 1; }

      /* Buttons */
      .btn {
        display: inline-block; font-family: var(--G); font-size: 9px;
        font-weight: 300; letter-spacing: 0.32em; text-transform: uppercase;
        text-decoration: none; padding: 14px 36px; transition: all 0.5s ease; cursor: pointer; border: none; outline: none;
      }
      .btn-dark { background: var(--ink); color: var(--cream); }
      .btn-dark:hover { background: var(--deep); letter-spacing: 0.38em; }
      .btn-outline-dark { background: transparent; border: 1px solid rgba(26,24,20,0.3); color: var(--ink); }
      .btn-outline-dark:hover { border-color: var(--ink); background: rgba(26,24,20,0.04); }
      .btn-outline-light { background: transparent; border: 1px solid rgba(245,240,232,0.35); color: var(--cream); }
      .btn-outline-light:hover { border-color: var(--cream); background: rgba(245,240,232,0.08); }
      .btn-gold { background: var(--gold); color: var(--cream); }
      .btn-gold:hover { background: var(--gold2); box-shadow: 0 8px 40px rgba(184,150,90,0.25); }

      /* Horizontal scroll container */
      .h-scroll-outer {
        overflow: hidden; position: relative;
      }
      .h-scroll-inner {
        display: flex; will-change: transform;
        transition: transform 0.0s;
      }

      /* Ken Burns */
      @keyframes kb { from { transform: scale(1); } to { transform: scale(1.05) translate(-0.5%, -0.5%); } }
      @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
      @keyframes shimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }
      @keyframes lineW { from { width:0; } to { width:100%; } }
      @keyframes linH  { from { height:0; } to { height:60px; } }

      input, textarea {
        font-family: var(--G); font-size: 13px; font-weight: 300; letter-spacing: 0.06em;
        background: transparent; border: none; border-bottom: 1px solid var(--border);
        color: var(--ink); padding: 14px 0; width: 100%; outline: none; transition: border-color 0.4s;
      }
      input:focus, textarea:focus { border-color: var(--gold); }
      input::placeholder, textarea::placeholder { color: var(--stone); }

      @media (max-width: 768px) {
        .hide-m { display: none !important; }
        .stack-m { flex-direction: column !important; grid-template-columns: 1fr !important; }
        .full-m  { width: 100% !important; }
      }
    `}</style>
  )
}

// ─── Progress bar ─────────────────────────────────────────────────────────────
function ProgressBar() {
  const [w, setW] = useState(0)
  useEffect(() => {
    const fn = () => {
      const el = document.documentElement
      setW((window.scrollY / (el.scrollHeight - window.innerHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return <div id="progress-bar" style={{ width: `${w}%` }} />
}

// ─── NavBar ───────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  const [light, setLight] = useState(true) // hero is dark image → light nav
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 80)
      // switch to dark text after hero
      setLight(window.scrollY < window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', fn, { passive: true }); fn()
    return () => window.removeEventListener('scroll', fn)
  }, [])
  const cls = light ? 'nav-a light' : 'nav-a'
  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 400,
      height: 68, padding: '0 clamp(24px,5vw,72px)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? (light ? 'rgba(10,9,8,0.82)' : 'rgba(245,240,232,0.92)') : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? `1px solid ${light ? 'rgba(255,255,255,0.06)' : 'var(--border)'}` : '1px solid transparent',
      transition: 'background 0.6s, border-color 0.6s',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: 'var(--F)', fontSize: 18, fontWeight: 300, letterSpacing: '0.22em', color: light ? 'var(--cream)' : 'var(--ink)', lineHeight: 1, transition: 'color 0.5s' }}>ÉDEN ESTATES</div>
        <div className="track" style={{ fontSize: 7, letterSpacing: '0.4em', marginTop: 3, color: 'var(--gold)' }}>Mauritius · Est. 2018</div>
      </a>
      <div className="hide-m" style={{ display: 'flex', alignItems: 'center', gap: 44 }}>
        {[['Estate','#estate'],['Villas','#villas'],['Island','#island'],['Wellness','#wellness'],['Invest','#investment'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className={cls}>{l}</a>
        ))}
        <a href="#contact" className="btn btn-outline-light hide-m" style={{ fontSize: 8, padding: '9px 20px', color: light ? 'var(--cream)' : 'var(--ink)', borderColor: light ? 'rgba(245,240,232,0.35)' : 'rgba(26,24,20,0.3)' }}>
          Enquire
        </a>
      </div>
    </nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img src={IMGS.hero} alt="Éden Estates Mauritius" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 40%', animation: 'kb 20s ease-out forwards' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(10,9,8,0.92) 0%, rgba(10,9,8,0.35) 45%, rgba(10,9,8,0.1) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,9,8,0.5) 0%, transparent 60%)' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(72px,9vw,120px)', maxWidth: 900 }}>
        <div className="track" style={{ marginBottom: 32, color: 'var(--gold)', opacity: 0, animation: 'fadeUp 1s ease 0.5s forwards' }}>
          Grand Baie · North Coast · Mauritius
        </div>
        <h1 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(56px,9vw,130px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 0.92, color: 'var(--cream)', margin: '0 0 24px', opacity: 0, animation: 'fadeUp 1.3s ease 0.8s forwards' }}>
          Where the<br />Indian Ocean<br />begins
        </h1>
        <div style={{ height: 1, background: 'var(--gold)', width: 0, marginBottom: 32, opacity: 0.5, animation: 'lineW 1.5s ease 1.6s forwards' }} />
        <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(16px,1.8vw,20px)', fontStyle: 'italic', fontWeight: 300, color: 'rgba(245,240,232,0.7)', maxWidth: 480, lineHeight: 1.75, marginBottom: 48, opacity: 0, animation: 'fadeUp 1s ease 1.8s forwards' }}>
          Boutique villas of singular distinction. Permanent residency. A tax environment without parallel. From £1,250,000.
        </p>
        <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 1s ease 2.1s forwards' }}>
          <a href="#villas" className="btn btn-gold">Explore Villas</a>
          <a href="#contact" className="btn btn-outline-light">Private Viewing</a>
        </div>
      </div>

      {/* Scroll pulse */}
      <div style={{ position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0, opacity: 0, animation: 'fadeIn 1s ease 3s forwards' }}>
        <div className="track" style={{ fontSize: 7, color: 'rgba(245,240,232,0.4)', marginBottom: 10 }}>Scroll</div>
        <div style={{ width: 1, height: 0, background: 'linear-gradient(to bottom, rgba(184,150,90,0.8), transparent)', animation: 'linH 1.5s ease 3.2s forwards' }} />
      </div>
    </section>
  )
}

// ─── Full bleed panel ─────────────────────────────────────────────────────────
function FullBleed({ src, eyebrow, title, sub, align = 'left', pos = 'center', dim = 0.45, id, light = true }:
  { src: string; eyebrow?: string; title: string; sub?: string; align?: 'left'|'center'|'right'; pos?: string; dim?: number; id?: string; light?: boolean }) {
  const { ref: pRef, p } = useScrollProgress()
  const { ref: iRef, inView } = useInView(0.08)
  const ref = useCallback((el: HTMLDivElement | null) => {
    ;(pRef as any).current = el;
    ;(iRef as any).current = el
  }, [])
  const imgY = `${(p - 0.5) * -12}%`
  const textStyle = align === 'center' ? { textAlign: 'center' as const, left: 0, right: 0 }
    : align === 'right' ? { textAlign: 'right' as const, right: 'clamp(40px,7vw,120px)' }
    : { textAlign: 'left' as const, left: 'clamp(40px,7vw,120px)' }
  const tc = light ? 'var(--cream)' : 'var(--ink)'
  const sc = light ? 'rgba(245,240,232,0.65)' : 'rgba(26,24,20,0.55)'

  return (
    <section id={id} style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: '-8% 0', overflow: 'hidden' }}>
        <img src={src} alt={title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: pos, transform: `translateY(${imgY})`, willChange: 'transform' }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(10,9,8,${dim+0.35}) 0%, rgba(10,9,8,${dim*0.3}) 50%, transparent 100%)` }} />
      <div ref={ref} style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(60px,7vw,100px)', ...textStyle, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(22px)', transition: 'opacity 1.4s ease, transform 1.4s ease' }}>
        {eyebrow && <div className="track" style={{ marginBottom: 18, color: 'var(--gold)' }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(36px,5.5vw,84px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.04, color: tc, margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.5vw,18px)', fontStyle: 'italic', color: sc, marginTop: 18, maxWidth: 480, lineHeight: 1.75, display: align === 'center' ? 'block' : 'inline-block', margin: align === 'center' ? '18px auto 0' : '18px 0 0' }}>{sub}</p>}
      </div>
    </section>
  )
}

// ─── INTERRUPT 1: Full-screen quote moment ────────────────────────────────────
function QuoteMoment({ quote, attr }: { quote: string; attr?: string }) {
  const { ref, inView } = useInView(0.3)
  return (
    <section ref={ref} style={{ background: 'var(--cream)', padding: 'clamp(100px,14vw,180px) clamp(40px,10vw,180px)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', textAlign: 'center', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: inView ? 40 : 0, height: 1, background: 'var(--gold)', marginBottom: 40, transition: 'width 1.2s ease', opacity: 0.6 }} />
      <blockquote style={{ fontFamily: 'var(--F)', fontSize: 'clamp(24px,4vw,56px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.25, color: 'var(--ink)', maxWidth: 860, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'all 1.4s ease 0.2s' }}>
        "{quote}"
      </blockquote>
      {attr && <div className="track" style={{ marginTop: 36, fontSize: 8, color: 'var(--stone)', opacity: inView ? 1 : 0, transition: 'opacity 1s ease 0.8s' }}>{attr}</div>}
    </section>
  )
}

// ─── INTERRUPT 2: Pinned villa tiers ─────────────────────────────────────────
const TIERS = [
  {
    name: 'Maison Lagon',
    location: 'Trou aux Biches, West Coast',
    price: '£1,250,000',
    tag: 'Best Entry Value',
    beds: 3, baths: 4, sqm: 380,
    yield: '6.8%',
    desc: 'A refined coastal retreat steps from Mauritius\'s most celebrated lagoon. Three en-suite bedrooms, a 14-metre pool, Creole architecture. Fully furnished, income-generating from day one.',
    img: IMGS.ext1,
  },
  {
    name: 'Domaine Noir',
    location: 'Bel Ombre, South Coast',
    price: '£2,100,000',
    tag: 'Collector\'s Edition',
    beds: 4, baths: 5, sqm: 640,
    yield: '7.5%',
    desc: 'Monolithic basalt walls, a 22-metre lap pool, and 1.4 hectares of private nature reserve. One of the last untouched coastlines in Mauritius. Architecture as statement.',
    img: IMGS.pool,
  },
  {
    name: 'Villa Azur',
    location: 'Grand Baie, North Coast',
    price: '£3,750,000',
    tag: 'Flagship Estate',
    beds: 5, baths: 6, sqm: 820,
    yield: '9%',
    desc: 'Five en-suite suites, an infinity pool merging with the horizon, a private beach pathway, wine cellar, spa suite, and a dedicated concierge. The definitive Mauritian estate.',
    img: IMGS.poolHero,
  },
]

function VillaTiers() {
  const [active, setActive] = useState(1)
  const { ref, inView } = useInView(0.1)
  const tier = TIERS[active]

  return (
    <section id="villas" ref={ref} style={{ background: 'var(--linen)', padding: 'clamp(80px,10vw,140px) 0' }}>
      {/* Header */}
      <div style={{ padding: '0 clamp(40px,6vw,96px)', marginBottom: 64, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 1s ease' }}>
        <div className="track" style={{ marginBottom: 16 }}>Exclusive Portfolio</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink)' }}>Three Estates. One Island.</h2>
      </div>

      {/* Tier selector tabs */}
      <div style={{ padding: '0 clamp(40px,6vw,96px)', display: 'flex', gap: 0, marginBottom: 0, borderBottom: '1px solid var(--border)' }}>
        {TIERS.map((t, i) => (
          <button key={t.name} onClick={() => setActive(i)} style={{
            fontFamily: 'var(--G)', fontSize: 9, fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase',
            background: 'none', border: 'none', borderBottom: active === i ? '1px solid var(--ink)' : '1px solid transparent',
            color: active === i ? 'var(--ink)' : 'var(--stone)', padding: '16px 28px 16px 0',
            cursor: 'pointer', transition: 'all 0.3s', marginBottom: -1,
          }}>{t.name}</button>
        ))}
      </div>

      {/* Active tier display */}
      <div key={active} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '72vh', opacity: 0, animation: 'fadeIn 0.6s ease forwards' }}>
        {/* Image */}
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img src={tier.img} alt={tier.name} style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} />
          <div style={{ position: 'absolute', top: 24, left: 24 }}>
            <div style={{ background: 'var(--gold)', color: 'var(--cream)', fontFamily: 'var(--G)', fontSize: 8, letterSpacing: '0.28em', textTransform: 'uppercase', padding: '6px 14px' }}>{tier.tag}</div>
          </div>
        </div>

        {/* Info */}
        <div style={{ padding: 'clamp(48px,6vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'var(--cream)' }}>
          <div className="track" style={{ marginBottom: 12, fontSize: 8 }}>{tier.location}</div>
          <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 8, lineHeight: 1.1 }}>{tier.name}</h3>
          <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(20px,2.5vw,36px)', fontWeight: 300, color: 'var(--gold)', marginBottom: 32, letterSpacing: '0.04em' }}>{tier.price}</div>

          {/* Specs inline */}
          <div style={{ display: 'flex', gap: 32, marginBottom: 32, paddingBottom: 32, borderBottom: '1px solid var(--border)' }}>
            {[{v:tier.beds,l:'Bedrooms'},{v:tier.baths,l:'Bathrooms'},{v:`${tier.sqm}m²`,l:'Interior'},{v:tier.yield,l:'Gross Yield'}].map(({v,l}) => (
              <div key={l}>
                <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(18px,2vw,28px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--ink)', lineHeight: 1 }}>{v}</div>
                <div className="track" style={{ fontSize: 7, color: 'var(--stone)', marginTop: 6 }}>{l}</div>
              </div>
            ))}
          </div>

          <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.4vw,17px)', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--stone)', marginBottom: 40 }}>{tier.desc}</p>

          <div style={{ display: 'flex', gap: 12 }}>
            <a href="#contact" className="btn btn-dark">Request Brochure</a>
            <a href="#contact" className="btn btn-outline-dark">Arrange Viewing</a>
          </div>

          {/* Residency note */}
          <div style={{ marginTop: 32, padding: '16px 20px', background: 'var(--linen)', borderLeft: '2px solid var(--gold)' }}>
            <div className="track" style={{ fontSize: 7, marginBottom: 6 }}>Permanent Residency Included</div>
            <div style={{ fontFamily: 'var(--F)', fontSize: 13, fontStyle: 'italic', color: 'var(--stone)', lineHeight: 1.6 }}>All three estates qualify under EDB schemes. Buyer, spouse and dependants receive permanent residence for the duration of ownership.</div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── INTERRUPT 3: Horizontal material scroll ──────────────────────────────────
const MATERIALS = [
  { n: 'Reclaimed Teak', s: 'Floors · Ceilings · Louvres',       d: 'Sourced from 200-year-old Indonesian river barges. Each plank carries its own century.' },
  { n: 'Volcanic Basalt', s: 'Walls · Pool surround · Columns',   d: 'Quarried from the Mauritian interior. Honed to satin — cool to the touch at every hour.' },
  { n: 'Calacatta Oro',   s: 'Kitchen · Bathrooms · Vanities',    d: 'Single-slab marble selected in person at the Carrara quarry. Gold veining matched across every surface.' },
  { n: 'Belgian Linen',   s: 'Bedding · Drapes · Day beds',       d: '400-thread stonewashed linen, laundered in rainwater collected on site. 280gsm.' },
  { n: 'Hand-Laid Terrazzo', s: 'Terrace · Bathrooms · Hall',    d: 'Rose quartz, serpentine, and white marble. Mixed and pressed by local Mauritian craftsmen.' },
  { n: 'Unlacquered Brass', s: 'Hardware · Fixtures · Lighting',  d: 'From a single Burgundy foundry. Left to patina through the first year of residence.' },
]

function MaterialsScroll() {
  const containerRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const { ref: sRef, inView } = useInView(0.1)

  // Convert vertical scroll within the sticky container into horizontal movement
  useEffect(() => {
    const container = containerRef.current
    const track = trackRef.current
    if (!container || !track) return

    const onScroll = () => {
      const rect = container.getBoundingClientRect()
      const sticky = container.offsetHeight - window.innerHeight
      const progress = Math.min(1, Math.max(0, -rect.top / sticky))
      const maxX = track.scrollWidth - window.innerWidth
      track.style.transform = `translateX(${-progress * maxX}px)`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section style={{ background: 'var(--ink)' }}>
      {/* Header — outside sticky */}
      <div style={{ padding: 'clamp(80px,10vw,130px) clamp(40px,6vw,96px) clamp(60px,7vw,100px)', borderBottom: '1px solid rgba(245,240,232,0.06)' }}>
        <div ref={sRef} style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)', transition: 'all 1s ease' }}>
          <div className="track" style={{ marginBottom: 16, color: 'var(--gold)' }}>Craftsmanship</div>
          <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4.5vw,64px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', maxWidth: 600 }}>The material world — drag to explore</h2>
        </div>
      </div>

      {/* Sticky horizontal scroll */}
      <div ref={containerRef} style={{ height: `${MATERIALS.length * 100}vh`, position: 'relative' }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', overflow: 'hidden' }}>
          <div ref={trackRef} style={{ display: 'flex', height: '100%', transition: 'transform 0.08s linear', willChange: 'transform' }}>
            {MATERIALS.map(({ n, s, d }, i) => (
              <div key={n} style={{ minWidth: '100vw', height: '100%', display: 'flex', alignItems: 'center', padding: 'clamp(40px,6vw,96px)', borderRight: '1px solid rgba(245,240,232,0.06)', position: 'relative' }}>
                {/* Large background index */}
                <div style={{ position: 'absolute', right: '5%', bottom: '-0.05em', fontFamily: 'var(--F)', fontSize: 'clamp(180px,22vw,300px)', fontWeight: 300, fontStyle: 'italic', color: 'rgba(245,240,232,0.03)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>
                  {String(i+1).padStart(2,'0')}
                </div>
                <div style={{ maxWidth: 560, position: 'relative', zIndex: 1 }}>
                  <div className="track" style={{ marginBottom: 20, color: 'var(--gold)', fontSize: 8 }}>{String(i+1).padStart(2,'0')} / {String(MATERIALS.length).padStart(2,'0')}</div>
                  <div style={{ width: 40, height: 1, background: 'var(--gold)', marginBottom: 32, opacity: 0.5 }} />
                  <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4vw,64px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', marginBottom: 20, lineHeight: 1.1 }}>{n}</h3>
                  <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.6vw,19px)', fontStyle: 'italic', color: 'rgba(245,240,232,0.55)', lineHeight: 1.85, marginBottom: 28 }}>{d}</p>
                  <div className="track" style={{ fontSize: 8, color: 'rgba(245,240,232,0.25)' }}>{s}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Progress dots */}
          <MaterialDots containerRef={containerRef} count={MATERIALS.length} />
        </div>
      </div>
    </section>
  )
}

function MaterialDots({ containerRef, count }: { containerRef: React.RefObject<HTMLDivElement>; count: number }) {
  const [active, setActive] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = containerRef.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const sticky = el.offsetHeight - window.innerHeight
      const p = Math.min(1, Math.max(0, -rect.top / sticky))
      setActive(Math.round(p * (count - 1)))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [count])

  return (
    <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: 10, zIndex: 10 }}>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} style={{ width: i === active ? 20 : 4, height: 1, background: i === active ? 'var(--gold)' : 'rgba(245,240,232,0.2)', transition: 'all 0.4s ease' }} />
      ))}
    </div>
  )
}

// ─── Island section ───────────────────────────────────────────────────────────
function IslandSection() {
  return (
    <section id="island" style={{ background: 'var(--cream)' }}>
      <FullBleed
        src={IMGS.island}
        eyebrow="Île aux Cerfs · Grand Baie · Le Morne"
        title="Minutes from one of the world's last untouched lagoons"
        sub="The northern lagoon of Mauritius is among the Indian Ocean's most extraordinary natural phenomena — turquoise, warm, and almost impossibly clear."
        align="left"
        pos="center 30%"
        dim={0.5}
      />
      <div style={{ background: 'var(--cream)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {[
          { v: '330', u: 'days', l: 'of sunshine per year' },
          { v: '27°', u: 'avg', l: 'ocean temperature' },
          { v: '5', u: 'min', l: 'to Grand Baie marina' },
        ].map(({ v, u, l }, i) => (
          <div key={l} style={{ padding: 'clamp(40px,5vw,64px)', borderRight: i < 2 ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
            <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(36px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1 }}>{v}<span style={{ fontSize: '40%', marginLeft: 4, color: 'var(--stone)' }}>{u}</span></div>
            <div className="track" style={{ fontSize: 8, color: 'var(--stone)', marginTop: 12 }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── Staircase descent ────────────────────────────────────────────────────────
function StaircaseDescent() {
  const { ref, p } = useScrollProgress()
  const dark = p < 0.58 ? 0 : Math.min(1, (p - 0.58) / 0.34)
  const txt  = p < 0.72 ? 0 : Math.min(1, (p - 0.72) * 9)
  return (
    <div ref={ref} style={{ minHeight: '150dvh', position: 'relative', overflow: 'hidden' }}>
      <img src={IMGS.stairs} alt="Descend" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', position: 'absolute', inset: 0, transform: `scale(${1 + p * 0.05})`, transformOrigin: 'center bottom' }} />
      <div style={{ position: 'absolute', inset: 0, background: `rgba(10,10,15,${dark})` }} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 40, opacity: txt }}>
        <div className="track" style={{ marginBottom: 24, color: 'var(--gold)', letterSpacing: '0.45em' }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1 }}>
          The Wellness<br />
          <span style={{ background: 'linear-gradient(90deg,var(--gold),var(--gold2),var(--gold))', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ─── Wellness ─────────────────────────────────────────────────────────────────
function WellnessSection() {
  const { ref, inView } = useInView()
  return (
    <section id="wellness" style={{ background: 'var(--spa)' }}>
      <div style={{ padding: 'clamp(80px,10vw,130px) clamp(40px,6vw,96px)', textAlign: 'center', borderBottom: '1px solid rgba(245,240,232,0.05)' }}>
        <div className="track" style={{ marginBottom: 20, color: 'var(--gold)' }}>In-Residence Wellness</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--cream)', lineHeight: 1.1, marginBottom: 24 }}>The Spa Sanctuary</h2>
        <div style={{ width: 1, height: 64, background: 'linear-gradient(to bottom, var(--gold), transparent)', margin: '0 auto 28px' }} />
        <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.6vw,19px)', fontStyle: 'italic', color: 'rgba(245,240,232,0.5)', maxWidth: 520, margin: '0 auto', lineHeight: 1.8 }}>
          Ancient Mauritian healing traditions, reborn in volcanic stone and total silence.
        </p>
      </div>
      <FullBleed src={IMGS.spa1} eyebrow="Concierge" title="Your Dedicated Curator" sub="A personal wellness director — anticipating every need before it becomes one." pos="center 30%" dim={0.5} />
      <FullBleed src={IMGS.spa2} eyebrow="Treatment" title="The Treatment Sanctuary" sub="Volcanic stone · Cold ocean mineral · Island botanicals. Rituals drawn from centuries of Mauritian tradition." align="right" dim={0.5} />
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(245,240,232,0.05)' }}>
        {[{n:'Hydrotherapy',d:'Heated jet pool, cold plunge, mineral steam'},{n:'Body Rituals',d:'Volcanic stone · Coconut · Ayurvedic'},{n:'Yoga Pavilion',d:'Sunrise & sunset, resident instructor'},{n:'Nutrition',d:'Ayurvedic & plant-based in-villa cuisine'}].map(({n,d},i) => (
          <div key={n} style={{ padding: 'clamp(40px,4vw,64px) clamp(24px,3vw,44px)', borderRight: i<3?'1px solid rgba(245,240,232,0.05)':'none', opacity: inView?1:0, transform: inView?'none':'translateY(14px)', transition: `all 0.9s ease ${i*0.1}s` }}>
            <div className="track" style={{ fontSize: 8, marginBottom: 14, color: 'var(--gold)' }}>{n}</div>
            <p style={{ fontFamily: 'var(--F)', fontSize: 14, fontStyle: 'italic', color: 'rgba(245,240,232,0.35)', lineHeight: 1.7 }}>{d}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

// ─── INTERRUPT 4: Live counting stats ────────────────────────────────────────
function CountingStats() {
  const { ref, inView } = useInView(0.3)
  const stats = [
    { target: 13.89, suffix: '%', label: 'RPPI Growth Q3 2025',    note: 'Statistics Mauritius', dec: 2 },
    { target: 140,   suffix: '%', label: 'Cumulative since 2019',  note: 'Property price index', dec: 0 },
    { target: 9,     suffix: '%', label: 'Gross rental yield',     note: 'Short-term coastal villa', dec: 0 },
    { target: 67,    suffix: '%', label: 'Wealth growth 2015–25',  note: "Africa's strongest decade", dec: 0 },
  ]
  return (
    <section ref={ref} style={{ background: 'var(--linen)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)' }}>
        {stats.map(({ target, suffix, label, note, dec }, i) => (
          <CountStat key={label} target={target} suffix={suffix} label={label} note={note} dec={dec} active={inView} delay={i * 150} border={i < 3} />
        ))}
      </div>
    </section>
  )
}

function CountStat({ target, suffix, label, note, dec, active, delay, border }: { target:number; suffix:string; label:string; note:string; dec:number; active:boolean; delay:number; border:boolean }) {
  const [go, setGo] = useState(false)
  useEffect(() => { if (active) { const t = setTimeout(() => setGo(true), delay); return () => clearTimeout(t) } }, [active, delay])
  const val = useCountUp(target, go, 2200, dec)
  return (
    <div style={{ padding: 'clamp(48px,6vw,80px) clamp(28px,3.5vw,52px)', borderRight: border ? '1px solid var(--border)' : 'none', textAlign: 'center' }}>
      <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(44px,6vw,88px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1, color: 'var(--gold)', marginBottom: 12 }}>
        {dec === 0 ? Math.round(val) : val.toFixed(dec)}{suffix}
      </div>
      <div className="track" style={{ fontSize: 8, marginBottom: 8, color: 'var(--ink)' }}>{label}</div>
      <div style={{ fontFamily: 'var(--F)', fontSize: 12, fontStyle: 'italic', color: 'var(--stone)' }}>{note}</div>
    </div>
  )
}

// ─── Investment ───────────────────────────────────────────────────────────────
function InvestmentSection() {
  const { ref, inView } = useInView()
  return (
    <section id="investment" style={{ background: 'var(--cream)' }}>
      <div style={{ padding: 'clamp(80px,10vw,140px) clamp(40px,6vw,96px) 0', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px,6vw,100px)' }}>
        <div ref={ref} style={{ opacity: inView?1:0, transform: inView?'none':'translateY(18px)', transition: 'all 1.1s ease' }}>
          <div className="track" style={{ marginBottom: 20 }}>Market Intelligence · 2025–2026</div>
          <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(30px,4vw,58px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, color: 'var(--ink)', marginBottom: 28 }}>The case for Mauritius</h2>
          <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.5vw,18px)', fontStyle: 'italic', lineHeight: 1.85, color: 'var(--stone)' }}>
            Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life unavailable elsewhere on earth.
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 0, borderLeft: '1px solid var(--border)', paddingLeft: 'clamp(40px,5vw,80px)' }}>
          {[
            { e:'Price Appreciation', t:'8–12% forecast growth in 2026', d:'VEFA off-plan buyers lock in prices 30–60% below completed units with bank-backed guarantees.' },
            { e:'Permanent Residency', t:'Family PRP from £1.25M', d:'Buyer, spouse and all dependants. Valid for the duration of ownership. Renewable 20 years.' },
            { e:'Tax Position',       t:'0% CGT. 0% Estate Tax.', d:'No capital gains, no inheritance tax, no annual property tax. Full repatriation of profits.' },
            { e:'Act Now',            t:'Duty doubles 1 July 2026', d:'Non-citizen registration duty rises from 5% to 10%. Buyers exchanging before this date save significantly.' },
          ].map(({ e, t, d }, i) => (
            <InvestRow key={e} eyebrow={e} title={t} desc={d} index={i} active={inView} />
          ))}
        </div>
      </div>
      <div style={{ padding: 'clamp(80px,9vw,120px) clamp(40px,6vw,96px)', textAlign: 'center', marginTop: 'clamp(60px,8vw,100px)', borderTop: '1px solid var(--border)' }}>
        <div className="track" style={{ marginBottom: 20 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(80px,12vw,160px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1, marginBottom: 20 }}>+67%</div>
        <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.5vw,18px)', fontStyle: 'italic', color: 'var(--stone)', maxWidth: 480, margin: '0 auto 44px', lineHeight: 1.8 }}>
          Total investable wealth growth, Mauritius 2015–2025. The island continues to attract the world's most discerning wealth.
        </p>
        <a href="#contact" className="btn btn-dark">Request Investment Brief</a>
      </div>
    </section>
  )
}

function InvestRow({ eyebrow, title, desc, index, active }: { eyebrow:string; title:string; desc:string; index:number; active:boolean }) {
  return (
    <div style={{ padding: 'clamp(28px,3.5vw,44px) 0', borderBottom: '1px solid var(--border)', opacity: active?1:0, transform: active?'none':'translateX(16px)', transition: `all 0.9s ease ${index * 0.12}s` }}>
      <div className="track" style={{ fontSize: 7, marginBottom: 8 }}>{eyebrow}</div>
      <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(16px,1.8vw,22px)', fontWeight: 400, fontStyle: 'italic', color: 'var(--ink)', marginBottom: 8 }}>{title}</div>
      <div style={{ fontFamily: 'var(--F)', fontSize: 13, fontStyle: 'italic', color: 'var(--stone)', lineHeight: 1.7 }}>{desc}</div>
    </div>
  )
}

// ─── Contact ──────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background: 'var(--ink)' }}>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }} className="stack-m">
        <div style={{ padding: 'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '1px solid rgba(245,240,232,0.06)' }}>
          <div style={{ opacity: inView?1:0, transform: inView?'none':'translateY(18px)', transition: 'all 1.1s ease 0.1s' }}>
            <div className="track" style={{ marginBottom: 24, color: 'var(--gold)' }}>Private Access Only</div>
            <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4vw,58px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 28, color: 'var(--cream)' }}>
              Arrange a<br />Private Viewing
            </h2>
            <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(14px,1.5vw,17px)', fontStyle: 'italic', lineHeight: 1.85, color: 'rgba(245,240,232,0.45)', maxWidth: 360, marginBottom: 44 }}>
              All three estates are available for qualified buyers by private appointment only. Our advisors are reachable around the clock.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div className="track" style={{ fontSize: 8, color: 'rgba(245,240,232,0.25)' }}>hello@edenestates.mu</div>
              <div className="track" style={{ fontSize: 8, color: 'rgba(245,240,232,0.25)' }}>+230 5000 0000</div>
            </div>
          </div>
        </div>
        <div style={{ padding: 'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', opacity: inView?1:0, transition: 'opacity 1.1s ease 0.3s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone · WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t}) => (
              <input key={p} type={t} placeholder={p} style={{ borderBottomColor: 'rgba(245,240,232,0.15)', color: 'var(--cream)' }} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{ resize:'none', borderBottomColor: 'rgba(245,240,232,0.15)', color: 'var(--cream)' }} />
            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <a href="mailto:hello@edenestates.mu" className="btn btn-gold">Submit Enquiry</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Footer ───────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--deep)', borderTop: '1px solid rgba(245,240,232,0.04)', padding: 'clamp(32px,4vw,52px) clamp(40px,6vw,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontFamily: 'var(--F)', fontSize: 14, fontWeight: 300, fontStyle: 'italic', letterSpacing: '0.2em', color: 'rgba(245,240,232,0.25)' }}>ÉDEN ESTATES</span>
      <span className="track" style={{ fontSize: 7, color: 'rgba(245,240,232,0.18)' }}>© 2026 · Grand Baie, Mauritius · All rights reserved</span>
      <span className="track" style={{ fontSize: 7, color: 'rgba(245,240,232,0.18)' }}>From £1,250,000</span>
    </footer>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <ProgressBar />
      <NavBar />
      <Hero />

      {/* Estate journey */}
      <FullBleed id="estate" src={IMGS.ext1} eyebrow="Arrival" title="The Approach" sub="A private driveway through two hectares of tropical canopy. The estate reveals itself slowly, deliberately." pos="center 40%" />

      {/* INTERRUPT: Quote */}
      <QuoteMoment quote="The rarest addresses are not found. They are recognised." attr="Éden Estates · Grand Baie, Mauritius" />

      <FullBleed src={IMGS.living}  eyebrow="Living"        title="Open-Plan Living"    sub="Floor-to-ceiling glass dissolving interior and ocean into one continuous experience." align="center" dim={0.55} />
      <FullBleed src={IMGS.horizon} eyebrow="The Horizon"   title="Where the Sky Begins" sub="Unobstructed panorama across the northern lagoon at every hour of the day." align="right" pos="center 40%" />
      <FullBleed src={IMGS.pool}    eyebrow="Infinity Edge"  title="The Pool"             sub="A pool that ends where the Indian Ocean begins." pos="center 50%" dim={0.4} />
      <FullBleed src={IMGS.dining}  eyebrow="Al Fresco"     title="The Dining Terrace"   sub="A covered pavilion for twelve. Salt air, candlelight, and the sound of nothing." align="right" />
      <FullBleed src={IMGS.master}  eyebrow="Master Suite"  title="Five Sanctuaries"     sub="Each bedroom a private world — reclaimed teak, hand-laid stone, and the lagoon at the foot of your bed." align="center" dim={0.5} />
      <FullBleed src={IMGS.garden}  eyebrow="The Grounds"   title="Tropical Gardens"     sub="2,400m² of curated botanical landscape tended by two full-time horticulturalists." align="right" />

      {/* INTERRUPT: Three villa tiers */}
      <VillaTiers />

      {/* INTERRUPT: Horizontal materials scroll */}
      <MaterialsScroll />

      {/* Island */}
      <IslandSection />

      {/* INTERRUPT: Quote 2 */}
      <QuoteMoment quote="Not merely a home. A permanent residency in the world's most tax-efficient paradise." attr="From £1,250,000 · Permanent Residence Permit included" />

      {/* Staircase → Wellness */}
      <StaircaseDescent />
      <WellnessSection />

      {/* INTERRUPT: Counting stats */}
      <CountingStats />

      {/* Investment */}
      <InvestmentSection />

      {/* Contact */}
      <ContactSection />
      <Footer />
    </>
  )
}
