import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'

export const Route = createFileRoute('/')({
  component: HomePage,
})

const BASE = 'https://raw.githubusercontent.com/byauracle-ai/venerable-beijinho-853d83/main/public'
const img = (f: string) => `${BASE}/${encodeURIComponent(f)}`

// ── Image map ────────────────────────────────────────────────────────────────
// Hero: the pool/blue-hour image uploaded by user — add to public folder as 'hero-pool.jpg'
const HERO        = img('205032606_4198387713573399_8106792087768550505_n.jpg')
const IMG_EXT1    = img('Screenshot 2026-03-21 175630.png')
const IMG_EXT2    = img('Modern-Dream-House-McClean-Design-09-1-Kindesign')
const IMG_INT1    = img('Screenshot 2026-05-14 202045.png')
const IMG_INT2    = img('Screenshot 2026-05-14 201935.png')
const IMG_INT3    = img('Screenshot 2026-05-14 201944.png')
const IMG_POOL    = img('Screenshot 2026-05-14 202001.png')
const IMG_DINING  = img('Screenshot 2026-05-14 202012.png')
const IMG_MASTER  = img('Screenshot 2026-05-14 202036.png')
const IMG_GARDEN  = img('Screenshot 2026-05-14 202054.png')
const IMG_STAIRS  = img('Screenshot 2026-05-11 171922.png')
const IMG_SPA1    = img('Screenshot 2026-05-14 202025.png')
const IMG_SPA2    = img('Screenshot 2026-05-15 220411.png')
const IMG_SPA3    = img('Image.jpg')

// ── useInView ────────────────────────────────────────────────────────────────
function useInView(threshold = 0.18) {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current; if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setInView(true) },
      { threshold }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [threshold])
  return { ref, inView }
}

// ── useScrollY relative to element ──────────────────────────────────────────
function useParallax(speed = 0.25) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      setOffset(center * speed)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [speed])
  return { ref, offset }
}

// ── Global styles ─────────────────────────────────────────────────────────────
function GlobalStyles() {
  return (
    <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400;1,500&display=swap');

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

      :root {
        --black:  #050507;
        --ink:    #09090d;
        --gold:   #c8a45a;
        --gold2:  #e6cc96;
        --stone:  #f2ede6;
        --sand:   #e8dfd0;
        --smoke:  #b0a898;
        --ash:    #6a6460;
        --border: rgba(200,164,90,0.15);
        --F:      'Cormorant Garamond', Georgia, serif;
      }

      html { scroll-behavior: smooth; }

      body {
        background: var(--black);
        color: var(--stone);
        font-family: var(--F);
        -webkit-font-smoothing: antialiased;
        overflow-x: hidden;
      }

      /* Grain */
      body::after {
        content: '';
        position: fixed; inset: 0;
        pointer-events: none; z-index: 9998;
        opacity: 0.028;
        background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 600 600' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
        background-size: 220px;
      }

      .cap {
        font-family: var(--F);
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0.38em;
        text-transform: uppercase;
        color: var(--gold);
      }

      .nav-link {
        font-family: var(--F);
        font-size: 13px;
        letter-spacing: 0.2em;
        text-transform: uppercase;
        color: var(--smoke);
        text-decoration: none;
        font-weight: 400;
        transition: color 0.4s;
      }
      .nav-link:hover { color: var(--gold2); }

      .btn-ghost {
        display: inline-block;
        font-family: var(--F);
        font-size: 11px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--stone);
        text-decoration: none;
        border: 1px solid rgba(200,164,90,0.35);
        padding: 13px 32px;
        transition: all 0.5s ease;
        font-weight: 400;
      }
      .btn-ghost:hover {
        background: rgba(200,164,90,0.1);
        border-color: var(--gold);
        color: var(--gold2);
      }

      .btn-fill {
        display: inline-block;
        font-family: var(--F);
        font-size: 11px;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        color: var(--black);
        text-decoration: none;
        background: var(--gold);
        padding: 14px 36px;
        transition: all 0.4s ease;
        font-weight: 500;
      }
      .btn-fill:hover {
        background: var(--gold2);
        box-shadow: 0 8px 48px rgba(200,164,90,0.3);
      }

      /* Ken Burns — barely perceptible drift */
      @keyframes kenburns {
        0%   { transform: scale(1.0) translate(0, 0); }
        100% { transform: scale(1.06) translate(-1%, -1%); }
      }

      @keyframes fadeUp {
        from { opacity: 0; transform: translateY(22px); }
        to   { opacity: 1; transform: translateY(0); }
      }

      @keyframes fadeIn {
        from { opacity: 0; }
        to   { opacity: 1; }
      }

      @keyframes lineGrow {
        from { width: 0; }
        to   { width: 48px; }
      }

      @keyframes goldShimmer {
        0%   { background-position: 200% center; }
        100% { background-position: -200% center; }
      }

      @keyframes scrollLine {
        0%   { transform: scaleY(0); transform-origin: top; }
        50%  { transform: scaleY(1); transform-origin: top; }
        51%  { transform: scaleY(1); transform-origin: bottom; }
        100% { transform: scaleY(0); transform-origin: bottom; }
      }

      input, textarea {
        font-family: var(--F);
        font-size: 15px;
        font-weight: 300;
        letter-spacing: 0.06em;
        background: transparent;
        border: none;
        border-bottom: 1px solid rgba(200,164,90,0.2);
        color: var(--stone);
        padding: 14px 0;
        width: 100%;
        outline: none;
        transition: border-color 0.4s;
      }
      input:focus, textarea:focus { border-color: var(--gold); }
      input::placeholder, textarea::placeholder { color: var(--ash); }

      @media (max-width: 768px) {
        .hide-mobile { display: none !important; }
        .full-mobile { grid-template-columns: 1fr !important; }
      }
    `}</style>
  )
}

// ── NavBar ────────────────────────────────────────────────────────────────────
function NavBar() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', h, { passive: true })
    return () => window.removeEventListener('scroll', h)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 300,
      height: 72, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 clamp(24px, 5vw, 72px)',
      background: scrolled ? 'rgba(5,5,7,0.88)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: `1px solid ${scrolled ? 'rgba(200,164,90,0.08)' : 'transparent'}`,
      transition: 'background 0.7s, border-color 0.7s',
    }}>
      <a href="/" style={{ textDecoration: 'none' }}>
        <div style={{ fontFamily: 'var(--F)', fontSize: 20, fontWeight: 300, letterSpacing: '0.22em', color: 'var(--stone)', lineHeight: 1 }}>ÉDEN ESTATES</div>
        <div className="cap" style={{ fontSize: 8, letterSpacing: '0.4em', marginTop: 4, color: 'var(--gold)' }}>Mauritius · Est. 2018</div>
      </a>

      <div className="hide-mobile" style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
        {[['Estate','#estate'],['Materials','#materials'],['Investment','#investment'],['Wellness','#wellness'],['Contact','#contact']].map(([l,h]) => (
          <a key={l} href={h} className="nav-link">{l}</a>
        ))}
        <a href="#contact" className="btn-ghost" style={{ fontSize: 10, padding: '10px 24px' }}>Private Viewing</a>
      </div>
    </nav>
  )
}

// ── Hero — full bleed, Ken Burns, staggered reveal ────────────────────────────
function Hero() {
  return (
    <section style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      {/* Image with Ken Burns */}
      <div style={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        <img
          src={HERO}
          alt="Villa Azur"
          style={{
            width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 55%',
            animation: 'kenburns 18s ease-out forwards',
          }}
        />
        {/* Layered vignette — darker at bottom, subtle at sides */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(5,5,7,1) 0%, rgba(5,5,7,0.4) 40%, rgba(5,5,7,0.05) 75%, rgba(5,5,7,0.2) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(5,5,7,0.55) 0%, transparent 50%, rgba(5,5,7,0.15) 100%)' }} />
      </div>

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 2, padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(64px,8vw,112px)' }}>
        {/* Location cap */}
        <div className="cap" style={{ marginBottom: 28, opacity: 0, animation: 'fadeUp 1.2s ease 0.6s forwards' }}>
          Grand Baie · North Coast · Mauritius
        </div>

        {/* Title — italic, generous */}
        <h1 style={{
          fontFamily: 'var(--F)', fontSize: 'clamp(52px, 8.5vw, 128px)',
          fontWeight: 300, fontStyle: 'italic', lineHeight: 0.95,
          color: 'var(--stone)', margin: '0 0 20px',
          opacity: 0, animation: 'fadeUp 1.4s ease 0.9s forwards',
        }}>
          Villa Azur
        </h1>

        {/* Price — gold shimmer sweep on arrival */}
        <div style={{
          fontFamily: 'var(--F)', fontSize: 'clamp(18px, 2.2vw, 30px)',
          fontWeight: 300, letterSpacing: '0.08em',
          background: 'linear-gradient(90deg, var(--gold) 0%, var(--gold2) 30%, var(--gold) 60%, var(--gold2) 100%)',
          backgroundSize: '200% auto',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          animation: 'fadeUp 1.2s ease 1.3s forwards, goldShimmer 3s ease 2.2s 1',
          opacity: 0, marginBottom: 40,
        }}>
          £3,750,000
        </div>

        <p style={{
          fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.6vw,19px)', fontWeight: 300,
          fontStyle: 'italic', lineHeight: 1.75, color: 'var(--smoke)',
          maxWidth: 480, marginBottom: 52,
          opacity: 0, animation: 'fadeUp 1.2s ease 1.6s forwards',
        }}>
          Suspended above the Indian Ocean, where the lagoon meets the sky and time ceases to press.
        </p>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', opacity: 0, animation: 'fadeUp 1.2s ease 1.9s forwards' }}>
          <a href="#estate" className="btn-fill">Explore the Estate</a>
          <a href="#contact" className="btn-ghost">Arrange a Viewing</a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{ position: 'absolute', bottom: 40, left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, opacity: 0, animation: 'fadeIn 1s ease 2.8s forwards' }}>
        <div style={{ width: 1, height: 56, background: 'var(--gold)', animation: 'scrollLine 2s ease-in-out 3s infinite', opacity: 0.6 }} />
      </div>

      {/* Yield badge — top right, translucent */}
      <div style={{
        position: 'absolute', top: 100, right: 'clamp(24px,5vw,72px)', zIndex: 2,
        borderTop: '1px solid rgba(200,164,90,0.3)',
        borderBottom: '1px solid rgba(200,164,90,0.3)',
        padding: '18px 28px', textAlign: 'center',
        background: 'rgba(5,5,7,0.45)', backdropFilter: 'blur(12px)',
        opacity: 0, animation: 'fadeIn 1s ease 2.4s forwards',
      }}>
        <div className="cap" style={{ fontSize: 8, marginBottom: 8 }}>Est. Gross Yield</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 38, fontWeight: 300, lineHeight: 1, color: 'var(--gold)' }}>9%</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 11, color: 'var(--ash)', letterSpacing: '0.1em', marginTop: 4, fontStyle: 'italic' }}>short-term rental</div>
      </div>
    </section>
  )
}

// ── Full-bleed image section with centred or sided text ───────────────────────
function FullBleed({ src, eyebrow, title, sub, textAlign = 'left', objectPos = 'center', dim = 0.45, id }:
  { src:string; eyebrow?:string; title:string; sub?:string; textAlign?:'left'|'center'|'right'; objectPos?:string; dim?:number; id?:string }) {
  const { ref, offset } = useParallax(0.18)
  const { ref: inRef, inView } = useInView(0.1)
  const combinedRef = (el: HTMLDivElement|null) => {
    ;(ref as React.MutableRefObject<HTMLDivElement|null>).current = el
    ;(inRef as React.MutableRefObject<HTMLDivElement|null>).current = el
  }

  const align = textAlign === 'center' ? { left: 0, right: 0, textAlign: 'center' as const }
    : textAlign === 'right' ? { right: 'clamp(40px,7vw,120px)', textAlign: 'right' as const }
    : { left: 'clamp(40px,7vw,120px)', textAlign: 'left' as const }

  return (
    <section id={id} ref={combinedRef} style={{ height: '100dvh', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end' }}>
      <div style={{ position: 'absolute', inset: '-8% 0', overflow: 'hidden' }}>
        <img src={src} alt={title} loading="lazy" style={{
          width: '100%', height: '100%', objectFit: 'cover', objectPosition: objectPos,
          transform: `translateY(${offset}px)`,
          willChange: 'transform',
        }} />
      </div>
      <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top, rgba(5,5,7,${dim + 0.3}) 0%, rgba(5,5,7,${dim * 0.4}) 45%, rgba(5,5,7,${dim * 0.1}) 100%)` }} />

      <div style={{
        position: 'relative', zIndex: 2,
        padding: 'clamp(40px,6vw,96px)', paddingBottom: 'clamp(56px,7vw,100px)',
        ...align,
        opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(24px)',
        transition: 'opacity 1.4s ease, transform 1.4s ease',
      }}>
        {eyebrow && <div className="cap" style={{ marginBottom: 20 }}>{eyebrow}</div>}
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(36px,5.5vw,80px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.05, color: 'var(--stone)', margin: 0 }}>{title}</h2>
        {sub && <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.5vw,18px)', fontStyle: 'italic', color: 'var(--smoke)', marginTop: 18, maxWidth: 480, lineHeight: 1.7, display: 'inline-block' }}>{sub}</p>}
      </div>
    </section>
  )
}

// ── Breathing room — dark text section between image panels ───────────────────
function DarkSection({ eyebrow, title, body, centered = false, children, id }:
  { eyebrow?:string; title?:string; body?:string; centered?:boolean; children?: React.ReactNode; id?:string }) {
  const { ref, inView } = useInView(0.15)
  return (
    <section id={id} ref={ref} style={{ background: 'var(--ink)', padding: 'clamp(80px,10vw,140px) clamp(40px,8vw,120px)', textAlign: centered ? 'center' : 'left' }}>
      <div style={{ maxWidth: centered ? 680 : 900, margin: centered ? '0 auto' : undefined, opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(28px)', transition: 'opacity 1.2s ease, transform 1.2s ease' }}>
        {eyebrow && <div className="cap" style={{ marginBottom: 24 }}>{eyebrow}</div>}
        {title && <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4.5vw,68px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.08, color: 'var(--stone)', marginBottom: body ? 28 : 0 }}>{title}</h2>}
        {body && <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(16px,1.6vw,20px)', fontStyle: 'italic', color: 'var(--smoke)', lineHeight: 1.8, fontWeight: 300 }}>{body}</p>}
        {children}
      </div>
    </section>
  )
}

// ── Specs row ─────────────────────────────────────────────────────────────────
function Specs() {
  const { ref, inView } = useInView()
  const items = [
    { v: '5',       l: 'Bedrooms' },
    { v: '6',       l: 'Bathrooms' },
    { v: '820',     l: 'Interior m²' },
    { v: '2,400',   l: 'Land m²' },
    { v: '£3.75M',  l: 'Asking Price' },
    { v: '9%',      l: 'Gross Yield' },
  ]
  return (
    <section ref={ref} style={{ background: 'var(--black)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', '@media(max-width:768px)': { gridTemplateColumns: 'repeat(2,1fr)' } as any }}>
        {items.map(({ v, l }, i) => (
          <div key={l} style={{
            padding: 'clamp(40px,5vw,64px) clamp(20px,3vw,40px)',
            borderRight: i < items.length - 1 ? '1px solid var(--border)' : 'none',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
            transition: `opacity 0.9s ease ${i * 0.08}s, transform 0.9s ease ${i * 0.08}s`,
          }}>
            <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(28px,3.5vw,52px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1, marginBottom: 10 }}>{v}</div>
            <div className="cap" style={{ fontSize: 8, color: 'var(--ash)' }}>{l}</div>
          </div>
        ))}
      </div>
    </section>
  )
}

// ── Materials section — the obsessive detail ──────────────────────────────────
const MATERIALS = [
  {
    title: 'Reclaimed Teak',
    detail: 'Sourced from 200-year-old Indonesian river barges. Each plank carries its own history — grain patterns unique to the century, silver-grey patina that no fabrication can replicate.',
    spec: 'Floors · Ceilings · Louvres',
  },
  {
    title: 'Volcanic Basalt',
    detail: 'Quarried from the black mountains of the Mauritian interior. Cut to 600mm slabs, honed to a satin finish that is cool to the touch at all hours.',
    spec: 'Exterior walls · Pool surround · Feature columns',
  },
  {
    title: 'Calacatta Oro',
    detail: 'Single-slab marble selected in person at the Carrara quarry. Gold veining matched across every surface. No two pieces are the same; no two should be.',
    spec: 'Kitchen · Master bathrooms · Vanities',
  },
  {
    title: 'Belgian Linen',
    detail: '400-thread stonewashed linen, laundered in rainwater collected on site. Weighted to 280gsm — the precise threshold between luxurious and effortless.',
    spec: 'Bedding · Drapes · Day beds',
  },
  {
    title: 'Hand-Laid Terrazzo',
    detail: 'Mixed on site by local Mauritian craftsmen. Chips of rose quartz, serpentine, and white marble pressed into white cement — each floor a singular composition.',
    spec: 'Pool terrace · Bathrooms · Entrance hall',
  },
  {
    title: 'Brushed Brass',
    detail: 'Unlacquered and left to develop its own patina over the first year of residence. Every handle, tap, and fitting from a single foundry in Burgundy.',
    spec: 'Hardware · Fixtures · Lighting',
  },
]

function MaterialsSection() {
  return (
    <section id="materials" style={{ background: 'var(--black)' }}>
      {/* Header */}
      <DarkSection
        eyebrow="Craftsmanship"
        title="The Material World"
        body="Nothing in Villa Azur was chosen for convenience. Every surface, every fixture, every thread was sourced for its singular quality and its relationship to this specific place."
        centered
      />

      {/* Material cards */}
      <div style={{ padding: '0 clamp(40px,6vw,96px) clamp(80px,8vw,120px)', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 1, background: 'var(--border)' }}>
        {MATERIALS.map(({ title, detail, spec }, i) => (
          <MaterialCard key={title} title={title} detail={detail} spec={spec} index={i} />
        ))}
      </div>
    </section>
  )
}

function MaterialCard({ title, detail, spec, index }: { title:string; detail:string; spec:string; index:number }) {
  const { ref, inView } = useInView(0.1)
  return (
    <div ref={ref} style={{
      background: 'var(--black)',
      padding: 'clamp(44px,5vw,72px) clamp(32px,4vw,56px)',
      borderTop: '1px solid var(--border)',
      opacity: inView ? 1 : 0,
      transform: inView ? 'none' : 'translateY(20px)',
      transition: `opacity 1s ease ${index * 0.1}s, transform 1s ease ${index * 0.1}s`,
      position: 'relative',
    }}>
      {/* Index */}
      <div className="cap" style={{ fontSize: 8, color: 'rgba(200,164,90,0.3)', marginBottom: 28 }}>{String(index + 1).padStart(2,'0')}</div>
      {/* Gold rule */}
      <div style={{ width: inView ? 40 : 0, height: 1, background: 'var(--gold)', marginBottom: 24, transition: 'width 1s ease 0.4s', opacity: 0.7 }} />
      <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(22px,2.2vw,32px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', marginBottom: 18, lineHeight: 1.15 }}>{title}</h3>
      <p style={{ fontFamily: 'var(--F)', fontSize: 15, fontStyle: 'italic', lineHeight: 1.85, color: 'var(--smoke)', marginBottom: 28, fontWeight: 300 }}>{detail}</p>
      <div className="cap" style={{ fontSize: 8, color: 'var(--ash)', lineHeight: 1.8 }}>{spec.split(' · ').join('\n')}</div>
    </div>
  )
}

// ── Staircase descent → Wellness ──────────────────────────────────────────────
function StaircaseDescent() {
  const ref = useRef<HTMLDivElement>(null)
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const el = ref.current; if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      setP(Math.min(1, Math.max(0, (vh - rect.top) / (el.offsetHeight + vh))))
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Fade: holds clear until 60%, then darkens slowly to 95%
  const darkness = p < 0.6 ? 0 : Math.min(1, (p - 0.6) / 0.35)
  const textShow  = p < 0.7 ? 0 : Math.min(1, (p - 0.7) * 8)

  return (
    <div ref={ref} style={{ minHeight: '150dvh', position: 'relative', overflow: 'hidden' }}>
      <img src={IMG_STAIRS} alt="Descend" style={{
        width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top',
        position: 'absolute', inset: 0,
        transform: `scale(${1 + p * 0.05})`,
        transformOrigin: 'center bottom',
      }} />
      <div style={{ position: 'absolute', inset: 0, background: `rgba(3,3,8,${darkness})` }} />
      <div style={{
        position: 'absolute', inset: 0,
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: 40,
        opacity: textShow,
      }}>
        <div className="cap" style={{ marginBottom: 24, letterSpacing: '0.45em' }}>Descend · Restore · Transcend</div>
        <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,5vw,72px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--stone)', lineHeight: 1.1 }}>
          The Wellness<br />
          <span style={{
            background: 'linear-gradient(90deg, var(--gold), var(--gold2), var(--gold))',
            WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
          }}>Sanctuary</span>
        </h2>
      </div>
    </div>
  )
}

// ── Wellness panels ───────────────────────────────────────────────────────────
function WellnessSection() {
  return (
    <section id="wellness" style={{ background: '#02020a' }}>
      <DarkSection
        eyebrow="In-Residence Wellness"
        title="The Spa Sanctuary"
        body="Concealed beneath the villa, a private world exists for one purpose alone. Ancient Mauritian healing traditions, reborn in volcanic stone and total silence."
        centered
      />
      <FullBleed src={IMG_SPA1} eyebrow="Concierge" title="Your Dedicated Curator" sub="A personal wellness director available around the clock — anticipating every need before it becomes one." objectPos="center 30%" dim={0.5} />
      <FullBleed src={IMG_SPA2} eyebrow="Treatment" title="The Treatment Sanctuary" sub="Bespoke rituals drawn from ancient Mauritian healing traditions — volcanic stone, cold ocean mineral, island botanicals." textAlign="right" dim={0.5} />
      <FullBleed src={IMG_SPA3} eyebrow="Restoration" title="Deep Restoration" sub="Total silence. Total surrender. Total renewal." textAlign="center" dim={0.6} />

      {/* Spa offerings */}
      <SpaOfferings />
    </section>
  )
}

function SpaOfferings() {
  const { ref, inView } = useInView()
  const items = [
    { n: 'Hydrotherapy',    d: 'Heated jet pool, cold plunge, mineral steam' },
    { n: 'Body Rituals',    d: 'Volcanic stone · Coconut · Ayurvedic' },
    { n: 'Yoga Pavilion',   d: 'Sunrise & sunset, resident instructor' },
    { n: 'Nutrition',       d: 'Ayurvedic & plant-based in-villa cuisine' },
  ]
  return (
    <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', borderTop: '1px solid rgba(200,164,90,0.08)' }}>
      {items.map(({ n, d }, i) => (
        <div key={n} style={{
          padding: 'clamp(48px,5vw,72px) clamp(28px,3vw,48px)',
          borderRight: i < 3 ? '1px solid rgba(200,164,90,0.08)' : 'none',
          opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
          transition: `all 0.9s ease ${i * 0.12}s`,
        }}>
          <div className="cap" style={{ marginBottom: 16, fontSize: 8 }}>{n}</div>
          <p style={{ fontFamily: 'var(--F)', fontSize: 15, fontStyle: 'italic', color: 'var(--ash)', lineHeight: 1.7 }}>{d}</p>
        </div>
      ))}
    </div>
  )
}

// ── Investment section ────────────────────────────────────────────────────────
function InvestmentSection() {
  const { ref, inView } = useInView()
  const stats = [
    { v: '+13.89%', l: 'RPPI Growth',      n: 'Q3 2025 · Statistics Mauritius' },
    { v: '+140%',   l: 'Since 2019',       n: 'Cumulative price growth' },
    { v: '9%',      l: 'Gross Yield',      n: 'Short-term coastal villa' },
    { v: '0%',      l: 'Capital Gains',    n: 'Tax on property sale' },
    { v: '0%',      l: 'Estate Tax',       n: 'Inheritance & gift' },
    { v: '862',     l: 'EDB Permits 2025', n: 'Foreign purchases approved' },
  ]

  return (
    <section id="investment" style={{ background: 'var(--black)' }}>
      <DarkSection
        eyebrow="Market Intelligence · 2025–2026"
        title="The Case for Mauritius"
        body="Five reasons converge into one irrefutable argument: capital appreciation, rental income, permanent residency, zero capital gains, and a way of life that cannot be purchased anywhere else on earth."
        centered
      />

      {/* Stats */}
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: 'repeat(6,1fr)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
        {stats.map(({ v, l, n }, i) => (
          <div key={l} style={{
            padding: 'clamp(36px,4vw,60px) clamp(20px,2.5vw,36px)',
            borderRight: i < stats.length - 1 ? '1px solid var(--border)' : 'none',
            opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(16px)',
            transition: `all 0.9s ease ${i * 0.08}s`,
          }}>
            <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(22px,2.8vw,42px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1, marginBottom: 8 }}>{v}</div>
            <div className="cap" style={{ fontSize: 8, marginBottom: 6 }}>{l}</div>
            <div style={{ fontFamily: 'var(--F)', fontSize: 12, fontStyle: 'italic', color: 'var(--ash)', lineHeight: 1.5 }}>{n}</div>
          </div>
        ))}
      </div>

      {/* Four pillars */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', borderBottom: '1px solid var(--border)' }}>
        {[
          { e:'Price Appreciation', t:'Unmatched Capital Growth', b:'Luxury coastal villas forecast 8–12% growth in 2026. Foreign-buyer-eligible properties rose +12.62% year-on-year in 2025. VEFA off-plan buyers lock in prices 30–60% below completed units with bank-backed completion guarantees.', tag:'RPPI +13.89% · Q3 2025', br:true },
          { e:'Rental Income',      t:'Superior Yield Profile',   b:'Gross yields of 5–9% for short-term holiday rentals in high-occupancy coastal areas. Rents rose +12.5% in 2025, driven by 1.436 million tourist arrivals including +33.5% growth from India.', tag:'Up to 9% gross yield', br:false },
          { e:'Permanent Residency',t:'Live Where Others Holiday',b:'Purchase ≥ USD 375,000 under approved EDB schemes and receive a Permanent Residence Permit for buyer, spouse, and all dependants — valid as long as the property is owned, renewable for 20 years.', tag:'Family PRP included', br:true, bt:true },
          { e:'Tax Optimisation',   t:'Zero Tax on Wealth',       b:'0% Capital Gains Tax. 0% Estate, Inheritance or Gift Tax. No annual property tax. Full free repatriation of capital and profits. Act before 1 July 2026: registration duty doubles from 5% to 10%.', tag:'0% CGT · 0% Estate Tax', br:false, bt:true },
        ].map(({ e, t, b, tag, br, bt }, i) => (
          <InvestPillar key={t} eyebrow={e} title={t} body={b} tag={tag} borderR={br} borderT={bt} />
        ))}
      </div>

      {/* Wealth growth callout */}
      <div style={{ padding: 'clamp(72px,9vw,120px) clamp(40px,8vw,120px)', textAlign: 'center', background: 'var(--ink)' }}>
        <div className="cap" style={{ marginBottom: 24 }}>Africa's Strongest Decade of Wealth Growth</div>
        <div style={{ fontFamily: 'var(--F)', fontSize: 'clamp(72px,10vw,140px)', fontWeight: 300, fontStyle: 'italic', color: 'var(--gold)', lineHeight: 1, marginBottom: 20 }}>+67%</div>
        <p style={{ fontFamily: 'var(--F)', fontSize: 'clamp(15px,1.5vw,19px)', fontStyle: 'italic', color: 'var(--smoke)', maxWidth: 520, margin: '0 auto 44px', lineHeight: 1.8 }}>
          Total investable wealth growth, Mauritius 2015–2025. The island continues to attract the world's most discerning wealth.
        </p>
        <a href="#contact" className="btn-fill">Request Investment Brief</a>
      </div>
    </section>
  )
}

function InvestPillar({ eyebrow, title, body, tag, borderR, borderT }: { eyebrow:string; title:string; body:string; tag:string; borderR?:boolean; borderT?:boolean }) {
  const { ref, inView } = useInView()
  return (
    <div ref={ref} style={{
      padding: 'clamp(52px,5vw,84px) clamp(40px,5vw,72px)',
      borderRight: borderR ? '1px solid var(--border)' : 'none',
      borderTop: borderT ? '1px solid var(--border)' : 'none',
      opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(18px)',
      transition: 'all 1s ease',
    }}>
      <div className="cap" style={{ marginBottom: 16 }}>{eyebrow}</div>
      <h3 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(20px,2.2vw,34px)', fontWeight: 300, fontStyle: 'italic', marginBottom: 18, lineHeight: 1.2, color: 'var(--stone)' }}>{title}</h3>
      <p style={{ fontFamily: 'var(--F)', fontSize: 14, lineHeight: 1.9, color: 'var(--smoke)', fontStyle: 'italic', marginBottom: 24 }}>{body}</p>
      <div style={{ display: 'inline-block', padding: '6px 16px', border: '1px solid rgba(200,164,90,0.3)', fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', fontFamily: 'var(--F)' }}>{tag}</div>
    </div>
  )
}

// ── Contact ───────────────────────────────────────────────────────────────────
function ContactSection() {
  const { ref, inView } = useInView()
  return (
    <section id="contact" style={{ background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
      <div ref={ref} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '80vh' }} className="full-mobile">
        {/* Left */}
        <div style={{ padding: 'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', borderRight: '1px solid var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ opacity: inView ? 1 : 0, transform: inView ? 'none' : 'translateY(20px)', transition: 'all 1.1s ease 0.1s' }}>
            <div className="cap" style={{ marginBottom: 24 }}>Private Access Only</div>
            <h2 style={{ fontFamily: 'var(--F)', fontSize: 'clamp(32px,4vw,60px)', fontWeight: 300, fontStyle: 'italic', lineHeight: 1.1, marginBottom: 28, color: 'var(--stone)' }}>
              Arrange a<br />Private Viewing
            </h2>
            <p style={{ fontFamily: 'var(--F)', fontSize: 16, fontStyle: 'italic', lineHeight: 1.85, color: 'var(--smoke)', maxWidth: 360, marginBottom: 48 }}>
              Villa Azur is available for qualified buyers by private appointment only. Our advisors are reachable around the clock, across every time zone.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="cap" style={{ fontSize: 9, color: 'var(--ash)' }}>hello@edenestates.mu</div>
              <div className="cap" style={{ fontSize: 9, color: 'var(--ash)' }}>+230 5000 0000</div>
            </div>
          </div>
        </div>

        {/* Right — form */}
        <div style={{ padding: 'clamp(72px,8vw,120px) clamp(40px,6vw,96px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, opacity: inView ? 1 : 0, transition: 'opacity 1.1s ease 0.3s' }}>
            {[{p:'Full Name',t:'text'},{p:'Email Address',t:'email'},{p:'Phone · WhatsApp',t:'tel'},{p:'Country of Residence',t:'text'}].map(({p,t}) => (
              <input key={p} type={t} placeholder={p} />
            ))}
            <textarea placeholder="Your enquiry or preferred dates" rows={3} style={{ resize: 'none' }} />
            <a href="mailto:hello@edenestates.mu" className="btn-fill" style={{ textAlign: 'center', marginTop: 8 }}>Submit Enquiry</a>
          </div>
        </div>
      </div>
    </section>
  )
}

// ── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: 'var(--black)', borderTop: '1px solid var(--border)', padding: 'clamp(32px,4vw,56px) clamp(40px,6vw,96px)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
      <span style={{ fontFamily: 'var(--F)', fontSize: 14, fontWeight: 300, letterSpacing: '0.2em', color: 'var(--ash)', fontStyle: 'italic' }}>ÉDEN ESTATES</span>
      <span className="cap" style={{ fontSize: 8, color: 'var(--ash)' }}>© 2026 · Grand Baie, Mauritius</span>
      <span className="cap" style={{ fontSize: 8, color: 'var(--ash)' }}>Villa Azur · £3,750,000</span>
    </footer>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────────
function HomePage() {
  return (
    <>
      <GlobalStyles />
      <NavBar />
      <Hero />

      {/* Estate journey — full bleed panels, each its own world */}
      <FullBleed id="estate" src={IMG_EXT1}   eyebrow="Arrival"       title="The Approach"         sub="A private driveway through two hectares of tropical canopy — the estate reveals itself slowly, deliberately." objectPos="center 40%" />
      <FullBleed             src={IMG_EXT2}   eyebrow="Architecture"   title="Designed to Disappear" sub="Award-winning design by Atelier Côté Sud — a building that serves the landscape rather than imposing upon it." textAlign="right" objectPos="center 35%" />
      <FullBleed             src={IMG_INT1}   eyebrow="Exterior"       title="The Estate"            sub="Every facade considered. Every angle intentional. Every shadow earned." objectPos="center" />

      <Specs />

      <FullBleed             src={IMG_INT2}   eyebrow="Living"         title="Open-Plan Living"      sub="Floor-to-ceiling glass dissolving interior and ocean into a single continuous experience." textAlign="center" dim={0.55} />
      <FullBleed             src={IMG_INT3}   eyebrow="The Horizon"    title="Where the Sky Begins"  sub="Unobstructed panorama across the northern lagoon at every hour of the day." objectPos="center 40%" textAlign="right" />
      <FullBleed             src={IMG_POOL}   eyebrow="Infinity Edge"  title="The Pool"              sub="A pool that ends where the Indian Ocean begins." objectPos="center 50%" dim={0.4} />
      <FullBleed             src={IMG_DINING} eyebrow="Al Fresco"      title="The Dining Terrace"    sub="A covered pavilion for twelve. Salt air, candlelight, and the sound of nothing." textAlign="right" />
      <FullBleed             src={IMG_MASTER} eyebrow="Master Suite"   title="Five Sanctuaries"      sub="Each bedroom a private world — reclaimed teak, hand-laid stone, and the lagoon at the foot of your bed." textAlign="center" dim={0.5} />
      <FullBleed             src={IMG_GARDEN} eyebrow="The Grounds"    title="Tropical Gardens"      sub="2,400m² of curated botanical landscape — a living artwork tended by two full-time horticulturalists." textAlign="right" />

      {/* Materials */}
      <MaterialsSection />

      {/* Staircase descent into wellness */}
      <StaircaseDescent />
      <WellnessSection />

      {/* Investment */}
      <InvestmentSection />

      {/* Contact */}
      <ContactSection />
      <Footer />
    </>
  )
}
